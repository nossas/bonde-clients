import React from 'react';
import { Box, Text, Image } from 'bonde-components';
import FallbackImage from "./FallbackImage";

export type MobilizationProps = {
  id: number
  name: string
  goal?: string
  facebookShareImage?: string
  customDomain?: string
  slug: string
  community: any
}

export type MobilizationBoxProps = {
  mobilization: MobilizationProps
  onClick?: any
}

export const MobilizationBox: React.FC<MobilizationBoxProps> = ({
  mobilization: {
    facebookShareImage: imageUrl,
    name,
    community
  },
  onClick
}) => (
  <Box
    w="auto"
    boxShadow="sm"
    overflow="hidden"
    bg="white"
    cursor={!!onClick ? "pointer" : "normal"}
    onClick={onClick}
  >
    <Image
      src={imageUrl}
      alt={name}
      objectFit="cover"
      fallback={<FallbackImage />}
      w="100%"
      h="188px"
    />
    <Box p={4}>
      <Text as="h4" fontWeight="800" fontSize="md">{name}</Text>
      <Text>Por {community.name}</Text>
    </Box>
  </Box>
);

export default MobilizationBox;