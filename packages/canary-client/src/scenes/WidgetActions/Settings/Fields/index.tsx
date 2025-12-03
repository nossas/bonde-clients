import React, { useState, useEffect } from 'react';
import {
  Button,
  Box,
  Flex,
  Heading,
  Grid,
  GridItem,
  Text,
  Select,
  Input,
  FormControl,
  FormLabel,
  Switch,
  IconButton,
  VStack,
  HStack,
  Divider
} from 'bonde-components/chakra';
import { useTranslation } from 'react-i18next';
import SettingsForm from '../SettingsForm';

// Componente interno que gerencia os campos
const FieldsFormContent = ({ fields, setFields, hasChanges, submitting, form, initialFields }: any) => {
  const { t } = useTranslation('widgetActions');

  const fieldTypes = [
    { value: 'text', label: 'Texto' },
    { value: 'email', label: 'E-mail' },
    { value: 'number', label: 'Telefone' },
    { value: 'dropdown', label: 'Lista Suspensa' },
    { value: 'textarea', label: 'Texto Longo' }
  ];

  const addField = () => {
    const newField = {
      uid: `field-${Date.now()}-${Math.floor(Math.random() * 100)}`,
      kind: 'text',
      label: '',
      placeholder: '',
      required: 'true'
    };
    setFields([...fields, newField]);
  };

  const removeField = (index: number) => {
    const newFields = fields.filter((_: any, i: number) => i !== index);
    setFields(newFields);
  };

  const updateField = (index: number, field: string, value: any) => {
    const newFields = fields.map((f: any, i: number) => 
      i === index ? { ...f, [field]: value } : f
    );
    setFields(newFields);
  };

  // Atualiza o campo do formulário sempre que fields mudar
  useEffect(() => {
    if (form && form.change) {
      form.change('settings.fields', JSON.stringify(fields));
    }
  }, [fields, form]);

  return (
    <Grid templateColumns="repeat(12, 1fr)" gap={16}>
      <GridItem colSpan={[12, 12, 8]}>
        <Box bg="white" p={6} boxShadow="sm">
          <Heading as="h3" size="xl" mb={4}>
            {t("settings.fields.title")}
          </Heading>
          
          <Text mb={6} color="gray.600">
            {t('settings.fields.description')}
          </Text>

          {/* Campos do formulário */}
          <VStack spacing={6} align="stretch" mb={6}>
            {fields.map((field: any, index: number) => (
              <Box key={field.uid} p={4} border="1px" borderColor="gray.200" borderRadius="md">
                <HStack justify="space-between" mb={4}>
                  <Heading as="h4" size="md">
                    Campo {index + 1}
                  </Heading>
                  <IconButton
                    aria-label="Remover campo"
                    size="sm"
                    colorScheme="red"
                    variant="ghost"
                    onClick={() => removeField(index)}
                  />
                </HStack>

                <Grid templateColumns="repeat(2, 1fr)" gap={4} mb={4}>
                  <FormControl>
                    <FormLabel>Tipo do Campo</FormLabel>
                    <Select
                      value={field.kind}
                      onChange={(e) => updateField(index, 'kind', e.target.value)}
                    >
                      {fieldTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Label</FormLabel>
                    <Input
                      value={field.label}
                      onChange={(e) => updateField(index, 'label', e.target.value)}
                      placeholder="Ex: Nome completo"
                    />
                  </FormControl>
                </Grid>

                <FormControl mb={4}>
                  <FormLabel>Texto de ajuda</FormLabel>
                  <Input
                    value={field.placeholder}
                    onChange={(e) => updateField(index, 'placeholder', e.target.value)}
                    placeholder="Ex: Digite seu nome"
                  />
                </FormControl>

                <FormControl display="flex" alignItems="center">
                  <FormLabel mb={0} mr={2}>
                    Campo obrigatório?
                  </FormLabel>
                  <Switch
                    isChecked={field.required === 'true'}
                    onChange={(e) => updateField(index, 'required', e.target.checked ? 'true' : 'false')}
                    colorScheme="green"
                  />
                </FormControl>
              </Box>
            ))}
          </VStack>

          {/* Botão para adicionar campo */}
          <Button
            onClick={addField}
            variant="outline"
            mb={6}
            width="100%"
          >
            Adicionar Campo
          </Button>

          <Divider mb={6} />

          {/* Campo hidden para o formulário */}
          <input
            type="hidden"
            name="settings.fields"
            value={JSON.stringify(fields)}
          />

          <Flex justify='end' mt={6}>
            <Button 
              disabled={submitting || !hasChanges} 
              type='submit'
              colorScheme={hasChanges ? 'green' : 'gray'}
            >
              {hasChanges ? 'Salvar Alterações' : t('settings.defaultForm.submit')}
            </Button>
          </Flex>
        </Box>
      </GridItem>
    </Grid>
  );
};

// Componente principal
const FieldsSettings = ({ widget, updateCache }: any) => {
  // Parse dos campos existentes ou array vazio
  const initialFields = widget.settings.fields 
    ? JSON.parse(widget.settings.fields)
    : [];

  const [fields, setFields] = useState(initialFields);

  // Verifica se há mudanças
  const hasChanges = JSON.stringify(fields) !== JSON.stringify(initialFields);

  return (
    <SettingsForm
      widget={widget}
      afterSubmit={async (values: any, result: any) => {
        updateCache(result.data.update_widgets.returning[0]);
      }}
      initialValues={{
        settings: {
          fields: JSON.stringify(fields),
        }
      }}
    >
      {({ submitting, form }: any) => (
        <FieldsFormContent 
          fields={fields}
          setFields={setFields}
          hasChanges={hasChanges}
          submitting={submitting}
          form={form}
          initialFields={initialFields}
        />
      )}
    </SettingsForm>
  );
};

export default FieldsSettings;