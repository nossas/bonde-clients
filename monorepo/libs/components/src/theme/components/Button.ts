import type {
  StyleFunctionProps,
  SystemStyleObject,
  SystemStyleFunction,
} from "@chakra-ui/theme-tools";

const disabled = {
  solid: {
    bg: "gray.100",
    color: "white"
  },
  outline: {
    color: "gray.100",
    borderColor: "gray.100",
    bg: "transparent"
  },
  link: {
    color: "gray.100"
  }
}

const sizes: Record<string, SystemStyleObject> = {
  lg: {
    px: 8
  },
  md: {
    px: 6
  },
  sm: {
    px: 4
  },
  sx: {
    px: 3
  }
}

const variants: Record<string, SystemStyleObject | SystemStyleFunction> = {
  solid: ({ colorScheme }: StyleFunctionProps): any => ({
    bg: `${colorScheme}.200`,
    color: "white",
    _hover: {
      bg: `${colorScheme}.300`,
      _disabled: disabled.solid
    },
    _active: {
      bg: `${colorScheme}.400`,
      _disabled: disabled.solid
    },
    _focus: {
      boxShadow: "none",
      _disabled: disabled.solid
    },
    _disabled: disabled.solid
  }),
  outline: ({ colorScheme }: StyleFunctionProps): any => ({
    bg: "transparent",
    color: `${colorScheme}.400`,
    borderColor: `${colorScheme}.400`,
    _hover: {
      color: `${colorScheme}.300`,
      borderColor: `${colorScheme}.300`,
      bg: "transparent",
      _disabled: disabled.outline
    },
    _active: {
      color: `${colorScheme}.200`,
      borderColor: `${colorScheme}.200`,
      bg: "transparent",
      _disabled: disabled.outline
    },
    _focus: {
      boxShadow: "none"
    },
    _disabled: disabled.outline
  }),
  link: ({ colorScheme }: StyleFunctionProps): any => ({
    bg: "transparent",
    borderColor: "transparent",
    color: `${colorScheme}.400`,
    minW: "auto",
    _hover: {
      color: `${colorScheme}.300`,
      borderColor: "transparent",
      bg: "transparent",
      textDecoration: "none",
      _disabled: disabled.link
    },
    _active: {
      color: `${colorScheme}.200`,
      borderColor: "transparent",
      bg: "transparent",
      textDecoration: "none",
      _disabled: disabled.link
    },
    _focus: {
      boxShadow: "none"
    },
    _disabled: disabled.link
  }),
  tag: ({ colorScheme }: StyleFunctionProps): any => ({
    bg: `${colorScheme}.100`,
    borderColor: "trasparent",
    color: `black`,
    borderRadius: "4px",
    textTransfor: "normal",
    minW: "auto",
    _hover: "none",
    _active: "none",
    _focus: "none",
  }),
  dropdown: ({ color }: StyleFunctionProps): any => ({
    bg: "transparet",
    borderColor: "trasparent",
    color,
    minW: "auto",
    _hover: {
      color
    },
    _active: {
      color
    },
    _focus: {
      boxShadow: "none"
    },
  })
}

export default {
  baseStyle: {
    borderRadius: "50px",
    fontWeight: "800",
    textTransform: "uppercase"
  },
  variants,
  sizes,
  defaultProps: {
    variant: "solid",
    colorScheme: "pink",
    size: "sm"
  }
}
