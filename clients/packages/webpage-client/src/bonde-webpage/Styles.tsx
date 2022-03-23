import React from 'react';
import { Global, css } from '@emotion/react';

// https://github.com/nossas/bonde-clients/pull/1589/files

const slateEditorStyles = css`
.slate-alignment-plugin--button-bar {
  display: inline-block;
}

.slate-color-plugin--toolbar {
  display: inline-block;
}

.slate-color-plugin--draggable-handle-container {
  position: absolute;
  z-index: 9;
  box-sizing: border-box;
}

.slate-color-plugin--draggable-handle {
  content: '';
  width: 100px;
  height: 7px;
  position: absolute;
  left: 50%;
  top: 1px;
  z-index: 1;
  border-top: 1px solid #999;
  border-bottom: 1px solid #999;
  margin-left: -50px;
  cursor: all-scroll;
  box-sizing: border-box;
}
.slate-color-plugin--draggable-handle:after {
  content: '';
  height: 3px;
  width: 100%;
  position: absolute;
  top: 1px;
  border-top: 1px solid #999;
  border-bottom: 1px solid #999;
  box-sizing: border-box;
}

.slate-embed-plugin--button[data-active="true"] {
  box-shadow: 0 0 5px 1px rgba(0,0,0,.3);
  z-index: 1;
  position: relative;
}

.slate-embed-plugin--node {
  display: inline-block;
  vertical-align: middle;
}

.slate-embed-plugin--node.active {
  border: 3px solid #0275d8;
  margin: -3px 0;
}

.slate-font-size-plugin-input {
  width: 79px;
}

.slate-grid-plugin--button-bar {
  display: inline-block;
}

.image-node--container .image-node--image-edit-layer,
.image-node--container .image-node--image-edit-layer:active,
.image-node--container .image-node--image-edit-layer:focus {
  display: none;
  justify-content: center;
  align-items: center;
  content: '';
  width: 100%;
  height: calc(100% - 6px);
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(255,255,255,.5);
  z-index: 10;
  cursor: pointer;
  outline: 3px solid #1f78d8;
  box-shadow: 0 0 12px #1f78d8;
}
.image-node--container .image-node--image-edit-layer .image-node--image-edit-button {
  z-index: 11;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.9);
  border-radius: 3px;
  border: none;
  font-size: 12px;
  padding: 7px 10px;
  text-align: center;
  cursor: pointer;
  position: relative;
  z-index: 11;
  line-height: 1;
}
.image-node--container .image-node--image-edit-layer .image-node--image-edit-text {
  color: #000;
  font-size: 14px;
  padding: 7px 10px;
  text-align: center;
  position: relative;
  line-height: 1;
  font-weight: 600;
}

.image-node--container:not(.readonly):hover .image-node--image-edit-layer,
.image-node--container:not(.readonly):hover .image-node--image-edit-button {
  display: flex;
}

.image-node--container.readonly .image-node--image-edit-button {
  display: none;
}

.editor--content > div > div {
  position: initial !important;
}


.image-node--container {
  display: inline-block;
  position: relative;
}


.image-node {
  max-width: 100%;
  position: relative;
}

.image-node.selected {
  border: 3px dotted blue;
}

.link-node-container {
  position: relative;
}

.slate-list-plugin--button-bar {
  display: inline-block;
}

/**
 * Layer
 */
.modal--layer {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(255,255,255,.8);
  left: 0;
  top: 0;
  z-index: 12;
  display: flex;
  justify-content: center;
  align-items: center;
}

/**
 * Modal
 */
.modal--container {
  background-color: #fff;
  width: 768px;
  box-shadow: 0 0 50px rgba(120,120,120,.3);
}

/**
 * Modal Header
 */
.modal--container .modal--header {
  padding: 30px;
  border-bottom: 1px solid #efefef;
  text-align: left;
  color: #000;
}

/**
 * Close Button
 */
.modal--container .modal--header .button--close {
  float: right;
  border: none;
  background-color: transparent;
  position: relative;
  outline: none;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.modal--container .modal--header .button--close::before,
.modal--container .modal--header .button--close::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 2px;
  background-color: #ccc;
  right: 0;
  top: 8px;
}

.modal--container .modal--header .button--close:hover::before,
.modal--container .modal--header .button--close:hover::after {
  background-color: #aaa;
}

.modal--container .modal--header .button--close::before {
  transform: rotate(45deg)
}
.modal--container .modal--header .button--close::after {
  transform: rotate(-45deg)
}

@media screen and (max-width: 768px) {
  .modal--container {
    width: 100%;
  }
}

/**
 * Modal Button: Container
 */
.modal--container .modal--content .modal-button--container {
  text-align: left;
}

/**
 * Modal Button
 */
.modal--container .modal--content .modal-button--container button {
  border: none;
  border-radius: 3px;
  background-color: transparent;
  padding: 10px 18px;
  font-size: 15px;
  font-weight: 500;
  margin-right: 10px;
  cursor: pointer;
}

/**
 * Modal Button: Primary
 */
.modal--container .modal--content .modal-button--container button.primary {
  background-color: #0B83F5;
  color: #fff;
}
.modal--container .modal--content .modal-button--container button.primary:hover {
  background-color: #096fd0;
}

/**
 * Modal Button: Opaque
 */
.modal--container .modal--content .modal-button--container button.opaque {
  background-color: #EEEEEE;
}
.modal--container .modal--content .modal-button--container button.opaque:hover {
  background-color: #E4E4E4;
}

/**
 * Modal Button: Danger
 */
.modal--container .modal--content .modal-button--container button.danger {
  border: 2px solid #F43A35;
  color: #F43A35;
  margin-left: 20px;
}
.modal--container .modal--content .modal-button--container button.danger:hover {
  background-color: #F43A35;
  color: #FFFFFF;
}

/**
 * Modal Content
 */
.modal--container .modal--content {
  padding: 30px 40px;
  display: flex;
  justify-content: space-between;
}

/**
 * Modal Content: Left
 */
.modal--container .modal--content .modal--content-left {
  width: 30%;
  position: relative;
}

/**
 * Modal Content: Right
 */
.modal--container .modal--content .modal--content-right {
  width: 65%;
  margin-left: 5%;
}

/**
 * Modal Content: Image Adjust
 */
.modal--container .modal--content .modal--content-left img,
.modal--container .modal--content .modal--content-right img {
  max-width: 100%;
}

/**
 * Modal Form: Group
 */
.modal--container .modal--form .modal--form-group {
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
}

.modal--container .modal--form .modal--form-group label {
  font-family: 'Century Gothic', 'Lucida Sans Unicode', sans-serif, Verdana, Arial;
  font-size: 14px;
  margin-bottom: 10px;
  color: #333;
  text-align: left;
}

.modal--container .modal--form .modal--form-group input {
  border-radius: 3px;
  outline: none;
  box-shadow: none;
  border: 1px solid #dfdfdf;
  padding: 10px;
  font-size: 16px;
}

.modal--container .modal--form .modal--form-group input::placeholder {
  color: #ccc;
}

.modal--container .modal--form .modal--form-label-helper {
  font-size: .75rem;
  color: #999;
  margin-bottom: .5rem;
  line-height: 1rem;
  text-align: left;
}

/**
 * Tooltip
 */
.tooltip--container {
  display: none;
  position: absolute;
  left: 0;
  bottom: -55px;
  font-family: 'Trebuchet MS', 'Helvetica Neue', Helvetica, Tahoma, sans-serif;
  background-color: rgba(0,0,0,.95);
  color: #555;
  font-size: 14px;
  padding: 16px;
  border-radius: 3px;
  min-width: 275px;
  max-height: 290px;
  text-align: left;
  user-select: none;
  z-index: 1;
}

/**
 * Tooltip Item
 */
.tooltip--container .tooltip--item {
  display: inline-block;
  font-size: 14px;
  color: #ccc;
  text-decoration: none;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
  border-left:  1px solid #555;
  padding:  0 10px;
  cursor: pointer;
}
.tooltip--container .tooltip--item:first-of-type {
  border: none;
}
.tooltip--container .tooltip--item:hover,
.tooltip--container .tooltip--item:active,
.tooltip--container .tooltip--item:focus {
  color: #fff;
}

/**
 * Tooltip Item: Link Adjusts
 */
.tooltip--container .tooltip--item > a,
.tooltip--container .tooltip--item > a:visited {
  text-decoration: none;
  color: #ccc;
}

.tooltip--container .tooltip--item > a:hover,
.tooltip--container .tooltip--item > a:active,
.tooltip--container .tooltip--item > a:focus {
  color: #fff;
}
`

const layoutStyles = css`
  // Move to component style
  .flex {
    display: flex;
  }
  .flex-column {
    flex-direction: column;
  }
  .absolute {
    position: absolute;
  }
  .relative {
    position: relative;
  }
  .border {
    border: solid 1px;
  }
  .fixed {
    position: fixed;
  }

  .mx-auto {
    margin: 0 auto;
  }
  .px2 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .p2 {
    padding: 1rem;
  }
  .p3 {
    padding: 2rem;
  }
  .my2 {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  .mt0 {
    margin-top: 0;
  }
  .mt1 {
    margin-top: 0.5rem;
  }
  .mb2 {
    margin-bottom: 1rem;
  }
  .mb3 {
    margin-bottom: 2rem;
  }
  .mb4 {
    margin-bottom: 4rem;
  }

  // FormPlugin
  .rounded {
    border-radius: 3px;
  }
  .caps {
    text-transform: uppercase;
    letter-spacing: 0;
  }
  .bold {
    font-weight: bold;
  }
  .inline-block {
    display: inline-block;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: normal;
  }
  .center {
    text-align: center;
  }
  .white {
    color: #fff;
  }
  .input,
  .textarea,
  .select {
    box-sizing: border-box;
    height: auto;
  }
  .input {
    font-family: inherit;
    font-size: inherit;
    display: block;
    width: 100%;
    border-radius: 2px;
    padding: 1rem;
  }
  .select {
    font-family: inherit;
    font-size: inherit;
    display: block;
    width: 100%;
    border-radius: 2px;
    padding: 1rem;
    background-color: #fff;
  }
  .border-gray94 {
    border-color: #eee;
  }
  .block {
    display: block;
  }
  .btn {
    font-family: inherit;
    font-size: inherit;
    font-weight: bold;
    text-decoration: none;
    cursor: pointer;
    display: inline-block;
    line-height: 1.125rem;
    height: auto;
    border: 1px solid transparent;
    vertical-align: middle;
    -webkit-appearance: none;
    background-color: transparent;
  }
  .bg-darken-4 {
    background-color: rgba(0, 0, 0, 0.5);
  }

  // Block & Widgets
  .clearfix:after,
  .clearfix:before {
    content: ' ';
    display: table;
  }
  .clearfix:after {
    clear: both;
  }
  .col-12 {
    width: 100%;
  }
  .col-10 {
    width: 83.33333%;
  }
  .col-8 {
    width: 66.66667%;
  }
  .col-2 {
    width: 16.66667%;
  }
  .col-3 {
    width: 25%;
  }
  .col-1 {
    width: 8.33333%;
  }
  .col {
    box-sizing: border-box;
    float: left;
  }
  .right {
    float: right;
  }

  // Styled components widget
  .pressure-widget {
    background-color: #fff;
    border-radius: 5px;
  }

  // Mobile medias
  @media (min-width: 1024px) {
    .show-mobile {
      display: none !important;
    }
  }
  @media (max-width: 1023.9px) {
    .hide-mobile {
      display: none !important;
    }
  }

  @media (min-width: 40em) {
    .sm-col-12 {
      width: 100%;
    }
  }
  @media (min-width: 52em) {
    .md-col-6 {
      width: 50%;
    }
    .md-mb0 {
      margin-bottom: 0;
    }
  }
  @media (min-width: 64em) {
    .lg-col-6 {
      width: 50%;
    }
    .lg-col-8 {
      width: 66.66667%;
    }
    .lg-col-4 {
      width: 33.33333%;
    }
    .lg-col-3 {
      width: 25%;
    }
  }
`;

const globalStyles = css`
  html {
    box-sizing: border-box;
  }

  body {
    -webkit-overflow-scrolling: touch;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: 'Source Sans Pro', 'Proxima Nova', sans-serif;
    line-height: 1.5;
    margin: 0;
    padding: 0;
    min-height: 100vh;
    max-width: 100vw;
    background-color: #f7f7f7;
  }

  input:-webkit-autofill,
  textarea:-webkit-autofill,
  select:-webkit-autofill {
    background: #fff;
    -webkit-text-fill-color: $black !important;
    -webkit-box-shadow: 0 0 0 1000px white inset !important;
  }

  input,
  textarea,
  select {
    &:focus {
      outline: none;
    }
  }

  p {
    margin: 0;
  }

  ::-webkit-input-placeholder {
    color: $lightestGray;
  }
  :-moz-placeholder {
    color: $lightestGray;
  }
  ::-moz-placeholder {
    color: $lightestGray;
  }
  :-ms-input-placeholder {
    color: $lightestGray;
  }

  textarea {
    resize: none;
  }
`;

const Styles: React.FC = ({ children }) => (
  <>
    <Global styles={globalStyles} />
    <Global styles={layoutStyles} />
    <Global styles={slateEditorStyles} />
    {children}
  </>
);

export default Styles;
