import styled from "styled-components";

const PageWrapper = styled.section`
  .page-container {
    margin: 0 auto;
    width: 95%;
    margin-top: 90px;
  }

  .matches-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  @media only screen and (min-width: 600px) and (max-width: 960px) {
  }
  @media only screen and (min-width: 960px) and (max-width: 1280px) {
    .page-container {
      width: 80%;
    }
  }
  @media only screen and (min-width: 1280px) and (max-width: 1440px) {
    .page-container {
      width: 80%;
    }
  }
  @media only screen and (min-width: 1441px) {
    .page-container {
      width: 80%;
    }
  }
`;

export default PageWrapper;
