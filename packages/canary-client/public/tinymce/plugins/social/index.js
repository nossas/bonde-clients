(function () {
    tinymce.PluginManager.add("social", function (editor, url) {
        const twitterText = editor.getParam("social_twitter_text", "");
        const shareUrl = editor.getParam("social_share_url", "");

        editor.ui.registry.addIcon("insert-social", '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M14 5C13.4477 5 13 5.44772 13 6C13 6.27642 13.1108 6.52505 13.2929 6.70711C13.475 6.88917 13.7236 7 14 7C14.5523 7 15 6.55228 15 6C15 5.44772 14.5523 5 14 5ZM11 6C11 4.34315 12.3431 3 14 3C15.6569 3 17 4.34315 17 6C17 7.65685 15.6569 9 14 9C13.5372 9 13.0984 8.8948 12.7068 8.70744L10.7074 10.7068C10.8948 11.0984 11 11.5372 11 12C11 12.4628 10.8948 12.9016 10.7074 13.2932L12.7068 15.2926C13.0984 15.1052 13.5372 15 14 15C15.6569 15 17 16.3431 17 18C17 19.6569 15.6569 21 14 21C12.3431 21 11 19.6569 11 18C11 17.5372 11.1052 17.0984 11.2926 16.7068L9.29323 14.7074C8.90157 14.8948 8.46277 15 8 15C6.34315 15 5 13.6569 5 12C5 10.3431 6.34315 9 8 9C8.46277 9 8.90157 9.1052 9.29323 9.29256L11.2926 7.29323C11.1052 6.90157 11 6.46277 11 6ZM8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13C8.27642 13 8.52505 12.8892 8.70711 12.7071C8.88917 12.525 9 12.2764 9 12C9 11.7236 8.88917 11.475 8.70711 11.2929C8.52505 11.1108 8.27642 11 8 11ZM14 17C13.7236 17 13.475 17.1108 13.2929 17.2929C13.1108 17.475 13 17.7236 13 18C13 18.5523 13.4477 19 14 19C14.5523 19 15 18.5523 15 18C15 17.4477 14.5523 17 14 17Z" fill="#000000"/></svg>');

        //
        editor.ui.registry.addMenuButton("social", {
            tooltip: "Selecione um botão de compartilhamento",
            icon: "insert-social",
            fetch: function (callback) {
                callback([
                    {
                        type: "menuitem",
                        text: "Facebook",
                        onAction: (api) => openDialog("Facebook", { url: shareUrl })
                    },
                    {
                        type: "menuitem",
                        text: "Twitter",
                        onAction: (api) => openDialog("Twitter", { url: shareUrl, text: twitterText })
                    },
                    {
                        type: "menuitem",
                        text: "Whatsapp",
                        onAction: (api) => openDialog("Whatsapp")
                    }
                ])
            }
        });

        const openDialog = (social, initialData = {}, currentNode = null) => {
            const bodyItems = []

            if (social === "Whatsapp") {
                bodyItems.push({
                    type: "textarea",
                    name: "text",
                    label: `Texto de compartilhamento ${social}`
                });
            }

            if (social === "Facebook") {
                bodyItems.push({
                    type: "input",
                    name: "url",
                    label: "URL a ser compartilhada"
                });
            }


            if (social === "Twitter") {
                bodyItems.push({
                    type: "input",
                    name: "url",
                    label: "URL a ser compartilhada"
                });
                bodyItems.push({
                    type: "textarea",
                    name: "text",
                    label: `Texto de compartilhamento ${social}`
                });
            }

            editor.windowManager.open({
                title: `Editar botão ${social}`,
                body: {
                    type: "panel",
                    items: bodyItems
                },
                buttons: [
                    {
                        type: "cancel",
                        text: "Sair"
                    },
                    {
                        type: "submit",
                        text: "Salvar",
                        buttonType: "primary"
                    }
                ],
                initialData: initialData,
                onSubmit: (api) => {
                    const data = api.getData();
                    let href = "";
                    if (social === "Facebook") {
                        href = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(data.url)}`
                    } else if (social === "Twitter") {
                        href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(data.text)}&url=${encodeURIComponent(data.url)}`
                    } else if (social === "Whatsapp") {
                        href = `https://web.whatsapp.com/send?text=${encodeURIComponent(data.text)}`
                    } else {
                        console.warn(`${social} button not a valid option.`);
                    }

                    if (currentNode) {
                        editor.dom.setAttrib(currentNode, "href", href);
                    } else {
                        insertSocialButton(social, href);
                    }

                    // Fecha o modal
                    api.close();
                }
            })
        }

        const insertSocialButton = (social, href) => {
            const content = `<a class="social ${social.toLowerCase()}" href="${href}" target="_blank" rel="noopener noreferrer" contenteditable="false">Compartilhar no ${social}</a><br />`;
            editor.insertContent(content);
            editor.selection.collapse(false);
        }

        editor.ui.registry.addContextMenu("social", {
            update: (element) => {
                return element.classList.contains("social") ? "edit-social" : "";
            }
        });

        editor.ui.registry.addMenuItem("edit-social", {
            text: "Compartilhamento",
            icon: "insert-social",
            onAction: function (e) {
                const node = editor.selection.getNode();
                const params = Object.fromEntries(new URL(node.href).searchParams.entries());
                if (node.classList.contains("facebook")) {
                    openDialog("Facebook", { url: params.u }, node);
                } else if (node.classList.contains("twitter")) {
                    openDialog("Twitter", { url: params.url, text: params.text }, node);
                } else if (node.classList.contains("whatsapp")) {
                    openDialog("Whatsapp", { text: params.text }, node);
                }
            },
        });

        return {
            getMetadata: () => ({
                name: "Compartilhamento"
            })
        }
    });
})();