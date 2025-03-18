(function () {
    tinymce.PluginManager.add("sharing", function (editor, url) {
        const isMobile = editor.getParam("sharing_is_mobile", false);

        function openSharingDialog(editor) {
            const baseUrl = isMobile ? 'whatsapp://' : 'https://web.whatsapp.com/';

            editor.windowManager.open({
                title: "Inserir plugin de compartilhamento",
                body: {
                    type: "panel",
                    items: [
                        {
                            type: "textarea",
                            name: "whatsappText",
                            label: "Texto para o whatsapp"
                        }
                    ]
                },
                buttons: [
                    {
                        type: "cancel",
                        text: "Fechar"
                    },
                    {
                        type: "submit",
                        text: "Inserir",
                        buttonType: "primary"
                    }
                ],
                onSubmit: function (api) {
                    const data = api.getData();
                    editor.insertContent(`
                        <a
                            class="whatsapp"
                            href="${baseUrl}send?text=${encodeURIComponent(data.whatsappText)}"
                            style={{ backgroundColor: '#4CEC68', color: '#fff' }}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Compartilhar no Whatsapp
                        </a>
                    `);
                    api.close();
                }
            });
        }

        editor.ui.registry.addButton("sharing", {
            icon: "fb",
            onAction: function () {
                openSharingDialog(editor);
            }
        });

        editor.ui.registry.addMenuItem("sharing", {
            text: "Botão de Compartilhamento",
            icon: "fb",
            onAction: function () {
                openSharingDialog(editor);
            }
        });

        return {
            getMetadata: function () {
                return {
                    name: "Botão de Compartilhamento"
                };
            }
        };
    });
})();