import React from "react";
import { useHistory } from 'react-router-dom';
import {
  Empty,
  Link,
  // Chakra UI
  Box,
  Text,
  List,
  ListItem,
  Stack,
  Image
} from "bonde-components";
import { CommunityMenu, useSession } from "bonde-core-tools";

type Props = {
  communities: any[];
};

const CommunitiesScrollBox = ({ communities }: Props): React.ReactElement => {
  const { push } = useHistory();
  const { onChangeAsync } = useSession();
  const isMobile = window.innerWidth <= 768;
  const itemProps: any = {};
  if (isMobile) {
    itemProps.className = "mobile";
  }

  return (
    <Box
      bg="white"
      overflowY="auto"
      h="535px"
      css={{
        "::-webkit-scrollbar": {
          width: "33px"
        },
        "::-webkit-scrollbar-thumb": {
          backgroundClip: "padding-box",
          backgroundColor: "rgba(74, 74, 74, 0.75)",
          borderWidth: "20px 15px",
          borderStyle: "solid",
          borderColor: "transparent",
          borderImage: "initial"
        }
      }}
    >
      {communities.length > 0 ? (
        <List>
          {communities.map((c, index) => (
            <ListItem key={`communities-list-${index}`} display="flex" flexDirection="row" p={4}>
              <Image
                boxSize="40px"
                objectFit="cover"
                borderRadius="30px"
                alt={c.name}
                src={
                  c.image ||
                  `https://via.placeholder.com/100?text=${c.name.substring(
                    0,
                    1
                  )}`
                }
              />
              <Stack
                direction="row"
                flex={1}
                ml={4}
                justifyContent="space-between"
                alignItems="center"
              >
                <Link
                  onClick={() => {
                    onChangeAsync({ community: c })
                      .then(() => {
                        push('/widgets');
                      });
                  }}
                >
                  <Text as="h4" fontWeight="800" fontSize="md">{c.name}</Text>
                </Link>
                <CommunityMenu community={c} size="sm" />
              </Stack>
            </ListItem>
          ))}
        </List>
      ) : (
        <Empty message="Nenhuma comunidade encontrada" />
      )}
    </Box>
  );
};

CommunitiesScrollBox.defaultProps = {
  communities: [],
};

export default CommunitiesScrollBox;
