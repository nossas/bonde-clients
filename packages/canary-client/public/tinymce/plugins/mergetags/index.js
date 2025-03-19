(function () {
    tinymce.PluginManager.add("mergetags", function (editor, url) {
        const tags = editor.getParam("mergetags_list", []);

        // Converter `{{variavel}}` para <span class="mergetags">
        editor.on("SetContent", function (e) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(e.content || editor.getContent({ format: "html" }), "text/html");
            // Manipula apenas quando o conteúdo é inserido de maneira clean, sem as tags de estilização
            if (doc.querySelectorAll("span.mergetags").length === 0) {
                let content = editor.getContent({ format: "html" });
                content = content.replace(/\{\{\s*(.*?)\s*\}\}/g, '<span class="mergetags" contenteditable="false"><span class="mergetags-affix">{{</span>$1<span class="mergetags-affix">}}</span></span>')
                editor.setContent(content);
            }
        });

        // Antes de salvar, remover os <span> e deixar só {{ variavel }}
        editor.on("GetContent", function (e) {
            if (e.format === "clean") {
                const parser = new DOMParser();
                const doc = parser.parseFromString(e.content, "text/html");

                // Seleciona todas as tags mergetags
                const elements = doc.querySelectorAll("span.mergetags");
                elements.forEach((span) => {
                    // Substitui o span pelo seu conteúdo
                    span.outerHTML = span.innerHTML;
                });
                // Seleciona todas as tags mergetags-affix
                const elementsAffix = doc.querySelectorAll("span.mergetags-affix");
                elementsAffix.forEach((span) => {
                    // Substitui o span pelo seu conteúdo
                    span.outerHTML = span.innerHTML;
                });

                e.content = doc.body.innerHTML;
            }
        });

        // Adiciona seleção ao elemento inteiro quando clicado
        editor.on("click", function (e) {
            editor.dom.removeClass(editor.dom.select(".selected"), "selected");
            
            const node = e.target;
            if (node.classList.contains("mergetags")) {
                editor.selection.select(node);
                editor.dom.addClass(node, "selected");
            }
        });

        // Adiciona funcionalidade para autocomplete
        editor.ui.registry.addAutocompleter("variables", {
            trigger: "{{",
            minChars: 0,
            columns: 1,
            fetch: function (pattern) {
                return new Promise(function (resolve) {
                    resolve(
                        tags.filter((item) => item.text.toLowerCase().startsWith(pattern))
                    )
                })
            },
            onAction: function (api, rng, value) {
                editor.selection.setRng(rng);
                insertTag(editor, value);
                api.hide();
            }
        });

        // Adiciona funcionalidade para botão no menu
        editor.ui.registry.addMenuButton("mergetags", {
            text: "Variável",
            tooltip: "Selecionar uma váriavel",
            fetch: function (callback) {
                callback(
                    tags.map(tag => ({
                        type: "menuitem",
                        onAction: function () {
                            insertTag(editor, tag.value);
                        },
                        ...tag
                    }))
                );
            },
            onItemAction: function (api, value) {
                insertTag(editor, value);
            }
        });

        const insertTag = (editor, value) => {
            editor.insertContent(`<span class="mergetags" contenteditable="false"><span class="mergetags-affix">{{</span>${value}<span class="mergetags-affix">}}</span></span>`);
            editor.selection.collapse(false);
        }

        return {
            getMetadata: function () {
                return {
                    name: "Váriaveis"
                };
            }
        };
    });
})();