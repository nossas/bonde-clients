import { extendTheme } from '@chakra-ui/react';
export * from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

var colors = {
  transparent: 'transparent',
  black: '#000000',
  white: '#FFFFFF',
  red: {
    50: '#FBCDCD',
    100: '#FF8C8C',
    200: '#FF2B4E',
    300: '#D92E4A',
    400: '#B42940'
  },
  gray: {
    50: '#EEEEEE',
    100: '#D1CDD2',
    200: '#AAAAAA',
    300: '#9B9B9B',
    400: '#424242'
  },
  green: {
    50: '#BBF1E5',
    100: '#9AE3D3',
    200: '#50E3C2',
    300: '#5ACAB1',
    400: '#4A9A88'
  },
  pink: {
    50: '#F9C2E5',
    100: '#F996C5',
    200: '#EE0099',
    300: '#E2058A',
    400: '#B4006C'
  },
  blue: {
    50: '#BFDDF6',
    100: '#8DC4F4',
    200: '#1E88E5',
    300: '#0D76D1',
    400: '#005EB0'
  },
  yellow: {
    50: '#FFE5BF',
    100: '#FFD18C',
    200: '#FFCF23',
    300: '#FFCF23',
    400: '#DDAD03'
  }
};

var fonts = {
  heading: 'Nunito Sans',
  body: 'Nunito Sans'
};



var foundations = {
  __proto__: null,
  colors: colors,
  fonts: fonts
};

// solid
const disabled = {
  solid: {
    bg: 'gray.100',
    color: 'white'
  },
  outline: {
    color: 'gray.100',
    borderColor: 'gray.100',
    bg: 'transparent'
  },
  link: {
    color: 'gray.100'
  }
};
const sizes = {
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
};
const variantOutline = props => {
  const {
    colorScheme: c
  } = props;
  const defaultStyleProps = {
    bg: 'transparent',
    borderRadius: '50px',
    _focus: {
      boxShadow: 'none'
    },
    _disabled: {
      color: 'gray.100',
      borderColor: 'gray.100',
      bg: 'transparent'
    }
  };
  // Gray works with dark / light mode.
  if (c === 'gray') {
    return {
      ...defaultStyleProps,
      color: mode('black', 'white')(props),
      borderColor: mode('black', 'white')(props),
      _hover: {
        color: mode('gray.400', 'gray.300')(props),
        borderColor: mode('gray.400', 'gray.300')(props),
        bg: 'transparent',
        _disabled: defaultStyleProps._disabled
      },
      _active: {
        color: mode('gray.300', 'gray.400')(props),
        borderColor: mode('gray.300', 'gray.400')(props),
        bg: 'transparent',
        _disabled: defaultStyleProps._disabled
      }
    };
  }
  // Theme for all colors.
  return {
    ...defaultStyleProps,
    color: c + ".400",
    borderColor: c + ".400",
    _hover: {
      color: c + ".300",
      borderColor: c + ".300",
      bg: 'transparent',
      _disabled: defaultStyleProps._disabled
    },
    _active: {
      color: c + ".200",
      borderColor: c + ".200",
      bg: 'transparent',
      _disabled: defaultStyleProps._disabled
    }
  };
};
const variantGhost = props => {
  const {
    colorScheme: c
  } = props;
  const defaultStyleProps = {
    bg: 'transparent',
    borderColor: 'transparent',
    _focus: {
      boxShadow: 'none'
    },
    _disabled: {
      color: 'gray.100'
    }
  };
  if (c === 'gray') {
    return {
      ...defaultStyleProps,
      color: mode('black', 'white')(props),
      borderColor: mode('black', 'white')(props),
      _hover: {
        color: mode('gray.400', 'gray.300')(props),
        borderColor: mode('gray.400', 'gray.300')(props),
        bg: 'transparent',
        _disabled: defaultStyleProps._disabled
      },
      _active: {
        color: mode('gray.300', 'gray.400')(props),
        borderColor: mode('gray.300', 'gray.400')(props),
        bg: 'transparent',
        _disabled: defaultStyleProps._disabled
      }
    };
  }
  if (c === 'pink') {
    return {
      ...defaultStyleProps,
      color: 'pink.200',
      _hover: {
        bg: 'transparent',
        color: 'pink.300'
      },
      _active: {
        bg: 'transparent'
      }
    };
  }
  return {
    ...defaultStyleProps,
    color: c + ".400",
    _hover: {
      color: c + ".300",
      borderColor: 'transparent',
      bg: 'transparent',
      textDecoration: 'none',
      _disabled: defaultStyleProps._disabled
    },
    _active: {
      color: c + ".200",
      borderColor: 'transparent',
      bg: 'transparent',
      textDecoration: 'none',
      _disabled: defaultStyleProps._disabled
    }
  };
};
const variantLink = props => {
  return {
    padding: 0,
    height: "auto",
    lineHeight: "normal",
    verticalAlign: "baseline",
    color: mode("black", "white")(props),
    _hover: {
      textDecoration: "underline",
      _disabled: {
        textDecoration: "none"
      }
    },
    _active: {
      color: mode("pink.200", "pink.200")(props)
    }
  };
};
const variantSolid = _ref => {
  let {
    colorScheme: c
  } = _ref;
  const _disabled = {
    bg: 'gray.100',
    color: 'white'
  };
  return {
    bg: c + ".200",
    borderRadius: '50px',
    color: 'white',
    _hover: {
      bg: c + ".300",
      _disabled
    },
    _active: {
      bg: c + ".400",
      _disabled
    },
    _focus: {
      boxShadow: 'none',
      _disabled
    },
    _disabled
  };
};
var Button = {
  baseStyle: {
    fontWeight: '800',
    textTransform: 'uppercase',
    borderRadius: 0,
    minW: 36
  },
  sizes,
  variants: {
    outline: variantOutline,
    ghost: variantGhost,
    solid: variantSolid,
    link: variantLink,
    tag: _ref2 => {
      let {
        colorScheme
      } = _ref2;
      return {
        bg: colorScheme + ".100",
        borderColor: 'trasparent',
        color: "black",
        borderRadius: '4px',
        textTransform: 'normal',
        // minW: 'auto',
        _hover: 'none',
        _active: 'none',
        _focus: 'none'
      };
    },
    dropdown: _ref3 => {
      let {
        color
      } = _ref3;
      return {
        bg: 'transparet',
        borderColor: 'trasparent',
        color,
        // minW: 'auto',
        _hover: {
          color
        },
        _active: {
          color
        },
        _focus: {
          boxShadow: 'none'
        }
      };
    },
    tableLink: _ref4 => {
      let {
        colorScheme
      } = _ref4;
      return {
        bg: 'transparent',
        borderColor: 'transparent',
        color: "black",
        // minW: 'auto',
        _hover: {
          color: colorScheme + ".400",
          borderColor: 'transparent',
          bg: 'transparent',
          textDecoration: 'none',
          _disabled: disabled.link
        },
        _active: {
          color: colorScheme + ".200",
          borderColor: 'transparent',
          bg: 'transparent',
          textDecoration: 'none',
          _disabled: disabled.link
        },
        _focus: {
          boxShadow: 'none'
        },
        _disabled: disabled.link
      };
    }
  },
  defaultProps: {
    variant: 'solid',
    colorScheme: 'pink',
    size: 'sm'
  }
};

var Container = {
  baseStyle: {
    w: '100%',
    mx: 'auto',
    maxW: '100%',
    py: '20px',
    px: [6, null, null, 12]
  }
};

var FormLabel = {
  baseStyle: {
    color: 'gray.200',
    fontSize: 'sm',
    textTransform: 'uppercase',
    margin: '0'
  }
};

const baseStyle = {
  fontFamily: 'heading',
  fontWeight: 'bold'
};
const sizes$1 = {
  xs: {
    fontSize: 'xs'
  },
  sm: {
    fontWeight: 'extrabold',
    fontSize: ['xs', null, 'sm']
  },
  md: {
    fontWeight: 'bold',
    fontSize: ['sm', null, 'md']
  },
  lg: {
    fontWeight: 'bold',
    fontSize: ['md', null, 'lg']
  },
  xl: {
    fontWeight: 'black',
    fontSize: ['lg', null, 'xl']
  },
  '2xl': {
    fontWeight: 'black',
    fontSize: ['xl', null, '2xl']
  },
  '3xl': {
    fontWeight: 'black',
    fontSize: ['2xl', null, '3xl']
  },
  '4xl': {
    fontWeight: 'black',
    fontSize: ['3xl', null, '4xl']
  },
  '5xl': {
    fontWeight: 'black',
    fontSize: ['4xl', null, '5xl']
  },
  '6xl': {
    fontWeight: 'black',
    fontSize: ['5xl', null, '6xl']
  }
};
const defaultProps = {
  size: '2xl'
};
var Heading = {
  baseStyle,
  sizes: sizes$1,
  defaultProps
};

var Input = {
  variants: {
    flushed: _ref => {
      let {
        colorScheme
      } = _ref;
      return {
        field: {
          fontSize: '16px',
          py: 1,
          color: 'black',
          borderBottomWidth: '1px',
          borderBottomColor: 'gray.200',
          _placeholder: {
            color: 'gray.400'
          },
          _hover: {
            borderColor: colorScheme + ".200"
          },
          _focus: {
            outline: 'none',
            borderColor: colorScheme + ".200",
            boxShadow: 'none'
          },
          _disabled: {
            borderColor: 'gray.200',
            bg: 'transparent',
            color: 'gray.50',
            _placeholder: {
              color: 'gray.50'
            }
          },
          _invalid: {
            borderColor: 'red.100'
          }
        }
      };
    },
    outline: _ref2 => {
      let {
        colorScheme
      } = _ref2;
      return {
        field: {
          bg: 'white',
          borderColor: 'gray.200',
          _hover: {
            borderColor: colorScheme + ".200"
          },
          _focus: {
            outline: 'none',
            borderColor: colorScheme + ".200",
            boxShadow: 'none'
          },
          _disabled: {
            borderColor: 'gray.200',
            color: 'gray.50',
            _placeholder: {
              color: 'gray.50'
            }
          },
          _invalid: {
            borderColor: 'red.100'
          }
        }
      };
    }
  },
  defaultProps: {
    size: 'sm',
    variant: 'flushed',
    colorScheme: 'pink'
  }
};

const highlighted = {
  color: 'pink.200',
  fontWeight: 'bold',
  _hover: {
    color: 'pink.300'
  },
  _focus: {
    color: 'pink.400',
    boxShadow: 'none'
  }
};
var Link = {
  variants: {
    highlighted
  }
};

const baseButton = {
  textTransform: 'uppercase'
};
const baseList = {
  borderRadius: 'none',
  border: 'none',
  boxShadow: 'sm'
};
const baseItem = {
  _focus: {
    bg: 'transparent'
  },
  _active: {
    bg: 'transparent'
  },
  _expanded: {
    bg: 'transparent'
  }
};
const baseGroupTitle = {
  fontWeight: 'normal',
  fontSize: 'inherit'
};
const baseStyle$1 = _ref => {
  let {
    colorScheme
  } = _ref;
  return {
    button: baseButton,
    list: baseList,
    item: {
      ...baseItem,
      _hover: {
        bg: colorScheme + ".100"
      }
    },
    groupTitle: baseGroupTitle
  };
};
const link = {
  item: {
    ...baseItem,
    _hover: {
      bg: 'transparent',
      color: 'pink.200'
    }
  }
};
var Menu = {
  baseStyle: baseStyle$1,
  variants: {
    link
  },
  defaultProps: {
    colorScheme: 'gray'
  }
};

var Modal = {
  baseStyle: {
    dialog: {
      borderRadius: 'none'
    },
    header: {
      fontSize: '3xl',
      fontWeight: 'black'
    }
  },
  defaultProps: {
    isCentered: true
  }
};

const baseStyle$2 = _ref => {
  let {
    colorScheme
  } = _ref;
  return {
    control: {
      border: '1px solid',
      borderColor: 'gray.400',
      _checked: {
        bg: "none",
        borderColor: colorScheme + ".200",
        _before: {
          w: '100%',
          h: '100%',
          bg: colorScheme + ".200",
          borderColor: 'white',
          border: "1px solid",
          color: "white"
        }
      },
      _hover: {
        borderColor: colorScheme + ".200"
      },
      _focus: {
        boxShadow: 'none'
      },
      _disabled: {
        borderColor: 'gray.100',
        bg: 'gray.100',
        _hover: {
          borderColor: 'gray.100',
          bg: 'gray.100'
        }
      }
    }
  };
};
var Radio = {
  baseStyle: baseStyle$2,
  defaultProps: {
    colorScheme: 'pink'
  }
};

var Select = {
  variants: {
    ...Input.variants
  },
  defaultProps: {
    ...Input.defaultProps
  }
};

const variantColor = props => {
  const {
    colorScheme: c
  } = props;
  return {
    th: {
      color: 'gray.400',
      fontWeight: 'normal',
      borderColor: mode(c + ".50", c + ".700")(props)
    },
    td: {
      borderColor: mode(c + ".50", c + ".700")(props)
    }
  };
};
var Table = {
  variants: {
    simple: variantColor,
    striped: variantColor
  }
};

var Tag = {
  defaultProps: {
    size: 'lg'
  }
};

var Text = {
  baseStyle: {
    textTransform: 'none',
    color: 'gray.400'
  }
};



var components = {
  __proto__: null,
  Button: Button,
  Container: Container,
  FormLabel: FormLabel,
  Heading: Heading,
  Input: Input,
  Link: Link,
  Menu: Menu,
  Modal: Modal,
  Radio: Radio,
  Select: Select,
  Table: Table,
  Tag: Tag,
  Text: Text
};

var index = /*#__PURE__*/extendTheme({
  ...foundations,
  components
});

export { index as theme };
//# sourceMappingURL=index4.js.map
