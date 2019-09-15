import styled from "styled-components";
import photo from "../components/Home/bg.jpg";
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

  .bg-container {
    width: 100%;
    height: 90vh;
    min-width: 100%;
    height: 85vh;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h2 {
      z-index: 1;
      font-size: 56px;
    font-weight: 700;
    line-height: 1.13;
    letter-spacing: -.3px;
    margin-bottom: 24px;
    }
    .search-form {
      background-color: rgb(255, 255, 255);
      border-radius: 4px;
      color: rgb(47, 51, 51);
      padding: 24px;
      z-index:1 ;
      font-family: "Roboto", "Helvetica", "Arial";
    }

    &::before {
      background-image: url(${photo});
      background-size: cover;
      background-position: center;
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.7;
      
    }
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
