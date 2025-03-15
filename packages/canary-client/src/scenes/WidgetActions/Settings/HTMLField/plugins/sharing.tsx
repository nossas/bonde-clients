const sharingPlugin = (editor) => {
    editor.ui.registry.addButton('sharingbutton', {
        text: 'Open Sharing',
        onAction: () => {
            editor.windowManager.open({
                title: 'Insert Sharing Plugin',
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
                        buttonType: "primary",
                    }
                ],
                onSubmit: (api) => {
                    const data = api.getData();
                    console.log("onAction", { data });

                    editor.insertContent(`
                    <a
                        class="whatsapp"
                        href="https://web.whatsapp.com/send?text=${encodeURIComponent(data.whatsappText)}"
                        style={{ backgroundColor: '#4CEC68', color: '#fff' }}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Compartilhar no Whatsapp
                    </a>
                    `)
                    api.close();
                }
            })
        }
    })
}

export default sharingPlugin