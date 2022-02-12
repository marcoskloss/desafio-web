import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        -webkit-font-smoothing: antialiased;
        font-family: 'Segoe UI', 'Roboto',
        'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
        'Helvetica Neue', sans-serif;
        color: ${(props) => props.theme.colors.color}
    }
    #root {
        min-height: 100vh;
    }
    input {
        font-size: inherit;
        color: inherit;
    }
    button {
        color: inherit;
        cursor: pointer;
    }
`;
