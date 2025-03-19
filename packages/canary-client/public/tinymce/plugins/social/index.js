(function () {
    tinymce.PluginManager.add("social", function (editor, url) {
        const twitterText = editor.getParam("social_twitter_text", "");
        const shareUrl = editor.getParam("social_share_url", "");

        //
        editor.ui.registry.addMenuButton("social", {
            text: "Compartilhamento",
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
                        text: "Inserir",
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
            text: "Editar",
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