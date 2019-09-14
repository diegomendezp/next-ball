import styled from "styled-components";

const PageWrapper = styled.section`
  .page-container {
    /* margin: 0 auto;
    width: 95%; */
    padding-top: 90px;
  }

  .matches-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .panel {
    padding-left: 0;
    padding-right: 0;
  }

  @media only screen and (min-width: 600px) and (max-width: 960px) {
  }
  @media only screen and (min-width: 960px) and (max-width: 1280px) {
    .profile-container {
      display: flex;
      justify-content: space-between;
    }

    .panel {
      padding-left: 24px;
      padding-right: 24px;
    }
  }
  @media only screen and (min-width: 1280px) and (max-width: 1440px) {
    /* .page-container {
      width: 80%;
    } */

    .profile-container {
      display: flex;
      justify-content: space-between;
    }

    .panel {
      padding-left: 24px;
      padding-right: 24px;
    }
  }
  @media only screen and (min-width: 1441px) {
    .profile-container {
      display: flex;
      justify-content: space-between;
    }

    .panel {
      padding-left: 24px;
      padding-right: 24px;
    }
  }
`;

export default PageWrapper;
