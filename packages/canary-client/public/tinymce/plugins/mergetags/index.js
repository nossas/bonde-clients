(function () {
    tinymce.PluginManager.add("mergetags", function (editor, url) {
        // Usado para controlar a atualização do conteúdo
        let isUpdating = false;
        const tags = editor.getParam("mergetags_list", []);

        // Converter `{{variavel}}` para <span class="mergetags">
        editor.on("SetContent", function () {
            if (isUpdating) {
                return;
            }

            const content = editor.getContent();
            const updatedContent = content.replace(/\{\{\s*(.*?)\s*\}\}/g, '<span class="mergetags" contenteditable="false"><span class="mergetags-affix">{{</span>$1<span class="mergetags-affix">}}</span></span>');
            
            // Apenas atualiza se o conteúdo foi realmente alterado
            if (content !== updatedContent) {
                isUpdating = true;  // Marca que estamos atualizando
                editor.setContent(updatedContent);
                isUpdating = false; // Após a atualização, desmarca
            }
        });

        // Antes de salvar, remover os <span> e deixar só {{ variavel }}
        editor.on("GetContent", function (e) {
            e.content = e.content.replace(/<span class="mergetags" contenteditable="false"><span class="mergetags-affix">{{<\/span>(.*?)<span class="mergetags-affix">}}<\/span><\/span>/g, "{{$1}}");
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
            editor.insertContent(`<span class="mergetags" contenteditable="false"><span class="mergetags-affix">{{</span>${value}<span class="mergetags-affix">}}</span></span>&nbsp;`);
            // Movemos o cursor para o final do conteúdo inserido
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
