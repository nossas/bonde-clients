import React from "react";
import { useField } from "bonde-components/form";


const HTMLPreview = ({ name }) => {
    const { input } = useField(name)

    return (
        <div dangerouslySetInnerHTML={{ __html: input.value }} />
    )
}

export default HTMLPreview