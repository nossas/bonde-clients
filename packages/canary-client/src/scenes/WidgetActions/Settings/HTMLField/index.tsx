import React, { useRef, useEffect } from "react";
import { FormControl, FormLabel, Flex, Tooltip, Stack } from "bonde-components/chakra";
import { Hint } from "bonde-components";
import { InfoIcon } from "bonde-components/icons";
import { useField } from "bonde-components/form";

import { Editor } from "@tinymce/tinymce-react";

// Importa o CSS e os temas diretamente do TinyMCE instalado localmente
import 'tinymce/tinymce';
import 'tinymce/icons/default';
import 'tinymce/themes/silver';
import 'tinymce/models/dom';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/table';
import 'tinymce/plugins/visualblocks';

// Estilo do editor
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/skins/content/default/content.min.css';


const S3UploadHandler = async (blobInfo: any, progress: any) => {
  // Extrai o arquivo a partir do blobInfo
  const file = blobInfo.blob();
  const filename = file.name;
  const contentType = file.type;

  if (!filename) throw new Error("No filename found");

  // URL da API que fornece a URL assinada do S3
  const signingUrl = process.env.REACT_APP_UPLOADS_URL;
  const queryString = `?objectName=${filename}&contentType=${encodeURIComponent(contentType)}`;

  // Obtendo a URL assinada para upload no S3
  const response = await fetch(signingUrl + queryString, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
  if (!response.ok) throw new Error("Failed to get signed URL from S3");

  const s3creds = await response.json();

  // Fazendo upload da imagem para o S3
  const uploadResponse = await fetch(s3creds.signedUrl, {
    method: "PUT",
    body: file,
    headers: {
      "X-Amz-Acl": "public-read",
      "Content-Type": contentType
    }
  })

  if (!uploadResponse.ok) throw new Error("S3 upload failed");

  // Retorna a URL pública da imagem armazenada
  return s3creds.signedUrl.split("?")[0];
}


const HTMLField = ({
  name,
  helpText,
  label,
  initialValue,
  init = {},
  mode = "html",
  ...config
}: any) => {
  const editorRef = useRef(null);
  const { input, meta } = useField(name, config);

  useEffect(() => {
    return () => {
      if (editorRef.current) {
        editorRef.current.remove();
        editorRef.current = null;
      }
    };
  }, []);

  let tinyInitSettings: any = {
    license_key: "gpl",
    plugins: [
      "advlist", "anchor", "autolink", "charmap", "code",
      "fullscreen", "image", "insertdatetime",
      "link", "lists", "media", "preview", "searchreplace",
      "table", "visualblocks", "wordcount"
    ],
    toolbar:
        "undo redo | bold italic underline | " +
        "alignleft aligncenter alignright alignjustify | " +
        "bullist numlist outdent indent | " +
        "link image media | table | code fullscreen preview",
    images_upload_handler: S3UploadHandler,
    skin: false,  // Necessário para evitar erro de skin ao usar localmente
    contextmenu: "link image",
    content_style: "body { font-family: 'Source Sans Pro', 'Proxima Nova', sans-serif; }",
    content_css: [
      "https://fonts.googleapis.com/css?family=Abel|Anton|Archivo+Narrow:400,400i,700,700i|Arvo:400,400i,700,700i|Asap:400,400i,700,700i|Baloo+Bhai|Bitter:400,400i,700|Bree+Serif|Cabin:400,400i,700,700i|Catamaran:400,700|Crimson+Text:400,400i,700,700i|Cuprum:400,400i,700,700i|David+Libre:400,700|Dosis:400,700|Droid+Sans:400,700|Exo+2:400,400i,700,700i|Exo:400,400i,700,700i|Fira+Sans:400,400i,700,700i|Fjalla+One|Francois+One|Gidugu|Hind:400,700|Inconsolata:400,700|Indie+Flower|Josefin+Sans:400,400i,700,700i|Karla:400,400i,700,700i|Lalezar|Lato:400,400i,700,700i|Libre+Baskerville:400,400i,700|Lobster|Lora:400,400i,700,700i|Merriweather+Sans:400,400i,700,700i|Montserrat:400,700|Muli:400,400i|Noto+Serif:400,400i,700,700i|Nunito:400,700|Open+Sans+Condensed:300,300i,700|Open+Sans:400,400i,700,700i|Oswald:400,700|Oxygen:400,700|PT+Sans:400,400i,700,700i|PT+Serif:400,400i,700,700i|Pacifico|Playfair+Display:400,400i,700,700i|Poiret+One|Poppins:400,700|Quicksand:400,700|Raleway:400,400i,700,700i|Roboto+Condensed:400,400i,700,700i|Roboto+Mono:400,400i,700,700i|Roboto+Slab:400,700|Roboto:400,400i,700,700i|Ruslan+Display|Signika:400,700|Slabo+27px|Titillium+Web:400,400i,700,700i|Ubuntu+Condensed|Ubuntu:400,400i,700,700i|Varela+Round|Yanone+Kaffeesatz:400,700"
    ], // Evita erro de CSS ao rodar sem CDN
    external_plugins: {},
    default_font_stack: ['Source Sans Pro','Proxima Nova', 'sans-serif']
  }

  if (mode === "html") {
    tinyInitSettings.plugins.concat(["social", "templates", "conditional", "mergetags"])
    tinyInitSettings.external_plugins = {
      social: "/tinymce/plugins/social/index.js",
      mergetags: "/tinymce/plugins/mergetags/index.js",
      templates: "/tinymce/plugins/templates/index.js",
      conditional: "/tinymce/plugins/conditional/index.js"
    }
    tinyInitSettings.content_css.concat([
      "/styles/plugins/social.css",
      "/styles/plugins/mergetags.css"
    ])
    tinyInitSettings.contextmenu = "social " + tinyInitSettings.contextmenu
    tinyInitSettings.toolbar = "templates social mergetags conditional | " + tinyInitSettings.toolbar
  } else if (mode === "email") {
    tinyInitSettings = {
      // Configs para e-mail
      forced_root_block: false,
      force_br_newlines: true,
      force_p_newlines: false,
      convert_newlines_to_brs: true,
      remove_linebreaks: false
    }
  }


  return (
    <FormControl
      isInvalid={(meta.error || meta.submitError) && meta.touched}
      mb={4}
    >
      <Flex direction="row" justify="space-between">
        <Stack direction="row" spacing={2} align="center">
          <FormLabel>{label}</FormLabel>
          {helpText && (
            <Tooltip label={helpText}>
              <InfoIcon color="gray.300" boxSize={3} />
            </Tooltip>
          )}
        </Stack>
        {(meta.error || meta.submitError) && meta.touched && (
          <Hint color="error">{meta.error || meta.submitError}</Hint>
        )}
      </Flex>
      <Editor
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        onInit={(_evt, editor) => editorRef.current = editor}
        onChange={(_evt) => input.onChange(editorRef.current.getContent({ format: "clean" }))}
        initialValue={initialValue}
        init={{ ...tinyInitSettings, ...init }}
      />
    </FormControl>
  )
}

export default HTMLField;