import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
import { css } from "styled-components/macro";
import { SectionHeading } from "components/misc/Headings.js";
import kaleidoscopeGif from "../../images/kaleidoscope-1.gif";
import defaultCardImage from "../../images/shield-icon.svg";

import { ReactComponent as SvgDecoratorBlob3 } from "../../images/svg-decorator-blob-3.svg";

import SupportIconImage from "../../images/support-icon.svg";
import ShieldIconImage from "../../images/shield-icon.svg";
import CustomizeIconImage from "../../images/customize-icon.svg";
import FastIconImage from "../../images/fast-icon.svg";
import ReliableIconImage from "../../images/reliable-icon.svg";
import SimpleIconImage from "../../images/simple-icon.svg";

const Container = tw.div`relative px-6`;

const ThreeColumnContainer = styled.div`
  ${tw`flex flex-col items-center md:items-stretch md:flex-row flex-wrap md:justify-center max-w-screen-xl mx-auto py-20 md:py-24`}
`;
const Heading = tw(SectionHeading)`w-full`;

const Column = styled.div`
  ${tw`md:w-1/2 lg:w-1/3 px-6 flex`}
`;
//make tw component with a gif background
const DecoratorKaleidoscope = tw.div`pointer-events-none absolute right-0 bottom-0 w-64  transform translate-x-32 translate-y-48 background-image[url('www.payload.cargocollective.com/1/7/229877/5835271/Kaleidoscope.gif')]`;
const Card = styled.div`
  ${tw`flex flex-col w-64 h-64 items-center px-6 py-10  rounded-lg mt-12`}
  .imageContainer {
    ${tw` text-center rounded-full p-2 flex-shrink-0 relative`}
    img {
      ${tw`w-32 h-32`}
    }
  }

  .textContainer {
    ${tw`mt-6 text-center`}
  }

  .title {
    ${tw`mt-2 font-medium text-xs leading-none text-black font-Lato`}
  }

`;

// const DecoratorBlob = styled(SvgDecoratorBlob3)`
//   ${tw`pointer-events-none absolute right-0 bottom-0 w-64 opacity-25 transform translate-x-32 translate-y-48 `}
// `;
// make a decorator blob with a gif


export default () => {
  /*
   * This componets has an array of object denoting the cards defined below. Each object in the cards array can have the key (Change it according to your need, you can also add more objects to have more cards in this feature component):
   *  1) imageSrc - the image shown at the top of the card
   *  2) title - the title of the card
   *  3) description - the description of the card
   *  If a key for a particular card is not provided, a default value is used
   */

  const cards = [
    {
      imageSrc: "https://us.123rf.com/450wm/aquir/aquir1508/aquir150801163/44345291-sponsor-3d-silver-badge-with-blue-ribbon.jpg?ver=6",
      title: "Trilogy Innovations",
    },
    { imageSrc: "https://us.123rf.com/450wm/aquir/aquir1508/aquir150801163/44345291-sponsor-3d-silver-badge-with-blue-ribbon.jpg?ver=6", title: "Dummy Sponser 1" },
    { imageSrc: "https://us.123rf.com/450wm/aquir/aquir1508/aquir150801163/44345291-sponsor-3d-silver-badge-with-blue-ribbon.jpg?ver=6", title: "Dummy Sponser 2" },
    { imageSrc: "https://us.123rf.com/450wm/aquir/aquir1508/aquir150801163/44345291-sponsor-3d-silver-badge-with-blue-ribbon.jpg?ver=6", title: "Dummy Sponser 3" },
    { imageSrc: "https://us.123rf.com/450wm/aquir/aquir1508/aquir150801163/44345291-sponsor-3d-silver-badge-with-blue-ribbon.jpg?ver=6", title: "Dummy Sponser 4" },
    { imageSrc: "https://us.123rf.com/450wm/aquir/aquir1508/aquir150801163/44345291-sponsor-3d-silver-badge-with-blue-ribbon.jpg?ver=6", title: "Dummy Sponser 5" }
  ];

  return (
    <Container>
      {/* <ThreeColumnContainer>
        <Heading>Our Prime <span tw="text-black">Sponsors</span></Heading>
        {cards.map((card, i) => (
          <Column key={i}>
            <Card>
              <span className="imageContainer">
                <img src={card.imageSrc || defaultCardImage} alt="" />
              </span>
              <span className="textContainer">
                <span className="title">{card.title || "Fully Secure"}</span>
                
              </span>
            </Card>
          </Column>
        ))}
      </ThreeColumnContainer> */}
      {/* <DecoratorBlob /> */}
    </Container>
  );
};
