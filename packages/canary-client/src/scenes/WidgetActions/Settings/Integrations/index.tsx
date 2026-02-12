import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Context as SessionContext } from "bonde-core-tools";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Button,
  Box,
  Flex,
  Radio,
  Heading,
  Grid,
  GridItem,
  Text
} from 'bonde-components/chakra';
import CustomFieldForm from "./CustomFieldForm";


const TurnioWorkflow: React.FC = ({ widget, updateCache }: any) => {

  const { t } = useTranslation('widgetActions');
  const sessionContext = useContext(SessionContext);
  const hasApiKey = sessionContext?.community?.integrations?.turnio?.api_key;
  const hasCustomField = widget.settings?.turnio?.custom_field && widget.settings?.turnio?.created_at;
  const defaultIndex = !hasApiKey ? 0 : !hasCustomField ? 1 : 2;
  
  console.log({ hasApiKey, hasCustomField, defaultIndex });

  return (
    <Grid templateColumns="repeat(12, 1fr)" gap={16}>
      <GridItem colSpan={[12, 12, 6]}>
        <Box bg="white" p={6} boxShadow="sm">
          <Heading as="h3" size="xl" mb={4}>
            {t("settings.integrations.title")}
          </Heading>
          {/* Panel 1 */}
          <Accordion defaultIndex={[defaultIndex]} allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton
                  bg={!hasApiKey ? "yellow.50" : "green.50"}
                  borderColor={!hasApiKey ? "yellow.200" : "green.200"}
                >
                  <Box>
                    Conecte a sua conta Turn.io
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <Text>
                  Para usar o Turn.io nesta mobilização, você precisa configurar a
                  chave da API nas configurações da sua comunidade.
                </Text>
                <Button
                  as={Link}
                  to={`/community/integrations/turnio?redirect=${window.location.pathname}`}
                  mt={4}
                >
                  Configurar turn.io
                </Button>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton
                  bg={!hasCustomField ? "yellow.50" : "green.50"}
                  borderColor={!hasCustomField ? "yellow.200" : "green.200"}
                >
                  <Box>
                    Configure o campo
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <Text mb={2}>
                  <>
                    <p><b>O que é isso?</b></p>
                    <p>É o nome usado para identificar essa mobilização dentro do Turn.io.</p>
                    <p>Escolha algo curto e fácil de reconhecer, <b> como busao_0800.</b></p>
                    <p>Use letras minúsculas, números e o caractere _ (sublinhado).</p>
                  </>
                </Text>
                <CustomFieldForm widget={widget} updateCache={updateCache} />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton
                  bg={!hasCustomField ? "yellow.50" : "green.50"}
                  borderColor={!hasCustomField ? "yellow.200" : "green.200"}
                >
                  <Box>
                    Prepare a sua jornada
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <Text mb={2}>
                  <p>Agora o nosso BONDE será integrado a sua conta no Turn.io e você pode usar os campos customizados para disparar as suas jornadas.</p>
                  
                  <strong>Campos Customizados</strong>
                  <ul>
                    <li>{widget.settings?.turnio?.custom_field} / data e hora</li>
                    <li>{widget.settings?.turnio?.custom_field}_optin / booleano</li>
                  </ul>

                  <p>Documentação sobre Jornadas no Turn.io</p>
                </Text>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      </GridItem>
    </Grid>
  )
}


export default TurnioWorkflow;