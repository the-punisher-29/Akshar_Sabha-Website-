import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings";
import {SectionDescription} from "components/misc/Typography";
import { ReactComponent as TwitterIcon} from "images/twitter-icon.svg";
import { ReactComponent as LinkedinIcon} from "images/linkedin-icon.svg";
import { ReactComponent as GithubIcon } from "images/github-icon.svg";
import './Team-Teams-Card.css'

const HeadingContainer = tw.div``
const Heading = tw(SectionHeading)`text-orange-500`
const Subheading = tw(SubheadingBase)`text-center mb-3`
const Description = tw(SectionDescription)`mx-auto text-center`

const Cards = tw.div`flex flex-wrap flex-row justify-center sm:max-w-2xl lg:max-w-5xl mx-auto `

const Card = tw.div`mt-24 grid grid-cols-4 w-full sm:w-1/2 lg:w-1/3 flex flex-col items-center`

// Conditionally styled components based on position
const CardImage = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`bg-no-repeat bg-cover bg-center rounded-full`}
  border: 2px solid orange;
  box-shadow: 0 0 10px orange;

  ${props =>
    props.position === "Head" &&
    css`
      ${tw`w-48 h-48`}
    `}

  ${props =>
    props.position === "Assistant Head" &&
    css`
      ${tw`w-32 h-32`}
    `}
`;

const CardContent = styled.div`
  ${tw`flex flex-col items-center mt-6`}
  .position {
    ${tw`uppercase font-bold tracking-widest text-orange-700`}
    ${props =>
      props.position === "Head" &&
      css`
        ${tw`text-lg`}
      `}

    ${props =>
      props.position === "Assistant Head" &&
      css`
        ${tw`text-sm`}
      `}
  }
  .name {
    ${tw`mt-1 font-medium text-orange-600`}
    ${props =>
      props.position === "Head" &&
      css`
        ${tw`text-xl`}
      `}

    ${props =>
      props.position === "Assistant Head" &&
      css`
        ${tw`text-lg`}
      `}
  }
`;

const CardLinks = styled.div`
  ${tw`mt-6 flex`}
  .link {
    ${tw`mr-8 last:mr-0 text-gray-400 hocus:text-primary-500 transition duration-300`}
    .icon {
      ${tw`fill-current w-6 h-6`}
    }
  }
`;



export default ({
  heading = "Meet These Fine Folks.",
  subheading = "",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  cards=[],
  cards_ah=[]

}) => {
  return (
    <Container>
      <ContentWithPaddingXl>
        <HeadingContainer>
          {subheading && <Subheading>{subheading}</Subheading>}
          {heading && <Heading>{heading}</Heading> }
        </HeadingContainer>
        <Cards>
          {cards.map((card, index) => (
            <Card cardLength={card.length} key={index}>
              <div >
                <CardImage position="Head" imageSrc={card.imageSrc} />
              </div>
              
              <CardContent position="Head">
                <span className="position">{card.position}</span>
                <span className="name">{card.name}</span>
                <CardLinks>
                  {card.links.map((link, linkIndex) => (
                    <a key={linkIndex} className="link" href={link.mail?`mailto:${link.mail}`:link.url} target={link.mail ? "_self" : "_blank"}>
                      <link.icon className="icon" />
                    </a>
                  ))}
                </CardLinks>
              </CardContent>
            </Card>
          ))}
        </Cards>
        <Cards>
          {cards_ah.map((card, index) => (
            <Card cardLength={card.length} key={index}>
              <div >
                <CardImage position="Assistant Head" imageSrc={card.imageSrc} />
              </div>
              
              <CardContent position="Assistant Head">
                <span className="position">{card.position}</span>
                <span className="name">{card.name}</span>
                <CardLinks>
                  {card.links.map((link, linkIndex) => (
                    <a key={linkIndex} className="link" href={link.mail?`mailto:${link.mail}`:link.url} target={link.mail ? "_self" : "_blank"}>
                      <link.icon className="icon" />
                    </a>
                  ))}
                </CardLinks>
              </CardContent>
            </Card>
          ))}
        </Cards>

        
      </ContentWithPaddingXl>
    </Container>
  );
};
