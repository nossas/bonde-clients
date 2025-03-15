import React, { useRef } from "react";
import { FormControl, FormLabel, Flex, Tooltip, Stack } from "bonde-components/chakra";
import { Hint } from "bonde-components";
import { InfoIcon } from "bonde-components/icons";
import { useField } from "bonde-components/form";

import { Editor } from "@tinymce/tinymce-react";


const S3UploadHandler = async (blobInfo: any, progress: any) => {
  // Extrai o arquivo a partir do blobInfo
  const file = blobInfo.blob();
  const filename = file.name;
  const contentType = file.type;

  if (!filename) throw new Error("No filename found");

  // URL da API que fornece a URL assinada do S3
  const signingUrl = process.env.REACT_APP_UPLOADS_URL;
  const queryString = `?objectName=${filename}&contentType=${encodeURIComponent(contentType)}`;

  // Obtendo a URL assinada para upload no S3
  const response = await fetch(signingUrl + queryString, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
  if (!response.ok) throw new Error("Failed to get signed URL from S3");

  const s3creds = await response.json();

  // Fazendo upload da imagem para o S3
  const uploadResponse = await fetch(s3creds.signedUrl, {
    method: "PUT",
    body: file,
    headers: {
      "X-Amz-Acl": "public-read",
      "Content-Type": contentType
    }
  })

  if (!uploadResponse.ok) throw new Error("S3 upload failed");

  // Retorna a URL pública da imagem armazenada
  return s3creds.signedUrl.split("?")[0];
}

const tinyInitSettings = {
  plugins: [
    // Core editing features
    'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
    // Your account includes a free trial of TinyMCE premium features
    // Try the most popular premium features until Mar 28, 2025:
    'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown','importword', 'exportword', 'exportpdf'
  ],
  toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
  tinycomments_mode: 'embedded',
  tinycomments_author: 'Author name',
  ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
  images_upload_handler: S3UploadHandler
}


const HTMLField = ({
  name,
  helpText,
  label,
  initialValue,
  mergetags = [],
  ...config
}: any) => {
  const editorRef = useRef(null);
  const { input, meta } = useField(name, config);

  return (
    <FormControl
      isInvalid={(meta.error || meta.submitError) && meta.touched}
      mb={4}
    >
      <Flex direction="row" justify="space-between">
        <Stack direction="row" spacing={2} align="center">
          <FormLabel>{label}</FormLabel>
          {helpText && (
            <Tooltip label={helpText}>
              <InfoIcon color="gray.300" boxSize={3} />
            </Tooltip>
          )}
        </Stack>
        {(meta.error || meta.submitError) && meta.touched && (
          <Hint color="error">{meta.error || meta.submitError}</Hint>
        )}
      </Flex>
      <Editor
        onInit={(_evt, editor) => editorRef.current = editor}
        onChange={(_evt) => input.onChange(editorRef.current.getContent())}
        apiKey="lyj3aw60et8nqrq11ldco7tu88juep7r9c6669mw2y0k391b"
        init={{ ...tinyInitSettings, mergetags_list: mergetags }}
        initialValue={initialValue}
      />
    </FormControl>
  )
}

export default HTMLField;