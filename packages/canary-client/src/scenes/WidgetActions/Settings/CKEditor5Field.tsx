import React from "react";
import { FormControl, FormLabel, Flex, Tooltip, Stack } from "bonde-components/chakra";
import { Hint } from "bonde-components";
import { InfoIcon } from "bonde-components/icons";
import { useField } from "bonde-components/form";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-custom-build";


const CKEditor5Field = ({
  name,
  helpText,
  label,
  ...config
}: any) => {
  const { input, meta } = useField(name, config);
  const editorConfig: any = {
    s3Upload: {
      signingUrl: process.env.REACT_APP_UPLOADS_URL
    }
  }

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
      <CKEditor
        data={input.value}
        editor={ClassicEditor}
        config={editorConfig}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log("event, editor, data", { event, editor, data });
          input.onChange(data);
        }}
      />
    </FormControl>
  )
}

export default CKEditor5Field;