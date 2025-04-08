(function () {
    tinymce.PluginManager.add("conditional", function (editor, url) {

        editor.ui.registry.addButton("conditional", {
            text: "Condição",
            icon: "code-sample",
            onAction: function () {
                // Salva o ponto da seleção atual antes de abrir o modal
                const bookmark = editor.selection.getBookmark(2);
                const selectedText = editor.selection.getContent({ format: 'html' }).trim();

                if (!selectedText) {
                    editor.notificationManager.open({
                        text: 'Selecione um texto primeiro.',
                        type: 'warning',
                    });
                    return;
                }

                // Abre um modal para o usuário digitar a condição
                editor.windowManager.open({
                    title: "Adicionar condição",
                    body: {
                        type: 'panel',
                        items: [
                            {
                                type: "input",
                                name: 'condition',
                                label: 'Condição',
                                placeholder: 'ex: mostrar_se_logado'
                            }
                        ]
                    },
                    buttons: [
                        {
                            type: 'cancel',
                            text: 'Sair'
                        },
                        {
                            type: 'submit',
                            text: 'Salvar',
                            primary: true
                        }
                    ],
                    onSubmit: function (api) {
                        const data = api.getData();
                        const condition = data.condition.trim();

                        // Volta o foco e a seleção antes de substituir
                        editor.focus();
                        editor.selection.moveToBookmark(bookmark);
                        
                        // Aplica o conteúdo com segurança
                        const wrapped = `<span data-conditional="${condition}">${selectedText}</span>`;
                        editor.selection.setContent(wrapped, { format: 'html' });

                        api.close();
                    }
                })
            }
        })
    });

    return {
        getMetadata: function () {
            return {
                name: 'Condição'
            }
        }
    }
})();