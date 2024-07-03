import { Plugin } from '@ckeditor/ckeditor5-core';
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository';


class Adapter {
    loader: any;
    url: any;
    xhr: any;

    constructor(loader: any, url: any) {
        this.loader = loader;
        this.url = url;
    }

    upload(): Promise<any> {
        return this.getCredentials().then(this.uploadImage.bind(this));
    }

    abort() {
        if (this.xhr) this.xhr.abort();
    }

    getCredentials() {
        return new Promise((resolve, reject) => {
            this.loader.file.then((file: any) => {
                var filename = file.name;
                var contentType = file.type

                if (!filename) return reject('No filename found');

                const queryString = '?objectName=' + filename + '&contentType=' + encodeURIComponent(contentType);

                this.xhr = new XMLHttpRequest();
                var xhr = this.xhr;

                this.xhr.withCredentials = false;
                this.xhr.open('GET', this.url + queryString, true);
                this.xhr.responseType = 'json';
                this.xhr.setRequestHeader('Content-Type', 'application/json');
                this.xhr.setRequestHeader('Access-Control-Allow-Origin', '*');

                this.xhr.addEventListener('error', (err: any) => reject('crederr'));
                this.xhr.addEventListener('abort', (err: any) => reject('credabort'));
                this.xhr.addEventListener('load', function () {
                    var res = xhr.response;

                    if (!res) return reject('No response from s3 creds url');

                    resolve(res);
                });

                this.xhr.send();
            })
        });
    }

    uploadImage(s3creds: any) {
        return new Promise((resolve, reject) => {

            this.loader.file.then((file: any) => {
                var xhr = this.xhr = new XMLHttpRequest();

                xhr.addEventListener('error', err => reject('s3err'));
                xhr.addEventListener('abort', err => reject('s3abort'));
                xhr.addEventListener('load', () => {
                    if (xhr.status !== 200) {
                        console.log("S3Upload Error ---->", { xhr });
                        return reject(`Error ${xhr.status}: ${xhr.statusText}`);
                    }

                    const imgUrl = xhr.responseURL.split("?")[0];
                    console.log("S3Upload Success ---->", { url: imgUrl });
                    return resolve({
                        urls: {
                            default: imgUrl
                        }
                    });
                });

                xhr.open('PUT', s3creds.signedUrl, true);
                xhr.setRequestHeader("X-Amz-Acl", "public-read")
                xhr.send(file);
            });
        });
    }
}


export class S3Upload extends Plugin {

    static get requires() {
        return [FileRepository];
    }

    static get pluginName() {
        return 'S3Upload';
    }

    init() {
        const url = this.editor.config.get('s3Upload.signingUrl');

        if (!url) {
            console.warn('s3Upload.signingUrl is not configured')
            return;
        }

        this.editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => new Adapter(loader, url);
    }
}