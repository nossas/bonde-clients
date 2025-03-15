import React from "react";
import { useField } from "bonde-components/form";


const HTMLPreview = ({ name }) => {
    const { input } = useField(name)
    const data = {
        "First.Name": "Igor"
    }

    return (
        <div dangerouslySetInnerHTML={{ __html: input.value.replace(/{{(.*?)}}/g, (_, chave) => data[chave] || chave) }} />
    )
}

export default HTMLPreview