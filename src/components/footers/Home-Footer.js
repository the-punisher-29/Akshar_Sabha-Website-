import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import {Container as ContainerBase } from "components/misc/Layouts.js"
import logo from "../../images/mun-logo.png";

import { ReactComponent as FacebookIcon } from "../../images/facebook-icon.svg";
import { ReactComponent as InstagramIcon } from "../../images/instagram-icon.svg";
import { ReactComponent as LinkedinIcon } from "images/linkedin-icon.svg";
import { ReactComponent as YoutubeIcon } from "../../images/youtube-icon.svg";
import { ReactComponent as DiscordIcon } from "../../images/discord-icon.svg";

import { Link } from "react-router-dom";


const Container = tw(ContainerBase)`bg-black text-gray-100 -mx-8 -mb-8 font-Philosopher h-64`
const Content = tw.div` max-w-screen-xl mx-auto  font-Philosopher mb-0 mt-48`;

//const Row = tw.div`flex items-center justify-center flex-col px-8 font-Lato`
const Row = styled.div`
  ${tw`flex items-center justify-center flex-col px-8 font-Lato mb-0`}
  animation: slideIn 0.5s ease-out;

  @keyframes slideIn {
    from {
      transform: translateY(-50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;



const LogoContainer = tw.div`flex items-center justify-center md:justify-start`;
const LogoImg = tw.img`w-8`;
const LogoText = tw.h5`ml-2 text-2xl font-black tracking-wider`;

const LinksContainer = tw.div`mt-8 font-medium flex flex-wrap justify-center items-center flex-col sm:flex-row`
 const Linktw = tw.div`border-b-2 border-transparent hocus:border-teal-500 pb-1 transition duration-300 mt-2 mx-4`;

const SocialLinksContainer = tw.div`mt-10 `;
const SocialLink = styled.a`
  ${tw`cursor-pointer inline-block text-teal-800 hover:text-gray-500 transition duration-300 mx-4`}
  svg {
    ${tw`w-5 h-5`}
  }
`;

const CopyrightText = tw.p`text-center mt-10 font-medium font-Lato tracking-wide text-sm text-gray-600`
export default () => {
  return (
    
      <Content>
        <Row>
          <LogoContainer>
            <LogoImg src={logo} />
            <LogoText>MUN</LogoText>
          </LogoContainer>
          <LinksContainer>
            <Link to="/" >
              <Linktw>Home</Linktw>
            </Link>
            <Link to="/about">
              <Linktw>About Akshar</Linktw>
            </Link>
            {/* <a href="mailto:aaftaab@iitj.ac.in">
              <Linktw>Contact Us</Linktw>
            </a> */}
            <Link to="/team">
              <Linktw>Contact Us</Linktw>
            </Link>
            <a href="https://www.iitj.ac.in/" target="_blank">
              <Linktw>IIT Jodhpur</Linktw>
            </a>
          </LinksContainer>
          {/* <SocialLinksContainer>
            <SocialLink href="https://www.instagram.com/aaftaab_iitj/" target="_blank">
              <InstagramIcon   />
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/in/aaftaab2022/" target="_blank">
              <LinkedinIcon  />
            </SocialLink>
        
          </SocialLinksContainer> */}
          <CopyrightText>
            &copy; Copyright 2024, IITJ. All Rights Reserved.
          </CopyrightText>
        </Row>
      </Content>

  );
};
