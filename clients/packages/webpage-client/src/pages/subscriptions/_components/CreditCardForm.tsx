import { useEffect } from 'react';
import { Form, Field } from 'react-final-form'
import InputMask from 'react-input-mask';
import getConfig from 'next/config';
import {
  Button,
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Text
} from 'bonde-ui/src/base';

interface CreditCardFormProps {
  id: number;
  token: string;
  card?: any;
}

const { publicRuntimeConfig } = getConfig();

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

interface RechargeArgs {
  id: number;
  token: string;
  card_hash: string
}

const recharge = async ({ id, token, card_hash }: RechargeArgs): Promise<any> => {
  const apiDomain = publicRuntimeConfig.domainApiRest || 'http://api-rest.bonde.devel';
  const uri = new URL(`/subscriptions/${id}/recharge`, apiDomain);

  const resp = await fetch(uri.href, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ id, token, card_hash })
  });

  return await resp.json();
}

const CreditCardForm: React.FC<CreditCardFormProps> = ({
  id,
  token,
  card
}) => {
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
  const handleSubmit = (values: any) => {
    //
    // The `PagarMe` object is injected into the global scope by the <Pagarme /> component
    // located in `client/components/external-services/pagarme.js`. By default, the
    // `<CreditCardForm />` component renders that component, so, we can use it here.
    //
    // It needs to use some other approach instead of inject the .min file of the library
    // directly into the DOM. I tried to use the official CJS module package provided by the
    // Pagarme team https://github.com/pagarme/pagarme-js but, it's bundle size is too big.
    // It have an issue that may will enhance the bundle size a litte, see:
    // https://github.com/pagarme/pagarme-js/issues/35
    //
    const promise = new Promise((resolve, reject) => {
      // eslint-disable-next-line
      (window as any).PagarMe.encryption_key = publicRuntimeConfig.pagarmeKey;

      // eslint-disable-next-line
      const card = new (window as any).PagarMe.creditCard();

      // Mount card with Pagarme lib to check validation
      const expiration = values.expiration.match(/(\d{2})\/(\d{2})/);
      card.cardHolderName = values.name;
      card.cardExpirationMonth = expiration[1];
      card.cardExpirationYear = expiration[2];
      card.cardNumber = values.creditcard;
      card.cardCVV = values.cvv;

      const errors = card.fieldErrors();

      /* eslint-disable prefer-promise-reject-errors */
      Object.keys(errors).length > 0
        ? reject({
            cvv: errors.card_cvv,
            expiration: errors.card_expiration_month,
            name: errors.card_holder_name,
            creditcard: errors.card_number,
          })
        : card.generateHash((cardHash: string) => {
            resolve(
              recharge({
                id: id,
                token: token,
                card_hash: cardHash,
              })
            );
          });
      /* eslint-disable prefer-promise-reject-errors */
    });

    return Promise.resolve(promise).then((action) => action);
  }

  return (
    <Stack>
      <Box bg="gray.50" p={2} boxShadow="xs">
        <Text>
        {`Altere os dados do seu cartão de crédito preenchendo os campos abaixo.
          Sua doação continuará a mesma mas, a partir do momento em que salvar os
          dados abaixo, o valor será cobrado neste novo cartão. `}
          <span role="img" aria-label="winky">😉</span>
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
                    {meta.error && meta.touched && <FormHelperText color="red.200">{meta.error}</FormHelperText>}
                  </FormControl>
                )}
              </Field>
              <Field name="name" validate={required}>
                {({ input, meta }) => (
                  <FormControl>
                    <FormLabel>Nome *</FormLabel>
                    <Input {...input} type='text' placeholder='(igual ao que aparece no cartão)' />
                    {meta.error && meta.touched && <FormHelperText color="red.200">{meta.error}</FormHelperText>}
                  </FormControl>
                )}
              </Field>
              <Field name="expiration" validate={composeValidators(required, expirationDate)}>
                {({ input, meta }) => (
                  <FormControl>
                    <FormLabel>Validade *</FormLabel>
                    <InputMask mask="99/99" {...input}>
                      {(inputProps) => <Input {...inputProps} type='text' placeholder='00/00' />}
                    </InputMask>
                    {meta.error && meta.touched && <FormHelperText color="red.200">{meta.error}</FormHelperText>}
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
                    {meta.error && meta.touched && <FormHelperText color="red.200">{meta.error}</FormHelperText>}
                  </FormControl>
                )}
              </Field>
              <Button type="submit">Salvar</Button>
            </Stack>
          </form>
        )}
      </Form>
    </Stack>
  );
}

export default CreditCardForm;