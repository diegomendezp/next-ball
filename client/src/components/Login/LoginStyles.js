import styled from "styled-components";
import bg from "./loginbg.jpg"

const LoginWrapper = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background-image: url(${bg}); */

  form {
    width: 100%;
  }

  .paper {
    margin-top: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .submit {
    margin-top: 8%;
  }

  .signup-link-container{
    margin-top: 5%;
  }
`;

export default LoginWrapper;
