import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
import "./Hero-Section-Homepage.css"
import { css } from "styled-components/macro";
import { Link } from 'react-router-dom';

import Header from "../headers/light.js";

import ReactModalAdapter from "../../helpers/ReactModalAdapter.js";
import ResponsiveVideoEmbed from "../../helpers/ResponsiveVideoEmbed.js";

import { ReactComponent as PlayIcon } from "feather-icons/dist/icons/play-circle.svg";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "../../images/svg-decorator-blob-1.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "../../images/dot-pattern.svg";
import DesignIllustration from "../../images/design-illustration.svg";

import heroImgTitle from '../../images/mun.png'
import heroImgTL from '../../images/mun_tl.png'
import heroImgTR from '../../images/mun_tr.png'
import heroImgBL from '../../images/mun_bl.png'
import heroImgBR from '../../images/mun_br.png'

const Container = tw.div`relative mx-2 px-6`;
const TwoColumn = tw.div`flex flex-col-reverse lg:flex-row md:items-center max-w-screen-xl mx-auto py-5 lg:py-10 md:py-8`;
const LeftColumn = tw.div`relative lg:w-6/12 lg:pr-12 flex-shrink-0 text-center lg:text-left`;
const RightColumn = tw.div`relative mt-0 mb-12 lg:mt-0 lg:mb-0 flex flex-col justify-center`;

const Heading = tw.h1`font-Philosopher text-teal-600 text-2xl md:text-5xl leading-snug max-w-2xl`;
const Paragraph = tw.p`my-5  lg:my-8 text-base lg:text-lg font-Philosopher  max-w-lg mx-auto lg:mx-0`;


const Actions = tw.div`flex flex-col items-center sm:flex-row justify-center lg:justify-start mt-8`;
const PrimaryButton = styled.button`

  ${tw`
    lg:mx-0 lg:px-8 lg:py-3
    px-4 py-1 rounded text-black
    hocus:bg-black hocus:text-black
    focus:shadow-outline
    border-b-0
    relative
  `}

  background: ${({ loggedIn }) => (loggedIn ? 'linear-gradient(180deg, teal, teal)' : 'linear-gradient(180deg, teal, teal)')};
  color: ${({ loggedIn }) => (loggedIn ? '#fff' : '#fff')};
  border: 3px solid transparent; /* Initial border */
  transition: background 0.3s, color 0.3s;

  &:hover {
    background: linear-gradient(180deg, white, #90EE90);
    color: #006400; 
    border-color: #90EE90;

    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(180deg, transparent, #fff);
      animation: waveAnimation 1s infinite alternate;
      z-index: -1;
    }
  }

  @keyframes waveAnimation {
    to {
      transform: scaleY(1.2);
    }
  }
`;

// Usage
const loggedIn = true; // Set to true or false based on your logic
<PrimaryButton loggedIn={loggedIn}>Click me</PrimaryButton>;

const WatchVideoButton = styled.button`
  ${tw`mt-4 sm:mt-0 sm:ml-8 flex items-center text-teal-600 transition duration-300 hocus:text-green-800 focus:outline-none`}
  .playIcon {
    ${tw`stroke-1 w-12 h-12`}
  }
  .playText {
    ${tw`ml-2 font-medium font-Philosopher text-teal-800 hocus:text-green-800`}
  }
`;

const IllustrationContainer = tw.div`flex justify-center md:justify-end items-center relative max-w-3xl lg:max-w-none`;



const StyledModal = styled(ReactModalAdapter)`
  &.mainHeroModal__overlay {
    ${tw`fixed inset-0 z-50`}
  }
  &.mainHeroModal__content {
    ${tw`xl:mx-auto m-4 sm:m-16 max-w-screen-xl absolute inset-0 flex justify-center items-center rounded-lg bg-gray-200 outline-none`}
  }
  .content {
    ${tw`w-full lg:p-16`}
  }
`;
const CloseModalButton = tw.button`absolute top-0 right-0 mt-8 mr-8 hocus:text-primary-500`;

export default ({
  heading = "Header Text",
  description="Small description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
  primaryButtonText="Register Now",
  primaryButtonUrl="#",
  watchVideoButtonText="Watch Video",
  watchVideoYoutubeUrl="https://www.instagram.com/tv/CiLnz8Xg6Zh/?utm_source=ig_web_copy_link",
  imageSrc=DesignIllustration,
  imageCss=null,
  imageDecoratorBlob = false,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => setModalIsOpen(!modalIsOpen);

  return (
    <>
      <Header />
      <Container>
        <TwoColumn>
          <LeftColumn>
            <Heading>{heading}</Heading>
            <Paragraph>{description}</Paragraph>
            <Actions>
              <Link to={{
                    pathname: "/eventDetails",
                    search: `?name=Model United Nations`,
                    state: {
                      "imageSrc": "https://img.theweek.in/content/dam/week/leisure/society/images/2018/11/1/mun-1.jpg",
                      "title": "Model United Nations",
                      "description": " The Akshar Sabha MUN provides an excellent platform for students to enhance their public speaking, critical thinking, and negotiation skills while fostering a deeper understanding of international relations and global challenges. It seamlessly integrates with the literary theme of Akshar, demonstrating how the power of words extends beyond creative expression to shape policies and influence world events.",
                      "date": "09-11-2024",
                      "timing": "Offline Event",
                      "isFlagship": true,
                      "prize": "",
                      "ruleBookLink": "",
                      "url": "#",
                      "linkss": "https://www.instagram.com/aaftaab_iitj/"
                  }
              }}>
              {/* <Link to="/register"> */}
                <PrimaryButton as="a">{primaryButtonText}</PrimaryButton>
              </Link>
              {/* <WatchVideoButton onClick={()=>{
        
                window.open(watchVideoYoutubeUrl, '_blank');
              }}>
                <span className="playIconContainer">
                  <PlayIcon className="playIcon" />
                </span>
                <span className="playText">{watchVideoButtonText}</span>
              </WatchVideoButton> */}
            </Actions>
          </LeftColumn>
          <RightColumn>
            <IllustrationContainer>
            
              <div className="heroLogo">
                <div className="container">
                  <div className="part row1">
                    <img className="logo2 logo" src={heroImgTL} />
                    <img className="logo1 logo" src={heroImgTR} />
                  </div>
                  <div className="part row2">
                    <img className="logo3 logo" src={heroImgBL} />
                    <img className="logo4 logo" src={heroImgBR} />
                  </div>
                </div>
                <div className="heroTitle">
                  <img className="heroTitleImg" css={imageCss} src={heroImgTitle} />
                </div>
              </div>
            
            </IllustrationContainer>
          </RightColumn>
        </TwoColumn>
        
        <StyledModal
          closeTimeoutMS={300}
          className="mainHeroModal"
          isOpen={modalIsOpen}
          onRequestClose={toggleModal}
          shouldCloseOnOverlayClick={true}
        >
          <CloseModalButton onClick={toggleModal}>
            <CloseIcon tw="w-6 h-6" />
          </CloseModalButton>
          <div className="content">
            <ResponsiveVideoEmbed url={watchVideoYoutubeUrl} tw="w-full" />
          </div>
        </StyledModal>
      </Container>
    </>
  );
};
