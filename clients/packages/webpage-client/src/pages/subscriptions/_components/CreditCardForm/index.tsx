import React, { useEffect } from 'react';
import InputMask from 'react-input-mask';
import {
  Button,
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Text,
  useToast
} from 'bonde-components/chakra';
import { Form, Field } from 'bonde-components/form';
import submit from './submit';

interface CreditCardFormProps {
  id: number;
  token: string;
  card?: any;
}



const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)

const required = (field: any) => {
  return field ? undefined : "não pode ficar em branco"
};

const expirationDate = (field: any) => {
  if (field) {
    const now = new Date();
    const expiration = new Date(field.split('/').join('/01/'));
    if (now > expiration) {
      return 'data de validade do cartão inválida'
    }
  }
  return undefined;
}

const CreditCardForm: React.FC<CreditCardFormProps> = ({
  id,
  token,
  card
}) => {
  const toast = useToast();

  useEffect(() => {
    const script = document.createElement('script');

    script.src = "https://assets.pagar.me/js/pagarme.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (values: any) => {
    try {
      await submit({ ...values, id, token });
      toast({
        title: "Dados do cartão atualizado",
        description: "Qualquer dúvida entre em contato com suporte@bonde.org",
        status: 'success',
        duration: 9000,
        position: 'top',
        isClosable: true
      })
    } catch (err) {
      console.log("err", err);
      return err;
    }
  }

  return (
    <Stack>
      <Box bg="gray.50" p={2} boxShadow="xs">
        <Text>
        {`Altere os dados do seu cartão de crédito preenchendo os campos abaixo.
          Sua doação continuará a mesma mas, a partir do momento em que salvar os
          dados abaixo, o valor será cobrado neste novo cartão.`}
        </Text>
      </Box>
      {card && (
        <Box bg="gray.50" p={2} boxShadow="xs">
          <Text fontWeight="bold">Dados do último cartão</Text>
          <Stack direction="row">
            <Text textTransform="uppercase">{card.brand}: </Text>
            <Text>XXXX XXXX XXXX {card.last_digits}</Text>
          </Stack>
          <Stack direction="row" spacing={4}>
            <Stack direction="row">
              <Text fontWeight="bold">Nome: </Text>
              <Text transform="uppercase">{card.holder_name}</Text>
            </Stack>
            <Stack direction="row">
              <Text fontWeight="bold">Validade: </Text>
              <Text>{card.expiration_date.slice(0, 2)}/{card.expiration_date.slice(2, 4)}</Text>
            </Stack>
          </Stack>
        </Box>
      )}
      <Form onSubmit={handleSubmit}>
        {(renderProps) => (
          <form onSubmit={renderProps.handleSubmit}>
            <Stack mt={4}>
              <Field
                name="creditcard"
                validate={required}
                parse={(value) => value.replaceAll(" ", "")}
              >
                {({ input, meta }) => (
                  <FormControl>
                    <FormLabel>Número*</FormLabel>
                    <InputMask mask="9999 9999 9999 9999" {...input}>
                      {(inputProps) => <Input {...inputProps} type='text' placeholder='0000 0000 0000 0000' />}
                    </InputMask>
                    {(meta.error || (meta.submitError && !meta.dirtySinceLastSubmit)) && meta.touched && <FormHelperText color="red.200">{meta.error || meta.submitError}</FormHelperText>}
                  </FormControl>
                )}
              </Field>
              <Field name="name" validate={required}>
                {({ input, meta }) => (
                  <FormControl>
                    <FormLabel>Nome *</FormLabel>
                    <Input {...input} type='text' placeholder='(igual ao que aparece no cartão)' />
                    {(meta.error || (meta.submitError && !meta.dirtySinceLastSubmit)) && meta.touched && <FormHelperText color="red.200">{meta.error || meta.submitError}</FormHelperText>}
                  </FormControl>
                )}
              </Field>
              <Field name="expiration" validate={composeValidators(required, expirationDate)}>
                {({ input, meta }) => (
                  <FormControl>
                    <FormLabel>Validade *</FormLabel>
                    <InputMask mask="99/99" {...input}>
                      {(inputProps) => <Input {...inputProps} type='text' placeholder='MM/AA' />}
                    </InputMask>
                    {(meta.error || (meta.submitError && !meta.dirtySinceLastSubmit)) && meta.touched && <FormHelperText color="red.200">{meta.error || meta.submitError}</FormHelperText>}
                  </FormControl>
                )}
              </Field>
              <Field name="cvv" validate={required}>
                {({ input, meta }) => (
                  <FormControl>
                    <FormLabel>CVV</FormLabel>
                    <InputMask mask="999" {...input}>
                      {(inputProps) => <Input {...inputProps} type='text' placeholder='Ex: 000' />}
                    </InputMask>
                    {(meta.error || (meta.submitError && !meta.dirtySinceLastSubmit)) && meta.touched && <FormHelperText color="red.200">{meta.error || meta.submitError}</FormHelperText>}
                  </FormControl>
                )}
              </Field>
              <Button disabled={renderProps.invalid && !renderProps.dirtySinceLastSubmit} type="submit">Salvar</Button>
            </Stack>
          </form>
        )}
      </Form>
    </Stack>
  );
}

export default CreditCardForm;