import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Poppins;
  }

main {
  /* width: 95%; */
  padding: 0 25px;
  max-width: 1440px;
  margin: auto;
  /* background-color: aliceblue; */

  display: flex;
  justify-content: center;

}

a {
  text-decoration: none;
  color: black;
}
`;
