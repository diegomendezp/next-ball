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

  .geocoder-container {
    margin-top: 3%;
    display: flex;
    flex-direction: column;

    label {
      margin-bottom: 8px;
    }
    .react-geocoder {
      input {
        outline: none;
        position: relative;
        margin-left: 8px;
        margin-right: 8px;
        border-radius: 2px !important;
        background-color: rgba(255, 255, 255, 0.15);
      }
    }
  }

  @media only screen and (min-width: 600px) {
    .geocoder-container {
      margin-top: 3%;
      display: flex;
      flex-direction: row;

      label {
        margin-bottom: 0px;
      }
    }
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
