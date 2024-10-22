import React, {useContext} from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Link } from "react-router-dom";
import useAnimatedNavToggler from "../../helpers/useAnimatedNavToggler.js";

import logo from "../../images/mun-logo.png";
import { ReactComponent as MenuIcon } from "feather-icons/dist/icons/menu.svg";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";
import { userContext } from "App.js";
const Header = tw.header`
  flex justify-between items-center
  max-w-screen-xl mx-auto
  font-Philosopher
  text-black
  px-6 // Adding padding
  
`;
export const NavLinks = tw.div`inline-block`;

/* hocus: stands for "on hover or focus"
 * hocus:bg-primary-700 will apply the bg-primary-700 class on hover or focus
 */
export const NavLink = styled.a`
  ${tw`
    text-lg my-2 lg:text-sm lg:mx-6 lg:my-0
    font-semibold tracking-wide transition duration-300
    pb-1 border-b-2 border-transparent
  `}

  color: ${({ color }) => color || 'teal'};
  
  &:hover {
    ${({ color }) => color === 'orange' ? tw`hover:border-orange-600` : tw`hover:border-teal-600`}
    ${tw`hocus:text-orange-600`}
    ${({ color }) => color === 'teal' && tw`hocus:text-teal-800`}
  }
`;


export const PrimaryLink = styled(NavLink)`
  ${tw`
    lg:mx-0 lg:px-8 lg:py-3
    px-4 py-1 rounded
    hocus:bg-black hocus:text-black
    focus:shadow-outline
    border-b-0
    relative
  `}

  ${({ textColor }) => textColor === 'teal' && css`
    background: linear-gradient(180deg, teal, teal);
    color: white;
    border: 3px solid transparent; /* Initial border */
    transition: background 0.3s, color 0.3s;

    &:hover {
      background: linear-gradient(180deg, white, #90EE90);
      color: #006400 !important; 
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
  `}

  ${({ textColor }) => textColor === 'orange' && css`
    background: linear-gradient(180deg, orange, orange);
    color: #fff;
    border: 3px solid transparent; /* Initial border */
    transition: background 0.3s, color 0.3s;

    &:hover {
      background: linear-gradient(180deg, #fff, yellow);
      color: orange;
      border-color: orange !important;

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
  `}

  @keyframes waveAnimation {
    to {
      transform: scaleY(1.2);
    }
  }
`;


export const LogoLink = styled(NavLink)`
  ${tw`flex items-center text-teal-700 font-black border-b-0 text-2xl! ml-0!`};

  img {
    ${tw`w-10 mr-3`}
  }

  color: ${({ color }) => color || 'teal'};
`;

export const MobileNavLinksContainer = tw.nav`flex flex-1 items-center justify-between`;
export const NavToggle = tw.button`
  lg:hidden z-20 focus:outline-none hocus:text-black transition duration-300
  relative left-[-15px] -mt-2
`;

export const MobileNavLinks = motion(styled.div`
  ${tw`lg:hidden z-10 fixed top-0 inset-x-0 mx-4 my-6 p-8 border text-center rounded-lg text-gray-900 bg-white`}
  ${NavLinks} {
    ${tw`flex flex-col items-center`}
  }
`);

export const DesktopNavLinks = tw.nav`
  hidden lg:flex flex-1 justify-between items-center
`;

export const PreRegisterButton = styled(NavLink)`
  ${tw`
    px-4 py-2 rounded-lg bg-orange-500 text-white
    font-semibold tracking-wide transition duration-300
    border-b-0
    hocus:bg-orange-600 hocus:text-orange-100
    focus:shadow-outline
    ml-4
  `}
`;

export default ({
  roundedHeaderButton = false,
  logoLink,
  links,
  className,
  collapseBreakpointClass = "lg",
  color="teal",
  
}) => {
  /*
   * This header component accepts an optionals "links" prop that specifies the links to render in the navbar.
   * This links props should be an array of "NavLinks" components which is exported from this file.
   * Each "NavLinks" component can contain any amount of "NavLink" component, also exported from this file.
   * This allows this Header to be multi column.
   * So If you pass only a single item in the array with only one NavLinks component as root, you will get 2 column header.
   * Left part will be LogoLink, and the right part will be the the NavLinks component you
   * supplied.
   * Similarly if you pass 2 items in the links array, then you will get 3 columns, the left will be "LogoLink", the center will be the first "NavLinks" component in the array and the right will be the second "NavLinks" component in the links array.
   * You can also choose to directly modify the links here by not passing any links from the parent component and
   * changing the defaultLinks variable below below.
   * If you manipulate links here, all the styling on the links is already done for you. If you pass links yourself though, you are responsible for styling the links or use the helper styled components that are defined here (NavLink)
   */
  
  const loggedIn = useContext(userContext).loggedIn;
  const defaultLinks = [
    <NavLinks key={1}>
      <Link to="/about">
        <NavLink color={color} style = {{  fontFamily: 'Lato',fontSize:'16px'}}>About Akshar</NavLink>
      </Link>
      <Link to="/events">
        <NavLink color={color} style = {{ fontFamily: 'Lato',fontSize:'16px'}}>Events</NavLink>
      </Link>
      {/* <Link to="/guests">
        <NavLink color={color} style = {{ fontFamily: 'Lato',fontSize:'16px'}}>Guests</NavLink>
      </Link> */}
      {/* <Link to="/sponsors">
        <NavLink color={color} style = {{ fontFamily: 'Lato',fontSize:'16px'}}>Sponsors</NavLink>
      </Link> */}
      <Link to="/team">
        <NavLink color={color} style = {{ fontFamily: 'Lato',fontSize:'16px'}}>Team</NavLink>
      </Link>
      {/* <Link to="/register">
        <NavLink color={color} style = {{fontFamily: 'Lato',fontSize:'16px'}}>Register</NavLink>
      </Link> */}

     {/* {!loggedIn?<Link to="/login">
        <PrimaryLink textColor={color} css={roundedHeaderButton && tw`rounded-full`}>
          Login
        </PrimaryLink>
      </Link>:
      <Link to="/dashboard">
      <PrimaryLink textColor={color} css={roundedHeaderButton && tw`rounded-full`}>
        Profile
      </PrimaryLink>
    </Link>
      } */}
    </NavLinks>
  ];
  const { showNavLinks, animation, toggleNavbar } = useAnimatedNavToggler();
  const collapseBreakpointCss =
    collapseBreakPointCssMap[collapseBreakpointClass];

  const defaultLogoLink = (
    <Link to="/">
      <LogoLink color={color}>
        <img src={logo} alt="logo" />
        MUN
      </LogoLink>
    </Link>
  );

  logoLink = logoLink || defaultLogoLink;
  links = links || defaultLinks;

  return (
    <Header className={className || "header-light"}>
      <DesktopNavLinks css={collapseBreakpointCss.desktopNavLinks}>
        {logoLink}
        {links}
      </DesktopNavLinks>

      <MobileNavLinksContainer css={collapseBreakpointCss.mobileNavLinksContainer}>
        {logoLink}
        <MobileNavLinks
          initial={{ x: "150%", display: "none" }}
          animate={animation}
          css={collapseBreakpointCss.mobileNavLinks}
        >
          {links}
        </MobileNavLinks>
        <NavToggle onClick={toggleNavbar} className={showNavLinks ? "open" : "closed"}>
          {showNavLinks ? <CloseIcon tw="w-6 h-6" /> : <MenuIcon tw="w-6 h-6" />}
        </NavToggle>
      </MobileNavLinksContainer>
    </Header>
  );
};

/* The below code is for generating dynamic break points for navbar.
 * Using this you can specify if you want to switch
 * to the toggleable mobile navbar at "sm", "md" or "lg" or "xl" above using the collapseBreakpointClass prop
 * Its written like this because we are using macros and we can not insert dynamic variables in macros
 */

const collapseBreakPointCssMap = {
  sm: {
    mobileNavLinks: tw`sm:hidden`,
    desktopNavLinks: tw`sm:flex`,
    mobileNavLinksContainer: tw`sm:hidden`
  },
  md: {
    mobileNavLinks: tw`md:hidden`,
    desktopNavLinks: tw`md:flex`,
    mobileNavLinksContainer: tw`md:hidden`
  },
  lg: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`
  },
  xl: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`
  }
};