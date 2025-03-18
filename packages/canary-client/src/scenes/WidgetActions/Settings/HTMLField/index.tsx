import React, { useRef } from "react";
import { isMobile } from 'react-device-detect';
import { FormControl, FormLabel, Flex, Tooltip, Stack } from "bonde-components/chakra";
import { Hint } from "bonde-components";
import { InfoIcon } from "bonde-components/icons";
import { useField } from "bonde-components/form";

import { Editor } from "@tinymce/tinymce-react";

// Importa o CSS e os temas diretamente do TinyMCE instalado localmente
import 'tinymce/tinymce';
import 'tinymce/icons/default';
import 'tinymce/themes/silver';
import 'tinymce/models/dom';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/table';
import 'tinymce/plugins/visualblocks';

// Estilo do editor
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/skins/content/default/content.min.css';


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
  license_key: "gpl",
  plugins: [
    "advlist", "anchor", "autolink", "charmap", "code",
    "fullscreen", "image", "insertdatetime",
    "link", "lists", "media", "preview", "searchreplace",
    "table", "visualblocks", "wordcount", "sharing"
  ],
  toolbar:
      "mergetags | undo redo | bold italic underline | " +
      "alignleft aligncenter alignright alignjustify | " +
      "bullist numlist outdent indent | " +
      "link image media sharing | table | code fullscreen preview",
  menu: {
    insert: { title: "Inserir", items: "link image media table sharing" }
  },
  images_upload_handler: S3UploadHandler,
  sharing_is_mobile: isMobile,
  skin: false,  // Necessário para evitar erro de skin ao usar localmente
  content_css: [
    "/styles/plugins/sharing.css",
    "/styles/plugins/mergetags.css"
  ], // Evita erro de CSS ao rodar sem CDN
  external_plugins: {
    sharing: "/tinymce/plugins/sharing/index.js",
    mergetags: "/tinymce/plugins/mergetags/index.js"
  }
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
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        onInit={(_evt, editor) => editorRef.current = editor}
        onChange={(_evt) => input.onChange(editorRef.current.getContent())}
        init={{ ...tinyInitSettings, mergetags_list: mergetags }}
        initialValue={initialValue}
      />
    </FormControl>
  )
}

export default HTMLField;