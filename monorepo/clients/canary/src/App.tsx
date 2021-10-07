import React, { useState } from 'react';
import {
  Button,
  Loading,
  ChakraProvider,
  Container,
  CSSReset,
  FontsLoader,
  customTheme
} from "@bonde/components";
import IconsList from "./IconsList";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ChakraProvider theme={customTheme}>
      <CSSReset />
      <FontsLoader />
      <Container>
        <Button onClick={() => setIsLoading(!isLoading)}>
          {isLoading ? `Hide Loading` : `Show Loading`}
        </Button>
        {isLoading && <Loading message="Carregando ação..." />}
        <IconsList />
      </Container>
    </ChakraProvider>
  );
}

export default App;
