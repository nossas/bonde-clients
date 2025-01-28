import React from 'react';
import styled from 'styled-components';

interface BondeProps {
  large?: boolean;
}

const Bonde = styled(({ className, large }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={large ? 260 : 85}
    viewBox={large ? '0 0 200 100' : '50 25 100 50'}
  >
    <path
      fill="#FFF"
      d="M44.948 52.505c0-11.641 9.21-20.568 20.568-20.568 11.357 0 20.567 8.927 20.567 20.568 0 11.639-9.21 20.568-20.567 20.568-11.358 0-20.568-8.929-20.568-20.568zm32.094 0c0-7.064-5.084-11.754-11.525-11.754-6.442 0-11.527 4.689-11.527 11.754 0 7.062 5.085 11.752 11.527 11.752 6.441 0 11.525-4.69 11.525-11.752zM122.243 32.727V72.28h-6.78l-15.255-21.473V72.28h-9.042V32.727h6.781l15.255 21.471V32.727h9.041zM164.056 52.505c0 11.188-8.307 19.775-19.212 19.775h-15.821V32.727h15.821c10.905 0 19.212 8.588 19.212 19.778zm-8.702 0c0-6.781-4.295-11.076-10.51-11.076h-6.78v22.15h6.78c6.215 0 10.51-4.295 10.51-11.074zM194 63.579v8.701h-24.862V32.727h24.579v8.702h-15.538v6.555h14.127v8.59h-14.127v7.006H194zM40.937 59.731c0 7.381-6.012 12.203-13.453 12.203H9.981V30.263h16.311c7.264 0 13.156 4.704 13.156 11.906 0 3.454-1.369 6.192-3.632 8.157 3.097 1.962 5.121 5.179 5.121 9.405zM19.505 39.193v7.381h6.787c2.145 0 3.633-1.546 3.633-3.691 0-2.142-1.43-3.69-3.633-3.69h-6.787zm11.908 19.824c0-2.322-1.549-3.988-3.93-3.988h-7.979v7.979h7.979c2.381-.001 3.93-1.669 3.93-3.991z"
    ></path>
    <path
      fill="#FFF"
      d="M40.196 59.274c0 7.383-6.014 12.205-13.453 12.205H9.239V29.807h16.312c7.265 0 13.157 4.704 13.157 11.907 0 3.452-1.369 6.191-3.632 8.156 3.097 1.965 5.12 5.178 5.12 9.404zM18.765 38.738v7.382h6.786c2.144 0 3.632-1.548 3.632-3.691 0-2.144-1.428-3.691-3.632-3.691h-6.786zm11.906 19.824c0-2.322-1.548-3.988-3.928-3.988h-7.979v7.977h7.979c2.38-.001 3.928-1.669 3.928-3.989z"
    ></path>
    <path
      fill="#FFF"
      d="M39.456 58.813c0 7.381-6.014 12.203-13.454 12.203H8.499V29.345h16.312c7.264 0 13.157 4.703 13.157 11.907 0 3.453-1.369 6.191-3.632 8.155 3.096 1.965 5.12 5.178 5.12 9.406zM18.024 38.275v7.382h6.786c2.144 0 3.632-1.548 3.632-3.691s-1.43-3.691-3.632-3.691h-6.786zM29.93 58.099c0-2.322-1.546-3.988-3.928-3.988h-7.978v7.975h7.978c2.382-.001 3.928-1.667 3.928-3.987z"
    ></path>
    <path
      fill="#FFF"
      d="M41.679 60.188c0 7.381-6.014 12.201-13.454 12.201H10.722v-41.67h16.311c7.264 0 13.156 4.704 13.156 11.907 0 3.453-1.369 6.192-3.631 8.155 3.096 1.964 5.121 5.181 5.121 9.407zM20.247 39.649v7.382h6.785c2.145 0 3.633-1.548 3.633-3.69 0-2.143-1.43-3.691-3.633-3.691h-6.785zm11.906 19.823c0-2.322-1.548-3.988-3.929-3.988h-7.978v7.979h7.978c2.381-.001 3.929-1.669 3.929-3.991z"
    ></path>
    <path
      fill="#FFF"
      d="M38.714 58.358c0 7.383-6.012 12.205-13.453 12.205H7.758V28.89H24.07c7.264 0 13.156 4.704 13.156 11.907 0 3.453-1.369 6.192-3.631 8.155 3.096 1.965 5.119 5.18 5.119 9.406zm-21.43-20.537v7.381h6.785c2.145 0 3.633-1.548 3.633-3.691s-1.43-3.69-3.633-3.69h-6.785zM29.19 57.644c0-2.322-1.549-3.99-3.93-3.99h-7.977v7.98h7.977c2.382 0 3.93-1.668 3.93-3.99z"
    ></path>
    <path
      fill="#FFF"
      d="M37.974 57.903c0 7.383-6.012 12.203-13.453 12.203H7.019V28.435H23.33c7.264 0 13.156 4.704 13.156 11.907 0 3.453-1.369 6.192-3.631 8.157 3.095 1.963 5.119 5.178 5.119 9.404zM16.542 37.365v7.383h6.787c2.145 0 3.631-1.548 3.631-3.692s-1.428-3.691-3.631-3.691h-6.787zM28.448 57.19c0-2.324-1.547-3.99-3.928-3.99h-7.979v7.977h7.979c2.381 0 3.928-1.666 3.928-3.987z"
    ></path>
    <path
      fill="#FFF"
      d="M37.233 57.45c0 7.381-6.014 12.201-13.454 12.201H6.276v-41.67h16.312c7.264 0 13.155 4.703 13.155 11.907 0 3.453-1.369 6.191-3.631 8.156 3.098 1.963 5.121 5.178 5.121 9.406zM15.802 36.912v7.381h6.787c2.143 0 3.631-1.548 3.631-3.691 0-2.142-1.429-3.69-3.631-3.69h-6.787zm11.906 19.821c0-2.32-1.548-3.988-3.929-3.988h-7.978v7.979h7.978c2.381 0 3.929-1.668 3.929-3.991z"
    ></path>
    <path
      fill="#FFF"
      d="M6.276 69.651L11.072 73.065 11.462 71.479 6.704 68.45 6.28 68.206z"
    ></path>
    <path d="M6.276 55.521L11.462 58.956 11.462 57.267 6.704 54.235 6.28 53.995z"></path>
    <path d="M6.276 52.792L11.462 56.022 11.462 50.519 6.704 47.488 6.28 47.246z"></path>
    <path d="M11.854 30.988L6.276 27.981 8.501 27.981 14.479 30.988z"></path>
    <path d="M42.419 60.458c0 7.381-6.014 12.201-13.455 12.201H11.462V30.988h16.312c7.262 0 13.154 4.704 13.154 11.906 0 3.453-1.368 6.192-3.631 8.157 3.099 1.964 5.122 5.178 5.122 9.407zM20.987 39.919V47.3h6.787c2.143 0 3.631-1.547 3.631-3.69 0-2.144-1.429-3.691-3.631-3.691h-6.787zm11.907 19.822c0-2.322-1.549-3.988-3.93-3.988h-7.977v7.977h7.977c2.381-.001 3.93-1.667 3.93-3.989z"></path>
    <path
      fill="#FFF"
      d="M28.964 73.104H11.019v-42.56h16.756c7.88 0 13.6 5.194 13.6 12.35 0 3.204-1.158 5.993-3.356 8.103 3.13 2.191 4.846 5.527 4.846 9.461-.002 7.326-5.847 12.646-13.901 12.646zm-17.057-.888h17.057c7.539 0 13.011-4.945 13.011-11.758 0-3.814-1.745-7.021-4.914-9.033l-.503-.318.449-.391c2.276-1.977 3.479-4.68 3.479-7.821 0-6.642-5.346-11.462-12.711-11.462H11.907v40.783zm17.057-8.041h-8.421V55.31h8.421c2.575 0 4.373 1.822 4.373 4.432s-1.798 4.433-4.373 4.433zm-7.532-.889h7.532c2.086 0 3.486-1.424 3.486-3.545 0-2.119-1.4-3.545-3.486-3.545h-7.532v7.09zm6.342-15.541h-7.231v-8.27h7.231c2.398 0 4.074 1.7 4.074 4.134.001 2.397-1.712 4.136-4.074 4.136zm-6.342-.888h6.343c1.877 0 3.188-1.336 3.188-3.247 0-1.942-1.281-3.247-3.188-3.247h-6.343v6.494z"
    ></path>
    <g>
      <path d="M259.224 51.742c0-11.267 8.915-19.909 19.909-19.909 10.993 0 19.908 8.642 19.908 19.909 0 11.269-8.915 19.909-19.908 19.909-10.994 0-19.909-8.64-19.909-19.909zm31.066 0c0-6.837-4.923-11.376-11.157-11.376-6.235 0-11.158 4.54-11.158 11.376 0 6.838 4.923 11.377 11.158 11.377 6.234 0 11.157-4.539 11.157-11.377zM334.043 32.599v38.287h-6.563l-14.768-20.785v20.785h-8.752V32.599h6.565l14.765 20.784V32.599h8.753zM374.515 51.742c0 10.83-8.042 19.144-18.596 19.144h-15.316V32.599h15.316c10.554 0 18.596 8.315 18.596 19.143zm-8.423 0c0-6.562-4.155-10.72-10.173-10.72h-6.564v21.441h6.564c6.018 0 10.173-4.156 10.173-10.721zM403.5 62.463v8.423h-24.064V32.599h23.79v8.423h-15.041v6.344h13.675v8.315h-13.675v6.782H403.5zM255.342 58.738c0 7.146-5.82 11.812-13.023 11.812h-16.942V30.214h15.789c7.031 0 12.735 4.553 12.735 11.524 0 3.343-1.326 5.994-3.516 7.896 2.998 1.899 4.957 5.012 4.957 9.104zm-20.744-19.881v7.146h6.567c2.075 0 3.517-1.498 3.517-3.572 0-2.077-1.385-3.574-3.517-3.574h-6.567zm11.522 19.19c0-2.247-1.498-3.861-3.802-3.861h-7.721v7.721h7.721c2.304-.001 3.802-1.614 3.802-3.86z"></path>
      <path d="M254.625 58.297c0 7.146-5.821 11.813-13.023 11.813H224.66V29.774h15.788c7.03 0 12.735 4.552 12.735 11.525 0 3.341-1.325 5.992-3.516 7.895 2.998 1.9 4.958 5.011 4.958 9.103zm-20.748-19.88v7.146h6.57c2.076 0 3.517-1.5 3.517-3.574s-1.383-3.573-3.517-3.573h-6.57zm11.526 19.188c0-2.247-1.497-3.86-3.802-3.86h-7.725v7.722h7.725c2.305 0 3.802-1.614 3.802-3.862z"></path>
      <path d="M253.907 57.85c0 7.145-5.821 11.812-13.022 11.812h-16.941V29.325h15.788c7.03 0 12.734 4.553 12.734 11.526 0 3.34-1.325 5.993-3.515 7.894 2.997 1.901 4.956 5.012 4.956 9.105zm-20.746-19.88v7.146h6.57c2.074 0 3.515-1.5 3.515-3.573 0-2.074-1.383-3.573-3.515-3.573h-6.57zm11.527 19.188c0-2.249-1.498-3.861-3.803-3.861h-7.724v7.721h7.724c2.304 0 3.803-1.613 3.803-3.86z"></path>
      <path d="M256.059 59.18c0 7.145-5.82 11.812-13.022 11.812h-16.943V30.654h15.789c7.031 0 12.733 4.554 12.733 11.526 0 3.341-1.323 5.993-3.513 7.894 2.997 1.903 4.956 5.015 4.956 9.106zM235.313 39.3v7.145h6.568c2.075 0 3.517-1.497 3.517-3.572 0-2.076-1.385-3.573-3.517-3.573h-6.568zm11.526 19.188c0-2.248-1.5-3.862-3.803-3.862h-7.723v7.722h7.723c2.303 0 3.803-1.614 3.803-3.86z"></path>
      <path d="M253.19 57.41c0 7.146-5.821 11.812-13.023 11.812h-16.94V28.886h15.788c7.03 0 12.734 4.553 12.734 11.525 0 3.343-1.325 5.994-3.515 7.895 2.997 1.901 4.956 5.013 4.956 9.104zm-20.745-19.88v7.145h6.569c2.075 0 3.515-1.497 3.515-3.572 0-2.076-1.383-3.573-3.515-3.573h-6.569zm11.526 19.188c0-2.247-1.5-3.861-3.804-3.861h-7.722v7.723h7.722c2.304-.001 3.804-1.615 3.804-3.862z"></path>
      <path d="M252.473 56.969c0 7.146-5.819 11.812-13.022 11.812h-16.942V28.444h15.789c7.032 0 12.734 4.553 12.734 11.525 0 3.342-1.325 5.994-3.514 7.895 2.996 1.903 4.955 5.014 4.955 9.105zm-20.744-19.881v7.146h6.568c2.076 0 3.516-1.498 3.516-3.573 0-2.074-1.383-3.574-3.516-3.574h-6.568zm11.524 19.189c0-2.247-1.498-3.86-3.803-3.86h-7.722v7.722h7.722c2.305 0 3.803-1.616 3.803-3.862z"></path>
      <path d="M251.756 56.528c0 7.145-5.818 11.813-13.022 11.813h-16.942V28.005h15.789c7.031 0 12.734 4.552 12.734 11.525 0 3.342-1.326 5.993-3.516 7.895 2.997 1.901 4.957 5.012 4.957 9.103zm-20.745-19.88v7.146h6.569c2.076 0 3.515-1.497 3.515-3.573 0-2.074-1.383-3.573-3.515-3.573h-6.569zm11.524 19.189c0-2.247-1.497-3.86-3.802-3.86h-7.723v7.722h7.723c2.305-.001 3.802-1.615 3.802-3.862z"></path>
      <path d="M221.791 68.342L226.433 71.647 226.811 70.11 222.205 67.176 221.794 66.942z"></path>
      <path
        fill="#FFF"
        d="M221.791 54.664L226.811 57.988 226.811 56.354 222.205 53.42 221.794 53.187z"
      ></path>
      <path
        fill="#FFF"
        d="M221.791 52.021L226.811 55.15 226.811 49.821 222.205 46.888 221.794 46.652z"
      ></path>
      <path
        fill="#FFF"
        d="M227.19 30.915L221.791 28.005 223.943 28.005 229.731 30.915z"
      ></path>
      <path
        fill="#FFF"
        d="M256.774 59.44c0 7.145-5.819 11.812-13.022 11.812h-16.941V30.915h15.788c7.031 0 12.734 4.554 12.734 11.526 0 3.341-1.324 5.994-3.514 7.894 2.997 1.902 4.955 5.014 4.955 9.105zM236.03 39.561v7.146h6.568c2.076 0 3.516-1.5 3.516-3.574s-1.384-3.571-3.516-3.571h-6.568zm11.525 19.188c0-2.248-1.499-3.861-3.803-3.861h-7.722v7.722h7.722c2.304-.001 3.803-1.615 3.803-3.861z"
      ></path>
      <path d="M243.752 71.648h-17.338V30.52h16.185c7.608 0 13.131 5.013 13.131 11.921 0 3.107-1.127 5.808-3.269 7.847 3.042 2.112 4.709 5.345 4.709 9.152 0 7.074-5.642 12.208-13.418 12.208zm-16.546-.792h16.546c7.317 0 12.628-4.802 12.628-11.416 0-3.702-1.695-6.818-4.772-8.769l-.449-.285.4-.349c2.211-1.92 3.379-4.547 3.379-7.596 0-6.448-5.188-11.13-12.339-11.13h-15.393v39.545zm16.546-7.849h-8.117v-8.515h8.117c2.474 0 4.198 1.751 4.198 4.257 0 2.504-1.724 4.258-4.198 4.258zm-7.327-.793h7.327c2.038 0 3.408-1.393 3.408-3.465 0-2.073-1.37-3.465-3.408-3.465h-7.327v6.93zm6.174-15.112h-6.964v-7.937h6.964c2.303 0 3.911 1.632 3.911 3.968 0 2.3-1.646 3.969-3.911 3.969zm-6.174-.792h6.174c1.837 0 3.12-1.307 3.12-3.178 0-1.898-1.253-3.176-3.12-3.176h-6.174v6.354z"></path>
    </g>
  </svg>
)) <BondeProps>`
  display: flex;
  ${props =>
    !props.large &&
    `
    height: calc(1.5 * 15px);
  `}
`;

Bonde.defaultProps = {
  large: false,
};

export default Bonde;
