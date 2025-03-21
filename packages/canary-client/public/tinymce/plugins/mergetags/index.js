(function () {
    tinymce.PluginManager.add("mergetags", function (editor, url) {
        const tags = editor.getParam("mergetags_list", []);

        // Adiciona o svg do icone
        editor.ui.registry.addIcon("insert-variable", '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M19.9061 21C21.2464 18.2888 22 15.2329 22 12C22 8.76711 21.2464 5.71116 19.9061 3M4.09393 3C2.75363 5.71116 2 8.76711 2 12C2 15.2329 2.75363 18.2888 4.09393 21M16.5486 8.625H16.459C15.8056 8.625 15.1848 8.91202 14.7596 9.41072L9.38471 15.7143C8.95948 16.213 8.33871 16.5 7.6853 16.5H7.59563M8.71483 8.625H10.1089C10.6086 8.625 11.0477 8.95797 11.185 9.44094L12.9594 15.6841C13.0967 16.167 13.5358 16.5 14.0355 16.5H15.4296" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>')

        // Converter `{{variavel}}` para <span class="mergetags">
        editor.on("SetContent", function (e) {
            const parser = new DOMParser();
            const content = e.content || editor.getContent({ format: "html" })
            const doc = parser.parseFromString(content, "text/html");
            // Manipula apenas quando o conteúdo é inserido de maneira clean, sem as tags de estilização
            // e direto pelo metódo editor.setContent()
            // Usar o e.set evita manipular o conteúdo quando outro plugin usar o insertContent
            if (!e.isSettingContent && e.set && doc.querySelectorAll("span.mergetags").length === 0 && /\{\{\s*\w+\s*\}\}/.test(content)) {
                let content = editor.getContent({ format: "html" });
                content = content.replace(/\{\{\s*(.*?)\s*\}\}/g, '<span class="mergetags" contenteditable="false"><span class="mergetags-affix">{{</span>$1<span class="mergetags-affix">}}</span></span>')
                // Usa isSettingsContent para garantir que esse método não sera invocado mais de uma vez
                editor.setContent(content, { isSettingContent: true });
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
            tooltip: "Selecionar uma váriavel",
            icon: "insert-variable",
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