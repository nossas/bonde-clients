(function () {
    tinymce.PluginManager.add("templates", (editor, url) => {
        const templates = editor.getParam("templates_list", []);

        // Adiciona o svg que será usado no icone
        editor.ui.registry.addIcon("insert-template", '<svg fill="#000000" height="24" width="24" version="1.1" viewBox="0 0 24 24" xml:space="preserve"><g id="template"><g><path d="M8,22H0V2h24v20H8z M2,20h4V7.9H2V20z M8,20h14V8H8V20z M6,6h16V4H2v2H6z"/></g></g></svg>');

        // Criar um botão no toolbar
        editor.ui.registry.addMenuButton('templates', {
            tooltip: "Selecione um template",
            icon: "insert-template",
            fetch: (callback) => {
                callback(templates.map((tpl) => ({
                    type: "menuitem",
                    text: tpl.title,
                    onAction: () => {
                        editor.insertContent(tpl.content);
                    }
                })))
            }
        });

        return {
            getMetadata: () => ({
                name: "Templates"
            })
        };
    });
})();