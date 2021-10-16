import React, { useState } from "react";
import {
  Gadget,
  GadgetHeader,
  ImageBox,
  ScrollBox,
  SimpleGrid,
  ListBox,
  ListBoxRenderCommunity,
  SearchInput,
  Stack
} from "@bonde/components";

const communities = [
  {
    id: 1,
    name: "Minha beaga",
    image: undefined
  },
  {
    id: 2,
    name: "Maratón de Movilización",
    image: "https://s3.amazonaws.com/hub-central/uploads/1550771555_coluna1copia.png"
  },
  {
    id: 3,
    name: "Meu rio",
    image: undefined
  },
  {
    id: 4,
    name: "Meu rio",
    image: undefined
  },
  {
    id: 5,
    name: "ASJ",
    image: "https://s3.amazonaws.com/hub-central/uploads/1553266280_ASJ.png"
  },
  {
    id: 6,
    name: "Meu rio",
    image: undefined
  },
  {
    id: 7,
    name: "Meu rio",
    image: undefined
  },
  {
    id: 8,
    name: "Meu rio",
    image: undefined
  },
  {
    id: 9,
    name: "Meu rio",
    image: undefined
  },
  {
    id: 10,
    name: "Meu rio",
    image: undefined
  }
]

const mobilizations = [
  {
    id: 1,
    name: "teste",
    facebookShareImage: "https://s3.amazonaws.com/hub-central/uploads/1551394478_mobilizadores_sharefacebook.jpg",
    community: { name: "Rede Nossas Cidades" }
  },
  {
    id: 2,
    name: "Dados da pressão",
    facebookShareImage: undefined,
    community: { name: "Minha Beagá" }
  },
  {
    id: 3,
    name: "Página Teste",
    facebookShareImage: undefined,
    community: { name: "Minha Beagá" }
  },
  {
    id: 4,
    name: "Teste com Cypress",
    facebookShareImage: undefined,
    community: { name: "Minha Beagá" }
  }
]

const Home: React.FC = () => {
  const [data, setData] = useState(communities);

  return (
    <Stack direction={["column", null, null, "row"]} spacing={6}>
      <Gadget>
        <GadgetHeader
          title="Suas comunidades"
          actionRightElement={
            <SearchInput
              data={communities}
              field="name"
              placeholder="Buscar comunidade"
              onChange={setData}
            />
          }
        />
        <ScrollBox bg="white">
          <ListBox
            data={data}
            emptyText="Nenhuma comunidade encontrada"
            itemRender={ListBoxRenderCommunity}
          />
        </ScrollBox>
      </Gadget>
      <Gadget>
        <GadgetHeader title="Últimas atualizações" />
        <SimpleGrid columns={[1, null, 2]} spacing={4}>
          {mobilizations.map((mobilization) => (
            <ImageBox
              key={mobilization.id}
              imageSrc={mobilization.facebookShareImage}
              title={mobilization.name}
              author={`Por ${mobilization.community.name}`}
              onClick={() => {
                console.log("onClick", { mobilization });
              }}
            />
          ))}
        </SimpleGrid>
      </Gadget>
    </Stack>
  );
}

export default Home;