'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var GoogleFontLoader = _interopDefault(require('react-google-font-loader'));
var styled = require('styled-components');
var styled__default = _interopDefault(styled);
var reactTable = require('react-table');
var react = require('@chakra-ui/react');
var ReactSelect = require('react-select');
var ReactSelect__default = _interopDefault(ReactSelect);
var reactFinalForm = require('react-final-form');
var ReactS3Uploader = _interopDefault(require('react-s3-uploader'));
var reactColor = require('react-color');
var colorMode = require('@chakra-ui/color-mode');
var reactToastify = require('react-toastify');
var styled$1 = _interopDefault(require('@emotion/styled'));

const FontsLoader = () => React__default.createElement(GoogleFontLoader, {
  fonts: [{
    font: 'Nunito Sans',
    weights: [400, 700, 800]
  }],
  subsets: ['cyrillic-ext', 'greek']
});

function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }
  strings.raw = raw;
  return strings;
}

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;
const Spark = /*#__PURE__*/styled__default.path(_templateObject || (_templateObject = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  fill: ", ";\n  animation-name: ", ";\n  animation-duration: ", ";\n  animation-iteration-count: infinite;\n"])), props => props.colorInit, props => props.pulse, props => props.duration);
const Sparkles = _ref => {
  let {
    color,
    colorInit,
    duration
  } = _ref;
  return React__default.createElement(React__default.Fragment, null, React__default.createElement(Spark, {
    colorInit: colorInit,
    duration: duration,
    pulse: styled.keyframes(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["\n          0%  { fill: ", " }\n          81% { fill: ", " }\n          82% { fill: ", " }\n        "])), color, color, colorInit),
    d: "M23,84H12.5c-1.7,0-3-1.4-3-3l0,0c0-1.7,1.4-3,3-3H23c1.7,0,3,1.4,3,3l0,0C26,82.7,24.6,84,23,84z"
  }), React__default.createElement(Spark, {
    colorInit: colorInit,
    duration: duration,
    pulse: styled.keyframes(_templateObject3 || (_templateObject3 = _taggedTemplateLiteralLoose(["\n          15% { fill: ", " }\n          16% { fill: ", " }\n          81% { fill: ", " }\n          82% { fill: ", " }\n        "])), colorInit, color, color, colorInit),
    d: "M36,35.1l7.4,7.4c1.2,1.2,3.1,1.2,4.3,0l0,0c1.2-1.2,1.2-3.1,0-4.3l-7.4-7.4c-1.2-1.2-3.1-1.2-4.3,0l0,0 C34.8,32,34.8,34,36,35.1z"
  }), React__default.createElement(Spark, {
    colorInit: colorInit,
    duration: duration,
    pulse: styled.keyframes(_templateObject4 || (_templateObject4 = _taggedTemplateLiteralLoose(["\n          31% { fill: ", " }\n          32% { fill: ", " }\n          81% { fill: ", " }\n          82% { fill: ", " }\n        "])), colorInit, color, color, colorInit),
    d: "M89.8,14.1v10.4c0,1.7-1.4,3-3,3l0,0c-1.7,0-3-1.4-3-3V14.1c0-1.7,1.4-3,3-3l0,0C88.4,11.1,89.8,12.5,89.8,14.1  z"
  }), React__default.createElement(Spark, {
    color: color,
    colorInit: colorInit,
    duration: duration,
    pulse: styled.keyframes(_templateObject5 || (_templateObject5 = _taggedTemplateLiteralLoose(["\n          47% { fill: ", " }\n          48% { fill: ", " }\n          81% { fill: ", " }\n          82% { fill: ", " }\n        "])), colorInit, color, color, colorInit),
    d: "M138.3,35.1l-7.4,7.4c-1.2,1.2-3.1,1.2-4.3,0v0c-1.2-1.2-1.2-3.1,0-4.3l7.4-7.4c1.2-1.2,3.1-1.2,4.3,0v0 C139.5,32,139.5,34,138.3,35.1z"
  }), React__default.createElement(Spark, {
    color: color,
    colorInit: colorInit,
    duration: duration,
    pulse: styled.keyframes(_templateObject6 || (_templateObject6 = _taggedTemplateLiteralLoose(["\n          63% { fill: ", " }\n          64% { fill: ", " }\n          81% { fill: ", " }\n          82% { fill: ", " }\n        "])), colorInit, color, color, colorInit),
    d: "M163,84h-10.4c-1.7,0-3-1.4-3-3l0,0c0-1.7,1.4-3,3-3H163c1.7,0,3,1.4,3,3l0,0C166,82.7,164.7,84,163,84z"
  }));
};
Sparkles.defaultProps = {
  colorInit: '#DBDBDB',
  color: '#35E3C3',
  duration: '6s'
};

var _templateObject$1;
/**
 * Animated loading transition component.
 */
const LoadingSVG = /*#__PURE__*/styled__default(props => {
  const {
    className,
    color,
    sparklesColor,
    sparklesColorInit,
    sparklesDuration
  } = props;
  return React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: className,
    viewBox: "0 0 176 135"
  }, React__default.createElement("path", {
    fill: color,
    d: "M129.7,123.3H43.8c-1.1,0-2-0.9-2-2V119c0-1.1,0.9-2,2-2h85.9c1.1,0,2,0.9,2,2v2.3C131.7,122.4,130.8,123.3,129.7,123.3z"
  }), React__default.createElement("path", {
    fill: color,
    d: "M117,68.2c-12.7,0-15.2,0-15.2,0v-4h-12L96,58v-4.7l-6.6-6.6c0,0-2.6-2.3-4.9,0s-5.9,5.9-5.9,5.9v4.7l7,7H73.2 v3.8H55.5c0,0-13.7-0.2-13.7,13.5v21c0,0-1.2,5.4,10.5,6.4c0.8,3.2,3.9,5.6,7.7,5.6c3.7,0,6.8-2.3,7.7-5.4c0.6,0,1.1,0,1.7,0  c0.9,3.1,4,5.4,7.7,5.4s6.8-2.3,7.7-5.4c2.5,0,5.1,0,7.7,0c0.9,3.1,4,5.4,7.7,5.4s6.8-2.3,7.7-5.4c0.6,0,1.2,0,1.7,0  c0.9,3.1,4,5.4,7.7,5.4c3.7,0,6.8-2.4,7.7-5.5c1.2-0.5,6.9-2.9,6.9-8.9c0-6.7,0-26.5,0-26.5S129.7,68.2,117,68.2z M70.3,75.8  c0-1.1,0.9-2,2-2h10.3c1.1,0,2,0.9,2,2v15.3c0,1.1-0.9,2-2,2H72.3c-1.1,0-2-0.9-2-2V75.8z M50.8,90.5v-11c2-5.3,6.3-5.7,6.3-5.7 s0,0,4,0s3.8,2,3.8,2s0,4,0,11.2c0,5.7-1.6,6.2-1.6,6.2s-5.4,0-8.9,0S50.8,90.5,50.8,90.5z M60,111.6c-2,0-3.7-1-4.4-2.4  c0.1,0,0.3,0,0.4,0c2.2,0,5.1,0,8.4,0C63.7,110.6,62,111.6,60,111.6z M77,111.6c-2,0-3.6-1-4.4-2.4c2.8,0,5.8,0,8.9,0 C80.7,110.6,79,111.6,77,111.6z M109.2,75.8c0-1.1,0.9-2,2-2h10.3c1.1,0,2,0.9,2,2v15.3c0,1.1-0.9,2-2,2h-10.3c-1.1,0-2-0.9-2-2 V75.8z M89.8,91.2V75.8c0-1.1,0.9-2,2-2h10.3c1.1,0,2,0.9,2,2v15.3c0,1.1-0.9,2-2,2H91.8C90.7,93.2,89.8,92.3,89.8,91.2z M100,111.6 c-2,0-3.6-1-4.4-2.4c3.1,0,6,0,8.9,0C103.6,110.6,102,111.6,100,111.6z M117.1,111.6c-2,0-3.6-1-4.4-2.4c3.7,0,6.8,0,8.9,0  C120.7,110.6,119,111.6,117.1,111.6z"
  }), React__default.createElement(Sparkles, {
    color: sparklesColor,
    colorInit: sparklesColorInit,
    duration: sparklesDuration
  }));
})(_templateObject$1 || (_templateObject$1 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n  ", "\n"])), props => props.size === 'small' && "\n    width: calc(0.5*176px);\n    height: calc(0.5*135px);\n  ", props => props.size === 'default' && "\n    width: calc(0.75*176px);\n    height: calc(0.75*135px);\n  ", props => props.size === 'large' && "\n    width: calc(1*176px);\n    height: calc(1*135px);\n  ");
LoadingSVG.defaultProps = {
  color: '#050505',
  size: 'default',
  sparklesColor: '#35E3C3',
  sparklesColorInit: '#DBDBDB',
  sparklesDuration: '6s'
};

const theme = {
  brand: {
    main: '#ee0099',
    dark: '#000',
    light: '#fff'
  },
  commons: {
    dark: '#4A4A4A',
    main: '#aaa',
    light: '#eee'
  },
  fontFamily: "'Nunito Sans', sans-serif",
  body: {
    padding: 60,
    background: {
      light: '#fff',
      main: 'rgb(247,247,247)',
      dark: '#000'
    }
  },
  default: {
    color: {
      main: '#fff'
    },
    border: {
      main: '#ee0099'
    },
    background: {
      main: '#ee0099',
      hover: '#e2058a',
      focus: '#b4006c'
    }
  },
  dark: {
    color: {
      main: '#000',
      hover: '#4A4A4A',
      focus: '#9b9b9b'
    },
    border: {
      main: '#000',
      hover: '#4A4A4A',
      focus: '#9b9b9b'
    },
    background: {
      main: 'none'
    }
  },
  light: {
    color: {
      main: '#fff',
      hover: '#9b9b9b',
      focus: '#4A4A4A'
    },
    border: {
      main: '#fff',
      hover: '#eee',
      focus: '#4A4A4A'
    },
    background: {
      main: 'none'
    }
  },
  secondary: {
    color: {
      main: '#000',
      hover: '#424242',
      focus: '#9B9B9B'
    },
    border: {
      main: 'transparent',
      hover: 'transparent',
      focus: 'transparent'
    },
    background: {
      main: 'none'
    },
    disabled: {
      color: {
        main: '#AAAAAA',
        hover: '#AAAAAA',
        focus: '#AAAAAA'
      },
      background: {
        main: 'none'
      }
    }
  },
  error: '#FF2B4E'
};

var _templateObject$2, _templateObject2$1, _templateObject3$1, _templateObject4$1, _templateObject5$1, _templateObject6$1, _templateObject7;
/**
 * The only true paragraph.
 */
const Text = /*#__PURE__*/styled__default.p(_templateObject$2 || (_templateObject$2 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  font-family: ", ";\n  font-size: 16px;\n  font-weight: ", ";\n  line-height: 25px;\n  color: ", ";\n  text-align: ", ";\n  letter-spacing: normal;\n\n  ", "\n"])), props => props.theme.fontFamily, props => props.bold ? 'bold' : 'normal', props => props.theme.commons.dark, props => props.align, props => props.uppercase && 'text-transform: uppercase;');
Text.defaultProps = {
  theme,
  align: 'left',
  uppercase: false,
  bold: false
};
Text.displayName = 'Text';
const annotate = Component => {
  Component.defaultProps = {
    theme
  };
  return Component;
};
var Header = {
  H1: /*#__PURE__*/annotate( /*#__PURE__*/styled__default(Text.withComponent('h1'))(_templateObject2$1 || (_templateObject2$1 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n    font-size: 60px;\n    font-weight: 900;\n    line-height: 1;\n    color: #000;\n  "])))),
  H2: /*#__PURE__*/annotate( /*#__PURE__*/styled__default(Text.withComponent('h2'))(_templateObject3$1 || (_templateObject3$1 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n    font-size: 36px;\n    font-weight: 900;\n    line-height: 1.22;\n    color: #000;\n  "])))),
  H3: /*#__PURE__*/annotate( /*#__PURE__*/styled__default(Text.withComponent('h3'))(_templateObject4$1 || (_templateObject4$1 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n    font-size: 21px;\n    font-weight: 800;\n    line-height: 0.95;\n    margin-bottom: 12px;\n    color: #000;\n  "])))),
  H4: /*#__PURE__*/annotate( /*#__PURE__*/styled__default(Text.withComponent('h4'))(_templateObject5$1 || (_templateObject5$1 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n    font-size: 18px;\n    font-weight: 800;\n    line-height: 1.39;\n    margin-bottom: 5px;\n    color: #000;\n  "])))),
  H5: /*#__PURE__*/annotate( /*#__PURE__*/styled__default(Text.withComponent('h5'))(_templateObject6$1 || (_templateObject6$1 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n    font-size: 13px;\n    line-height: 18px;\n    color: #424242;\n    letter-spacing: 0.005em;\n    font-weight: 800;\n  "])))),
  H6: /*#__PURE__*/annotate( /*#__PURE__*/styled__default(Text.withComponent('h6'))(_templateObject7 || (_templateObject7 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n    font-size: 11px;\n    line-height: 2.27;\n    color: #424242;\n  "]))))
};

var _templateObject$3, _templateObject2$2;
const FullSize = /*#__PURE__*/styled__default.div(_templateObject$3 || (_templateObject$3 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  position: absolute;\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  height: 100vh;\n  align-items: center;\n  justify-content: center;\n  background: ", ";\n"])), props => props.background);
const LoadingStyles = /*#__PURE__*/styled__default.div(_templateObject2$2 || (_templateObject2$2 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  text-align: ", ";\n"])), props => props.align);
/**
 * Animated loading transition component.
 */
const Loading = _ref => {
  let {
    children,
    align,
    fullsize,
    background,
    message,
    messageComponent: MessageComponent,
    ...props
  } = _ref;
  return fullsize ? React__default.createElement(FullSize, {
    background: background
  }, React__default.createElement(LoadingSVG, Object.assign({}, props)), message ? React__default.createElement(MessageComponent, null, message) : children) : React__default.createElement(LoadingStyles, {
    align: align
  }, React__default.createElement(LoadingSVG, Object.assign({}, props)), message ? React__default.createElement(MessageComponent, null, message) : children);
};
Loading.defaultProps = {
  align: 'center',
  fullsize: false,
  background: 'rgba(219,219,219,0.31)',
  color: '#050505',
  size: 'default',
  sparklesColor: '#35E3C3',
  sparklesColorInit: '#DBDBDB',
  sparklesDuration: '6s',
  messageComponent: Header.H3
};

var _templateObject$4;
const Ring = /*#__PURE__*/styled__default.div(_templateObject$4 || (_templateObject$4 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: inline-block;\n  position: relative;\n  width: 80px;\n  height: 80px;\n  & div {\n    box-sizing: border-box;\n    display: block;\n    position: absolute;\n    width: 64px;\n    height: 64px;\n    margin: 8px;\n    border: 8px solid ", ";\n    border-radius: 50%;\n    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n    border-color: ", " transparent transparent\n      transparent;\n  }\n  & div:nth-child(1) {\n    animation-delay: -0.45s;\n  }\n  & div:nth-child(2) {\n    animation-delay: -0.3s;\n  }\n  & div:nth-child(3) {\n    animation-delay: -0.15s;\n  }\n  @keyframes lds-ring {\n    0% {\n      transform: rotate(0deg);\n    }\n    100% {\n      transform: rotate(360deg);\n    }\n  }\n"])), _ref => {
  let {
    theme
  } = _ref;
  return theme.commons.light;
}, _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.commons.light;
});
const Spinner = _ref3 => {
  let {
    theme
  } = _ref3;
  return React__default.createElement(Ring, {
    theme: theme
  }, React__default.createElement("div", null), React__default.createElement("div", null), React__default.createElement("div", null), React__default.createElement("div", null));
};
Spinner.defaultProps = {
  theme
};

var _templateObject$5;
const Bonde = /*#__PURE__*/styled__default(_ref => {
  let {
    className,
    large
  } = _ref;
  return React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: className,
    width: large ? 260 : 85,
    viewBox: large ? '0 0 200 100' : '50 25 100 50'
  }, React__default.createElement("path", {
    fill: "#FFF",
    d: "M44.948 52.505c0-11.641 9.21-20.568 20.568-20.568 11.357 0 20.567 8.927 20.567 20.568 0 11.639-9.21 20.568-20.567 20.568-11.358 0-20.568-8.929-20.568-20.568zm32.094 0c0-7.064-5.084-11.754-11.525-11.754-6.442 0-11.527 4.689-11.527 11.754 0 7.062 5.085 11.752 11.527 11.752 6.441 0 11.525-4.69 11.525-11.752zM122.243 32.727V72.28h-6.78l-15.255-21.473V72.28h-9.042V32.727h6.781l15.255 21.471V32.727h9.041zM164.056 52.505c0 11.188-8.307 19.775-19.212 19.775h-15.821V32.727h15.821c10.905 0 19.212 8.588 19.212 19.778zm-8.702 0c0-6.781-4.295-11.076-10.51-11.076h-6.78v22.15h6.78c6.215 0 10.51-4.295 10.51-11.074zM194 63.579v8.701h-24.862V32.727h24.579v8.702h-15.538v6.555h14.127v8.59h-14.127v7.006H194zM40.937 59.731c0 7.381-6.012 12.203-13.453 12.203H9.981V30.263h16.311c7.264 0 13.156 4.704 13.156 11.906 0 3.454-1.369 6.192-3.632 8.157 3.097 1.962 5.121 5.179 5.121 9.405zM19.505 39.193v7.381h6.787c2.145 0 3.633-1.546 3.633-3.691 0-2.142-1.43-3.69-3.633-3.69h-6.787zm11.908 19.824c0-2.322-1.549-3.988-3.93-3.988h-7.979v7.979h7.979c2.381-.001 3.93-1.669 3.93-3.991z"
  }), React__default.createElement("path", {
    fill: "#FFF",
    d: "M40.196 59.274c0 7.383-6.014 12.205-13.453 12.205H9.239V29.807h16.312c7.265 0 13.157 4.704 13.157 11.907 0 3.452-1.369 6.191-3.632 8.156 3.097 1.965 5.12 5.178 5.12 9.404zM18.765 38.738v7.382h6.786c2.144 0 3.632-1.548 3.632-3.691 0-2.144-1.428-3.691-3.632-3.691h-6.786zm11.906 19.824c0-2.322-1.548-3.988-3.928-3.988h-7.979v7.977h7.979c2.38-.001 3.928-1.669 3.928-3.989z"
  }), React__default.createElement("path", {
    fill: "#FFF",
    d: "M39.456 58.813c0 7.381-6.014 12.203-13.454 12.203H8.499V29.345h16.312c7.264 0 13.157 4.703 13.157 11.907 0 3.453-1.369 6.191-3.632 8.155 3.096 1.965 5.12 5.178 5.12 9.406zM18.024 38.275v7.382h6.786c2.144 0 3.632-1.548 3.632-3.691s-1.43-3.691-3.632-3.691h-6.786zM29.93 58.099c0-2.322-1.546-3.988-3.928-3.988h-7.978v7.975h7.978c2.382-.001 3.928-1.667 3.928-3.987z"
  }), React__default.createElement("path", {
    fill: "#FFF",
    d: "M41.679 60.188c0 7.381-6.014 12.201-13.454 12.201H10.722v-41.67h16.311c7.264 0 13.156 4.704 13.156 11.907 0 3.453-1.369 6.192-3.631 8.155 3.096 1.964 5.121 5.181 5.121 9.407zM20.247 39.649v7.382h6.785c2.145 0 3.633-1.548 3.633-3.69 0-2.143-1.43-3.691-3.633-3.691h-6.785zm11.906 19.823c0-2.322-1.548-3.988-3.929-3.988h-7.978v7.979h7.978c2.381-.001 3.929-1.669 3.929-3.991z"
  }), React__default.createElement("path", {
    fill: "#FFF",
    d: "M38.714 58.358c0 7.383-6.012 12.205-13.453 12.205H7.758V28.89H24.07c7.264 0 13.156 4.704 13.156 11.907 0 3.453-1.369 6.192-3.631 8.155 3.096 1.965 5.119 5.18 5.119 9.406zm-21.43-20.537v7.381h6.785c2.145 0 3.633-1.548 3.633-3.691s-1.43-3.69-3.633-3.69h-6.785zM29.19 57.644c0-2.322-1.549-3.99-3.93-3.99h-7.977v7.98h7.977c2.382 0 3.93-1.668 3.93-3.99z"
  }), React__default.createElement("path", {
    fill: "#FFF",
    d: "M37.974 57.903c0 7.383-6.012 12.203-13.453 12.203H7.019V28.435H23.33c7.264 0 13.156 4.704 13.156 11.907 0 3.453-1.369 6.192-3.631 8.157 3.095 1.963 5.119 5.178 5.119 9.404zM16.542 37.365v7.383h6.787c2.145 0 3.631-1.548 3.631-3.692s-1.428-3.691-3.631-3.691h-6.787zM28.448 57.19c0-2.324-1.547-3.99-3.928-3.99h-7.979v7.977h7.979c2.381 0 3.928-1.666 3.928-3.987z"
  }), React__default.createElement("path", {
    fill: "#FFF",
    d: "M37.233 57.45c0 7.381-6.014 12.201-13.454 12.201H6.276v-41.67h16.312c7.264 0 13.155 4.703 13.155 11.907 0 3.453-1.369 6.191-3.631 8.156 3.098 1.963 5.121 5.178 5.121 9.406zM15.802 36.912v7.381h6.787c2.143 0 3.631-1.548 3.631-3.691 0-2.142-1.429-3.69-3.631-3.69h-6.787zm11.906 19.821c0-2.32-1.548-3.988-3.929-3.988h-7.978v7.979h7.978c2.381 0 3.929-1.668 3.929-3.991z"
  }), React__default.createElement("path", {
    fill: "#FFF",
    d: "M6.276 69.651L11.072 73.065 11.462 71.479 6.704 68.45 6.28 68.206z"
  }), React__default.createElement("path", {
    d: "M6.276 55.521L11.462 58.956 11.462 57.267 6.704 54.235 6.28 53.995z"
  }), React__default.createElement("path", {
    d: "M6.276 52.792L11.462 56.022 11.462 50.519 6.704 47.488 6.28 47.246z"
  }), React__default.createElement("path", {
    d: "M11.854 30.988L6.276 27.981 8.501 27.981 14.479 30.988z"
  }), React__default.createElement("path", {
    d: "M42.419 60.458c0 7.381-6.014 12.201-13.455 12.201H11.462V30.988h16.312c7.262 0 13.154 4.704 13.154 11.906 0 3.453-1.368 6.192-3.631 8.157 3.099 1.964 5.122 5.178 5.122 9.407zM20.987 39.919V47.3h6.787c2.143 0 3.631-1.547 3.631-3.69 0-2.144-1.429-3.691-3.631-3.691h-6.787zm11.907 19.822c0-2.322-1.549-3.988-3.93-3.988h-7.977v7.977h7.977c2.381-.001 3.93-1.667 3.93-3.989z"
  }), React__default.createElement("path", {
    fill: "#FFF",
    d: "M28.964 73.104H11.019v-42.56h16.756c7.88 0 13.6 5.194 13.6 12.35 0 3.204-1.158 5.993-3.356 8.103 3.13 2.191 4.846 5.527 4.846 9.461-.002 7.326-5.847 12.646-13.901 12.646zm-17.057-.888h17.057c7.539 0 13.011-4.945 13.011-11.758 0-3.814-1.745-7.021-4.914-9.033l-.503-.318.449-.391c2.276-1.977 3.479-4.68 3.479-7.821 0-6.642-5.346-11.462-12.711-11.462H11.907v40.783zm17.057-8.041h-8.421V55.31h8.421c2.575 0 4.373 1.822 4.373 4.432s-1.798 4.433-4.373 4.433zm-7.532-.889h7.532c2.086 0 3.486-1.424 3.486-3.545 0-2.119-1.4-3.545-3.486-3.545h-7.532v7.09zm6.342-15.541h-7.231v-8.27h7.231c2.398 0 4.074 1.7 4.074 4.134.001 2.397-1.712 4.136-4.074 4.136zm-6.342-.888h6.343c1.877 0 3.188-1.336 3.188-3.247 0-1.942-1.281-3.247-3.188-3.247h-6.343v6.494z"
  }), React__default.createElement("g", null, React__default.createElement("path", {
    d: "M259.224 51.742c0-11.267 8.915-19.909 19.909-19.909 10.993 0 19.908 8.642 19.908 19.909 0 11.269-8.915 19.909-19.908 19.909-10.994 0-19.909-8.64-19.909-19.909zm31.066 0c0-6.837-4.923-11.376-11.157-11.376-6.235 0-11.158 4.54-11.158 11.376 0 6.838 4.923 11.377 11.158 11.377 6.234 0 11.157-4.539 11.157-11.377zM334.043 32.599v38.287h-6.563l-14.768-20.785v20.785h-8.752V32.599h6.565l14.765 20.784V32.599h8.753zM374.515 51.742c0 10.83-8.042 19.144-18.596 19.144h-15.316V32.599h15.316c10.554 0 18.596 8.315 18.596 19.143zm-8.423 0c0-6.562-4.155-10.72-10.173-10.72h-6.564v21.441h6.564c6.018 0 10.173-4.156 10.173-10.721zM403.5 62.463v8.423h-24.064V32.599h23.79v8.423h-15.041v6.344h13.675v8.315h-13.675v6.782H403.5zM255.342 58.738c0 7.146-5.82 11.812-13.023 11.812h-16.942V30.214h15.789c7.031 0 12.735 4.553 12.735 11.524 0 3.343-1.326 5.994-3.516 7.896 2.998 1.899 4.957 5.012 4.957 9.104zm-20.744-19.881v7.146h6.567c2.075 0 3.517-1.498 3.517-3.572 0-2.077-1.385-3.574-3.517-3.574h-6.567zm11.522 19.19c0-2.247-1.498-3.861-3.802-3.861h-7.721v7.721h7.721c2.304-.001 3.802-1.614 3.802-3.86z"
  }), React__default.createElement("path", {
    d: "M254.625 58.297c0 7.146-5.821 11.813-13.023 11.813H224.66V29.774h15.788c7.03 0 12.735 4.552 12.735 11.525 0 3.341-1.325 5.992-3.516 7.895 2.998 1.9 4.958 5.011 4.958 9.103zm-20.748-19.88v7.146h6.57c2.076 0 3.517-1.5 3.517-3.574s-1.383-3.573-3.517-3.573h-6.57zm11.526 19.188c0-2.247-1.497-3.86-3.802-3.86h-7.725v7.722h7.725c2.305 0 3.802-1.614 3.802-3.862z"
  }), React__default.createElement("path", {
    d: "M253.907 57.85c0 7.145-5.821 11.812-13.022 11.812h-16.941V29.325h15.788c7.03 0 12.734 4.553 12.734 11.526 0 3.34-1.325 5.993-3.515 7.894 2.997 1.901 4.956 5.012 4.956 9.105zm-20.746-19.88v7.146h6.57c2.074 0 3.515-1.5 3.515-3.573 0-2.074-1.383-3.573-3.515-3.573h-6.57zm11.527 19.188c0-2.249-1.498-3.861-3.803-3.861h-7.724v7.721h7.724c2.304 0 3.803-1.613 3.803-3.86z"
  }), React__default.createElement("path", {
    d: "M256.059 59.18c0 7.145-5.82 11.812-13.022 11.812h-16.943V30.654h15.789c7.031 0 12.733 4.554 12.733 11.526 0 3.341-1.323 5.993-3.513 7.894 2.997 1.903 4.956 5.015 4.956 9.106zM235.313 39.3v7.145h6.568c2.075 0 3.517-1.497 3.517-3.572 0-2.076-1.385-3.573-3.517-3.573h-6.568zm11.526 19.188c0-2.248-1.5-3.862-3.803-3.862h-7.723v7.722h7.723c2.303 0 3.803-1.614 3.803-3.86z"
  }), React__default.createElement("path", {
    d: "M253.19 57.41c0 7.146-5.821 11.812-13.023 11.812h-16.94V28.886h15.788c7.03 0 12.734 4.553 12.734 11.525 0 3.343-1.325 5.994-3.515 7.895 2.997 1.901 4.956 5.013 4.956 9.104zm-20.745-19.88v7.145h6.569c2.075 0 3.515-1.497 3.515-3.572 0-2.076-1.383-3.573-3.515-3.573h-6.569zm11.526 19.188c0-2.247-1.5-3.861-3.804-3.861h-7.722v7.723h7.722c2.304-.001 3.804-1.615 3.804-3.862z"
  }), React__default.createElement("path", {
    d: "M252.473 56.969c0 7.146-5.819 11.812-13.022 11.812h-16.942V28.444h15.789c7.032 0 12.734 4.553 12.734 11.525 0 3.342-1.325 5.994-3.514 7.895 2.996 1.903 4.955 5.014 4.955 9.105zm-20.744-19.881v7.146h6.568c2.076 0 3.516-1.498 3.516-3.573 0-2.074-1.383-3.574-3.516-3.574h-6.568zm11.524 19.189c0-2.247-1.498-3.86-3.803-3.86h-7.722v7.722h7.722c2.305 0 3.803-1.616 3.803-3.862z"
  }), React__default.createElement("path", {
    d: "M251.756 56.528c0 7.145-5.818 11.813-13.022 11.813h-16.942V28.005h15.789c7.031 0 12.734 4.552 12.734 11.525 0 3.342-1.326 5.993-3.516 7.895 2.997 1.901 4.957 5.012 4.957 9.103zm-20.745-19.88v7.146h6.569c2.076 0 3.515-1.497 3.515-3.573 0-2.074-1.383-3.573-3.515-3.573h-6.569zm11.524 19.189c0-2.247-1.497-3.86-3.802-3.86h-7.723v7.722h7.723c2.305-.001 3.802-1.615 3.802-3.862z"
  }), React__default.createElement("path", {
    d: "M221.791 68.342L226.433 71.647 226.811 70.11 222.205 67.176 221.794 66.942z"
  }), React__default.createElement("path", {
    fill: "#FFF",
    d: "M221.791 54.664L226.811 57.988 226.811 56.354 222.205 53.42 221.794 53.187z"
  }), React__default.createElement("path", {
    fill: "#FFF",
    d: "M221.791 52.021L226.811 55.15 226.811 49.821 222.205 46.888 221.794 46.652z"
  }), React__default.createElement("path", {
    fill: "#FFF",
    d: "M227.19 30.915L221.791 28.005 223.943 28.005 229.731 30.915z"
  }), React__default.createElement("path", {
    fill: "#FFF",
    d: "M256.774 59.44c0 7.145-5.819 11.812-13.022 11.812h-16.941V30.915h15.788c7.031 0 12.734 4.554 12.734 11.526 0 3.341-1.324 5.994-3.514 7.894 2.997 1.902 4.955 5.014 4.955 9.105zM236.03 39.561v7.146h6.568c2.076 0 3.516-1.5 3.516-3.574s-1.384-3.571-3.516-3.571h-6.568zm11.525 19.188c0-2.248-1.499-3.861-3.803-3.861h-7.722v7.722h7.722c2.304-.001 3.803-1.615 3.803-3.861z"
  }), React__default.createElement("path", {
    d: "M243.752 71.648h-17.338V30.52h16.185c7.608 0 13.131 5.013 13.131 11.921 0 3.107-1.127 5.808-3.269 7.847 3.042 2.112 4.709 5.345 4.709 9.152 0 7.074-5.642 12.208-13.418 12.208zm-16.546-.792h16.546c7.317 0 12.628-4.802 12.628-11.416 0-3.702-1.695-6.818-4.772-8.769l-.449-.285.4-.349c2.211-1.92 3.379-4.547 3.379-7.596 0-6.448-5.188-11.13-12.339-11.13h-15.393v39.545zm16.546-7.849h-8.117v-8.515h8.117c2.474 0 4.198 1.751 4.198 4.257 0 2.504-1.724 4.258-4.198 4.258zm-7.327-.793h7.327c2.038 0 3.408-1.393 3.408-3.465 0-2.073-1.37-3.465-3.408-3.465h-7.327v6.93zm6.174-15.112h-6.964v-7.937h6.964c2.303 0 3.911 1.632 3.911 3.968 0 2.3-1.646 3.969-3.911 3.969zm-6.174-.792h6.174c1.837 0 3.12-1.307 3.12-3.178 0-1.898-1.253-3.176-3.12-3.176h-6.174v6.354z"
  })));
})(_templateObject$5 || (_templateObject$5 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: flex;\n  ", "\n"])), props => !props.large && "\n    height: calc(1.5 * 15px);\n  ");
Bonde.defaultProps = {
  large: false
};

var _templateObject$6;
const EmptyIcon = () => {
  return React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "38",
    height: "56",
    fill: "none",
    viewBox: "0 0 38 56"
  }, React__default.createElement("path", {
    fill: "#000",
    d: "M35.435 28.166c-.678-.665-1.865-1.148-2.823-1.148l-8.484-.002v9.216h8.484c.958 0 2.145-.483 2.823-1.148l1.891-1.858A2.23 2.23 0 0038 31.624c0-.606-.24-1.175-.675-1.601l-1.89-1.857zM24.129 22.174h8.483c.958 0 2.146-.483 2.823-1.149l1.891-1.858A2.23 2.23 0 0038 17.565a2.23 2.23 0 00-.675-1.601l-1.89-1.856c-.677-.665-1.865-1.148-2.823-1.148l-8.607-.002c.08.352.124.717.124 1.093v8.123zM19 11.2c-1.6 0-2.902 1.279-2.902 2.851V47.44c0 .604.498 1.093 1.113 1.093h3.578c.614 0 1.113-.49 1.113-1.093V14.05C21.902 12.48 20.6 11.2 19 11.2zM2.564 21.135l-1.89 1.858A2.23 2.23 0 000 24.595c0 .606.24 1.175.675 1.602l1.89 1.855c.677.665 1.864 1.148 2.823 1.148l8.484.002v-9.216H5.388c-.958 0-2.146.483-2.824 1.15zM25.65 5.6c-1.571 0-2.85-1.256-2.85-2.8 0-1.544 1.279-2.8 2.85-2.8 1.571 0 2.85 1.256 2.85 2.8 0 1.544-1.279 2.8-2.85 2.8zm0-3.733a.943.943 0 00-.95.933c0 .515.427.933.95.933.523 0 .95-.418.95-.933a.943.943 0 00-.95-.933z"
  }), React__default.createElement("path", {
    fill: "#000",
    d: "M34.2 11.2h-6.812c-2.007 0-3.638-1.603-3.638-3.573v-.32c0-1.97 1.631-3.574 3.638-3.574.97 0 1.883.372 2.571 1.047l4.914 4.827a.92.92 0 01.206 1.017.952.952 0 01-.879.576zm-6.812-5.6c-.96 0-1.738.765-1.738 1.706v.321c0 .941.779 1.706 1.738 1.706h4.519L28.617 6.1a1.744 1.744 0 00-1.23-.499z"
  }), React__default.createElement("path", {
    fill: "#000",
    d: "M26.6 10.267h1.9V14h-1.9v-3.733zM30.4 10.267h1.9V14h-1.9v-3.733zM21.09 2.8c0-.515.421-.933.94-.933H23c.52 0 .94.418.94.933 0 .515-.42.933-.94.933h-.97a.937.937 0 01-.94-.933z"
  }), React__default.createElement("path", {
    fill: "#000",
    d: "M27.55 2.8c0 1.03-.85 1.867-1.9 1.867-1.05 0-1.9-.836-1.9-1.867 0-1.03.85-1.867 1.9-1.867 1.05 0 1.9.836 1.9 1.867zM34.2 10.267h-6.813c-1.484 0-2.687-1.182-2.687-2.64v-.32c0-1.459 1.203-2.64 2.687-2.64.712 0 1.396.278 1.9.773l4.913 4.827zM5.503 53.268a2.742 2.742 0 012.752-2.731h20.638a2.742 2.742 0 012.752 2.731A2.742 2.742 0 0128.893 56H8.255a2.742 2.742 0 01-2.752-2.732z"
  }));
};
const EmptyWrap = /*#__PURE__*/styled__default.div(_templateObject$6 || (_templateObject$6 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  align-items: center;\n  justify-content: center;\n\n  ", " {\n    margin-top: 15px;\n    font-weight: normal;\n  }\n"])), Header.H4);
const Empty = _ref => {
  let {
    message
  } = _ref;
  return React__default.createElement(EmptyWrap, null, React__default.createElement(EmptyIcon, null), message && React__default.createElement(Header.H4, null, message));
};

const Icon = _ref => {
  let {
    className
  } = _ref;
  return React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: className + ' fill',
    viewBox: "4 4 15 15"
  }, React__default.createElement("path", {
    fill: "#000",
    d: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
  }));
};
Icon.displayName = 'Icon.ArrowDown';

const Icon$1 = _ref => {
  let {
    className
  } = _ref;
  return React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: className + ' fill',
    viewBox: "4 4 15 15"
  }, React__default.createElement("path", {
    fill: "#000",
    d: "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"
  }));
};
Icon$1.displayName = 'Icon.ArrowLeft';

const Icon$2 = _ref => {
  let {
    className
  } = _ref;
  return React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: className + ' fill',
    viewBox: "4 4 15 15"
  }, React__default.createElement("path", {
    fill: "#000",
    d: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
  }));
};
Icon$2.displayName = 'Icon.ArrowRight';

const Icon$3 = _ref => {
  let {
    className
  } = _ref;
  return React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: className + ' fill',
    viewBox: "4 4 15 15"
  }, React__default.createElement("path", {
    fill: "#000",
    d: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
  }));
};
Icon$3.displayName = 'Icon.ArrowUp';

const Icon$4 = _ref => {
  let {
    className,
    color
  } = _ref;
  return React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: className,
    viewBox: "0 0 18 22"
  }, React__default.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, React__default.createElement("path", {
    fill: "none",
    d: "M-153-28h1440v130H-153z"
  }), React__default.createElement("path", {
    fill: "#FFF",
    d: "M16.632 15.045c0 3.478-2.88 5.749-6.48 5.749H1.8V1.135h7.848c3.456 0 6.336 2.2 6.336 5.607a4.852 4.852 0 0 1-1.728 3.832 5.238 5.238 0 0 1 2.376 4.471zM6.336 5.323V8.8h3.24c.475.013.934-.172 1.263-.51.329-.338.498-.797.465-1.264a1.682 1.682 0 0 0-.478-1.253 1.733 1.733 0 0 0-1.25-.521h-3.24v.07zm5.76 9.367a1.795 1.795 0 0 0-.51-1.362 1.85 1.85 0 0 0-1.362-.554H6.336v3.761h3.816a1.773 1.773 0 0 0 1.41-.473c.376-.357.571-.86.534-1.372z"
  }), React__default.createElement("path", {
    fill: "#FFF",
    d: "M16.272 14.832c0 3.478-2.88 5.749-6.48 5.749H1.44V.923h7.848c3.456 0 6.336 2.2 6.336 5.606a4.852 4.852 0 0 1-1.728 3.832 5.238 5.238 0 0 1 2.376 4.471zM5.976 5.11v3.477h3.24c.475.013.934-.172 1.263-.51.329-.338.498-.797.465-1.264a1.647 1.647 0 0 0-.465-1.264 1.697 1.697 0 0 0-1.263-.51l-3.24.07zm5.76 9.367a1.795 1.795 0 0 0-.51-1.362 1.85 1.85 0 0 0-1.362-.554H5.976v3.762h3.816a1.773 1.773 0 0 0 1.41-.474c.376-.357.571-.86.534-1.372z"
  }), React__default.createElement("path", {
    fill: "#FFF",
    d: "M15.912 14.62c0 3.477-2.88 5.748-6.48 5.748H1.08V.71h7.848c3.456 0 6.336 2.2 6.336 5.606a4.852 4.852 0 0 1-1.728 3.832 5.146 5.146 0 0 1 2.376 4.471zM5.616 4.896v3.477h3.24c.475.013.934-.172 1.263-.51.329-.338.498-.797.465-1.264a1.682 1.682 0 0 0-.478-1.253 1.733 1.733 0 0 0-1.25-.521h-3.24v.07zm5.76 9.368a1.795 1.795 0 0 0-.51-1.363 1.85 1.85 0 0 0-1.362-.554H5.616v3.762h3.816a1.773 1.773 0 0 0 1.41-.474c.376-.357.571-.859.534-1.371z"
  }), React__default.createElement("path", {
    fill: "#FFF",
    d: "M16.992 15.258c0 3.477-2.88 5.748-6.48 5.748H2.16V1.348h7.848c3.456 0 6.336 2.2 6.336 5.607a4.852 4.852 0 0 1-1.728 3.832 5.238 5.238 0 0 1 2.376 4.471zM6.696 5.535v3.478h3.24c.475.013.934-.172 1.263-.51.329-.338.498-.797.465-1.264a1.682 1.682 0 0 0-.478-1.253 1.733 1.733 0 0 0-1.25-.521c0 .07-3.24.07-3.24.07zm5.76 9.368a1.795 1.795 0 0 0-.51-1.362 1.85 1.85 0 0 0-1.362-.554H6.696v3.761h3.816a1.773 1.773 0 0 0 1.41-.474c.376-.356.571-.858.534-1.37z"
  }), React__default.createElement("path", {
    fill: "#FFF",
    d: "M15.552 14.406c0 3.478-2.88 5.749-6.48 5.749H.72V.497h7.848c3.456 0 6.336 2.2 6.336 5.606a4.852 4.852 0 0 1-1.728 3.832 5.146 5.146 0 0 1 2.376 4.471zM5.256 4.684V8.16h3.24c.475.013.934-.172 1.263-.51.329-.338.498-.797.465-1.264a1.682 1.682 0 0 0-.478-1.253 1.733 1.733 0 0 0-1.25-.521h-3.24v.07zm5.76 9.368a1.795 1.795 0 0 0-.51-1.363 1.85 1.85 0 0 0-1.362-.554H5.256v3.762h3.816a1.773 1.773 0 0 0 1.41-.474c.376-.357.571-.859.534-1.371z"
  }), React__default.createElement("path", {
    fill: "#FFF",
    d: "M15.192 14.194c0 3.477-2.88 5.748-6.48 5.748H.36V.284h7.848c3.456 0 6.336 2.2 6.336 5.606a4.852 4.852 0 0 1-1.728 3.833 5.146 5.146 0 0 1 2.376 4.47zM4.896 4.47v3.477h3.24c.475.014.934-.172 1.263-.51.329-.337.498-.797.465-1.264a1.682 1.682 0 0 0-.478-1.253 1.733 1.733 0 0 0-1.25-.521l-3.24.071zm5.76 9.368a1.795 1.795 0 0 0-.51-1.362 1.85 1.85 0 0 0-1.362-.554H4.896v3.76h3.816a1.744 1.744 0 0 0 1.422-.461 1.69 1.69 0 0 0 .522-1.383z"
  }), React__default.createElement("path", {
    fill: "#FFF",
    d: "M14.832 13.98c0 3.478-2.88 5.749-6.48 5.749H0V0h7.848c3.456 0 6.336 2.2 6.336 5.606a4.852 4.852 0 0 1-1.728 3.833 5.364 5.364 0 0 1 2.376 4.542zM4.608 4.259v3.477h3.24c.475.014.934-.172 1.263-.51.329-.337.498-.796.465-1.264a1.682 1.682 0 0 0-.478-1.252 1.733 1.733 0 0 0-1.25-.522c0 .071-3.24.071-3.24.071zm5.688 9.368a1.795 1.795 0 0 0-.51-1.362 1.85 1.85 0 0 0-1.362-.554H4.608v3.761h3.816a1.721 1.721 0 0 0 1.381-.484c.363-.358.544-.858.491-1.361z"
  }), React__default.createElement("path", {
    fill: "#FFF",
    d: "M0 19.729l2.304 1.632.216-.71-2.304-1.49-.216-.07z"
  }), React__default.createElement("path", {
    fill: color || '#000',
    d: "M0 13.058l2.52 1.632v-.78L.216 12.49 0 12.348zM0 11.78l2.52 1.491v-2.555L.216 9.296 0 9.156zM2.664 1.49L0 0h1.08l2.88 1.49zM17.352 15.4c0 3.477-2.88 5.748-6.48 5.748H2.52V1.49h7.848c3.456 0 6.336 2.2 6.336 5.607a4.852 4.852 0 0 1-1.728 3.832 5.315 5.315 0 0 1 2.376 4.471zM7.056 5.677v3.478h3.24c.475.013.934-.172 1.263-.51.329-.338.498-.797.465-1.264a1.647 1.647 0 0 0-.465-1.265 1.697 1.697 0 0 0-1.263-.51l-3.24.071zm5.688 9.368a1.795 1.795 0 0 0-.51-1.362 1.85 1.85 0 0 0-1.362-.554H7.056v3.761h3.816a1.721 1.721 0 0 0 1.381-.483c.363-.358.544-.858.491-1.362z"
  }), React__default.createElement("path", {
    fill: "#FCFAFA",
    d: "M10.872 21.361H2.304V1.277h7.992c3.744 0 6.48 2.484 6.48 5.82a5.11 5.11 0 0 1-1.656 3.832 5.278 5.278 0 0 1 2.304 4.471c.144 3.477-2.664 5.961-6.552 5.961zm-8.208-.355h8.208c3.6 0 6.264-2.341 6.264-5.606a4.81 4.81 0 0 0-2.376-4.258L14.544 11l.216-.142a4.704 4.704 0 0 0 1.656-3.69c0-3.123-2.592-5.465-6.12-5.465H2.664v19.303zm8.208-3.832H6.84v-4.187h4.032a2.138 2.138 0 0 1 1.767 2.094 2.138 2.138 0 0 1-1.767 2.093zm-3.6-.426h3.6c.457.016.898-.161 1.214-.486a1.57 1.57 0 0 0 .442-1.217 1.57 1.57 0 0 0-.442-1.216 1.618 1.618 0 0 0-1.214-.487h-3.6v3.406zm3.024-7.38H6.84V5.465h3.456a1.865 1.865 0 0 1 1.405.531c.37.366.566.869.539 1.385a1.83 1.83 0 0 1-.519 1.424c-.371.38-.89.585-1.425.563zm-3.024-.355h3.096c.42.023.83-.137 1.121-.437.29-.3.434-.711.391-1.124a1.464 1.464 0 0 0-.412-1.105 1.508 1.508 0 0 0-1.1-.457H7.272v3.123z"
  })));
};
Icon$4.displayName = 'Icon.Bonde';

const Icon$5 = _ref => {
  let {
    className
  } = _ref;
  return React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "25",
    fill: "none",
    className: className + ' fill',
    viewBox: "0 0 16 25"
  }, React__default.createElement("path", {
    fill: "#000",
    stroke: "#fff",
    strokeWidth: "0.1",
    d: "M15.481 9.799h0a.731.731 0 00-.637-.374H9.388l.005-.054.71-8.529A.731.731 0 009.612.09h0a.73.73 0 00-.85.294h0L.168 13.665h0a.73.73 0 00.613 1.129h5.46l-.004.054-.716 9.315h0a.731.731 0 00.504.752L15.48 9.799zm0 0c.13.23.125.513-.013.739 0 0 0 0 0 0L6.874 24.6a.732.732 0 01-.849.315l9.456-15.116zM7.228 21.034l.093.03 6.172-10.1.047-.077H8.594a.731.731 0 01-.729-.791l.522-6.269-.092-.031-6.12 9.458-.05.077h4.906a.733.733 0 01.73.788h0l-.533 6.915z"
  }));
};
Icon$5.displayName = 'Icon.Bolt';

const Icon$6 = _ref => {
  let {
    className
  } = _ref;
  return React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "23",
    height: "30",
    fill: "none",
    className: className + ' fill',
    viewBox: "0 0 23 30"
  }, React__default.createElement("path", {
    fill: "#000",
    d: "M22.31 11.729c-.198-.296-.573-.479-.979-.479H13.57L14.59 1.016c.043-.429-.27-.827-.756-.965-.486-.14-1.026.016-1.305.377L.18 16.366a.807.807 0 00-.043.957c.196.302.575.49.986.49h7.769L7.862 28.99c-.04.433.28.831.774.965.114.03.23.045.346.045.382 0 .75-.164.958-.449l12.35-16.874a.807.807 0 00.02-.948zM10.459 25.246l.765-8.299a.85.85 0 00-.296-.71 1.238 1.238 0 00-.824-.3H3.187l8.794-11.35-.75 7.523c-.026.261.08.52.293.713.212.192.511.302.826.302h6.98l-8.871 12.12z"
  }));
};
Icon$6.displayName = 'Icon.BoltUnfilled';

const Icon$7 = _ref => {
  let {
    className
  } = _ref;
  return React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: className + ' fill',
    viewBox: "0 0 18 14",
    fill: "none"
  }, React__default.createElement("path", {
    d: "M15.5581 14C15.5581 11.12 13.2151 8.77704 10.3351 8.77704H6.94517C4.06558 8.77704 1.72266 11.12 1.72266 14H3.06096C3.06096 11.8578 4.80344 10.1153 6.94517 10.1153H10.3351C12.4773 10.1153 14.2198 11.8578 14.2198 14H15.5581Z",
    fill: "black"
  }), React__default.createElement("path", {
    d: "M1.94727 6.18966C1.94727 7.29644 2.84795 8.19712 3.95472 8.19712H13.0516C14.1584 8.19712 15.0591 7.29644 15.0591 6.18966V2.00746C15.0591 0.900678 14.1584 0 13.0516 0H3.95472C2.84795 0 1.94727 0.900678 1.94727 2.00746V6.18966ZM3.28557 2.00746C3.28557 1.63853 3.5858 1.3383 3.95472 1.3383H13.0516C13.4206 1.3383 13.7208 1.63853 13.7208 2.00746V6.18966C13.7208 6.55859 13.4206 6.85881 13.0516 6.85881H3.95472C3.5858 6.85881 3.28557 6.55859 3.28557 6.18966V2.00746Z",
    fill: "black"
  }), React__default.createElement("path", {
    d: "M6.81682 2.51956H5.47852V5.67841H6.81682V2.51956Z",
    fill: "black"
  }), React__default.createElement("path", {
    d: "M11.7309 2.51956H10.3926V5.67841H11.7309V2.51956Z",
    fill: "black"
  }), React__default.createElement("path", {
    d: "M1.33831 2.58249H0V5.61464H1.33831V2.58249Z",
    fill: "black"
  }), React__default.createElement("path", {
    d: "M17.2797 2.58249H15.9414V5.61464H17.2797V2.58249Z",
    fill: "black"
  }));
};
Icon$7.displayName = 'Icon.Bot';

const Icon$8 = _ref => {
  let {
    className
  } = _ref;
  return React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "13",
    height: "10",
    fill: "none",
    className: className + ' fill',
    viewBox: "0 0 13 10"
  }, React__default.createElement("path", {
    fill: "#50E3C2",
    fillRule: "evenodd",
    d: "M12.339 1.707L4.652 9.394 0 4.742l1.414-1.414 3.238 3.238L10.925.293l1.414 1.414z",
    clipRule: "evenodd"
  }));
};
Icon$8.displayName = 'Icon.Check';

const Icon$9 = _ref => {
  let {
    className
  } = _ref;
  return React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: className + ' stroke',
    viewBox: "0 0 10 10"
  }, React__default.createElement("path", {
    fill: "#D8D8D8",
    fillRule: "evenodd",
    stroke: "#000",
    strokeLinecap: "square",
    strokeWidth: "1.5",
    d: "M5.337 5.013l3.324 3.325.107.107-.2.2-.107-.106-3.325-3.325L1.74 8.61l-.1.1-.214-.213.1-.1L4.922 5 1.604 1.682l-.107-.107.2-.201.107.107 3.319 3.318 3.273-3.273.1-.1.215.214-.1.1-3.274 3.273z"
  }));
};
Icon$9.displayName = 'Icon.Times';

const Icon$a = _ref => {
  let {
    className
  } = _ref;
  return React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: className + ' fill',
    width: "28",
    height: "28",
    fill: "none",
    viewBox: "0 0 28 28"
  }, React__default.createElement("path", {
    fill: "#000",
    d: "M17.754 5.123a8.81 8.81 0 00-8.682 7.119 5.55 5.55 0 00-2.388-.413c-2.93.13-5.252 2.627-5.252 5.687a5.373 5.373 0 005.36 5.362h11.374c4.645 0 8.444-3.777 8.444-8.444v-.065c0-.13.022-.239.022-.369 0-4.905-3.994-8.877-8.878-8.877zm7.076 9.116V14.564c-.065 3.625-3.039 6.534-6.663 6.534H6.792a3.585 3.585 0 01-3.582-3.582c0-2.062 1.607-3.82 3.56-3.907h.174c.846 0 1.628.283 2.3.782.261.195.608.239.912.108.304-.13.5-.434.521-.76a7.068 7.068 0 017.076-6.815c3.907 0 7.098 3.19 7.098 7.098 0 .065 0 .13-.022.217z"
  }));
};
Icon$a.displayName = 'Icon.Cloud';

const Icon$b = _ref => {
  let {
    className
  } = _ref;
  return React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "14",
    height: "16",
    fill: "none",
    viewBox: "0 0 14 16",
    className: className + ' fill'
  }, React__default.createElement("path", {
    fill: "#000",
    fillRule: "evenodd",
    d: "M10.01 0H1.43C.644 0 0 .655 0 1.455v10.181h1.43V1.455h8.58V0zm2.146 2.91H4.29c-.786 0-1.43.654-1.43 1.454v10.181c0 .8.644 1.455 1.43 1.455h7.866c.786 0 1.43-.655 1.43-1.454V4.364c0-.8-.644-1.455-1.43-1.455zm0 11.636H4.29V4.364h7.866v10.181z",
    clipRule: "evenodd"
  }));
};
Icon$b.displayName = 'Icon.Copy';

function Icon$c(_ref) {
  let {
    className
  } = _ref;
  return React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "22",
    height: "22",
    fill: "none",
    className: className + ' fill',
    viewBox: "0 0 22 22"
  }, React__default.createElement("path", {
    fill: "#000",
    d: "M10.81 21.581c5.953 0 10.79-4.837 10.79-10.79C21.6 4.837 16.763 0 10.81 0 4.855 0 0 4.837 0 10.79c0 5.954 4.856 10.791 10.81 10.791zm0-20.093c5.116 0 9.283 4.168 9.283 9.284 0 5.116-4.167 9.284-9.284 9.284-5.116 0-9.283-4.168-9.283-9.284 0-5.116 4.167-9.284 9.283-9.284z"
  }), React__default.createElement("path", {
    fill: "#000",
    d: "M12.652 13.602V9.35c0-.624-.507-1.13-1.13-1.13H9.44c-.623 0-1.13.506-1.13 1.13v1.07c0 .556.402 1.019.93 1.114v2.093a1.133 1.133 0 00-.93 1.113v1.07c0 .624.507 1.131 1.13 1.131h3.052c.624 0 1.131-.507 1.131-1.13v-1.07c0-.58-.423-1.06-.97-1.14zm-.26 2.108h-2.85v-.868h.184a.748.748 0 00.746-.747v-3.028a.748.748 0 00-.746-.746H9.54v-.87h1.88v4.624c0 .412.335.747.746.747h.225v.889zM10.872 7.851c.987 0 1.79-.802 1.79-1.79 0-.986-.803-1.789-1.79-1.789s-1.79.803-1.79 1.79.803 1.79 1.79 1.79zm0-2.347a.559.559 0 11-.002 1.117.559.559 0 01.002-1.117z"
  }));
}
Icon$c.displayName = 'Icon.Info';

function Icon$d(_ref) {
  let {
    className
  } = _ref;
  return React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "21",
    height: "21",
    fill: "none",
    viewBox: "0 0 21 21",
    className: className + ' fill'
  }, React__default.createElement("g", {
    fill: "#000",
    clipPath: "url(#clip0)"
  }, React__default.createElement("path", {
    d: "M21.018 10.075a10.245 10.245 0 00-3.174-7.209A10.244 10.244 0 0010.52.002a10.244 10.244 0 00-7.324 2.864A10.245 10.245 0 00.02 10.075v.017a9.91 9.91 0 003.294 7.327v2.539A1.04 1.04 0 004.344 21c.19 0 .378-.053.543-.156l2.04-1.275a10.78 10.78 0 003.572.607h.015l.202.002c2.67 0 5.195-1.013 7.128-2.866a10.245 10.245 0 003.174-7.209v-.028zm-4.026 6.347a9.023 9.023 0 01-6.46 2.523h-.014a9.588 9.588 0 01-3.319-.587.896.896 0 00-.788.081l-1.865 1.165V17.27a.901.901 0 00-.31-.68 8.677 8.677 0 01-2.984-6.495 9.02 9.02 0 012.795-6.338 9.027 9.027 0 016.46-2.523h.025a9.021 9.021 0 016.46 2.523 9.02 9.02 0 012.794 6.333 9.02 9.02 0 01-2.794 6.333z"
  }), React__default.createElement("path", {
    d: "M12.213 12.896V8.645c0-.624-.508-1.131-1.131-1.131H9c-.624 0-1.131.507-1.131 1.13v1.07c0 .557.402 1.02.931 1.114v2.094a1.133 1.133 0 00-.931 1.113v1.07c0 .624.507 1.131 1.13 1.131h3.053c.623 0 1.13-.507 1.13-1.131v-1.07c0-.58-.422-1.06-.97-1.14zm-.261 2.108h-2.85v-.868h.184a.748.748 0 00.747-.747V10.36a.748.748 0 00-.747-.747h-.184v-.868h1.879v4.623c0 .412.335.747.747.747h.224v.888zM10.432 7.145c.987 0 1.79-.802 1.79-1.79 0-.986-.803-1.79-1.79-1.79-.987.001-1.79.804-1.79 1.79 0 .988.803 1.79 1.79 1.79zm0-2.347a.559.559 0 11-.001 1.117.559.559 0 01.001-1.117z"
  })), React__default.createElement("defs", null, React__default.createElement("clipPath", {
    id: "clip0"
  }, React__default.createElement("path", {
    fill: "#fff",
    d: "M0 0H20.959V21H0z"
  }))));
}
Icon$d.displayName = 'Icon.InfoMsg';

const Icon$e = _ref => {
  let {
    className
  } = _ref;
  return React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: className + ' fill',
    fill: "none",
    viewBox: "0 0 25 18"
  }, React__default.createElement("path", {
    fill: "#000",
    d: "M24.3 17.858c0-3.508-2.845-6.362-6.342-6.362h-4.116c-3.497 0-6.342 2.854-6.342 6.362h1.625c0-2.61 2.116-4.732 4.717-4.732h4.116c2.601 0 4.717 2.123 4.717 4.732H24.3z"
  }), React__default.createElement("path", {
    fill: "#000",
    fillRule: "evenodd",
    d: "M15.906 1.542a3.758 3.758 0 00-3.752 3.763 3.758 3.758 0 003.752 3.764 3.758 3.758 0 003.751-3.764 3.758 3.758 0 00-3.751-3.763zm-5.29 3.763c0-2.93 2.369-5.305 5.29-5.305 2.92 0 5.289 2.375 5.289 5.305 0 2.93-2.369 5.306-5.29 5.306-2.92 0-5.288-2.376-5.288-5.306z",
    clipRule: "evenodd"
  }), React__default.createElement("path", {
    fill: "#000",
    d: "M9.815 3.421a4.236 4.236 0 00-2.119-.563c-2.327 0-4.213 1.862-4.213 4.159 0 2.297 1.886 4.16 4.213 4.16 1.34 0 2.532-.617 3.304-1.579a4.702 4.702 0 01-.884-.849 2.997 2.997 0 01-2.42 1.218c-1.65 0-2.989-1.32-2.989-2.95 0-1.63 1.338-2.95 2.99-2.95.592 0 1.144.17 1.609.464a4.59 4.59 0 01.51-1.11zM9.538 11.875a5.092 5.092 0 00-.207-.005h-3.28C3.267 11.87 1 14.108 1 16.858h1.295c0-2.046 1.685-3.71 3.757-3.71h1.74a5.612 5.612 0 011.746-1.273z"
  }), React__default.createElement("path", {
    fill: "#000",
    fillRule: "evenodd",
    d: "M7.696 2.958c-2.273 0-4.113 1.818-4.113 4.059 0 2.24 1.84 4.06 4.113 4.06 1.27 0 2.406-.57 3.16-1.462a4.808 4.808 0 01-.738-.705 3.098 3.098 0 01-2.422 1.158c-1.705 0-3.089-1.365-3.089-3.051 0-1.686 1.384-3.05 3.09-3.05.565 0 1.096.15 1.552.413a4.69 4.69 0 01.426-.922 4.137 4.137 0 00-1.979-.5zM3.383 7.017c0-2.353 1.932-4.26 4.313-4.26.79 0 1.532.21 2.169.578l.09.052-.055.088c-.212.335-.38.699-.499 1.085l-.038.125-.11-.07a2.903 2.903 0 00-1.557-.449c-1.597 0-2.889 1.278-2.889 2.851s1.292 2.85 2.89 2.85c.961 0 1.813-.464 2.338-1.177l.078-.105.081.102a4.6 4.6 0 00.865.83l.084.062-.065.082a4.326 4.326 0 01-3.382 1.615c-2.38 0-4.313-1.906-4.313-4.259zM.9 16.857c0-2.806 2.312-5.087 5.152-5.087H9.33c.07 0 .141.002.211.005l.039.19a5.511 5.511 0 00-1.715 1.251l-.03.032H6.052c-2.018 0-3.657 1.62-3.657 3.61v.1H.9v-.1zm.201-.1h1.095c.054-2.055 1.764-3.709 3.856-3.709h1.676c.39-.422.842-.786 1.344-1.078h-3.02c-2.698 0-4.897 2.14-4.95 4.788z",
    clipRule: "evenodd"
  }), React__default.createElement("path", {
    fill: "#000",
    d: "M24.3 17.858c0-3.508-2.845-6.362-6.342-6.362h-4.116c-3.497 0-6.342 2.854-6.342 6.362h1.625c0-2.61 2.116-4.732 4.717-4.732h4.116c2.601 0 4.717 2.123 4.717 4.732H24.3z"
  }), React__default.createElement("path", {
    fill: "#000",
    d: "M9.815 3.421a4.236 4.236 0 00-2.119-.563c-2.327 0-4.213 1.862-4.213 4.159 0 2.297 1.886 4.16 4.213 4.16 1.34 0 2.532-.617 3.304-1.579a4.702 4.702 0 01-.884-.849 2.997 2.997 0 01-2.42 1.218c-1.65 0-2.989-1.32-2.989-2.95 0-1.63 1.338-2.95 2.989-2.95.593 0 1.145.17 1.61.464a4.59 4.59 0 01.51-1.11zM9.538 11.875a5.093 5.093 0 00-.207-.005h-3.28C3.267 11.87 1 14.108 1 16.858h1.295c0-2.046 1.685-3.71 3.757-3.71h1.74a5.612 5.612 0 011.746-1.273z"
  }));
};
Icon$e.displayName = 'Icon.Network';

const Icon$f = _ref => {
  let {
    className
  } = _ref;
  return React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: className + ' fill',
    width: "30",
    height: "26",
    fill: "none",
    viewBox: "0 0 30 26"
  }, React__default.createElement("path", {
    fill: "#000",
    fillRule: "evenodd",
    d: "M1.5 1.5v15h19v-15h-19zM1 0a1 1 0 00-1 1v16a1 1 0 001 1h20a1 1 0 001-1V1a1 1 0 00-1-1H1z",
    clipRule: "evenodd"
  }), React__default.createElement("path", {
    fill: "#000",
    fillRule: "evenodd",
    d: "M22 6H0V4.5h22V6z",
    clipRule: "evenodd"
  }), React__default.createElement("path", {
    fill: "#000",
    d: "M19 2.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
  }), React__default.createElement("path", {
    fill: "#000",
    stroke: "#fff",
    strokeLinecap: "square",
    strokeWidth: "2",
    d: "M20.476 10.017h-1v5.375h-5.458v3.62h5.458v5.571H23.116v-5.57h5.468v-3.62h-5.467v-5.376h-2.641z"
  }));
};
Icon$f.displayName = 'Icon.New';

function Icon$g(_ref) {
  let {
    className
  } = _ref;
  return React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "18",
    height: "18",
    fill: "none",
    className: className + ' fill',
    viewBox: "0 0 18 18"
  }, React__default.createElement("path", {
    fill: "#000",
    d: "M.06 13.512L.042 17.14c0 .204.074.409.223.558a.745.745 0 00.54.223l3.609-.019c.204 0 .39-.074.54-.223L17.418 5.214a.786.786 0 000-1.098L13.846.506a.786.786 0 00-1.097 0L10.256 3.02.284 12.972a.828.828 0 00-.224.54zM13.307 2.144l2.511 2.512-1.413 1.414-2.512-2.512 1.414-1.414zM1.605 13.847l9.19-9.191 2.512 2.511-9.19 9.173-2.531.018.019-2.511z"
  }));
}
Icon$g.displayName = 'Icon.Pencil';

const Icon$h = _ref => {
  let {
    className
  } = _ref;
  return React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: className + ' stroke',
    viewBox: "0 0 12 12"
  }, React__default.createElement("path", {
    fill: "#D8D8D8",
    fillRule: "evenodd",
    stroke: "#000",
    strokeLinecap: "square",
    strokeWidth: "1.5",
    d: "M6.147 5.771H11v.284H6.147V11h-.302V6.055H1v-.284h4.845V1h.302v4.772z"
  }));
};
Icon$h.displayName = 'Icon.Plus';

const Icon$i = _ref => {
  let {
    className
  } = _ref;
  return React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: className + ' stroke',
    fill: "none",
    viewBox: "0 0 18 18"
  }, React__default.createElement("path", {
    fill: "#000",
    d: "M12.13 11.75A6.988 6.988 0 0014 7c0-3.854-3.136-7-7-7S0 3.146 0 7c0 3.853 3.135 6.999 7 6.999 1.572 0 3.019-.518 4.19-1.394l5.205 5.205c.127.127.285.19.444.19a.607.607 0 00.443-.19.644.644 0 000-.897L12.13 11.75zM1.267 7a5.738 5.738 0 015.732-5.733 5.738 5.738 0 015.733 5.732 5.731 5.731 0 01-5.733 5.733 5.738 5.738 0 01-5.732-5.733z"
  }));
};
Icon$i.displayName = 'Icon.Search';

const Icon$j = _ref => {
  let {
    className
  } = _ref;
  return React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: className + ' fill',
    viewBox: "0 0 22 21",
    fill: "none"
  }, React__default.createElement("path", {
    d: "M19.9718 8.14773C19.6525 8.09994 19.3245 8.05352 18.9942 8.00945C18.8278 7.45594 18.6055 6.9193 18.3312 6.40963C18.5333 6.14526 18.7325 5.88042 18.925 5.62025C19.3525 5.0422 19.2906 4.22239 18.7814 3.71336L17.5053 2.43747C16.996 1.92812 16.1762 1.86637 15.5983 2.29395C15.3373 2.48712 15.0725 2.68626 14.809 2.88766C14.2994 2.61337 13.7628 2.39106 13.2091 2.22453C13.165 1.89422 13.1187 1.56624 13.0709 1.24699C12.9646 0.536154 12.3413 0 11.6211 0H9.81648C9.09628 0 8.47295 0.536154 8.36664 1.24691C8.31893 1.566 8.2726 1.89405 8.22844 2.22445C7.67477 2.39098 7.13813 2.61328 6.62862 2.88758C6.36522 2.6861 6.1003 2.48687 5.83932 2.29387C5.26128 1.86629 4.44146 1.92804 3.93235 2.43731L2.65646 3.71312C2.14711 4.22231 2.0852 5.0422 2.51278 5.62033C2.70514 5.88042 2.90436 6.14534 3.10641 6.40963C2.83228 6.91922 2.60989 7.45578 2.44336 8.00945C2.11313 8.05361 1.78507 8.09994 1.46582 8.14773C0.754903 8.25412 0.21875 8.87737 0.21875 9.59765V11.4022C0.21875 12.1224 0.754743 12.7457 1.46566 12.8521C1.78499 12.8999 2.11297 12.9463 2.44328 12.9904C2.60981 13.544 2.83211 14.0805 3.10633 14.5902C2.90444 14.8543 2.70522 15.1191 2.51246 15.3796C2.08512 15.9575 2.14687 16.7774 2.65614 17.2864L3.93219 18.5624C4.44138 19.0718 5.26119 19.1335 5.83916 18.706C6.10022 18.513 6.36498 18.3137 6.62846 18.1123C7.13822 18.3866 7.67485 18.6089 8.22836 18.7754C8.27236 19.1056 8.31877 19.4337 8.36656 19.753C8.47295 20.4638 9.09628 21 9.81648 21H11.6211C12.3413 21 12.9646 20.464 13.0709 19.7529C13.1186 19.4336 13.165 19.1056 13.2091 18.7753C13.7627 18.6089 14.2993 18.3865 14.809 18.1122C15.0724 18.3137 15.3373 18.5129 15.5983 18.706C16.1761 19.1336 16.9961 19.0718 17.5052 18.5625L18.7813 17.2866C19.2905 16.7774 19.3524 15.9576 18.9248 15.3795C18.7322 15.1191 18.533 14.8542 18.3312 14.5903C18.6053 14.0807 18.8277 13.5442 18.9942 12.9905C19.3244 12.9463 19.6525 12.9 19.9718 12.8522C20.6827 12.7458 21.2188 12.1225 21.2188 11.4023V9.59773C21.2187 8.87745 20.6827 8.25412 19.9718 8.14773ZM19.4613 11.1511C19.1713 11.1931 18.8755 11.234 18.5787 11.2726C17.9916 11.3492 17.511 11.7659 17.3545 12.334C17.2046 12.878 16.9871 13.403 16.708 13.8942C16.4165 14.4071 16.4615 15.0417 16.8226 15.5112C17.0046 15.7479 17.1852 15.9861 17.3609 16.2215L16.4403 17.1421C16.2042 16.9659 15.966 16.7854 15.7298 16.6038C15.2605 16.2426 14.6257 16.1979 14.1128 16.4891C13.6215 16.7682 13.0965 16.9858 12.5529 17.1357C11.9844 17.2923 11.5677 17.7729 11.4914 18.3598C11.4527 18.6566 11.4119 18.9526 11.3698 19.2425H10.0678C10.0257 18.9526 9.98495 18.6567 9.9462 18.3602C9.8696 17.773 9.45299 17.2924 8.88471 17.1358C8.34089 16.9859 7.81612 16.7684 7.3246 16.4893C6.8117 16.1979 6.1769 16.2427 5.70767 16.6038C5.47139 16.7855 5.23334 16.9659 4.99707 17.1421L4.07652 16.2215C4.25225 15.9859 4.43275 15.7478 4.61502 15.5109C4.97584 15.0415 5.02081 14.4069 4.7294 13.8941C4.45035 13.4028 4.2328 12.8778 4.0829 12.334C3.92638 11.7657 3.44584 11.3491 2.85875 11.2725C2.56194 11.2337 2.26601 11.193 1.97606 11.1508V9.84894C2.26601 9.80688 2.56186 9.76604 2.85867 9.72737C3.44576 9.65077 3.92638 9.23408 4.08282 8.66596C4.23272 8.12206 4.45018 7.59712 4.72932 7.10577C5.0208 6.59295 4.97584 5.95823 4.61494 5.48883C4.43259 5.25184 4.25209 5.01371 4.07652 4.77848L4.99707 3.85785C5.23318 4.03407 5.47131 4.21456 5.70742 4.3961C6.17658 4.75733 6.81129 4.80238 7.3246 4.51089C7.81579 4.23184 8.34081 4.01429 8.88455 3.86431C9.45299 3.70771 9.86968 3.22709 9.94604 2.64017C9.98479 2.34335 10.0256 2.04751 10.0677 1.75755H11.3697C11.4118 2.04743 11.4526 2.34327 11.4912 2.63992C11.5678 3.22709 11.9845 3.70771 12.5527 3.86423C13.0966 4.01413 13.6216 4.23176 14.1129 4.51081C14.6259 4.8023 15.2606 4.75701 15.7298 4.39619C15.966 4.21456 16.2041 4.03407 16.4403 3.85785L17.3609 4.77848C17.1853 5.01379 17.0048 5.252 16.8225 5.48908C16.4616 5.95839 16.4167 6.59303 16.7079 7.10585C16.987 7.59729 17.2045 8.1223 17.3544 8.66604C17.511 9.23432 17.9915 9.65093 18.5786 9.72753C18.8754 9.76628 19.1713 9.80704 19.4613 9.84918V11.1511Z",
    fill: "#000"
  }), React__default.createElement("path", {
    d: "M10.7248 6.29998C8.40559 6.29998 6.5187 8.18679 6.5187 10.5061C6.5187 12.8254 8.4055 14.7122 10.7248 14.7122C13.0441 14.7122 14.9309 12.8254 14.9309 10.5061C14.9309 8.18679 13.0441 6.29998 10.7248 6.29998ZM10.7248 12.8425C9.43661 12.8425 8.38837 11.7943 8.38837 10.506C8.38837 9.21762 9.43651 8.16956 10.7248 8.16956C12.013 8.16956 13.0611 9.21771 13.0612 10.506C13.0612 11.7943 12.013 12.8425 10.7248 12.8425Z",
    fill: "#000"
  }));
};
Icon$j.displayName = 'Icon.Settings';

function Icon$k(_ref) {
  let {
    className
  } = _ref;
  return React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "18",
    height: "18",
    fill: "none",
    className: className + ' fill',
    viewBox: "0 0 18 18"
  }, React__default.createElement("path", {
    fill: "#000",
    d: "M13.556 3.886L12.6 14.784H5.59L4.632 3.886l-1.212.106.974 11.096c.051.511.495.912 1.01.912h7.379c.515 0 .959-.4 1.011-.92l.973-11.088-1.212-.106z"
  }), React__default.createElement("path", {
    fill: "#000",
    d: "M11.324 1H6.865c-.559 0-1.014.455-1.014 1.014v1.925h1.217V2.216h4.054V3.94h1.216V2.014c0-.56-.455-1.014-1.014-1.014z"
  }), React__default.createElement("path", {
    fill: "#000",
    d: "M15.581 3.331H2.608a.608.608 0 100 1.216h12.973a.608.608 0 100-1.216z"
  }));
}
Icon$k.displayName = 'Icon.Trash';

const Icon$l = _ref => {
  let {
    className
  } = _ref;
  return React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "30",
    height: "23",
    fill: "none",
    className: className + ' fill',
    viewBox: "0 0 30 23"
  }, React__default.createElement("path", {
    fill: "#000",
    d: "M29.718 15.43a2.022 2.022 0 000-2.06l-1.257-2.09a.065.065 0 010-.067l1.257-2.09a2.021 2.021 0 000-2.06l-1.257-2.09a.065.065 0 010-.067l1.002-1.666c.288-.48.306-1.086.045-1.582A1.473 1.473 0 0028.21.853H1.79c-.54 0-1.037.308-1.298.804A1.624 1.624 0 00.537 3.24l1.002 1.667a.065.065 0 010 .066L.282 7.063a2.021 2.021 0 000 2.061l1.257 2.09a.065.065 0 010 .067L.282 13.37a2.02 2.02 0 000 2.06l1.257 2.09a.065.065 0 010 .066L.537 19.254a1.624 1.624 0 00-.045 1.582c.26.497.758.805 1.298.805h26.42c.54 0 1.037-.308 1.298-.805a1.623 1.623 0 00-.045-1.582l-1.002-1.667a.065.065 0 010-.067l1.257-2.09zm-1.504-.997l-1.257 2.09a2.02 2.02 0 000 2.06l.716 1.19h-6.37v-.061c0-.516-.399-.934-.89-.934-.49 0-.889.418-.889.934v.062H2.327l.716-1.19a2.021 2.021 0 000-2.06l-1.257-2.09a.065.065 0 010-.066l1.257-2.09a2.02 2.02 0 000-2.061l-1.257-2.09a.065.065 0 010-.067l1.257-2.09a2.022 2.022 0 000-2.06l-.716-1.19h17.197v.062c0 .516.398.934.89.934.49 0 .888-.418.888-.934V2.72h6.37l-.715 1.189a2.02 2.02 0 000 2.06l1.257 2.09a.065.065 0 010 .067l-1.257 2.09a2.02 2.02 0 000 2.06l1.257 2.09a.065.065 0 010 .067z"
  }), React__default.createElement("path", {
    fill: "#000",
    d: "M20.413 5.67c-.49 0-.889.42-.889.935v.546c0 .515.398.933.89.933.49 0 .888-.418.888-.933v-.546c0-.516-.398-.934-.889-.934zM20.413 14.409c-.49 0-.889.418-.889.933v.547c0 .515.398.933.89.933.49 0 .888-.418.888-.933v-.547c0-.515-.398-.933-.889-.933zM20.413 10.04c-.49 0-.889.418-.889.934v.546c0 .515.398.933.89.933.49 0 .888-.418.888-.933v-.546c0-.516-.398-.934-.889-.934zM11.992 10.184c-1.218-.53-1.424-.805-1.424-1.22 0-.382.269-.789 1.023-.789.79 0 1.288.3 1.501.426.105.064.23.075.345.032a.424.424 0 00.248-.255l.338-.939a.444.444 0 00-.178-.529 3.74 3.74 0 00-1.556-.527v-.975a.425.425 0 00-.414-.435h-.84a.425.425 0 00-.414.435v1.085c-1.263.351-2.046 1.36-2.046 2.642 0 .714.238 1.3.727 1.794.39.394.952.733 1.767 1.069 1.118.476 1.272.901 1.272 1.29 0 .573-.481.959-1.198.959a3.07 3.07 0 01-1.72-.539.396.396 0 00-.36-.05.422.422 0 00-.26.266l-.325.952a.45.45 0 00.149.5c.462.347 1.169.6 1.9.68v1.03c0 .24.185.434.413.434h.854a.425.425 0 00.414-.435v-1.128c1.301-.367 2.14-1.449 2.14-2.769 0-.732-.206-1.334-.63-1.84-.38-.453-.93-.824-1.726-1.164z"
  }));
};
Icon$l.displayName = 'Icon.Ticket';

const Icon$m = _ref => {
  let {
    className
  } = _ref;
  return React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "30",
    height: "23",
    fill: "none",
    className: className + ' fill',
    viewBox: "0 0 30 23"
  }, React__default.createElement("g", {
    fill: "#000",
    clipPath: "url(#clip0)"
  }, React__default.createElement("path", {
    d: "M11.77 9.711c-1.196-.533-1.398-.81-1.398-1.228 0-.384.264-.794 1.003-.794.776 0 1.265.3 1.474.429a.38.38 0 00.338.032.423.423 0 00.243-.257l.332-.945a.453.453 0 00-.174-.533 3.608 3.608 0 00-1.527-.531v-.982c0-.241-.183-.438-.407-.438h-.824c-.224 0-.406.197-.406.438v1.093c-1.24.354-2.008 1.369-2.008 2.66 0 .72.233 1.31.713 1.807.383.396.934.739 1.734 1.076 1.098.48 1.249.908 1.249 1.3 0 .577-.473.965-1.176.965a2.96 2.96 0 01-1.689-.542.38.38 0 00-.353-.052.42.42 0 00-.255.268l-.32.96a.46.46 0 00.147.504c.454.349 1.147.603 1.865.685v1.036c0 .241.182.437.406.437h.837c.225 0 .407-.196.407-.438v-1.136c1.277-.37 2.1-1.459 2.1-2.788 0-.738-.202-1.344-.618-1.853-.374-.457-.912-.83-1.693-1.173zM28.656 18.399c-.715 1.332-1.867 2.358-3.245 2.85h2.277c.53 0 1.018-.31 1.274-.81s.239-1.11-.044-1.594l-.262-.446z"
  }), React__default.createElement("path", {
    d: "M21.7 21.249H1.757c-.53 0-1.018-.31-1.274-.81s-.24-1.111.044-1.594l.984-1.678a.067.067 0 000-.067L.277 14.995a2.08 2.08 0 010-2.075l1.234-2.104a.068.068 0 000-.067L.277 8.644a2.081 2.081 0 010-2.075l1.234-2.105a.067.067 0 000-.067L.527 2.718a1.672 1.672 0 01-.044-1.593c.256-.5.744-.81 1.273-.81h25.932c.53 0 1.018.31 1.274.81.255.5.239 1.11-.044 1.593l-.985 1.679a.066.066 0 000 .067l1.234 2.104c.37.63.37 1.445 0 2.075l-1.234 2.105a.067.067 0 000 .067l.53.902a6.124 6.124 0 00-1.988-2.002l1.217-2.076a.067.067 0 000-.067l-1.234-2.104a2.08 2.08 0 010-2.075l.702-1.198h-6.252v.063c0 .519-.39.94-.873.94-.482 0-.872-.421-.872-.94v-.063H2.284l.703 1.198c.37.63.37 1.445 0 2.075L1.753 7.573a.067.067 0 000 .067l1.234 2.105c.37.63.37 1.444 0 2.075l-1.234 2.104a.067.067 0 000 .067l1.234 2.105c.37.63.37 1.445 0 2.075l-.703 1.197h16.811A5.892 5.892 0 0021.7 21.25zM28.61 11.97c.407.73.68 1.555.786 2.437.11-.5.033-1.04-.229-1.488l-.556-.95z"
  }), React__default.createElement("path", {
    d: "M27.168 9.678c-1.373-1.111-3.066-1.58-4.767-1.32l-.933.142 1.285-1.847-.953-.77-2.503 3.598 3.295 2.714.724-1.02-1.703-1.401.956-.146c2.86-.438 5.517 1.714 5.923 4.795.406 3.082-1.591 5.944-4.451 6.382-2.86.437-5.518-1.715-5.924-4.796l-.084-.635-1.178.18.083.635c.242 1.832 1.13 3.453 2.504 4.565 1.373 1.111 3.065 1.58 4.766 1.32 1.7-.26 3.205-1.217 4.237-2.696 1.032-1.48 1.467-3.303 1.226-5.135-.241-1.832-1.13-3.453-2.503-4.565z"
  }), React__default.createElement("path", {
    fillRule: "evenodd",
    d: "M21.765 5.617L23 6.615l-1.135 1.632.512-.078c1.747-.267 3.486.215 4.897 1.357 1.41 1.142 2.324 2.808 2.572 4.69.248 1.882-.2 3.757-1.26 5.276-1.06 1.52-2.606 2.504-4.353 2.771-1.747.267-3.487-.215-4.898-1.357-1.41-1.142-2.324-2.808-2.572-4.69l-.108-.824 1.529-.233.108.823c.392 2.978 2.96 5.056 5.724 4.634 2.764-.422 4.693-3.189 4.301-6.166-.392-2.977-2.96-5.056-5.724-4.634l-.537.082 1.507 1.242-.938 1.321-3.574-2.944 2.714-3.9zm.07.533l-2.291 3.294 3.015 2.484.51-.717L21.17 9.65l1.373-.21c2.957-.452 5.703 1.772 6.123 4.957.42 3.186-1.645 6.145-4.602 6.597-2.957.452-5.703-1.772-6.123-4.957l-.058-.447-.83.127.06.446c.234 1.782 1.098 3.358 2.434 4.44 1.335 1.081 2.98 1.537 4.635 1.284 1.654-.253 3.117-1.184 4.12-2.623 1.004-1.438 1.428-3.211 1.193-4.993-.235-1.782-1.099-3.358-2.435-4.44-1.335-1.08-2.98-1.537-4.635-1.284l-1.355.207 1.435-2.062-.67-.54z",
    clipRule: "evenodd"
  })), React__default.createElement("defs", null, React__default.createElement("clipPath", {
    id: "clip0"
  }, React__default.createElement("path", {
    fill: "#fff",
    d: "M0 0H30V22.5H0z"
  }))));
};
Icon$m.displayName = 'Icon.TicketRecurring';

const Icon$n = _ref => {
  let {
    className
  } = _ref;
  return React__default.createElement("svg", {
    className: className + ' fill',
    width: "17",
    height: "18",
    viewBox: "0 0 17 18",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, React__default.createElement("path", {
    d: "M16.8001 18C16.8001 14.492 13.9551 11.6382 10.458 11.6382H6.34162C2.84498 11.6382 0 14.492 0 18H1.62509C1.62509 15.3908 3.74095 13.2684 6.34162 13.2684H10.458C13.0592 13.2684 15.175 15.3908 15.175 18H16.8001Z",
    fill: "black"
  }), React__default.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M8.40559 1.68385C6.33344 1.68385 4.65364 3.36885 4.65364 5.44741C4.65364 7.52596 6.33344 9.21097 8.40559 9.21097C10.4777 9.21097 12.1575 7.52596 12.1575 5.44741C12.1575 3.36885 10.4777 1.68385 8.40559 1.68385ZM3.1167 5.44741C3.1167 2.51739 5.48462 0.142151 8.40559 0.142151C11.3266 0.142151 13.6945 2.51739 13.6945 5.44741C13.6945 8.37742 11.3266 10.7527 8.40559 10.7527C5.48462 10.7527 3.1167 8.37742 3.1167 5.44741Z",
    fill: "black"
  }));
};
Icon$n.displayName = 'Icon.User';

const Icon$o = _ref => {
  let {
    className
  } = _ref;
  return React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: className + ' fill',
    viewBox: "0 0 18 14",
    fill: "none"
  }, React__default.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M1.44792 1.16667V12.8333H16.2257V1.16667H1.44792ZM1.05903 0C0.629473 0 0.28125 0.348223 0.28125 0.777778V13.2222C0.28125 13.6518 0.629473 14 1.05903 14H16.6146C17.0441 14 17.3924 13.6518 17.3924 13.2222V0.777778C17.3924 0.348223 17.0441 0 16.6146 0H1.05903Z",
    fill: "black"
  }), React__default.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M17.3924 4.66669H0.28125V3.50002H17.3924V4.66669Z",
    fill: "black"
  }), React__default.createElement("path", {
    d: "M15.0592 2.13888C15.0592 2.46104 14.7981 2.72221 14.4759 2.72221C14.1537 2.72221 13.8926 2.46104 13.8926 2.13888C13.8926 1.81671 14.1537 1.55554 14.4759 1.55554C14.7981 1.55554 15.0592 1.81671 15.0592 2.13888Z",
    fill: "black"
  }));
};
Icon$o.displayName = 'Icon.Window';

const Icon$p = _ref => {
  let {
    className
  } = _ref;
  return React__default.createElement("svg", {
    className: className + ' fill',
    width: "18",
    height: "22",
    viewBox: "0 0 18 22",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, React__default.createElement("path", {
    d: "M15.9074 3.75557C14.2585 1.36903 11.6451 0 8.73789 0C5.8307 0 3.21731 1.36903 1.56833 3.75557C-0.0725558 6.13005 -0.451442 9.13621 0.55279 11.7921C0.821398 12.5174 1.24838 13.2221 1.81884 13.8824L8.16291 21.3341C8.30639 21.5028 8.51661 21.6 8.73789 21.6C8.95916 21.6 9.16938 21.5028 9.31286 21.3341L15.6552 13.8844C16.2282 13.2203 16.6546 12.5164 16.921 11.7969C17.9272 9.13621 17.5483 6.13005 15.9074 3.75557ZM15.5067 11.268C15.3013 11.8231 14.9659 12.3719 14.5105 12.8998L14.5069 12.9038L8.73789 19.6799L2.96528 12.8996C2.51012 12.3722 2.17477 11.8234 1.96734 11.263C1.13683 9.06647 1.45202 6.58096 2.81071 4.61455C4.17366 2.64187 6.33417 1.51048 8.73789 1.51048C11.1416 1.51048 13.3018 2.64182 14.6648 4.61455C16.0238 6.58096 16.3392 9.06647 15.5067 11.268Z",
    fill: "black"
  }), React__default.createElement("path", {
    d: "M8.73795 4.48119C6.40599 4.48119 4.50857 6.37836 4.50857 8.71057C4.50857 11.0428 6.40574 12.94 8.73795 12.94C11.0702 12.94 12.9673 11.0428 12.9673 8.71057C12.9673 6.37862 11.0699 4.48119 8.73795 4.48119ZM8.73795 11.4294C7.23878 11.4294 6.01905 10.2097 6.01905 8.71053C6.01905 7.21136 7.23878 5.99163 8.73795 5.99163C10.2371 5.99163 11.4568 7.21136 11.4568 8.71053C11.4568 10.2097 10.2371 11.4294 8.73795 11.4294Z",
    fill: "black"
  }));
};
Icon$p.displayName = 'Icon.MapMarker';

const Icon$q = _ref => {
  let {
    className
  } = _ref;
  return React__default.createElement("svg", {
    className: className + ' fill',
    width: "20",
    height: "18",
    viewBox: "0 0 20 18",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, React__default.createElement("path", {
    d: "M14.3575 0C12.6549 0 11.0611 0.726824 10 1.94461C8.93886 0.726782 7.34514 0 5.64255 0C2.53125 0 0 2.38662 0 5.32023C0 7.61737 1.45275 10.2744 4.3178 13.2174C6.52268 15.4823 8.92123 17.2359 9.60382 17.7195L9.99987 18L10.3959 17.7195C11.0785 17.236 13.4771 15.4824 15.6821 13.2175C18.5472 10.2745 20 7.61741 20 5.32023C20 2.38662 17.4687 0 14.3575 0ZM14.7106 12.3767C12.897 14.2396 10.9458 15.7455 9.99987 16.4395C9.05393 15.7455 7.10286 14.2395 5.28927 12.3766C2.69169 9.70836 1.31868 7.26828 1.31868 5.32023C1.31868 3.07225 3.25837 1.24335 5.64255 1.24335C7.21152 1.24335 8.66022 2.04963 9.42334 3.34757L10 4.32841L10.5767 3.34757C11.3397 2.04967 12.7884 1.24335 14.3575 1.24335C16.7416 1.24335 18.6813 3.0722 18.6813 5.32023C18.6813 7.26836 17.3083 9.70844 14.7106 12.3767Z",
    fill: "black"
  }));
};
Icon$q.displayName = 'Icon.Heart';

const Icon$r = _ref => {
  let {
    className
  } = _ref;
  return React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "14",
    height: "14",
    fill: "none",
    className: className + ' fill',
    viewBox: "0 0 14 14"
  }, React__default.createElement("g", {
    fill: "#424242",
    clipPath: "url(#clip0)"
  }, React__default.createElement("path", {
    d: "M13.94 12.687L7.425.846a.485.485 0 00-.85 0L.06 12.686a.485.485 0 00.425.72h13.03a.484.484 0 00.425-.72zm-12.636-.251L7 2.085l5.696 10.35H1.304z"
  }), React__default.createElement("path", {
    d: "M6.393 5.547V9.05a.607.607 0 001.214 0V5.547a.607.607 0 00-1.214 0zM7 10.288a.64.64 0 100 1.28.64.64 0 000-1.28z"
  })), React__default.createElement("defs", null, React__default.createElement("clipPath", {
    id: "clip0"
  }, React__default.createElement("path", {
    fill: "#fff",
    d: "M0 0H14V14H0z"
  }))));
};
Icon$r.displayName = 'Icon.Warning';

const Icon$s = _ref => {
  let {
    className
  } = _ref;
  return React__default.createElement("svg", {
    className: className + ' fill',
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, React__default.createElement("path", {
    d: "M16.0002 7.79396C16.0002 12.0985 12.4839 15.5879 8.14553 15.5879C6.76826 15.5879 5.47438 15.2359 4.34868 14.6181L0 16L1.4178 11.8183C0.702587 10.6439 0.29067 9.26649 0.29067 7.79396C0.29067 3.48942 3.80734 0 8.14553 0C12.4842 0 16.0002 3.48942 16.0002 7.79396ZM8.14553 1.24124C4.50388 1.24124 1.54171 4.1808 1.54171 7.79396C1.54171 9.22773 2.00909 10.5556 2.79968 11.6357L1.9746 14.0693L4.51241 13.2628C5.55509 13.9474 6.80418 14.3467 8.1457 14.3467C11.7868 14.3467 14.7495 11.4075 14.7495 7.79431C14.7495 4.18116 11.787 1.24124 8.14553 1.24124ZM12.112 9.58898C12.0634 9.50951 11.9353 9.46151 11.7429 9.36604C11.5502 9.27058 10.6033 8.80818 10.4273 8.74471C10.2508 8.68107 10.1221 8.64907 9.99391 8.84018C9.86573 9.03147 9.49665 9.46151 9.38412 9.58898C9.27176 9.7168 9.15958 9.7328 8.96687 9.63716C8.77451 9.54169 8.15424 9.33973 7.41876 8.68907C6.84649 8.18276 6.45999 7.55769 6.34764 7.36622C6.23546 7.17511 6.3359 7.07182 6.43208 6.97671C6.51884 6.89102 6.6248 6.7536 6.72097 6.64213C6.81751 6.53049 6.84951 6.45102 6.91333 6.32338C6.97787 6.19591 6.94569 6.08444 6.89733 5.98862C6.84933 5.89316 6.4639 4.95307 6.30355 4.57049C6.14319 4.18827 5.98301 4.25191 5.87047 4.25191C5.7583 4.25191 5.62976 4.23591 5.5014 4.23591C5.37305 4.23591 5.16433 4.28373 4.9878 4.47484C4.81144 4.66613 4.31419 5.12836 4.31419 6.06827C4.31419 7.00836 5.0038 7.91662 5.10033 8.04391C5.19651 8.1712 6.4319 10.163 8.38926 10.928C10.3468 11.6926 10.3468 11.4375 10.6999 11.4055C11.0526 11.3737 11.8387 10.9435 11.9998 10.4976C12.1598 10.051 12.1598 9.66862 12.112 9.58898Z",
    fill: "black"
  }));
};
Icon$s.displayName = 'Icon.Eye';

const Icon$t = _ref => {
  let {
    className
  } = _ref;
  return React__default.createElement("svg", {
    width: "24",
    className: className + ' fill',
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, React__default.createElement("path", {
    d: "M12.0371 6.75351C6.75341 6.75351 1.63714 11.7954 1.43248 12.0186C1.28365 12.1675 1.20923 12.3535 1.20923 12.5582C1.20923 12.7628 1.28365 12.9489 1.43248 13.0977C1.65574 13.321 6.75341 18.3628 12.0371 18.3628C17.3209 18.3628 22.4371 13.321 22.6418 13.0977C22.7906 12.9489 22.865 12.7628 22.865 12.5582C22.865 12.3535 22.7906 12.1675 22.6418 12.0186C22.4371 11.7954 17.3395 6.75351 12.0371 6.75351ZM12.0371 16.8186C8.33481 16.8186 4.52086 13.8047 3.0883 12.5396C4.52086 11.2744 8.33481 8.26049 12.0371 8.26049C15.7395 8.26049 19.5534 11.2744 20.986 12.5396C19.5534 13.8047 15.7395 16.8186 12.0371 16.8186Z",
    fill: "black"
  }), React__default.createElement("path", {
    d: "M9.30225 12.5396C9.30225 14.0465 10.5302 15.293 12.0557 15.293C13.5813 15.293 14.8092 14.0651 14.8092 12.5396C14.8092 11.014 13.5813 9.78607 12.0557 9.78607C10.5302 9.78607 9.30225 11.0326 9.30225 12.5396ZM13.265 12.5396C13.265 13.2093 12.7255 13.7675 12.0371 13.7675C11.3674 13.7675 10.8092 13.2279 10.8092 12.5396C10.8092 11.8512 11.3488 11.3117 12.0371 11.3117C12.7069 11.3303 13.265 11.8698 13.265 12.5396Z",
    fill: "black"
  }));
};
Icon$t.displayName = 'Icon.Show';

const Icon$u = _ref => {
  let {
    className
  } = _ref;
  return React__default.createElement("svg", {
    className: className + ' fill',
    width: "25",
    height: "25",
    viewBox: "0 0 25 25",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, React__default.createElement("mask", {
    id: "path-1-inside-1",
    fill: "white"
  }, React__default.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M12.5009 3.18628C12.907 3.18628 13.2362 2.85706 13.2362 2.45098V0.735295C13.2362 0.329216 12.907 0 12.5009 0C12.0948 0 11.7656 0.329216 11.7656 0.735295V2.45098C11.7656 2.85706 12.0948 3.18628 12.5009 3.18628ZM12.5 6.03516C17.7504 6.03516 22.561 9.26579 24.8332 12.0341C25.0557 12.3053 25.0557 12.6957 24.8332 12.9669C22.6596 15.6151 17.8695 18.9659 12.5 18.9659C7.31483 18.9659 2.49292 15.8022 0.166838 12.9669C-0.0556128 12.6957 -0.0556128 12.3053 0.166838 12.0341C2.42003 9.28776 7.23086 6.03516 12.5 6.03516ZM12.5 17.4953C15.2542 17.4953 17.4948 15.2546 17.4948 12.5005C17.4948 9.74668 15.2544 7.50575 12.5 7.5057C9.74581 7.5057 7.50518 9.74638 7.50518 12.5005C7.50518 15.2545 9.74577 17.4953 12.5 17.4953ZM7.35287 8.5928C4.55165 9.78423 2.55615 11.6406 1.72856 12.5007C3.24365 14.0782 5.22218 15.5044 7.35204 16.4071C5.59424 14.0964 5.59493 10.9027 7.35287 8.5928ZM17.648 8.59388C19.4058 10.9046 19.4051 14.0983 17.6472 16.4082C20.4484 15.2167 22.4439 13.3605 23.2715 12.5003C21.7564 10.9228 19.7778 9.49658 17.648 8.59388ZM12.499 15C11.1205 15 9.99902 13.8785 9.99902 12.5C9.99902 11.1215 11.1205 10 12.499 10C13.8775 10 14.999 11.1215 14.999 12.5C14.999 13.8785 13.8775 15 12.499 15ZM12.499 13.5294C13.0666 13.5294 13.5284 13.0676 13.5284 12.5C13.5284 11.9323 13.0666 11.4706 12.499 11.4706C11.9314 11.4706 11.4696 11.9323 11.4696 12.5C11.4696 13.0676 11.9314 13.5294 12.499 13.5294ZM17.8897 3.89547C17.6885 4.24841 17.2393 4.37101 16.8867 4.16993C16.534 3.9687 16.4112 3.51964 16.6123 3.16694L17.5909 1.45125C17.7921 1.09841 18.241 0.975615 18.5939 1.17679C18.9466 1.37802 19.0694 1.82704 18.8683 2.17978L17.8897 3.89547ZM7.11039 3.89546C7.31157 4.24821 7.76059 4.37105 8.11338 4.16987C8.46613 3.9687 8.58897 3.51963 8.3878 3.16688L7.40927 1.4512C7.20809 1.09845 6.75897 0.975607 6.40627 1.17678C6.05353 1.37796 5.93068 1.82703 6.13186 2.17977L7.11039 3.89546ZM11.7656 22.5493C11.7656 22.1432 12.0948 21.814 12.5009 21.814C12.907 21.814 13.2362 22.1432 13.2362 22.5493V24.265C13.2362 24.671 12.907 25.0003 12.5009 25.0003C12.0948 25.0003 11.7656 24.671 11.7656 24.265V22.5493ZM8.11338 20.8301C7.76063 20.629 7.31161 20.7517 7.11039 21.1045L6.13186 22.8202C5.93068 23.1729 6.05353 23.622 6.40627 23.8232C6.75907 24.0243 7.20809 23.9015 7.40926 23.5488L8.38779 21.8331C8.58902 21.4803 8.46612 21.0313 8.11338 20.8301ZM16.8867 20.8301C17.2394 20.629 17.6886 20.7517 17.8897 21.1045L18.8683 22.8202C19.0694 23.173 18.9466 23.622 18.5939 23.8232C18.241 24.0244 17.792 23.9015 17.5909 23.5487L16.6123 21.833C16.4112 21.4803 16.534 21.0312 16.8867 20.8301Z"
  })), React__default.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M12.5009 3.18628C12.907 3.18628 13.2362 2.85706 13.2362 2.45098V0.735295C13.2362 0.329216 12.907 0 12.5009 0C12.0948 0 11.7656 0.329216 11.7656 0.735295V2.45098C11.7656 2.85706 12.0948 3.18628 12.5009 3.18628ZM12.5 6.03516C17.7504 6.03516 22.561 9.26579 24.8332 12.0341C25.0557 12.3053 25.0557 12.6957 24.8332 12.9669C22.6596 15.6151 17.8695 18.9659 12.5 18.9659C7.31483 18.9659 2.49292 15.8022 0.166838 12.9669C-0.0556128 12.6957 -0.0556128 12.3053 0.166838 12.0341C2.42003 9.28776 7.23086 6.03516 12.5 6.03516ZM12.5 17.4953C15.2542 17.4953 17.4948 15.2546 17.4948 12.5005C17.4948 9.74668 15.2544 7.50575 12.5 7.5057C9.74581 7.5057 7.50518 9.74638 7.50518 12.5005C7.50518 15.2545 9.74577 17.4953 12.5 17.4953ZM7.35287 8.5928C4.55165 9.78423 2.55615 11.6406 1.72856 12.5007C3.24365 14.0782 5.22218 15.5044 7.35204 16.4071C5.59424 14.0964 5.59493 10.9027 7.35287 8.5928ZM17.648 8.59388C19.4058 10.9046 19.4051 14.0983 17.6472 16.4082C20.4484 15.2167 22.4439 13.3605 23.2715 12.5003C21.7564 10.9228 19.7778 9.49658 17.648 8.59388ZM12.499 15C11.1205 15 9.99902 13.8785 9.99902 12.5C9.99902 11.1215 11.1205 10 12.499 10C13.8775 10 14.999 11.1215 14.999 12.5C14.999 13.8785 13.8775 15 12.499 15ZM12.499 13.5294C13.0666 13.5294 13.5284 13.0676 13.5284 12.5C13.5284 11.9323 13.0666 11.4706 12.499 11.4706C11.9314 11.4706 11.4696 11.9323 11.4696 12.5C11.4696 13.0676 11.9314 13.5294 12.499 13.5294ZM17.8897 3.89547C17.6885 4.24841 17.2393 4.37101 16.8867 4.16993C16.534 3.9687 16.4112 3.51964 16.6123 3.16694L17.5909 1.45125C17.7921 1.09841 18.241 0.975615 18.5939 1.17679C18.9466 1.37802 19.0694 1.82704 18.8683 2.17978L17.8897 3.89547ZM7.11039 3.89546C7.31157 4.24821 7.76059 4.37105 8.11338 4.16987C8.46613 3.9687 8.58897 3.51963 8.3878 3.16688L7.40927 1.4512C7.20809 1.09845 6.75897 0.975607 6.40627 1.17678C6.05353 1.37796 5.93068 1.82703 6.13186 2.17977L7.11039 3.89546ZM11.7656 22.5493C11.7656 22.1432 12.0948 21.814 12.5009 21.814C12.907 21.814 13.2362 22.1432 13.2362 22.5493V24.265C13.2362 24.671 12.907 25.0003 12.5009 25.0003C12.0948 25.0003 11.7656 24.671 11.7656 24.265V22.5493ZM8.11338 20.8301C7.76063 20.629 7.31161 20.7517 7.11039 21.1045L6.13186 22.8202C5.93068 23.1729 6.05353 23.622 6.40627 23.8232C6.75907 24.0243 7.20809 23.9015 7.40926 23.5488L8.38779 21.8331C8.58902 21.4803 8.46612 21.0313 8.11338 20.8301ZM16.8867 20.8301C17.2394 20.629 17.6886 20.7517 17.8897 21.1045L18.8683 22.8202C19.0694 23.173 18.9466 23.622 18.5939 23.8232C18.241 24.0244 17.792 23.9015 17.5909 23.5487L16.6123 21.833C16.4112 21.4803 16.534 21.0312 16.8867 20.8301Z",
    fill: "black"
  }), React__default.createElement("path", {
    d: "M24.8332 12.0341L25.6093 11.3973L25.6092 11.3972L24.8332 12.0341ZM24.8332 12.9669L25.6092 13.6039L25.6094 13.6036L24.8332 12.9669ZM0.166838 12.9669L0.942986 12.3301L0.942961 12.3301L0.166838 12.9669ZM0.166838 12.0341L0.942961 12.6709L0.942978 12.6709L0.166838 12.0341ZM12.5 7.5057L12.5 6.50177H12.5V7.5057ZM1.72856 12.5007L1.00512 11.8046L0.336008 12.5001L1.00449 13.1961L1.72856 12.5007ZM7.35287 8.5928L8.15175 9.20079L10.4459 6.18632L6.95995 7.66897L7.35287 8.5928ZM7.35204 16.4071L6.96028 17.3315L10.4377 18.8053L8.15105 15.7993L7.35204 16.4071ZM17.6472 16.4082L16.8483 15.8002L14.5542 18.8148L18.0401 17.332L17.6472 16.4082ZM17.648 8.59388L18.0398 7.66956L14.5624 6.19565L16.849 9.20169L17.648 8.59388ZM23.2715 12.5003L23.995 13.1963L24.6641 12.5008L23.9955 11.8048L23.2715 12.5003ZM16.8867 4.16993L16.3893 5.04194L16.3894 5.04198L16.8867 4.16993ZM17.8897 3.89547L17.0177 3.3981L17.0177 3.39815L17.8897 3.89547ZM16.6123 3.16694L17.4844 3.66434L17.4844 3.66431L16.6123 3.16694ZM17.5909 1.45125L18.4629 1.94862L18.4629 1.9486L17.5909 1.45125ZM18.5939 1.17679L19.0912 0.304749L19.0911 0.304666L18.5939 1.17679ZM18.8683 2.17978L19.7403 2.67715L19.7403 2.67713L18.8683 2.17978ZM8.11338 4.16987L8.61068 5.04197L8.61074 5.04194L8.11338 4.16987ZM7.11039 3.89546L7.98246 3.39811L7.98245 3.39809L7.11039 3.89546ZM8.3878 3.16688L9.25986 2.66953L9.25985 2.66951L8.3878 3.16688ZM7.40927 1.4512L6.5372 1.94855L6.53721 1.94857L7.40927 1.4512ZM6.40627 1.17678L6.90363 2.04885L6.90368 2.04882L6.40627 1.17678ZM6.13186 2.17977L5.2598 2.67713L5.25981 2.67714L6.13186 2.17977ZM7.11039 21.1045L6.23838 20.607L6.23833 20.6071L7.11039 21.1045ZM8.11338 20.8301L8.61073 19.958L8.61064 19.958L8.11338 20.8301ZM6.13186 22.8202L5.25981 22.3228L5.2598 22.3228L6.13186 22.8202ZM6.40627 23.8232L5.90892 24.6952L5.90897 24.6953L6.40627 23.8232ZM7.40926 23.5488L8.2813 24.0462L8.28132 24.0461L7.40926 23.5488ZM8.38779 21.8331L7.51578 21.3356L7.51574 21.3357L8.38779 21.8331ZM17.8897 21.1045L17.0176 21.6018L17.0177 21.6019L17.8897 21.1045ZM16.8867 20.8301L16.3895 19.958L16.3894 19.958L16.8867 20.8301ZM18.8683 22.8202L19.7403 22.3229L19.7403 22.3228L18.8683 22.8202ZM18.5939 23.8232L19.0911 24.6953L19.0912 24.6953L18.5939 23.8232ZM17.5909 23.5487L18.463 23.0515L18.4629 23.0514L17.5909 23.5487ZM16.6123 21.833L15.7403 22.3304L15.7403 22.3304L16.6123 21.833ZM12.2323 2.45098C12.2323 2.30261 12.3526 2.18235 12.5009 2.18235V4.1902C13.4614 4.1902 14.2401 3.41151 14.2401 2.45098H12.2323ZM12.2323 0.735295V2.45098H14.2401V0.735295H12.2323ZM12.5009 1.00392C12.3526 1.00392 12.2323 0.883669 12.2323 0.735295H14.2401C14.2401 -0.225237 13.4614 -1.00392 12.5009 -1.00392V1.00392ZM12.7695 0.735295C12.7695 0.883669 12.6493 1.00392 12.5009 1.00392V-1.00392C11.5404 -1.00392 10.7617 -0.225237 10.7617 0.735295H12.7695ZM12.7695 2.45098V0.735295H10.7617V2.45098H12.7695ZM12.5009 2.18235C12.6493 2.18235 12.7695 2.30261 12.7695 2.45098H10.7617C10.7617 3.41151 11.5404 4.1902 12.5009 4.1902V2.18235ZM25.6092 11.3972C23.198 8.45944 18.1238 5.03123 12.5 5.03123V7.03908C17.3769 7.03908 21.9241 10.0721 24.0572 12.6711L25.6092 11.3972ZM25.6094 13.6036C26.1355 12.9623 26.1356 12.0387 25.6093 11.3973L24.0571 12.6709C23.9758 12.5718 23.9759 12.4292 24.057 12.3302L25.6094 13.6036ZM12.5 19.9698C18.2507 19.9698 23.3028 16.4139 25.6092 13.6039L24.0572 12.33C22.0165 14.8163 17.4883 17.962 12.5 17.962V19.9698ZM-0.609309 13.6036C1.85939 16.6128 6.94582 19.9698 12.5 19.9698V17.962C7.68384 17.962 3.12645 14.9916 0.942986 12.3301L-0.609309 13.6036ZM-0.609284 11.3973C-1.13547 12.0387 -1.13547 12.9623 -0.609284 13.6037L0.942961 12.3301C1.02424 12.4292 1.02424 12.5718 0.942961 12.6709L-0.609284 11.3973ZM12.5 5.03123C6.85619 5.03123 1.78204 8.4826 -0.609301 11.3974L0.942978 12.6709C3.05801 10.0929 7.60554 7.03908 12.5 7.03908V5.03123ZM16.4909 12.5005C16.4909 14.7002 14.6997 16.4914 12.5 16.4914V18.4992C15.8086 18.4992 18.4987 15.8091 18.4987 12.5005H16.4909ZM12.5 8.50962C14.6999 8.50966 16.4909 10.3011 16.4909 12.5005H18.4987C18.4987 9.19229 15.8089 6.50183 12.5 6.50177L12.5 8.50962ZM8.5091 12.5005C8.5091 10.3008 10.3003 8.50962 12.5 8.50962V6.50177C9.19136 6.50177 6.50125 9.19194 6.50125 12.5005H8.5091ZM12.5 16.4914C10.3002 16.4914 8.5091 14.7001 8.5091 12.5005H6.50125C6.50125 15.8089 9.19128 18.4992 12.5 18.4992V16.4914ZM2.45199 13.1968C3.23229 12.3858 5.1185 10.6341 7.7458 9.51664L6.95995 7.66897C3.98479 8.93437 1.88002 10.8953 1.00512 11.8046L2.45199 13.1968ZM7.7438 15.4828C5.74951 14.6376 3.88178 13.2934 2.45262 11.8053L1.00449 13.1961C2.60553 14.8631 4.69486 16.3713 6.96028 17.3315L7.7438 15.4828ZM6.55399 7.98482C4.52274 10.6538 4.52194 14.3449 6.55303 17.0149L8.15105 15.7993C6.66655 13.8478 6.66712 11.1516 8.15175 9.20079L6.55399 7.98482ZM18.4461 17.0162C20.4773 14.3471 20.4781 10.6561 18.447 7.98608L16.849 9.20169C18.3335 11.1532 18.3329 13.8494 16.8483 15.8002L18.4461 17.0162ZM22.548 11.8042C21.7678 12.6153 19.8816 14.3669 17.2543 15.4844L18.0401 17.332C21.0153 16.0666 23.12 14.1057 23.995 13.1963L22.548 11.8042ZM17.2563 9.51821C19.2504 10.3634 21.1182 11.7077 22.5475 13.1957L23.9955 11.8048C22.3945 10.1379 20.3051 8.62972 18.0398 7.66956L17.2563 9.51821ZM8.9951 12.5C8.9951 14.433 10.566 16.0039 12.499 16.0039V13.9961C11.6749 13.9961 11.0029 13.3241 11.0029 12.5H8.9951ZM12.499 8.99608C10.566 8.99608 8.9951 10.567 8.9951 12.5H11.0029C11.0029 11.6759 11.6749 11.0039 12.499 11.0039V8.99608ZM16.0029 12.5C16.0029 10.567 14.4319 8.99608 12.499 8.99608V11.0039C13.3231 11.0039 13.9951 11.6759 13.9951 12.5H16.0029ZM12.499 16.0039C14.4319 16.0039 16.0029 14.433 16.0029 12.5H13.9951C13.9951 13.3241 13.3231 13.9961 12.499 13.9961V16.0039ZM12.5245 12.5C12.5245 12.5047 12.5238 12.507 12.523 12.5087C12.522 12.5111 12.52 12.5144 12.5167 12.5177C12.5134 12.521 12.5101 12.523 12.5077 12.524C12.506 12.5247 12.5037 12.5255 12.499 12.5255V14.5333C13.621 14.5333 14.5324 13.6221 14.5324 12.5H12.5245ZM12.499 12.4745C12.5037 12.4745 12.506 12.4753 12.5077 12.476C12.5101 12.477 12.5134 12.479 12.5167 12.4823C12.52 12.4856 12.522 12.4889 12.523 12.4913C12.5238 12.493 12.5245 12.4953 12.5245 12.5H14.5324C14.5324 11.3779 13.621 10.4667 12.499 10.4667V12.4745ZM12.4735 12.5C12.4735 12.4953 12.4743 12.493 12.475 12.4913C12.476 12.4889 12.478 12.4856 12.4813 12.4823C12.4846 12.479 12.4879 12.477 12.4903 12.476C12.492 12.4753 12.4943 12.4745 12.499 12.4745V10.4667C11.3769 10.4667 10.4657 11.3779 10.4657 12.5H12.4735ZM12.499 12.5255C12.4943 12.5255 12.492 12.5247 12.4903 12.524C12.4879 12.523 12.4846 12.521 12.4813 12.5177C12.478 12.5144 12.476 12.5111 12.475 12.5087C12.4743 12.507 12.4735 12.5047 12.4735 12.5H10.4657C10.4657 13.6221 11.3769 14.5333 12.499 14.5333V12.5255ZM16.3894 5.04198C17.2232 5.51759 18.2857 5.22771 18.7618 4.39279L17.0177 3.39815C17.0912 3.26912 17.2553 3.22443 17.3841 3.29788L16.3894 5.04198ZM15.7403 2.66954C15.2644 3.50389 15.555 4.56603 16.3893 5.04194L17.3842 3.29792C17.513 3.37138 17.5579 3.53538 17.4844 3.66434L15.7403 2.66954ZM16.7188 0.953882L15.7403 2.66957L17.4844 3.66431L18.4629 1.94862L16.7188 0.953882ZM19.0911 0.304666C18.2568 -0.171032 17.1948 0.119332 16.7188 0.953909L18.4629 1.9486C18.3894 2.07749 18.2252 2.12226 18.0966 2.04892L19.0911 0.304666ZM19.7403 2.67713C20.2161 1.84285 19.9257 0.780711 19.0912 0.304749L18.0965 2.04884C17.9676 1.97532 17.9227 1.81122 17.9962 1.68243L19.7403 2.67713ZM18.7618 4.39284L19.7403 2.67715L17.9962 1.68241L17.0177 3.3981L18.7618 4.39284ZM7.61608 3.29778C7.7448 3.22438 7.9089 3.26914 7.98246 3.39811L6.23833 4.39282C6.71424 5.22728 7.77637 5.51772 8.61068 5.04197L7.61608 3.29778ZM7.51573 3.66424C7.44227 3.53542 7.48708 3.37135 7.61603 3.29781L8.61074 5.04194C9.44518 4.56604 9.73568 3.50383 9.25986 2.66953L7.51573 3.66424ZM6.53721 1.94857L7.51574 3.66425L9.25985 2.66951L8.28132 0.953824L6.53721 1.94857ZM6.90368 2.04882C6.77478 2.12234 6.61074 2.07749 6.5372 1.94855L8.28133 0.95384C7.80544 0.119409 6.74316 -0.171128 5.90887 0.304747L6.90368 2.04882ZM7.00393 1.68242C7.07739 1.81123 7.03258 1.9753 6.90363 2.04885L5.90892 0.304717C5.07447 0.780616 4.78398 1.84283 5.2598 2.67713L7.00393 1.68242ZM7.98245 3.39809L7.00392 1.6824L5.25981 2.67714L6.23834 4.39283L7.98245 3.39809ZM12.5009 20.81C11.5404 20.81 10.7617 21.5887 10.7617 22.5493H12.7695C12.7695 22.6976 12.6493 22.8179 12.5009 22.8179V20.81ZM14.2401 22.5493C14.2401 21.5887 13.4615 20.81 12.5009 20.81V22.8179C12.3525 22.8179 12.2323 22.6976 12.2323 22.5493H14.2401ZM14.2401 24.265V22.5493H12.2323V24.265H14.2401ZM12.5009 26.0042C13.4615 26.0042 14.2401 25.2255 14.2401 24.265H12.2323C12.2323 24.1166 12.3525 23.9963 12.5009 23.9963V26.0042ZM10.7617 24.265C10.7617 25.2255 11.5404 26.0042 12.5009 26.0042V23.9963C12.6493 23.9963 12.7695 24.1166 12.7695 24.265H10.7617ZM10.7617 22.5493V24.265H12.7695V22.5493H10.7617ZM7.9824 21.6019C7.90887 21.7308 7.74484 21.7756 7.61611 21.7022L8.61064 19.958C7.77642 19.4823 6.71436 19.7727 6.23838 20.607L7.9824 21.6019ZM7.00392 23.3175L7.98245 21.6019L6.23833 20.6071L5.25981 22.3228L7.00392 23.3175ZM6.90363 22.9511C7.03258 23.0246 7.07739 23.1887 7.00393 23.3175L5.2598 22.3228C4.78398 23.1571 5.07447 24.2193 5.90892 24.6952L6.90363 22.9511ZM6.53722 23.0513C6.61074 22.9225 6.77477 22.8776 6.90357 22.9511L5.90897 24.6953C6.74336 25.1711 7.80543 24.8804 8.2813 24.0462L6.53722 23.0513ZM7.51574 21.3357L6.53721 23.0514L8.28132 24.0461L9.25985 22.3304L7.51574 21.3357ZM7.61603 21.7021C7.48717 21.6287 7.44221 21.4646 7.51578 21.3356L9.2598 22.3305C9.73582 21.4961 9.44508 20.4339 8.61073 19.958L7.61603 21.7021ZM18.7618 20.6072C18.2858 19.7725 17.2235 19.4824 16.3895 19.958L17.384 21.7022C17.2553 21.7756 17.0913 21.7309 17.0176 21.6018L18.7618 20.6072ZM19.7403 22.3228L18.7618 20.6071L17.0177 21.6019L17.9962 23.3176L19.7403 22.3228ZM19.0912 24.6953C19.9257 24.2194 20.2161 23.1572 19.7403 22.3229L17.9962 23.3176C17.9227 23.1888 17.9675 23.0247 18.0965 22.9511L19.0912 24.6953ZM16.7187 24.046C17.1946 24.8805 18.2567 25.171 19.0911 24.6953L18.0966 22.9511C18.2253 22.8777 18.3894 22.9224 18.463 23.0515L16.7187 24.046ZM15.7403 22.3304L16.7188 24.0461L18.4629 23.0514L17.4844 21.3357L15.7403 22.3304ZM16.3894 19.958C15.5549 20.4339 15.2645 21.4961 15.7403 22.3304L17.4844 21.3357C17.5579 21.4645 17.5131 21.6286 17.3841 21.7021L16.3894 19.958Z",
    fill: "black",
    mask: "url(#path-1-inside-1)"
  }));
};
Icon$u.displayName = 'Icon.Open';

function Icon$v(_ref) {
  let {
    className
  } = _ref;
  return React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: className + ' fill',
    width: "14",
    height: "15",
    fill: "none",
    viewBox: "0 0 14 15"
  }, React__default.createElement("g", {
    fill: "#424242",
    clipPath: "url(#clip0)"
  }, React__default.createElement("path", {
    d: "M11.95 2.304A6.954 6.954 0 007 .254a7.017 7.017 0 00-3.24.793c-.572.3-1.102.68-1.572 1.125V.254H1.093v3.828h3.828V2.988H2.917A5.927 5.927 0 017 1.348a5.913 5.913 0 015.882 6.449l1.089.1c.02-.213.029-.429.029-.643h-.547H14c0-1.87-.728-3.628-2.05-4.95zM2.398 10.957l-.851.686c.247.307.523.595.818.856l.724-.819a5.956 5.956 0 01-.69-.723zM1.428 9.217l-1.032.364c.132.372.296.735.488 1.08l.955-.533a5.893 5.893 0 01-.41-.91zM1.094 7.254H0c0 .395.033.792.1 1.18l1.077-.184a5.967 5.967 0 01-.083-.996zM3.89 12.277l-.576.93c.336.207.691.388 1.056.536l.411-1.014a5.894 5.894 0 01-.89-.452zM12.708 8.78a5.88 5.88 0 01-.339.94l.994.458c.165-.359.3-.734.402-1.115l-1.057-.282zM10.488 12.02a5.918 5.918 0 01-.853.521l.488.979a7.02 7.02 0 001.012-.617l-.647-.882zM11.875 10.59a5.957 5.957 0 01-.633.773l.786.762c.274-.284.526-.592.75-.917l-.903-.619zM8.706 12.91a5.887 5.887 0 01-.977.206l.133 1.085c.392-.048.782-.13 1.16-.244l-.316-1.047zM5.737 13.025l-.233 1.068c.384.084.78.136 1.174.153l.05-1.092a5.931 5.931 0 01-.991-.13z"
  })), React__default.createElement("defs", null, React__default.createElement("clipPath", {
    id: "clip0"
  }, React__default.createElement("path", {
    fill: "#fff",
    d: "M0 0H14V14H0z",
    transform: "translate(0 .25)"
  }))));
}
Icon$v.displayName = 'Icon.Sync';



var SVGIcons = {
  __proto__: null,
  ArrowDown: Icon,
  ArrowLeft: Icon$1,
  ArrowRight: Icon$2,
  ArrowUp: Icon$3,
  Bonde: Icon$4,
  Bolt: Icon$5,
  BoltUnfilled: Icon$6,
  Bot: Icon$7,
  Check: Icon$8,
  Close: Icon$9,
  Cloud: Icon$a,
  Copy: Icon$b,
  Info: Icon$c,
  InfoMsg: Icon$d,
  Network: Icon$e,
  New: Icon$f,
  Pencil: Icon$g,
  Plus: Icon$h,
  Search: Icon$i,
  Settings: Icon$j,
  Trash: Icon$k,
  Ticket: Icon$l,
  TicketRecurring: Icon$m,
  User: Icon$n,
  Window: Icon$o,
  MapMarker: Icon$p,
  Heart: Icon$q,
  Warning: Icon$r,
  Whatsapp: Icon$s,
  Eye: Icon$t,
  Open: Icon$u,
  Sync: Icon$v
};

var _templateObject$7;
const IconController = _ref => {
  let {
    name,
    ...props
  } = _ref;
  const IconSVG = SVGIcons[name];
  if (IconSVG) return React__default.createElement(IconSVG, Object.assign({}, props));else return React__default.createElement("span", null);
};
const Icon$w = /*#__PURE__*/styled__default(IconController)(_templateObject$7 || (_templateObject$7 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  vertical-align: middle;\n  ", "\n  ", "\n  ", "\n  ", "\n\n  &.fill {\n    path {\n      fill: ", ";\n    }\n  }\n  &.stroke {\n    path {\n      stroke: ", ";\n    }\n  }\n"])), props => props.size === 'xs' && "\n  width: calc(0.75*20px);\n  height: calc(0.75*15px);\n  ", props => props.size === 'small' && "\n  width: calc(1*20px);\n  height: calc(1*15px);\n  ", props => props.size === 'default' && "\n  width: calc(1.5*20px);\n  height: calc(1.5*15px);\n  ", props => props.size === 'large' && "\n  width: calc(2*20px);\n  height: calc(2*15px);\n  ", props => props.color, props => props.color);
Icon$w.defaultProps = {
  size: 'default',
  color: '#000'
};

var _templateObject$8;
const Link = /*#__PURE__*/styled__default(props => {
  const {
    component: Component,
    className,
    ...ownProps
  } = props;
  return React__default.createElement(Component, Object.assign({
    className: className
  }, ownProps));
})(_templateObject$8 || (_templateObject$8 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  font-family: ", ";\n  font-weight: 600;\n  font-size: 13px;\n  text-transform: uppercase;\n  text-decoration: none;\n  color: ", ";\n  cursor: pointer;\n\n  &:hover,\n  &:active {\n    color: ", ";\n    text-decoration: underline;\n  }\n  &:focus {\n    color: ", ";\n  }\n"])), props => props.theme.fontFamily, props => props.theme.dark.color.main, props => props.theme.dark.color.hover, props => props.theme.dark.color.focus);
Link.defaultProps = {
  theme,
  component: 'a'
};

var _templateObject$9;
const CleanButton = /*#__PURE__*/styled__default.button(_templateObject$9 || (_templateObject$9 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  border: none;\n  margin: 0;\n  padding: 0;\n  width: auto;\n  overflow: visible;\n\n  background: transparent;\n\n  /* inherit font & color from ancestor */\n  color: inherit;\n  font: inherit;\n\n  /* Normalize 'line-height'. Cannot be changed from 'normal' in Firefox 4+. */\n  line-height: normal;\n\n  /* Corrects font smoothing for webkit */\n  -webkit-font-smoothing: inherit;\n  -moz-osx-font-smoothing: inherit;\n\n  /* Corrects inability to style clickable 'input' types in iOS */\n  -webkit-appearance: none;\n\n  /* Remove excess padding and border in Firefox 4+ */\n  &::-moz-focus-inner {\n    border: 0;\n    padding: 0;\n  }\n"])));
CleanButton.displayName = 'CleanButton';

var _templateObject$a, _templateObject2$3;
const Wrapper = /*#__PURE__*/styled__default(CleanButton)(_templateObject$a || (_templateObject$a = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  width: 200px;\n  height: 90px;\n  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);\n  border-radius: 5px;\n  cursor: pointer;\n  background-color: ", ";\n  padding: 0px 20px;\n\n  display: grid;\n  grid-template-columns: auto auto;\n  align-items: center;\n  justify-content: center;\n  grid-column-gap: 20px;\n"])), _ref => {
  let {
    theme
  } = _ref;
  return theme.brand.light;
});
const Text$1 = /*#__PURE__*/styled__default(Header.H5)(_templateObject2$3 || (_templateObject2$3 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  text-transform: uppercase;\n  margin: 0;\n  text-align: left;\n  color: ", ";\n"])), _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.brand.dark;
});
const Shortcut = _ref3 => {
  let {
    icon,
    text,
    theme
  } = _ref3;
  return React__default.createElement(Wrapper, {
    theme: theme
  }, icon, React__default.createElement(Text$1, {
    theme: theme
  }, text));
};
Shortcut.defaultProps = {
  theme
};

var _templateObject$b, _templateObject2$4, _templateObject3$2;
const ModalStyled = /*#__PURE__*/styled__default.div(_templateObject$b || (_templateObject$b = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: ", "; /* Hidden by default */\n  position: fixed; /* Stay in place */\n  z-index: 1; /* Sit on top */\n  left: 0;\n  top: 0;\n  width: 100%; /* Full width */\n  height: 100%; /* Full height */\n  overflow: auto; /* Enable scroll if needed */\n  background-color: rgb(0, 0, 0); /* Fallback color */\n  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */\n  z-index: 3;\n"])), props => !props.isOpen ? 'none' : 'block');
const ModalContentStyled = /*#__PURE__*/styled__default.div(_templateObject2$4 || (_templateObject2$4 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  background-color: ", ";\n  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);\n  border-radius: 4px;\n  padding: 30px;\n  width: ", ";\n  height: ", ";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n"])), props => props.theme.brand.light, props => props.width, props => props.height ? "" + props.height : 'auto');
const CloseButtonStyled = /*#__PURE__*/styled__default(CleanButton)(_templateObject3$2 || (_templateObject3$2 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  color: ", ";\n  font-size: 28px;\n  font-weight: bold;\n  float: right;\n  &:hover,\n  &:focus {\n    color: ", ";\n    text-decoration: none;\n    cursor: pointer;\n  }\n"])), props => props.theme.commons.main, props => props.theme.brand.dark);
const Modal = _ref => {
  let {
    children,
    isOpen,
    onClose,
    width
  } = _ref;
  return React__default.createElement(ModalStyled, {
    isOpen: isOpen
  }, React__default.createElement(ModalContentStyled, {
    width: width,
    theme: theme
  }, React__default.createElement(CloseButtonStyled, {
    theme: theme,
    onClick: onClose
  }, "\u00D7"), children));
};
Modal.defaultProps = {
  isOpen: false,
  width: 300
};

var _templateObject$c, _templateObject2$5, _templateObject3$3, _templateObject4$2, _templateObject5$2, _templateObject6$2, _templateObject7$1, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12;
const SelectIcon = /*#__PURE__*/styled__default.div(_templateObject$c || (_templateObject$c = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  transition: all 350ms;\n\n  ", "\n"])), props => props.show && styled.css(_templateObject2$5 || (_templateObject2$5 = _taggedTemplateLiteralLoose(["\n      transform: rotate(180deg);\n      position: relative;\n      top: 2px;\n    "]))));
const StyledControl = /*#__PURE__*/styled__default.div(_templateObject3$3 || (_templateObject3$3 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  & > .Select__control {\n    // Sets clear button color dinamically\n    & > .Select__indicators > .Select__clear-indicator {\n      color: ", ";\n    }\n    background-color: unset;\n    ", "\n    ", "\n    box-shadow: none;\n    width: 100%;\n    & > .Select__value-container {\n      & > .Select__placeholder {\n        font-family: ", ";\n        color: ", ";\n      }\n    }\n  }\n"])), props => props.theme.brand.main, props => !props.value ? styled.css(_templateObject4$2 || (_templateObject4$2 = _taggedTemplateLiteralLoose(["\n            &:hover,\n            &:focus {\n              border-color: ", ";\n            }\n            border-color: ", ";\n          "])), props.theme.commons.main, props.theme.commons.main) : styled.css(_templateObject5$2 || (_templateObject5$2 = _taggedTemplateLiteralLoose(["\n            &:hover,\n            &:focus {\n              border-color: ", ";\n            }\n            border-color: ", ";\n          "])), props.theme.brand.main, props.theme.brand.main), props => props.invalid && styled.css(_templateObject6$2 || (_templateObject6$2 = _taggedTemplateLiteralLoose(["\n        &:hover,\n        &:focus {\n          border-color: ", ";\n        }\n        border-color: ", ";\n      "])), props.theme.error, props.theme.error), props => props.theme.fontFamily, props => props.theme.commons.dark);
StyledControl.defaultProps = {
  theme
};
const StyledSingleValue = /*#__PURE__*/styled__default.div(_templateObject7$1 || (_templateObject7$1 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  & > .Select__single-value {\n    opacity: ", ";\n    transition: opacity 300ms;\n    font-family: ", ";\n    color: ", ";\n  }\n"])), props => props.isDisabled ? 0.5 : 1, props => props.theme.fontFamily, props => !props.value ? props.theme.commons.main : props.theme.brand.main);
StyledSingleValue.defaultProps = {
  theme
};
const StyledOption = /*#__PURE__*/styled__default.div(_templateObject8 || (_templateObject8 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  & > .Select__option {\n    font-family: ", ";\n    cursor: ", ";\n    ", "\n    ", "\n    ", "\n    color: ", ";\n  }\n"])), props => props.theme.fontFamily, props => props.isDisabled ? 'not-allowed' : 'default', props => props.isSelected && styled.css(_templateObject9 || (_templateObject9 = _taggedTemplateLiteralLoose(["\n        background-color: rgba(74, 74, 74, 0.5);\n        &:active {\n          backgroundcolor: rgba(74, 74, 74, 0.5);\n        }\n      "]))), props => props.isFocused && styled.css(_templateObject10 || (_templateObject10 = _taggedTemplateLiteralLoose(["\n        background-color: rgba(74, 74, 74, 0.3);\n      "]))), props => props.isDisabled && styled.css(_templateObject11 || (_templateObject11 = _taggedTemplateLiteralLoose(["\n        color: #ccc;\n      "]))), props => props.isSelected ? props.theme.brand.light : props.theme.commons.dark);
const StyledMenu = /*#__PURE__*/styled__default.div(_templateObject12 || (_templateObject12 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  & > .Select__menu {\n    z-index: 3;\n  }\n"])));
StyledOption.defaultProps = {
  theme
};
const SingleValue = props => React__default.createElement(StyledSingleValue, Object.assign({
  value: props.selectProps.value
}, props), React__default.createElement(ReactSelect.components.SingleValue, Object.assign({}, props)));
const DropdownIndicator = props => {
  const color = !props.selectProps.value ? theme.commons.main : theme.brand.main;
  return React__default.createElement(ReactSelect.components.DropdownIndicator, Object.assign({}, props), React__default.createElement(SelectIcon, {
    show: props.selectProps.show
  }, React__default.createElement(Icon$w, {
    name: "ArrowDown",
    size: "small",
    color: color
  })));
};
const Control = props => React__default.createElement(StyledControl, Object.assign({
  value: props.selectProps.value
}, props), React__default.createElement(ReactSelect.components.Control, Object.assign({}, props)));
const Option = props => React__default.createElement(StyledOption, Object.assign({
  value: props.selectProps.value
}, props), React__default.createElement(ReactSelect.components.Option, Object.assign({}, props)));
const Menu = props => {
  return React__default.createElement(StyledMenu, null, React__default.createElement(ReactSelect.components.Menu, Object.assign({}, props), props.children));
};
const RoundSelect = _ref => {
  let {
    ...props
  } = _ref;
  const [show, toggle] = React.useState(false);
  return React__default.createElement(ReactSelect__default, Object.assign({}, props, {
    components: {
      DropdownIndicator,
      IndicatorSeparator: () => null,
      Control,
      SingleValue,
      Option,
      Menu
    },
    onMenuOpen: () => toggle(true),
    onMenuClose: () => toggle(false),
    onInputChange: () => toggle(false),
    show: show,
    classNamePrefix: 'Select'
  }));
};
RoundSelect.defaultProps = {
  theme,
  menuHeight: 300
};
RoundSelect.displayName = 'RoundSelect';

var _templateObject$d;
const WrapSelect = /*#__PURE__*/styled__default.div(_templateObject$d || (_templateObject$d = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  width: 150px;\n  & .Select__control {\n    border-color: ", ";\n    &:hover {\n      border-color: ", ";\n    }\n    &:focus {\n      border-color: ", ";\n    }\n  }\n  & .Select__single-value {\n    color: ", ";\n    &:hover {\n      color: ", ";\n    }\n    &:focus {\n      color: ", ";\n    }\n  }\n  .Select__indicators svg path {\n    fill: ", ";\n    &:hover {\n      fill: ", ";\n    }\n    &:focus {\n      fill: ", ";\n    }\n  }\n"])), _ref => {
  let {
    theme
  } = _ref;
  return theme.brand.dark;
}, _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.commons.dark;
}, _ref3 => {
  let {
    theme
  } = _ref3;
  return theme.dark.border.focus;
}, _ref4 => {
  let {
    theme
  } = _ref4;
  return theme.brand.dark;
}, _ref5 => {
  let {
    theme
  } = _ref5;
  return theme.commons.dark;
}, _ref6 => {
  let {
    theme
  } = _ref6;
  return theme.dark.border.focus;
}, _ref7 => {
  let {
    theme
  } = _ref7;
  return theme.brand.dark;
}, _ref8 => {
  let {
    theme
  } = _ref8;
  return theme.commons.dark;
}, _ref9 => {
  let {
    theme
  } = _ref9;
  return theme.dark.border.focus;
});
WrapSelect.defaultProps = {
  theme
};
const getItems = (page, totalPages) => {
  let startPage, endPage;
  if (totalPages <= 10) {
    // less than 10 total pages so show all
    startPage = 1;
    endPage = totalPages;
  } else {
    // more than 10 total pages so calculate start and end pages
    if (page <= 6) {
      startPage = 1;
      endPage = 10;
    } else if (page + 4 >= totalPages) {
      startPage = totalPages - 9;
      endPage = totalPages;
    } else {
      startPage = page - 5;
      endPage = page + 4;
    }
  }
  // create an array of pages to ng-repeat in the pager control
  return Array.from(Array(endPage + 1 - startPage), (_, i) => startPage + i);
};
const Pagination = _ref10 => {
  let {
    goToPage,
    pageIndex,
    pageSize,
    totalPages,
    setPageSize,
    showMorePlacement
  } = _ref10;
  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    setItems(getItems(pageIndex, totalPages));
  }, [pageIndex, totalPages]);
  const setPage = page => {
    const items = getItems(page, totalPages);
    setItems(items);
    return goToPage(page);
  };
  return React__default.createElement(react.Stack, {
    direction: "row",
    my: 4,
    spacing: 2,
    justify: "center"
  }, React__default.createElement(react.Button, {
    variant: "link",
    colorScheme: "gray",
    onClick: () => setPage(0),
    disabled: pageIndex === 0
  }, '<<'), ' ', React__default.createElement(react.Button, {
    variant: "link",
    colorScheme: "gray",
    onClick: () => setPage(pageIndex - 1),
    disabled: pageIndex === 0
  }, "anterior"), ' ', React__default.createElement(react.Stack, {
    direction: "row",
    spacing: 2
  }, items.map((item, i) => React__default.createElement(react.Button, {
    key: "page-item-" + i,
    variant: "link",
    colorScheme: "gray",
    color: item - 1 === pageIndex ? 'pink.200' : 'gray.300',
    onClick: () => setPage(item - 1)
  }, item))), React__default.createElement(react.Button, {
    variant: "link",
    colorScheme: "gray",
    onClick: () => setPage(pageIndex + 1),
    disabled: pageIndex === totalPages - 1
  }, "pr\u00F3xima"), ' ', React__default.createElement(react.Button, {
    variant: "link",
    colorScheme: "gray",
    onClick: () => setPage(totalPages - 1),
    disabled: pageIndex === totalPages - 1
  }, '>>'), ' ', React__default.createElement(WrapSelect, null, React__default.createElement(RoundSelect, {
    options: [{
      value: 10,
      label: 'Mostrar 10'
    }, {
      value: 20,
      label: 'Mostrar 20'
    }, {
      value: 30,
      label: 'Mostrar 30'
    }, {
      value: 40,
      label: 'Mostrar 40'
    }, {
      value: 50,
      label: 'Mostrar 50'
    }],
    placeholder: "",
    value: {
      value: pageSize,
      label: "Mostrar " + pageSize
    },
    onChange: e => setPageSize(Number(e.value)),
    menuPortalTarget: document.querySelector('body'),
    menuPlacement: showMorePlacement
  })));
};

var _templateObject$e, _templateObject2$6, _templateObject3$4, _templateObject4$3, _templateObject5$3, _templateObject6$3, _templateObject7$2;
const StyledTh = /*#__PURE__*/styled__default.th(_templateObject$e || (_templateObject$e = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  font-family: ", ";\n  font-size: 13px;\n  font-weight: 600;\n  line-height: 18px;\n  text-transform: uppercase;\n  color: #a4a4a4;\n  text-align: left;\n  border-bottom: 1px solid #e5e5e5;\n  cursor: pointer;\n  height: 40px;\n\n  display: flex;\n  align-items: center;\n\n  /* Sticky */\n  position: sticky !important;\n  top: 0;\n  background-color: ", ";\n\n  &.hide {\n    display: none;\n  }\n"])), props => props.theme.fontFamily, props => props.backgroundColor);
const StyledTd = /*#__PURE__*/styled__default.td(_templateObject2$6 || (_templateObject2$6 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  font-family: ", ";\n  font-size: 16px;\n  font-weight: ", ";\n  line-height: 22px;\n  color: ", ";\n  letter-spacing: normal;\n  word-break: break-word;\n  min-height: 60px;\n\n  margin: 0;\n  border-bottom: 1px solid #e5e5e5;\n\n  display: flex;\n  align-items: center;\n\n  &.hide {\n    display: none;\n  }\n"])), props => props.theme.fontFamily, props => props.bold ? 'bold' : 'normal', props => props.theme.commons.dark);
const StyledTr = /*#__PURE__*/styled__default.tr(_templateObject3$4 || (_templateObject3$4 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  :last-child {\n    td {\n      border-bottom: 0;\n    }\n  }\n  border-bottom: 1px solid #e5e5e5;\n"])));
const StyledTable = /*#__PURE__*/styled__default.table(_templateObject4$3 || (_templateObject4$3 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  border-spacing: 0;\n  border: 1px solid #e5e5e5;\n  background-color: ", ";\n  width: 100%;\n\n  thead {\n    /* These styles are required for a scrollable body to align with the header properly */\n    overflow-y: auto;\n    overflow-x: hidden;\n  }\n\n  tbody {\n    /* These styles are required for a scrollable table body */\n    overflow-y: scroll;\n    overflow-x: hidden;\n    height: 250px;\n  }\n\n  th,\n  td {\n    margin: 0;\n    padding-left: 20px;\n\n    /* In this example we use an absolutely position resizer,\n      so this is required. */\n    position: relative;\n\n    :last-child {\n      border-right: 0;\n    }\n  }\n\n  ", "\n\n  ", "\n\n  .sticky {\n    position: sticky !important;\n    top: 0;\n    z-index: 1;\n    background-color: ", ";\n  }\n"])), props => props.backgroundColor, _ref => {
  let {
    sticky
  } = _ref;
  return sticky === 'end' && styled.css(_templateObject5$3 || (_templateObject5$3 = _taggedTemplateLiteralLoose(["\n      .sticky {\n        right: 0;\n      }\n      tr:nth-child(2) {\n        th:last-child {\n          border-left: 1px solid #e5e5e5;\n        }\n      }\n      tr {\n        td:last-child {\n          border-left: 1px solid #e5e5e5;\n          padding-left: 0;\n        }\n      }\n    "])));
}, _ref2 => {
  let {
    sticky
  } = _ref2;
  return sticky === 'start' && styled.css(_templateObject6$3 || (_templateObject6$3 = _taggedTemplateLiteralLoose(["\n      .sticky {\n        left: 0;\n      }\n      tr:nth-child(2) {\n        th:last-child {\n          border-right: 1px solid #e5e5e5;\n        }\n      }\n      tr {\n        td:last-child {\n          border-right: 1px solid #e5e5e5;\n        }\n      }\n    "])));
}, props => props.backgroundColor);
const Main = /*#__PURE__*/styled__default.div(_templateObject7$2 || (_templateObject7$2 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  /* These styles are suggested for the table fill all available space in its containing element */\n  display: block;\n  /* These styles are required for a horizontaly scrollable table overflow */\n  overflow: auto;\n"])));
function Table(_ref3) {
  let {
    columns,
    data,
    backgroundColor,
    sticky,
    pagination
  } = _ref3;
  const defaultColumn = React__default.useMemo(() => ({
    // When using the useFlexLayout:
    minWidth: 30,
    width: 150,
    maxWidth: 300
  }), []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = reactTable.useTable({
    columns,
    data,
    defaultColumn
  }, reactTable.useSortBy, reactTable.useFlexLayout);
  // Render the UI for your table
  return React__default.createElement(react.Stack, {
    spacing: 4
  }, React__default.createElement(Main, null, React__default.createElement(StyledTable, Object.assign({
    sticky: sticky,
    backgroundColor: backgroundColor
  }, getTableProps()), React__default.createElement("thead", null, headerGroups.map(headerGroup => React__default.createElement(StyledTr, Object.assign({}, headerGroup.getHeaderGroupProps()), headerGroup.headers.map(column => React__default.createElement(StyledTh, Object.assign({}, column.getHeaderProps({
    ...column.getSortByToggleProps(),
    className: column.collapse ? 'collapse ' : '' + column.className || '',
    style: column.style
  }), {
    theme: theme,
    backgroundColor: backgroundColor
  }), React__default.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingRight: '5px'
    }
  }, column.render('Header'), React__default.createElement("span", null, column.isSorted ? column.isSortedDesc ? React__default.createElement(Icon$w, {
    name: "ArrowDown",
    size: "small"
  }) : React__default.createElement(Icon$w, {
    name: "ArrowUp",
    size: "small"
  }) : ''))))))), React__default.createElement("tbody", Object.assign({}, getTableBodyProps()), rows.map(row => {
    prepareRow(row);
    return React__default.createElement(StyledTr, Object.assign({}, row.getRowProps()), row.cells.map(cell => React__default.createElement(StyledTd, Object.assign({}, cell.getCellProps({
      className: cell.column.className,
      style: cell.column.style,
      bold: cell.column.bold
    }), {
      theme: theme
    }), cell.render('Cell'))));
  })))), pagination && React__default.createElement(Pagination, {
    goToPage: pagination.goToPage,
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    setPageSize: pagination.setPageSize,
    totalPages: pagination.totalPages,
    showMorePlacement: "top"
  }));
}
Table.defaultProps = {
  backgroundColor: '#fff'
};

var _templateObject$f;
const SpacingStyled = /*#__PURE__*/styled__default.div(_templateObject$f || (_templateObject$f = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n"])), _ref => {
  let {
    margin
  } = _ref;
  return margin.top && "margin-top: " + margin.top + "px;";
}, _ref2 => {
  let {
    margin
  } = _ref2;
  return margin.bottom && "margin-bottom: " + margin.bottom + "px;";
}, _ref3 => {
  let {
    margin
  } = _ref3;
  return margin.left && "margin-left: " + margin.left + "px;";
}, _ref4 => {
  let {
    margin
  } = _ref4;
  return margin.right && "margin-right: " + margin.right + "px;";
}, _ref5 => {
  let {
    padding
  } = _ref5;
  return padding.top && "padding-top: " + padding.top + "px;";
}, _ref6 => {
  let {
    padding
  } = _ref6;
  return padding.bottom && "padding-bottom: " + padding.bottom + "px;";
}, _ref7 => {
  let {
    padding
  } = _ref7;
  return padding.left && "padding-left: " + padding.left + "px;";
}, _ref8 => {
  let {
    padding
  } = _ref8;
  return padding.right && "padding-right: " + padding.right + "px;";
});
/**
 * The only true Spacing component.
 */
const Spacing = _ref9 => {
  let {
    margin,
    padding,
    ...ownProps
  } = _ref9;
  const {
    x: marginX,
    y: marginY
  } = margin;
  const {
    x: paddingX,
    y: paddingY
  } = padding;
  return React__default.createElement(SpacingStyled, Object.assign({}, ownProps, {
    margin: {
      top: marginY || margin.top,
      bottom: marginY || margin.bottom,
      left: marginX || margin.left,
      right: marginX || margin.right
    },
    padding: {
      top: paddingY || padding.top,
      bottom: paddingY || padding.bottom,
      left: paddingX || padding.left,
      right: paddingX || padding.right
    }
  }));
};
Spacing.displayName = 'Spacing';
Spacing.defaultProps = {
  margin: {},
  padding: {}
};

var _templateObject$g;
const CardStyled = /*#__PURE__*/styled__default.div(_templateObject$g || (_templateObject$g = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  position: relative;\n  border-radius: ", ";\n  background-color: #ffffff;\n  box-shadow: 2px 1px 14px 11px rgba(0, 0, 0, 0.04);\n  width: ", ";\n  display: block;\n  ", "\n  ", "\n  ", "\n"])), props => props.rounded || '1px', props => props.width || '100%', _ref => {
  let {
    height
  } = _ref;
  return height && "height: " + height + ";";
}, _ref2 => {
  let {
    onClick
  } = _ref2;
  return onClick && "cursor: pointer;";
}, _ref3 => {
  let {
    border
  } = _ref3;
  return border && "border: " + border + ";";
});
const Card = _ref4 => {
  let {
    margin,
    padding,
    children,
    ...rest
  } = _ref4;
  return React__default.createElement(Spacing, {
    margin: margin
  }, React__default.createElement(CardStyled, Object.assign({}, rest), React__default.createElement(Spacing, {
    padding: padding
  }, children)));
};
Card.defaultProps = {
  margin: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  padding: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
};
Card.displayName = 'Card';

var _templateObject$h;
const Message = /*#__PURE__*/styled__default.span(_templateObject$h || (_templateObject$h = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  font-family: Nunito Sans;\n  position: absolute;\n  background-color: #424242;\n  padding: 23px 16px;\n  width: 250px;\n  font-size: 13px;\n  text-transform: none;\n  color: #fff;\n  right: -200px;\n  top: 25px;\n  line-height: 17.73px;\n  z-index: 1;\n\n  p {\n    margin-bottom: 5px;\n  }\n"])));

var _templateObject$i;
const DropdownList = /*#__PURE__*/styled__default.div(_templateObject$i || (_templateObject$i = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  background-color: #fff;\n  padding: 20px 0;\n  white-space: nowrap;\n  overflow-y: auto;\n  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.45), 0 2px 2px rgba(0, 0, 0, 0.45);\n  max-height: calc(100vh - 30px - 40px);\n"])));

var _templateObject$j;
const DropdownItem = /*#__PURE__*/styled__default(_ref => {
  let {
    className,
    value
  } = _ref;
  return React__default.createElement("div", {
    className: className
  }, value);
})(_templateObject$j || (_templateObject$j = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: flex;\n  padding: 10px 25px;\n  flex-grow: 1;\n  align-items: center;\n\n  &:hover {\n    color: #ee0099;\n  }\n"])));

const DropdownInput = _ref => {
  let {
    value
  } = _ref;
  return React__default.createElement("span", null, value);
};

var _templateObject$k, _templateObject2$7, _templateObject3$5, _templateObject4$4, _templateObject5$4;
const useOutsideAlerter = (ref, onEvent) => {
  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      onEvent();
    }
  };
  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
};
const DropdownFluid = /*#__PURE__*/styled__default.div(_templateObject$k || (_templateObject$k = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: flex;\n  flex-direction: column;\n  font-family: ", ";\n"])), props => props.theme.fontFamily);
DropdownFluid.defaultProps = {
  theme
};
const DropdownFluidList = /*#__PURE__*/styled__default.div(_templateObject2$7 || (_templateObject2$7 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  position: absolute;\n  top: calc(100% + 15px);\n  display: flex;\n  flex-direction: column;\n  z-index: 3;\n  ", "\n  ", "\n"])), props => props.direction === 'left' && "\n    left: 0;\n  ", props => props.direction === 'right' && "\n    right: 0;\n  ");
const DropdownFluidInput = /*#__PURE__*/styled__default(_ref => {
  let {
    children,
    className,
    onToggle,
    open
  } = _ref;
  return React__default.createElement("div", {
    className: className,
    onClick: onToggle
  }, children, React__default.createElement(Icon$w, {
    name: !open ? 'ArrowDown' : 'ArrowUp',
    color: "#fff",
    size: "small"
  }));
})(_templateObject3$5 || (_templateObject3$5 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: flex;\n  z-index: 2;\n  cursor: pointer;\n  flex-direction: row;\n  align-items: center;\n  color: #fff;\n  font-weight: bold;\n  font-size: 13px;\n  text-transform: uppercase;\n\n  ", " {\n    margin-left: 10px;\n  }\n"])), Icon$w);
const DropdownFluidItem = /*#__PURE__*/styled__default.div(_templateObject4$4 || (_templateObject4$4 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: flex;\n  ", "\n"])), props => props.clickable && "cursor: pointer;");
const DropdownFluidLayout = /*#__PURE__*/styled__default.div(_templateObject5$4 || (_templateObject5$4 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  position: relative;\n"])));
const Dropdown = _ref2 => {
  let {
    placeholder,
    item,
    items,
    selectable,
    onSelect,
    direction,
    dropdownInput: DropdownInputUI,
    dropdownItem: DropdownItemUI,
    dropdownList: DropdownListUI
  } = _ref2;
  const [open, setOpen] = React.useState(false);
  // click ousite dropdown is close
  const dropdownRef = React.useRef(null);
  useOutsideAlerter(dropdownRef, () => setOpen(false));
  return React__default.createElement(DropdownFluid, {
    ref: dropdownRef
  }, React__default.createElement(DropdownFluidInput, {
    open: open,
    onToggle: () => setOpen(!open)
  }, !item ? React__default.createElement("span", null, placeholder) : selectable && !!item ? React__default.createElement(DropdownInputUI, {
    value: item
  }) : React__default.createElement("span", null, placeholder)), React__default.createElement(DropdownFluidLayout, null, open && React__default.createElement(DropdownFluidList, {
    direction: direction
  }, React__default.createElement(DropdownListUI, null, items.map((value, index) => {
    const clickable = typeof value === 'string' ? true : typeof value.clickable === 'undefined' ? true : value.clickable;
    const itemProps = {
      clickable,
      onClick: !clickable ? null : () => {
        onSelect(value);
        setOpen(false);
      }
    };
    return React__default.createElement(DropdownFluidItem, Object.assign({
      key: "dropdown-item-" + index
    }, itemProps), typeof value !== 'string' && value.render ? React__default.createElement(value.render, {
      value: value,
      selected: item
    }) : React__default.createElement(DropdownItemUI, {
      clickable: true,
      value: value,
      selected: item
    }));
  })))));
};
Dropdown.defaultProps = {
  direction: 'left',
  selectable: true,
  items: [],
  dropdownInput: DropdownInput,
  dropdownItem: DropdownItem,
  dropdownList: DropdownList
};

var _templateObject$l;
const DropdownIconItem = /*#__PURE__*/styled__default(_ref => {
  let {
    className,
    value,
    onClick
  } = _ref;
  const {
    icon,
    label
  } = value;
  return React__default.createElement("div", {
    className: className,
    onClick: onClick
  }, React__default.createElement(Icon$w, {
    name: icon,
    size: "small"
  }), label);
})(_templateObject$l || (_templateObject$l = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: flex;\n  padding: 10px 25px;\n  flex-grow: 1;\n  align-items: center;\n\n  ", " {\n    margin-right: 10px;\n  }\n\n  &:hover {\n    color: #ee0099;\n\n    ", " {\n      path {\n        color: #ee0099;\n        fill: #ee0099;\n        stroke: #ee0099;\n      }\n    }\n  }\n"])), Icon$w, Icon$w);

var _templateObject$m;
const DropdownImageInput = /*#__PURE__*/styled__default(_ref => {
  let {
    className,
    value
  } = _ref;
  const {
    img,
    label
  } = value;
  return React__default.createElement("div", {
    className: className
  }, React__default.createElement("img", {
    src: img.src,
    alt: img.alt
  }), label);
})(_templateObject$m || (_templateObject$m = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: flex;\n  flex-grow: 1;\n  align-items: center;\n\n  img {\n    border-radius: 50px;\n    width: 25px;\n    height: 25px;\n    margin-right: 10px;\n  }\n"])));

var _templateObject$n;
const DropdownImageItem = /*#__PURE__*/styled__default(_ref => {
  let {
    className,
    value
  } = _ref;
  const {
    img,
    label
  } = value;
  return React__default.createElement("div", {
    className: className
  }, React__default.createElement("img", {
    src: img.src,
    alt: img.alt
  }), label);
})(_templateObject$n || (_templateObject$n = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: flex;\n  padding: 10px 25px;\n  flex-grow: 1;\n  align-items: center;\n\n  img {\n    width: 40px;\n    height: 40px;\n    margin-right: 10px;\n  }\n  ", "\n  ", ", ", " {\n    margin: 0;\n  }\n"])), props => props.clickable && "\n    &:hover {\n      background-color: #c7c7c7;\n    }\n  ", Header.H4, Header.H5);

var _templateObject$o;
const Form = /*#__PURE__*/styled__default.form(_templateObject$o || (_templateObject$o = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: flex;\n  flex-direction: ", ";\n"])), props => props.direction);
Form.defaultProps = {
  direction: 'column'
};

const ConnectedForm = _ref => {
  let {
    children,
    onSubmit,
    ...ownProps
  } = _ref;
  return React__default.createElement(reactFinalForm.Form, Object.assign({
    onSubmit: onSubmit
  }, ownProps), _ref2 => {
    let {
      handleSubmit,
      ...formProps
    } = _ref2;
    return React__default.createElement(Form, {
      onSubmit: handleSubmit
    }, children(formProps));
  });
};

var _templateObject$p;
const handleColor = _ref => {
  let {
    color
  } = _ref;
  switch (color) {
    case 'info':
      return '#aaa';
    case 'error':
      return '#ff0931';
    default:
      return '#50e3c2';
  }
};
const Hint = /*#__PURE__*/styled__default.span(_templateObject$p || (_templateObject$p = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  font-family: ", ";\n  font-size: 11px;\n  font-weight: 600;\n  line-height: 1.36;\n  letter-spacing: 0.4px;\n  text-transform: uppercase;\n  color: ", ";\n"])), props => props.theme.fontFamily, handleColor);
Hint.defaultProps = {
  theme,
  color: 'info'
};

var _templateObject$q;
const FormField = /*#__PURE__*/styled__default.div(_templateObject$q || (_templateObject$q = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  position: relative;\n  display: flex;\n  padding: 0 0 30px;\n\n  flex-direction: ", ";\n  ", "\n\n  ", " {\n    position: absolute;\n    right: 0;\n  }\n"])), props => props.direction, props => props.direction === 'row' && "\n    align-items: flex-end;\n  ", Hint);
FormField.defaultProps = {
  direction: 'column'
};

const ArrowUpIcon = /*#__PURE__*/react.createIcon({
  displayName: 'ArrowUpIcon',
  viewBox: '4 4 15 15',
  path: ( /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("path", {
    fill: "currentColor",
    d: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
  })))
});

const ArrowDownIcon = /*#__PURE__*/react.createIcon({
  displayName: 'ArrowDownIcon',
  viewBox: '4 4 15 15',
  path: ( /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("path", {
    fill: "currentColor",
    d: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
  })))
});

const BotIcon = /*#__PURE__*/react.createIcon({
  displayName: 'BotIcon',
  path: ( /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("path", {
    d: "M16.319 14.684a5.484 5.484 0 00-5.478-5.478H7.285a5.484 5.484 0 00-5.478 5.478h1.404a4.079 4.079 0 014.074-4.074h3.556a4.079 4.079 0 014.074 4.074h1.404zM2.042 6.492c0 1.161.944 2.106 2.105 2.106h9.542c1.16 0 2.105-.945 2.105-2.106V2.106C15.794.945 14.85 0 13.69 0H4.147c-1.16 0-2.106.945-2.106 2.106v4.386zm1.403-4.386c0-.387.315-.702.702-.702h9.542c.387 0 .701.315.701.702v4.386a.703.703 0 01-.701.702H4.147a.703.703 0 01-.702-.702V2.106z",
    fill: "currentColor"
  }), /*#__PURE__*/React__default.createElement("path", {
    d: "M7.15 2.643H5.748v3.313H7.15V2.643zM12.304 2.643H10.9v3.313h1.404V2.643zM1.404 2.709H0v3.18h1.404V2.71zM18.125 2.709H16.72v3.18h1.404V2.71z",
    fill: "currentColor"
  })))
});

const EditIcon = /*#__PURE__*/react.createIcon({
  displayName: 'EditIcon',
  path: ( /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "11.5",
    fill: "#E09",
    stroke: "currentColor"
  }), /*#__PURE__*/React__default.createElement("path", {
    fill: "currentColor",
    d: "M6.04 15.008l-.013 2.418c0 .137.05.273.15.372.098.1.222.15.359.15l2.406-.013c.137 0 .26-.05.36-.149l8.31-8.31a.524.524 0 000-.732L15.23 6.338a.524.524 0 00-.731 0l-1.662 1.674-6.648 6.636a.553.553 0 00-.15.36zm8.83-7.579l1.675 1.675-.943.943-1.674-1.675.943-.943zm-7.8 7.802l6.126-6.127 1.675 1.674-6.127 6.115-1.687.012.012-1.674z"
  })))
});

const InfoIcon = /*#__PURE__*/react.createIcon({
  displayName: 'InfoIcon',
  viewBox: '0 0 14 14',
  path: ( /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("path", {
    fill: "currentColor",
    d: "M7.012 14c3.862 0 7-3.138 7-7s-3.138-7-7-7S0 3.138 0 7s3.15 7 7.012 7zm0-13.034a6.032 6.032 0 016.022 6.022 6.032 6.032 0 01-6.022 6.022A6.032 6.032 0 01.99 6.988 6.032 6.032 0 017.012.966z"
  }), /*#__PURE__*/React__default.createElement("path", {
    fill: "currentColor",
    d: "M8.208 8.824V6.066a.735.735 0 00-.734-.734h-1.35a.735.735 0 00-.734.734v.694c0 .36.262.661.605.722V8.84a.735.735 0 00-.605.723v.694c0 .404.33.734.734.734h1.98c.404 0 .734-.33.734-.734v-.694a.744.744 0 00-.63-.74zm-.17 1.367H6.19v-.563h.12a.485.485 0 00.485-.485V7.18a.485.485 0 00-.485-.485h-.12v-.564h1.22v3c0 .267.217.484.484.484h.145v.576zm-.985-5.098a1.16 1.16 0 100-2.322 1.16 1.16 0 00-.001 2.322zm0-1.523a.363.363 0 11-.001.725.363.363 0 010-.725z"
  }), /*#__PURE__*/React__default.createElement("circle", {
    cx: "6.811",
    cy: "6.811",
    r: "4.865",
    fill: "#fff"
  }), /*#__PURE__*/React__default.createElement("path", {
    fill: "currentColor",
    d: "M7.115 10.704a.697.697 0 01-.462-.154c-.116-.11-.174-.264-.174-.462V6.127c0-.198.058-.349.174-.451a.697.697 0 01.462-.154c.185 0 .338.05.462.154.123.102.184.253.184.451v3.961c0 .198-.061.352-.184.462a.697.697 0 01-.462.154zm0-6.096c-.233 0-.417-.061-.554-.184a.663.663 0 01-.206-.503.63.63 0 01.206-.493c.137-.123.321-.184.554-.184.226 0 .407.061.544.184a.616.616 0 01.215.493.663.663 0 01-.205.503c-.137.123-.322.184-.554.184z"
  })))
});

const NetIcon = /*#__PURE__*/react.createIcon({
  displayName: 'NetIcon',
  path: ( /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("path", {
    d: "M24.3 17.858c0-3.508-2.845-6.362-6.342-6.362h-4.116c-3.497 0-6.342 2.854-6.342 6.362h1.625c0-2.61 2.116-4.732 4.716-4.732h4.117c2.601 0 4.717 2.123 4.717 4.732H24.3z",
    fill: "currentColor"
  }), /*#__PURE__*/React__default.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M15.905 1.542a3.758 3.758 0 00-3.752 3.763 3.758 3.758 0 003.752 3.764 3.758 3.758 0 003.752-3.764 3.758 3.758 0 00-3.752-3.763zm-5.288 3.763c0-2.93 2.367-5.305 5.288-5.305 2.921 0 5.29 2.375 5.29 5.305 0 2.93-2.369 5.306-5.29 5.306-2.92 0-5.288-2.376-5.288-5.306z",
    fill: "currentColor"
  }), /*#__PURE__*/React__default.createElement("path", {
    d: "M9.815 3.421a4.236 4.236 0 00-2.119-.563c-2.327 0-4.213 1.862-4.213 4.159 0 2.297 1.886 4.16 4.213 4.16 1.339 0 2.532-.617 3.304-1.579a4.702 4.702 0 01-.884-.849 2.997 2.997 0 01-2.42 1.218c-1.65 0-2.989-1.32-2.989-2.95 0-1.63 1.338-2.95 2.989-2.95.593 0 1.145.17 1.61.464a4.59 4.59 0 01.509-1.11zM9.538 11.875a5.092 5.092 0 00-.207-.005H6.05C3.267 11.87 1 14.108 1 16.858h1.294c0-2.046 1.686-3.71 3.758-3.71h1.74a5.612 5.612 0 011.746-1.273z",
    fill: "currentColor"
  }), /*#__PURE__*/React__default.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M7.696 2.958c-2.273 0-4.113 1.818-4.113 4.059 0 2.24 1.84 4.06 4.113 4.06 1.27 0 2.406-.57 3.16-1.462a4.803 4.803 0 01-.738-.705 3.098 3.098 0 01-2.422 1.158c-1.705 0-3.089-1.365-3.089-3.051 0-1.686 1.384-3.05 3.089-3.05.566 0 1.097.15 1.553.413a4.69 4.69 0 01.426-.922 4.137 4.137 0 00-1.98-.5zM3.383 7.017c0-2.353 1.932-4.26 4.313-4.26.79 0 1.532.21 2.169.578l.09.052-.055.088c-.212.335-.38.699-.499 1.085l-.038.125-.11-.07a2.903 2.903 0 00-1.557-.449c-1.597 0-2.889 1.278-2.889 2.851s1.292 2.85 2.889 2.85c.962 0 1.814-.464 2.34-1.177l.076-.105.082.102c.25.313.541.592.865.83l.084.062-.065.082a4.326 4.326 0 01-3.382 1.615c-2.381 0-4.313-1.906-4.313-4.259zM.9 16.857c0-2.806 2.312-5.087 5.152-5.087H9.33c.07 0 .141.002.211.005l.038.19a5.511 5.511 0 00-1.714 1.251l-.03.032H6.052c-2.018 0-3.658 1.62-3.658 3.61v.1H.9v-.1zm.2-.1h1.096c.054-2.055 1.764-3.709 3.856-3.709h1.676c.39-.422.842-.786 1.343-1.078h-3.02c-2.697 0-4.896 2.14-4.95 4.788z",
    fill: "currentColor"
  })))
});

const PagesIcon = /*#__PURE__*/react.createIcon({
  displayName: 'PagesIcon',
  path: ( /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M1.5 1.5v15h19v-15h-19zM1 0a1 1 0 00-1 1v16a1 1 0 001 1h20a1 1 0 001-1V1a1 1 0 00-1-1H1z",
    fill: "currentColor"
  }), /*#__PURE__*/React__default.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M22 6H0V4.5h22V6z",
    fill: "currentColor"
  }), /*#__PURE__*/React__default.createElement("path", {
    d: "M19 2.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z",
    fill: "currentColor"
  })))
});

const SettingsIcon = /*#__PURE__*/react.createIcon({
  displayName: 'PagesIcon',
  path: ( /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("path", {
    d: "M19.753 8.148a62.2 62.2 0 00-.977-.139 8.613 8.613 0 00-.664-1.6c.203-.264.402-.529.594-.789a1.474 1.474 0 00-.143-1.907l-1.276-1.276a1.474 1.474 0 00-1.907-.143c-.262.193-.526.392-.79.594a8.608 8.608 0 00-1.6-.663c-.044-.33-.09-.659-.138-.978A1.474 1.474 0 0011.402 0H9.598c-.72 0-1.344.536-1.45 1.247-.048.319-.094.647-.138.977a8.606 8.606 0 00-1.6.664c-.264-.202-.528-.401-.79-.594a1.474 1.474 0 00-1.906.143L2.438 3.713c-.51.51-.572 1.33-.144 1.907.192.26.392.525.594.79a8.62 8.62 0 00-.663 1.6c-.33.044-.659.09-.978.138C.537 8.254 0 8.878 0 9.598v1.804c0 .72.536 1.344 1.247 1.45.32.048.647.094.978.138.166.554.388 1.09.663 1.6-.202.264-.402.53-.594.79a1.474 1.474 0 00.143 1.906l1.276 1.276c.51.51 1.33.572 1.907.144.261-.193.526-.392.79-.594.51.275 1.046.497 1.6.663.044.33.09.659.138.978.106.71.73 1.247 1.45 1.247h1.804c.72 0 1.344-.536 1.45-1.247.048-.32.094-.647.138-.978a8.604 8.604 0 001.6-.663c.264.202.528.4.79.594a1.474 1.474 0 001.906-.143l1.276-1.276c.51-.51.572-1.33.144-1.907-.193-.26-.392-.526-.594-.79.275-.51.497-1.046.664-1.6.33-.044.658-.09.977-.138A1.474 1.474 0 0021 11.402V9.598c0-.72-.536-1.344-1.247-1.45zm-.51 3.003c-.29.042-.586.083-.883.122a1.461 1.461 0 00-1.224 1.061 6.842 6.842 0 01-.647 1.56 1.462 1.462 0 00.115 1.617c.182.237.362.475.538.71l-.92.921a62.411 62.411 0 01-.71-.538 1.462 1.462 0 00-1.618-.115 6.846 6.846 0 01-1.56.647 1.461 1.461 0 00-1.061 1.224c-.039.297-.08.593-.122.883H9.85c-.042-.29-.083-.586-.122-.883a1.462 1.462 0 00-1.061-1.224 6.847 6.847 0 01-1.56-.647 1.462 1.462 0 00-1.617.115c-.236.181-.474.362-.71.538l-.921-.92c.175-.236.356-.474.538-.711.361-.47.406-1.104.115-1.617a6.845 6.845 0 01-.647-1.56 1.462 1.462 0 00-1.224-1.061c-.297-.04-.593-.08-.883-.122V9.849c.29-.042.586-.083.883-.122a1.462 1.462 0 001.224-1.061 6.84 6.84 0 01.647-1.56 1.462 1.462 0 00-.115-1.617 61.019 61.019 0 01-.538-.71l.92-.921c.236.176.475.357.71.538.47.361 1.105.406 1.618.115a6.847 6.847 0 011.56-.647A1.461 1.461 0 009.727 2.64c.039-.297.08-.592.122-.882h1.302c.042.29.083.585.122.882a1.462 1.462 0 001.061 1.224c.544.15 1.069.368 1.56.647a1.462 1.462 0 001.617-.115c.236-.181.474-.362.71-.538l.921.92c-.175.236-.356.474-.538.711a1.462 1.462 0 00-.115 1.617c.28.491.497 1.016.647 1.56.156.568.637.985 1.224 1.062.297.038.593.079.883.121v1.302z",
    fill: "currentColor"
  }), /*#__PURE__*/React__default.createElement("path", {
    d: "M10.506 6.3A4.21 4.21 0 006.3 10.506a4.21 4.21 0 004.206 4.206 4.21 4.21 0 004.206-4.206A4.21 4.21 0 0010.506 6.3zm0 6.542a2.34 2.34 0 01-2.336-2.336 2.339 2.339 0 012.336-2.336 2.34 2.34 0 012.336 2.336 2.34 2.34 0 01-2.336 2.336z",
    fill: "currentColor"
  })))
});

const CloseIcon = /*#__PURE__*/react.createIcon({
  displayName: 'CloseIcon',
  viewBox: '0 0 10 10',
  path: ( /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("path", {
    fill: "currentColor",
    fillRule: "evenodd",
    stroke: "currentColor",
    strokeLinecap: "square",
    strokeWidth: "1.5",
    d: "M5.337 5.013l3.324 3.325.107.107-.2.2-.107-.106-3.325-3.325L1.74 8.61l-.1.1-.214-.213.1-.1L4.922 5 1.604 1.682l-.107-.107.2-.201.107.107 3.319 3.318 3.273-3.273.1-.1.215.214-.1.1-3.274 3.273z"
  })))
});

const UploadImageIcon = /*#__PURE__*/react.createIcon({
  displayName: 'UploadImageIcon',
  viewBox: '0 0 84 84',
  path: ( /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("circle", {
    cx: "42",
    cy: "42",
    r: "41.5",
    fill: "#424242",
    stroke: "#EEE"
  }), /*#__PURE__*/React__default.createElement("path", {
    fill: "#000",
    d: "M59.58 29H25v25.56h34.58V29z",
    opacity: "0.502"
  }), /*#__PURE__*/React__default.createElement("path", {
    fill: "#fff",
    d: "M37.968 36.668l9.262 12.78H28.705l9.263-12.78z"
  }), /*#__PURE__*/React__default.createElement("path", {
    fill: "#fff",
    d: "M49.083 43.058l5.558 6.39H43.525l5.558-6.39z"
  }), /*#__PURE__*/React__default.createElement("path", {
    fill: "#D8D8D8",
    stroke: "#fff",
    d: "M57.904 52.558h3.89v.228h-3.891v3.964h-.242v-3.964h-3.884v-.228h3.884v-3.825h.243v3.825z"
  }), /*#__PURE__*/React__default.createElement("circle", {
    cx: "72",
    cy: "72",
    r: "11.5",
    fill: "#E09",
    stroke: "#fff"
  }), /*#__PURE__*/React__default.createElement("path", {
    fill: "#fff",
    d: "M66.04 75.008l-.013 2.418c0 .137.05.273.15.372.098.1.222.15.359.15l2.406-.013c.137 0 .26-.05.36-.149l8.31-8.31a.524.524 0 000-.732l-2.382-2.406a.524.524 0 00-.731 0l-1.662 1.674-6.648 6.636a.553.553 0 00-.15.36zm8.83-7.579l1.675 1.675-.942.942-1.675-1.674.943-.943zm-7.8 7.802l6.126-6.127 1.675 1.674-6.127 6.115-1.687.012.012-1.674z"
  })))
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const InputField = props => {
  const {
    variant,
    label,
    name,
    placeholder,
    helpText,
    type,
    disabled,
    onBlur,
    ...config
  } = props;
  const {
    input,
    meta
  } = reactFinalForm.useField(name, config);
  return React__default.createElement(react.FormControl, {
    isInvalid: (meta.error || meta.submitError) && meta.touched,
    mb: 4
  }, React__default.createElement(react.Flex, {
    direction: "row",
    justify: "space-between"
  }, React__default.createElement(react.Stack, {
    direction: "row",
    spacing: 2,
    align: "center"
  }, React__default.createElement(react.FormLabel, null, label), helpText && React__default.createElement(react.Tooltip, {
    label: helpText
  }, React__default.createElement(InfoIcon, {
    color: "gray.300",
    boxSize: 3
  }))), (meta.error || meta.submitError) && meta.touched && React__default.createElement(Hint, {
    color: "error"
  }, meta.error || meta.submitError)), React__default.createElement(react.Input, {
    variant: variant,
    value: input.value,
    onChange: input.onChange,
    placeholder: placeholder,
    type: type || input.type,
    disabled: disabled,
    onBlur: e => {
      onBlur && onBlur(e);
      input.onBlur(e);
    }
  }));
};

const SelectField = props => {
  const {
    label,
    name,
    disabled,
    children,
    ...config
  } = props;
  const {
    input,
    meta
  } = reactFinalForm.useField(name, config);
  return React__default.createElement(react.FormControl, {
    isInvalid: (meta.error || meta.submitError) && meta.touched,
    mb: 4
  }, React__default.createElement(react.Flex, {
    direction: "row",
    justify: "space-between"
  }, React__default.createElement(react.FormLabel, null, label), (meta.error || meta.submitError) && meta.touched && React__default.createElement(Hint, {
    color: "error"
  }, meta.error || meta.submitError)), React__default.createElement(react.Select, Object.assign({
    disabled: disabled
  }, input), children));
};

var _templateObject$r;
const Label = /*#__PURE__*/styled__default.label(_templateObject$r || (_templateObject$r = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  font-family: ", ";\n  font-weight: 600;\n  font-size: 13px;\n  line-height: 1.15;\n  letter-spacing: 0.5px;\n  color: ", ";\n  text-transform: uppercase;\n"])), props => props.theme.fontFamily, props => props.theme.commons.main);
Label.defaultProps = {
  theme
};

// Validate for redux-form
// https://redux-form.com/7.4.2/docs/api/field.md/#-code-validate-value-allvalues-props-name-gt-error-code-optional-
const isEmail = message => value => {
  // eslint-disable-next-line
  const regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !regexEmail.test(value) ? message : undefined;
};
const required = message => value => !value ? message : undefined;
const min = (size, message) => value => value && value.length < size ? message : undefined;
const max = (size, message) => value => value && value.length > size ? message : undefined;
const composeValidators = function () {
  for (var _len = arguments.length, validators = new Array(_len), _key = 0; _key < _len; _key++) {
    validators[_key] = arguments[_key];
  }
  return value => validators.reduce((error, validator) => error || validator(value), undefined);
};
var Validators = {
  isEmail,
  required,
  min,
  max,
  composeValidators
};

var _templateObject$s;
const Textarea = /*#__PURE__*/styled__default.textarea(_templateObject$s || (_templateObject$s = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  font-family: ", ";\n  font-size: 16px;\n  color: #000000;\n  border: none;\n  border-bottom: 1px solid #AAAAAA;\n  padding: 0 0 8px;\n  flex: 1;\n  background: none;\n  min-height: 109px;\n\n  &[disabled] {\n    color: #D1CDD2;\n    background: none;\n  }\n\n  &:focus {\n    outline: none;\n    border-bottom: 1px solid ", ";\n  }\n\n  &::placeholder {\n    color: ", ";\n  }\n  &::-webkit-input-placeholder {\n    color: ", ";\n  }\n  &::-moz-placeholder {\n    color: ", ";\n  }\n  &:-ms-input-placeholder {\n    color: ", ";\n  }\n  &:-moz-placeholder {\n    color: ", ";\n  }\n\n  ", "\n"])), props => props.fullWidth && 'width: 100%;', theme.fontFamily, theme.brand.main, theme.commons.dark, theme.commons.dark, theme.commons.dark, theme.commons.dark, theme.commons.dark, props => props.invalid && "border-color: #ff0931;");
Textarea.displayName = 'Textarea';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const TextareaField = props => {
  const {
    label,
    name,
    placeholder,
    disabled,
    ...config
  } = props;
  const {
    input,
    meta
  } = reactFinalForm.useField(name, config);
  return React__default.createElement(FormField, null, React__default.createElement(Label, null, label), (meta.error || meta.submitError) && meta.touched && React__default.createElement(Hint, {
    color: "error"
  }, meta.error || meta.submitError), React__default.createElement("div", {
    style: {
      display: 'flex',
      paddingTop: '8px'
    }
  }, React__default.createElement(Textarea, Object.assign({
    placeholder: placeholder,
    invalid: (meta.error || meta.submitError) && meta.touched,
    disabled: disabled
  }, input))));
};

const RoundSelectField = _ref => {
  let {
    label,
    name,
    placeholder,
    disabled,
    options,
    menuPortalTarget,
    isClearable,
    onChange,
    maxMenuHeight = 300,
    menuPlacement = 'bottom',
    ...config
  } = _ref;
  const {
    input,
    meta
  } = reactFinalForm.useField(name, config);
  return React__default.createElement(FormField, null, label && React__default.createElement(Label, null, label), (meta.error || meta.submitError) && meta.touched && React__default.createElement(Hint, {
    color: "error"
  }, meta.error || meta.submitError), React__default.createElement(RoundSelect, Object.assign({}, input, {
    options: options,
    placeholder: placeholder,
    invalid: (meta.error || meta.submitError) && meta.touched,
    disabled: disabled,
    menuPortalTarget: menuPortalTarget,
    isClearable: isClearable,
    maxMenuHeight: maxMenuHeight,
    menuPlacement: menuPlacement,
    onChange: e => {
      onChange && onChange(e);
      input.onChange(e);
    }
  })));
};

var _templateObject$t, _templateObject2$8, _templateObject3$6, _templateObject4$5;
const RoundInput = /*#__PURE__*/styled__default.input(_templateObject$t || (_templateObject$t = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  padding: 0 60px 0 15px;\n  width: 100%;\n  height: 40px;\n\n  font-family: ", ";\n  font-size: 14px;\n  line-height: 22px;\n  color: ", ";\n  border: none;\n  box-sizing: border-box;\n  background-color: unset;\n\n  &[disabled] {\n    color: #d1cdd2;\n    background: unset;\n  }\n\n  &::placeholder,\n  &::-webkit-input-placeholder,\n  &::-moz-placeholder,\n  &:-ms-input-placeholder,\n  &:-moz-placeholder {\n    color: ", ";\n    font-family: ", ";\n  }\n\n  ", "\n"])), props => props.theme.fontFamily, props => props.theme.commons.dark, props => props.theme.commons.dark, props => props.theme.fontFamily, _ref => {
  let {
    border,
    value,
    theme,
    invalid
  } = _ref;
  return border && styled.css(_templateObject2$8 || (_templateObject2$8 = _taggedTemplateLiteralLoose(["\n      border: 1px solid;\n      border-radius: 7px;\n      ", "\n      ", "\n    "])), !value ? styled.css(_templateObject3$6 || (_templateObject3$6 = _taggedTemplateLiteralLoose(["\n            &:hover,\n            &:focus {\n              border-color: ", ";\n            }\n            border-color: ", ";\n          "])), theme.commons.main, theme.commons.main) : styled.css(_templateObject4$5 || (_templateObject4$5 = _taggedTemplateLiteralLoose(["\n            &:hover,\n            &:focus {\n              border-color: ", ";\n            }\n            border-color: ", ";\n          "])), theme.brand.main, theme.brand.main), invalid && "border-color: " + theme.error + ";");
});
RoundInput.defaultProps = {
  invalid: false,
  type: 'text',
  theme
};

var _templateObject$u, _templateObject2$9, _templateObject3$7;
const StyledFormField = /*#__PURE__*/styled__default(FormField)(_templateObject$u || (_templateObject$u = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  border: 1px solid;\n  border-radius: 7px;\n  padding: 0;\n  ", "\n\n  ", "\n"])), props => !props.value ? styled.css(_templateObject2$9 || (_templateObject2$9 = _taggedTemplateLiteralLoose(["\n          &:hover,\n          &:focus {\n            border-color: ", ";\n          }\n          border-color: ", ";\n        "])), props.theme.commons.main, props.theme.commons.main) : styled.css(_templateObject3$7 || (_templateObject3$7 = _taggedTemplateLiteralLoose(["\n          &:hover,\n          &:focus {\n            border-color: ", ";\n          }\n          border-color: ", ";\n        "])), props.theme.brand.main, props.theme.brand.main), props => props.invalid && "\n    border-color: " + props.theme.error + ";\n  ");
StyledFormField.defaultProps = {
  theme
};
const RoundInputField = _ref => {
  let {
    name,
    type,
    label,
    placeholder,
    disabled,
    onBlur,
    ...config
  } = _ref;
  const {
    input,
    meta
  } = reactFinalForm.useField(name, config);
  return React__default.createElement(StyledFormField, {
    value: input.value,
    invalid: (meta.error || meta.submitError) && meta.touched
  }, label && React__default.createElement(Label, null, label), (meta.error || meta.submitError) && meta.touched && React__default.createElement(Hint, {
    color: "error"
  }, meta.error || meta.submitError), React__default.createElement(RoundInput, Object.assign({}, input, {
    placeholder: placeholder,
    type: type,
    invalid: (meta.error || meta.submitError) && meta.touched,
    disabled: disabled,
    onBlur: e => {
      onBlur && onBlur(e);
      input.onBlur(e);
    }
  })));
};

var _templateObject$v;
const Switch = _ref => {
  let {
    onClick,
    checked,
    disabled
  } = _ref;
  return React__default.createElement(Label$1, null, React__default.createElement("input", {
    onClick: onClick,
    type: "checkbox",
    checked: checked,
    disabled: disabled
  }), React__default.createElement("span", {
    className: "slider"
  }));
};
const Label$1 = /*#__PURE__*/styled__default.label(_templateObject$v || (_templateObject$v = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  position: relative;\n  display: inline-block;\n  width: 28px;\n  min-width: 28px;\n  height: 14px;\n  border-radius: 50%;\n  box-shadow: 3px 3px 10px 1px rgb(138 138 138 / 55%);\n\n  input {\n    opacity: 0;\n    width: 0;\n    height: 0;\n  }\n\n  .slider {\n    position: absolute;\n    cursor: pointer;\n    border-radius: 34px;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background-color: #858585;\n    -webkit-transition: 0.4s;\n    transition: 0.4s;\n  }\n\n  .slider::before {\n    position: absolute;\n    content: '';\n    height: 12px;\n    width: 12px;\n    border-radius: 50%;\n    left: 1px;\n    bottom: 1px;\n    background-color: white;\n    -webkit-transition: 0.4s;\n    transition: 0.4s;\n  }\n\n  input:checked + .slider {\n    background-color: #50e3c2;\n  }\n\n  input:checked + .slider::before {\n    -webkit-transform: translateX(14px);\n    -ms-transform: translateX(14px);\n    transform: translateX(14px);\n  }\n"])));

var _templateObject$w;
const SwitchField = props => {
  const {
    label,
    name,
    disabled,
    textOff,
    textOn,
    ...config
  } = props;
  const {
    input,
    meta
  } = reactFinalForm.useField(name, config);
  return React__default.createElement(FormField, null, (meta.error || meta.submitError) && meta.touched && React__default.createElement(Hint, {
    color: "error"
  }, meta.error || meta.submitError), React__default.createElement(Container, {
    disabled: !input.value
  }, label && React__default.createElement(Label, null, label), React__default.createElement("span", {
    className: "text"
  }, input.value ? textOn : textOff), React__default.createElement(Switch, {
    disabled: disabled,
    onClick: () => input.onChange(!input.value),
    checked: input.value
  })));
};
const Container = /*#__PURE__*/styled__default.div(_templateObject$w || (_templateObject$w = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: flex;\n  align-items: center;\n\n  .text {\n    font-size: '13px';\n    font-weight: 800;\n    margin-right: 8px;\n    color: ", ";\n  }\n"])), _ref => {
  let {
    disabled
  } = _ref;
  return disabled ? '#858585' : '#50E3C2';
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const RadioField = _ref => {
  let {
    children,
    label,
    name,
    direction
  } = _ref;
  const {
    input,
    meta
  } = reactFinalForm.useField(name);
  return React__default.createElement(react.FormControl, {
    isInvalid: (meta.error || meta.submitError) && meta.touched,
    mb: 4
  }, React__default.createElement(react.Flex, {
    direction: "row",
    justify: "space-between"
  }, React__default.createElement(react.FormLabel, null, label), (meta.error || meta.submitError) && meta.touched && React__default.createElement(Hint, {
    color: "error"
  }, meta.error || meta.submitError)), React__default.createElement(react.RadioGroup, {
    onChange: input.onChange,
    value: input.value
  }, React__default.createElement(react.Stack, {
    direction: direction,
    spacing: 4
  }, children)));
};
RadioField.defaultProps = {
  direction: 'row'
};

const S3UploadFileField = _ref => {
  let {
    children,
    onChange,
    signingUrl,
    disabled
  } = _ref;
  const inputRef = React__default.useRef(null);
  // Override callbacks
  const onProgress = args => {
    console.log('onProgress', {
      args
    });
  };
  const onError = args => {
    console.log('onError', {
      args
    });
  };
  const onFinish = _ref2 => {
    let {
      signedUrl
    } = _ref2;
    const imageUrl = signedUrl.substring(0, signedUrl.indexOf('?'));
    console.log('onFinish', {
      imageUrl
    });
    onChange(imageUrl);
  };
  // Button should be ReactS3Uploader active.
  const onClick = evt => {
    evt === null || evt === void 0 ? void 0 : evt.preventDefault();
    inputRef === null || inputRef === void 0 ? void 0 : inputRef.current.click();
  };
  return React__default.createElement("div", {
    className: "wrapper-upload-file-button"
  }, React__default.createElement("button", {
    onClick: onClick,
    disabled: disabled
  }, children), React__default.createElement(ReactS3Uploader, {
    signingUrl: signingUrl,
    accept: "image/*",
    onProgress: onProgress,
    onError: onError,
    onFinish: onFinish,
    inputRef: inputRef,
    style: {
      display: 'none'
    }
  }));
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const S3UploadField = props => {
  const {
    label,
    helpText,
    name,
    disabled,
    alt,
    signingUrl,
    uploadImageIcon: UploadImageIconComponent,
    removeTextButton,
    borderRadius,
    boxSize,
    ...config
  } = props;
  const {
    input
  } = reactFinalForm.useField(name, config);
  return React__default.createElement(react.Stack, {
    direction: "row",
    spacing: 6,
    mb: 4,
    align: "center"
  }, React__default.createElement(S3UploadFileField, {
    onChange: input.onChange,
    disabled: disabled,
    signingUrl: signingUrl
  }, input.value ? React__default.createElement(react.Box, {
    position: "relative",
    boxSize: boxSize,
    borderRadius: borderRadius
  }, React__default.createElement(react.Image, {
    alt: alt,
    src: input.value
  }), React__default.createElement(react.Box, {
    position: "absolute",
    bottom: "3px",
    right: "0"
  }, React__default.createElement(EditIcon, {
    color: "white",
    boxSize: 6
  }))) : React__default.createElement(UploadImageIconComponent, {
    boxSize: boxSize
  })), React__default.createElement(react.FormControl, {
    id: name + "-id"
  }, React__default.createElement(react.FormLabel, null, label), helpText && React__default.createElement(react.FormHelperText, {
    mt: 3,
    color: "gray.400",
    fontSize: "md"
  }, helpText), props.formData && React__default.createElement(react.Button, {
    type: "button",
    variant: "link",
    fontWeight: "normal",
    colorScheme: "gray",
    onClick: () => props.onChange(null)
  }, removeTextButton)));
};
S3UploadField.defaultProps = {
  uploadImageIcon: UploadImageIcon,
  removeTextButton: 'Remover',
  borderRadius: '50%',
  boxSize: '85px'
};

// interface ColorFieldProps extends {
//   name: string
//   label?: string
//   helpText?: string
// }
const ColorField = props => {
  const {
    // variant,
    label,
    name,
    // placeholder,
    helpText,
    // type,
    // disabled,
    // onBlur,
    ...config
  } = props;
  const {
    input,
    meta
  } = reactFinalForm.useField(name, config);
  return React__default.createElement(react.FormControl, {
    isInvalid: (meta.error || meta.submitError) && meta.touched,
    mb: 4
  }, React__default.createElement(react.Flex, {
    direction: "row",
    justify: "space-between"
  }, React__default.createElement(react.Stack, {
    direction: "row",
    spacing: 2,
    align: "center"
  }, React__default.createElement(react.FormLabel, null, label), helpText && React__default.createElement(react.Tooltip, {
    label: helpText
  }, React__default.createElement(InfoIcon, {
    boxSize: 4
  }))), (meta.error || meta.submitError) && meta.touched && React__default.createElement(Hint, {
    color: "error"
  }, meta.error || meta.submitError)), React__default.createElement(reactColor.SketchPicker, {
    color: input.value,
    onChangeComplete: color => input.onChange(color.hex)
  }));
};

var _templateObject$x;
const Navigation = /*#__PURE__*/styled__default.div(_templateObject$x || (_templateObject$x = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: flex;\n  height: 40px;\n  background-color: ", ";\n  align-items: flex-end;\n\n  & > a {\n    color: inherit;\n    text-decoration: none;\n  }\n"])), _ref => {
  let {
    theme
  } = _ref;
  return theme.brand.dark;
});
Navigation.defaultProps = {
  theme
};

const Tab = _ref => {
  let {
    children,
    active,
    onClick
  } = _ref;
  const {
    colorMode: colorMode$1
  } = colorMode.useColorMode();
  const defaultColor = colorMode$1 === 'dark' ? 'white' : 'black';
  const defaultStylesProps = {
    color: defaultColor
  };
  if (!active && colorMode$1 === 'light') {
    defaultStylesProps.color = 'black';
    defaultStylesProps._hover = {
      color: 'gray.400'
    };
  }
  if (!active && colorMode$1 === 'dark') {
    defaultStylesProps.color = 'white';
    defaultStylesProps._hover = {
      color: 'gray.200'
    };
  }
  if (active) {
    defaultStylesProps.color = 'pink.200';
    defaultStylesProps._hover = {
      color: 'pink.200',
      borderBottomColor: 'pink.200'
    };
    defaultStylesProps.borderBottomWidth = '2px';
    defaultStylesProps.borderBottomStyle = 'solid';
    defaultStylesProps.borderBottomColor = 'pink.200';
  }
  return React__default.createElement(react.Button, Object.assign({
    variant: "link",
    colorScheme: "white",
    onClick: onClick,
    px: 0,
    pb: 2,
    mr: 5
  }, defaultStylesProps), children);
};

var _templateObject$y;
const StyledContainer = /*#__PURE__*/styled__default(reactToastify.ToastContainer)(_templateObject$y || (_templateObject$y = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  .Toastify__toast {\n    font-family: Nunito Sans;\n    font-size: 16px;\n    color: #fff;\n\n    padding: 15px 18px;\n  }\n  .Toastify__toast--success {\n    background-color: #50e3c2;\n  }\n"])));

const Icon$x = () => {
  return React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "18",
    height: "18",
    fill: "none",
    viewBox: "0 0 18 18"
  }, React__default.createElement("g", {
    clipPath: "url(#clip0)"
  }, React__default.createElement("path", {
    fill: "#fff",
    d: "M13.034 17.965l-1.914-.002c-2.408 0-4.133-.209-5.43-.657-.276-.097-.517-.204-.73-.299-.377-.167-.674-.3-.983-.3H2.72c-.381 0-.932-.04-1.321-.392-.417-.376-.465-.922-.465-1.3V9.277c0-.526.162-.971.469-1.286.22-.226.628-.496 1.317-.496l.111.001c.393.004 1.04.011 1.458-.351l.073-.136c.015-.03.029-.054.04-.073l.01-.02a.856.856 0 01.104-.182 6.17 6.17 0 01.692-.957c.482-.526.928-.798 1.322-1.038.463-.282.797-.486 1.088-1.053l.02-.04c.436-.847.616-1.197.725-1.618.037-.143.053-.293.048-.446C8.37.988 8.665.077 9.643-.032l.029-.003h.03c.594 0 1.092.14 1.48.418.576.412.868 1.082.868 1.992 0 1.622-.397 2.92-.74 3.737l4.081.511c.978.057 1.733.94 1.688 1.982a2.104 2.104 0 01-.602 1.399c.33.323.505.76.486 1.264-.006.505-.161.908-.46 1.199-.117.112-.246.199-.383.266.232.306.357.678.357 1.072 0 .537-.204 1.028-.574 1.38a1.93 1.93 0 01-1.114.516c.065.18.095.375.087.58-.001.083-.009.234-.02.306a1.343 1.343 0 01-.402.787c-.407.386-.898.59-1.42.59zM2.72 8.55c-.511 0-.73.217-.73.728v5.737c0 .188.02.431.118.519.049.044.194.119.612.119h1.257c.534 0 .96.19 1.413.391.204.09.415.184.648.266 1.164.402 2.827.599 5.082.599l1.915.001c.248 0 .481-.1.691-.3.027-.026.063-.06.085-.188.003-.031.007-.11.008-.143V16.243c.01-.205-.092-.356-.3-.449a.625.625 0 01.307-1.196l.71.06a.879.879 0 00.637-.235.83.83 0 00.247-.618c0-.338-.247-.722-.79-.764a.575.575 0 01-.525-.636.57.57 0 01.58-.503c.324.006.867.016 1.08-.191.035-.034.139-.134.141-.461v-.018c.02-.465-.35-.647-.666-.718a.54.54 0 01-.42-.57.54.54 0 01.511-.492c.361-.018.672-.418.692-.892.02-.47-.294-.866-.701-.884l-.043-.004-4.156-.52a1.006 1.006 0 01-.753-.5 1.002 1.002 0 01-.054-.902 8.77 8.77 0 00.678-3.375c0-1.18-.666-1.35-1.26-1.355-.116.018-.175.07-.22.19a.88.88 0 00-.048.308v.017c.01.258-.017.513-.08.757-.139.534-.348.942-.808 1.836l-.02.04c-.426.83-.96 1.156-1.477 1.47-.35.214-.713.435-1.094.851-.174.19-.392.495-.58.814l-.034.053c-.02.046-.041.08-.055.105l-.012.021-.011.022c-.032.06-.07.129-.105.2l-.039.075-.06.06c-.729.728-1.77.717-2.271.712l-.1-.001zm11.093 7.863a.096.096 0 010 .002v-.002zm0-.002v.002-.002zm.007-.123v.004-.004zm.89-4.299h.001zm.675-1.484z"
  })), React__default.createElement("defs", null, React__default.createElement("clipPath", {
    id: "clip0"
  }, React__default.createElement("path", {
    fill: "#fff",
    d: "M0 0H18V18H0z"
  }))));
};
Icon$x.displayName = 'SuccessIcon';

var _templateObject$z;
const Message$1 = /*#__PURE__*/styled__default.div(_templateObject$z || (_templateObject$z = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: flex;\n  flex-direction: row;\n\n  svg {\n    margin-right: 18px;\n  }\n"])));
const Success = _ref => {
  let {
    message
  } = _ref;
  return React__default.createElement(Message$1, null, React__default.createElement(Icon$x, null), React__default.createElement("span", null, message));
};

var _templateObject$A;
const Body = /*#__PURE__*/styled__default.div(_templateObject$A || (_templateObject$A = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  padding: 0 ", "px;\n  overflow: hidden;\n  /* background-color: ", "; */\n"])), _ref => {
  let {
    theme
  } = _ref;
  return theme.body.padding;
}, props => props.theme.body);
Body.defaultProps = {
  theme
};

var _templateObject$B;
const Footer = /*#__PURE__*/styled__default(_ref => {
  let {
    className,
    children
  } = _ref;
  return React__default.createElement("div", {
    className: className
  }, React__default.createElement(Bonde, null), children);
})(_templateObject$B || (_templateObject$B = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: flex;\n  flex-direction: row;\n  background-color: ", ";\n  padding: 20px ", "px;\n"])), _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.body.background.dark;
}, _ref3 => {
  let {
    theme
  } = _ref3;
  return theme.body.padding;
});
Footer.defaultProps = {
  theme
};

var _templateObject$C;
const Main$1 = /*#__PURE__*/styled__default.div(_templateObject$C || (_templateObject$C = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n  min-width: 100%;\n  background-color: ", ";\n  font-family: ", ";\n"])), _ref => {
  let {
    theme
  } = _ref;
  return theme.body.background.main;
}, _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.fontFamily;
});
Main$1.defaultProps = {
  theme
};

var _templateObject$D;
// Reset link to keep BondeSVG render
const HomeLink = /*#__PURE__*/styled__default.a(_templateObject$D || (_templateObject$D = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  color: #000;\n  text-decoration: none;\n\n  &:hover {\n    color: #000;\n    text-decoration: none;\n  }\n"])));
const Navbar = _ref => {
  let {
    brand,
    children,
    indexRoute,
    fixed = false
  } = _ref;
  return React__default.createElement(react.Flex, {
    position: fixed ? 'fixed' : 'relative',
    direction: "row",
    w: "100%",
    bg: "black",
    px: [6, null, null, 12],
    py: 4,
    alignItems: "center"
  }, React__default.createElement(HomeLink, {
    href: indexRoute,
    title: "Bonde Home Link"
  }, brand !== 'small' ? React__default.createElement(Bonde, null) : React__default.createElement(Icon$w, {
    name: "Bonde"
  })), children);
};

const dropdownContext = /*#__PURE__*/React.createContext({
  isOpen: false,
  onToggle: () => {}
});
const PerformDropdownList = _ref => {
  let {
    children,
    scroll
  } = _ref;
  const {
    isOpen
  } = React.useContext(dropdownContext);
  const boxProps = {
    minWidth: '200px',
    maxWidth: '400px',
    bg: 'white',
    boxShadow: 'base',
    mt: 10
  };
  if (scroll) {
    boxProps.overflowY = 'scroll';
    boxProps.height = '500px';
  }
  return React__default.createElement(react.Fade, {
    in: isOpen,
    style: {
      position: 'absolute',
      top: isOpen ? '0' : '-1000px',
      zIndex: 2
    }
  }, React__default.createElement(react.Box, Object.assign({}, boxProps), children));
};
const PerformDropdownItem = _ref2 => {
  let {
    children,
    onClick
  } = _ref2;
  const {
    onToggle
  } = React.useContext(dropdownContext);
  return React__default.createElement(react.Box, {
    cursor: "pointer",
    onClick: () => {
      if (onClick) onClick();
      onToggle();
    },
    _hover: {
      bg: 'gray.100'
    }
  }, children);
};
const PerformDropdownButton = _ref3 => {
  let {
    children,
    color,
    ...props
  } = _ref3;
  const {
    isOpen,
    onToggle
  } = React.useContext(dropdownContext);
  const buttonProps = {
    ...props,
    zIndex: 3,
    rightIcon: isOpen ? React__default.createElement(ArrowUpIcon, {
      boxSize: 3
    }) : React__default.createElement(ArrowDownIcon, {
      boxSize: 3
    }),
    onClick: onToggle
  };
  if (color) {
    buttonProps.color = color;
    buttonProps['_hover'] = {
      color
    };
    buttonProps['_active'] = {
      color
    };
  }
  return React__default.createElement(react.Button, Object.assign({}, buttonProps), children);
};
const PerformDropdown = _ref4 => {
  let {
    children
  } = _ref4;
  const wrapperRef = React.useRef();
  const [isOpen, setIsOpen] = React.useState(false);
  react.useOutsideClick({
    ref: wrapperRef,
    handler: () => setIsOpen(false)
  });
  return React__default.createElement(dropdownContext.Provider, {
    value: {
      isOpen,
      onToggle: () => setIsOpen(!isOpen)
    }
  }, React__default.createElement(react.Box, {
    ref: wrapperRef,
    position: "relative",
    display: "flex"
  }, children));
};

const items = {
  settings: [SettingsIcon, 'Configurações'],
  mobilization: [PagesIcon, 'Mobilizações'],
  redes: [NetIcon, 'Redes'],
  chatbot: [BotIcon, 'Chatbot']
};
const CommunityMenu = _ref => {
  let {
    community,
    session,
    inverted
  } = _ref;
  const {
    apps: config,
    updateSession
  } = session;
  const {
    modules
  } = community;
  const handleClick = url => function () {
    try {
      updateSession('community', community).then(() => {
        window.location.href = url;
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  };
  return React__default.createElement(react.Stack, {
    direction: "row",
    spacing: 2
  }, Object.keys(modules).filter(key => !!modules[key]).map((key, index) => {
    let moduleHost = '';
    let baseHost = '';
    try {
      moduleHost = new URL('', config[key]).host;
      baseHost = new URL('', window.location.href).host;
    } catch (err) {
      console.log('error URL', err);
    }
    const hoverColor = color => ({
      color: color + ".200"
    });
    const isActive = moduleHost === baseHost;
    const IconComponent = items[key][0];
    const colorSystem = inverted ? {
      color: isActive ? 'pink.200' : 'white',
      _hover: isActive ? hoverColor('pink') : hoverColor('gray')
    } : {
      color: 'gray.400',
      _hover: hoverColor('gray')
    };
    return React__default.createElement(react.IconButton, {
      "aria-label": items[key][1],
      key: "community-navigation-" + index,
      variant: "link",
      colorScheme: "gray",
      title: items[key][1],
      icon: React__default.createElement(IconComponent, Object.assign({}, colorSystem, {
        boxSize: [0, 0, 4, 4]
      })),
      onClick: handleClick(config[key])
    });
  }));
};

const CommunitiesDropdown = _ref => {
  let {
    session,
    isMobile
  } = _ref;
  const {
    communities,
    community,
    updateSession
  } = session;
  return React__default.createElement(react.Stack, {
    direction: "row",
    spacing: 2
  }, React__default.createElement(PerformDropdown, null, React__default.createElement(PerformDropdownButton, {
    variant: "link",
    color: "white"
  }, community ? React__default.createElement(react.Stack, {
    direction: "row",
    spacing: 4,
    alignItems: "center"
  }, React__default.createElement(react.Image, {
    boxSize: 6,
    rounded: "50%",
    src: (community === null || community === void 0 ? void 0 : community.image) || "https://via.placeholder.com/100?text=" + community.name.substring(0, 1)
  }), React__default.createElement(react.Text, {
    color: "white",
    fontSize: "sm",
    fontWeight: "extrabold",
    textTransform: "uppercase"
  }, community === null || community === void 0 ? void 0 : community.name)) : 'Selecione uma comunidade'), React__default.createElement(PerformDropdownList, {
    scroll: communities.length > 10
  }, communities.map(c => React__default.createElement(PerformDropdownItem, {
    key: c.id,
    onClick: () => {
      updateSession('community', c);
    }
  }, React__default.createElement(react.Stack, {
    direction: "row",
    spacing: 4,
    p: 4
  }, React__default.createElement(react.Image, {
    boxSize: 8,
    rounded: "50%",
    src: c.image || "https://via.placeholder.com/100?text=" + c.name.substring(0, 1)
  }), React__default.createElement(react.Text, null, c.name)))))), community && !isMobile && React__default.createElement(CommunityMenu, {
    community: community,
    session: session,
    inverted: true
  }));
};

const UserDropdown = _ref => {
  let {
    session
  } = _ref;
  const {
    currentUser: user,
    logout
  } = session;
  const name = user.firstName + " " + user.lastName;
  const title = React__default.createElement(react.Stack, {
    spacing: 1
  }, React__default.createElement(react.Heading, {
    as: "h3",
    size: "md"
  }, name), React__default.createElement(react.Text, {
    fontSize: "md",
    color: "gray.200"
  }, user.email));
  return React__default.createElement(react.Menu, {
    variant: "link",
    colorScheme: "pink"
  }, _ref2 => {
    let {
      isOpen
    } = _ref2;
    return React__default.createElement(React__default.Fragment, null, React__default.createElement(react.MenuButton, {
      "aria-label": "User Menu",
      as: react.Button,
      variant: "dropdown",
      color: "white",
      rightIcon: isOpen ? React__default.createElement(ArrowUpIcon, {
        boxSize: 3
      }) : React__default.createElement(ArrowDownIcon, {
        boxSize: 3
      })
    }, name), React__default.createElement(react.MenuList, {
      zIndex: "3"
    }, React__default.createElement(react.MenuGroup, {
      title: title
    }, React__default.createElement(react.MenuItem, {
      onClick: logout,
      icon: React__default.createElement(CloseIcon, {
        boxSize: 3
      })
    }, "Logout"))));
  });
};

const Logout = _ref => {
  let {
    session
  } = _ref;
  return React__default.createElement(react.Button, {
    type: "button",
    variant: "ghost",
    onClick: session.logout
  }, React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    fill: "none",
    viewBox: "0 0 24 24"
  }, React__default.createElement("path", {
    fill: "#fff",
    d: "M16.484 17.563a.745.745 0 00.54.223c.204 0 .39-.074.539-.223l5.023-5.023a.493.493 0 00.093-.112s.019-.019.019-.037c.018-.037.037-.075.056-.093 0-.019 0-.037.018-.037.019-.038.019-.056.038-.093.018-.056.018-.094.018-.15 0-.055 0-.092-.018-.148a.142.142 0 00-.038-.093c0-.019 0-.037-.018-.037l-.056-.112s0-.019-.019-.019c-.018-.037-.056-.074-.093-.111l-5.023-5.024a.763.763 0 00-1.08 1.08l3.722 3.72H6.977a.754.754 0 00-.763.763c0 .428.335.763.763.763h13.228l-3.721 3.721c-.298.26-.298.744 0 1.042z"
  }), React__default.createElement("path", {
    fill: "#fff",
    d: "M1.954 22.79H12a.754.754 0 00.763-.762V14.53a.754.754 0 00-.763-.763.754.754 0 00-.763.763v6.735h-8.52V2.716h8.52v6.735c0 .428.335.763.763.763a.754.754 0 00.763-.763V1.953A.754.754 0 0012 1.191H1.954a.754.754 0 00-.763.762v20.075c.019.428.353.763.763.763z"
  })));
};

var _templateObject$E;
const Content = /*#__PURE__*/styled$1.div(_templateObject$E || (_templateObject$E = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: flex;\n  flex-grow: 1;\n  background-color: ", ";\n\n  ", "\n"])), props => props.bgColor, props => props.isMobile && "\n    padding-top: 65px;\n    overflow-y: auto;\n  ");
const FooterTool = _ref => {
  let {
    languageTool: LanguageTool
  } = _ref;
  return LanguageTool ? React__default.createElement(Footer, null, React__default.createElement(LanguageTool, null)) : React__default.createElement(Footer, null);
};
const BaseUI = _ref2 => {
  let {
    children,
    bgColor,
    disableNavigation,
    indexRoute,
    isMobile,
    session,
    languageTool: LanguageTool
  } = _ref2;
  return React__default.createElement(Main$1, null, React__default.createElement(Navbar, {
    fixed: isMobile,
    indexRoute: indexRoute,
    brand: disableNavigation ? 'default' : 'small'
  }, React__default.createElement(react.Flex, {
    direction: "row",
    grow: 1,
    justify: "space-between"
  }, disableNavigation ? React__default.createElement("div", null) : React__default.createElement(CommunitiesDropdown, {
    session: session
  }), isMobile ? React__default.createElement(Logout, {
    session: session
  }) : React__default.createElement(UserDropdown, {
    session: session
  }))), React__default.createElement(Content, {
    isMobile: !!isMobile,
    bgColor: bgColor || 'rgb(247,247,247)'
  }, children), !isMobile ? React__default.createElement(FooterTool, {
    languageTool: LanguageTool
  }) : null);
};
BaseUI.defaultProps = {
  disableNavigation: false
};

Object.defineProperty(exports, 'toast', {
  enumerable: true,
  get: function () {
    return reactToastify.toast;
  }
});
exports.BModal = Modal;
exports.BTable = Table;
exports.Body = Body;
exports.Bonde = Bonde;
exports.Card = Card;
exports.CleanButton = CleanButton;
exports.ColorField = ColorField;
exports.CommunityMenu = CommunityMenu;
exports.ConnectedForm = ConnectedForm;
exports.Dropdown = Dropdown;
exports.DropdownIconItem = DropdownIconItem;
exports.DropdownImageInput = DropdownImageInput;
exports.DropdownImageItem = DropdownImageItem;
exports.Empty = Empty;
exports.FontsLoader = FontsLoader;
exports.Footer = Footer;
exports.Form = Form;
exports.FormField = FormField;
exports.Header = Header;
exports.Hint = Hint;
exports.Icon = Icon$w;
exports.InputField = InputField;
exports.Label = Label;
exports.Link = Link;
exports.Loading = Loading;
exports.Main = Main$1;
exports.Message = Message;
exports.Navbar = Navbar;
exports.Navigation = Navigation;
exports.Pagination = Pagination;
exports.PerformDropdown = PerformDropdown;
exports.PerformDropdownButton = PerformDropdownButton;
exports.PerformDropdownItem = PerformDropdownItem;
exports.PerformDropdownList = PerformDropdownList;
exports.RadioField = RadioField;
exports.RoundInput = RoundInput;
exports.RoundInputField = RoundInputField;
exports.RoundSelect = RoundSelect;
exports.RoundSelectField = RoundSelectField;
exports.S3UploadField = S3UploadField;
exports.SelectField = SelectField;
exports.SessionUI = BaseUI;
exports.Shortcut = Shortcut;
exports.Spacing = Spacing;
exports.Spinner = Spinner;
exports.Success = Success;
exports.SwitchField = SwitchField;
exports.Tab = Tab;
exports.Textarea = Textarea;
exports.TextareaField = TextareaField;
exports.Theme = theme;
exports.ToastContainer = StyledContainer;
exports.Validators = Validators;
//# sourceMappingURL=bonde-components.cjs.development.js.map
