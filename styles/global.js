import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    width: 100vw;
    height: 100vh;
    background: rgba(143, 101, 247, 0.8);
    font-family: Arial, Helvetica, sans-serif
  }
`;

export default GlobalStyle;
