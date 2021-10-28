import React from "react";
import { Stack, Box, Heading, Text, Button } from "bonde-components";
import { useHistory, useLocation } from "react-router-dom";

const StepByStepCard: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const pushPath = ((path: string) => {
    history.push(location.pathname + path)
  })

  return (
    <Stack
      direction="row"
      bg="white"
      height={60}
      spacing={[98, 98, 98, 158]}
      padding={38}
    >
      <Stack maxW={60} justifyContent="center" >
        <Heading size="4xl">
          Bora pressionar!
        </Heading>

        <Text fontSize="18px">
          Para começar, lembre-se de:
        </Text>
      </Stack>

      <Stack direction="row" spacing={45} >
        <Box maxW={60}>
          <Text fontSize="18px">
            1 - Definir os <b>alvos</b> da sua campanha (quem você quer pressionar) e o conteúdo do e-mail que será enviado para eles;
          </Text>

          <Button variant="ghost" justifyContent="left" onClick={() => pushPath("/targets")}>Definir alvos</Button>
        </Box>

        <Box maxW={60}>
          <Text fontSize="18px">
            2 - Ajustar o <b>formulário</b> para deixá-lo do jeitinho da sua campanha;
          </Text>

          <Button variant="ghost" justifyContent="left" onClick={() => pushPath("/adjusts")} >Ajustar formulário</Button>
        </Box>

        <Box maxW={60}>
          <Text fontSize="18px">
            3 - Escrever o <b>e-mail de agradecimento</b> que vai ser enviado para quem agir na sua campanha.
          </Text>

          <Button variant="ghost" justifyContent="left" onClick={() => pushPath("/autofire")}>Escrever e-mail</Button>
        </Box>
      </Stack>
    </Stack >
  )
}

export default StepByStepCard;
