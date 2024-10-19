import React, { useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { SectionDescription } from "components/misc/Typography.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import acc from "../../images/QR.jpeg";
import reg from "../../images/QR.jpeg";

const HeaderContainer = tw.div`mt-10 w-full flex flex-col items-center`;
const Subheading = tw(SubheadingBase)`mb-4`;
const Heading = tw(SectionHeading)`w-full text-xl text-teal-500`;
const Description = tw(SectionDescription)`w-full text-center font-Philosopher`;
const Subdescription = tw(SectionDescription)`w-full text-center font-Philosopher`;

const PlansWrapper = tw.div`flex flex-wrap justify-center gap-8 md:gap-16`;

const PlansContainer = styled.div`
  ${tw`flex justify-center flex-col lg:flex-row items-center lg:items-stretch relative mb-8 lg:mb-0 w-96`}
  ${({ isMobile }) => isMobile && tw`flex-col`}
`;

const Plan = styled.div`
  ${tw`w-full max-w-sm mt-16 lg:mr-8 lg:last:mr-0 text-center px-8 rounded-lg shadow relative pt-2 text-gray-900 bg-white flex flex-col`}
  .planHighlight {
    ${tw`rounded-t-lg absolute top-0 inset-x-0 h-2`}
  }

  ${props =>
    props.featured &&
    css`
      background: rgb(100,21,255);
      background: linear-gradient(135deg, rgba(100,21,255,1) 0%, rgba(128,64,252,1) 100%);
      background: rgb(85,60,154);
      background: linear-gradient(135deg, rgba(85,60,154,1) 0%, rgba(128,90,213,1) 100%);
      background: rgb(76,81,191);
      background: linear-gradient(135deg, rgba(76,81,191,1) 0%, rgba(102,126,234,1) 100%);
      ${tw`bg-orange-500 text-gray-100`}
      .planHighlight {
        ${tw`hidden`}
      }
      .duration {
        ${tw`text-gray-200!`}
      }
      ${PlanFeatures} {
        ${tw`border-indigo-500`}
      }
      .feature:not(.mainFeature) {
        ${tw`text-gray-300!`}
      }
      ${BuyNowButton} {
        ${tw`bg-orange-500 text-primary-500 hocus:bg-orange-500 hocus:text-primary-800`}
    `}
`;

const PlanHeader = styled.div`
  ${tw`flex flex-col uppercase leading-relaxed py-8`}
  .name {
    ${tw`font-bold text-xl`}
  }
  .price {
    ${tw`font-bold text-4xl sm:text-5xl my-1`}
  }
  .duration {
    ${tw`text-gray-500 font-bold tracking-widest`}
  }
`;

const PlanFeatures = styled.div`
  ${tw`flex flex-col -mx-8 px-8 py-8 border-t-2 border-b-2 flex-1`}
  .feature {
    ${tw`mt-5 first:mt-0 font-medium`}
    &:not(.mainFeature) {
      ${tw`text-gray-600`}
    }
  }
  .mainFeature {
    ${tw`text-xl font-bold tracking-wide`}
  }
`;

const PlanAction = tw.div`px-4 sm:px-8 xl:px-16 py-8`;
const BuyNowButton = styled(PrimaryButtonBase)`
  ${tw`rounded-full uppercase tracking-wider py-4 w-full text-sm transform hocus:translate-x-px hocus:-translate-y-px focus:shadow-outline`}
  background-color: black;
  color: white;

  &:hover {
    background-color: white;
    color: black;
    border:2px solid black;
    ${tw`shadow-xl`}
  }
`;

const PopupContainer = styled.div`
  ${tw`fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 z-50`}
  padding-left: 20px;
  padding-right: 20px;
`;

const PopupContent = styled.div`
  ${tw`bg-white p-8 rounded-lg `}
  padding-left:20px;
  padding-right:20px;
`;

const PopupCloseButton = styled.button`
  ${tw`relative text-black hover:text-gray-800`}
  width:100%;
  text-align: right; /* Align text to the right */
`;

const PopupHeading = tw.h2`text-2xl font-bold mb-4 text-center`;
const PopupDescription = tw.p`text-lg text-gray-700 text-center`;

export default ({
  subheading = "",
  heading = "Registration is free! Visit the Individual Events under Events Page for Participation.",
  description = "",
  subdescription = "Note: For any query, reach us at aaftaab@iitj.ac.in",
  plans = null,
  plans1 = null,
  primaryButtonText = "Buy Now"
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const eventsPageUrl = "https://aaftaab.in/events";

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const defaultPlans = [
    {
      name: "Registration Fees",
      price: "₹0",
      originalPrice: "₹150",
      mainFeature: "Access to all events",
      features: ["Theatre Performance", "Kavi sammelan", "Prose Panorama", "and many more..."],
      photo: reg
    },
  ];

  const defaultPlans1 = [
    {
      name: "Accommodation FEES",
      price: "₹400",
      originalPrice: "₹500",
      mainFeature: "Access to Hostel and Breakfast",
      features: [""],
      featured: false,
      photo: acc
    },
  ];

  if (!plans) plans = defaultPlans;
  if (!plans1) plans1 = defaultPlans1;

  const highlightGradientsCss = [
    css`
      background: rgb(255, 153, 51);
      background: linear-gradient(115deg, rgba(255, 153, 51, 1) 0%, rgba(255, 204, 102, 1) 100%);
    `,
    css`
      background: rgb(255, 153, 51);
      background-image: linear-gradient(115deg, #ff6600, #ff8533, #ff9966, #ffad99, #ffc2cc);
    `,
    css`
      background: rgb(255, 153, 51);
      background: linear-gradient(115deg, rgba(255, 153, 51, 1) 0%, rgba(255, 204, 102, 1) 100%);
    `
  ];

  return (
    <Container>
      <ContentWithPaddingXl>
        <HeaderContainer>
          {subheading && <Heading>{subheading}</Heading>}
          <Heading>{heading}</Heading>
          {description && <Description>{description}</Description>}
          {subdescription && <Description>{subdescription}</Description>}
        </HeaderContainer>
        <PlansWrapper>
          <PlansContainer isMobile={false}>
            {plans.map((plan, index) => (
              <Plan key={index} featured={plan.featured}>
                {!plan.featured && <div className="planHighlight" css={highlightGradientsCss[index % highlightGradientsCss.length]} />}
                <PlanHeader>
                  <span className="name">{plan.name}</span>
                  <span className="price">{plan.price}</span>
                  <span className="duration">{plan.duration}</span>
                  <span className="originalPrice">Original Price: <del>{plan.originalPrice}</del></span>
                </PlanHeader>
                <PlanFeatures>
                  <span className="feature mainFeature">{plan.mainFeature}</span>
                  {plan.features.map((feature, index) => (
                    <span key={index} className="feature">
                      {feature}
                    </span>
                  ))}
                </PlanFeatures>
                <PlanAction>
                  <BuyNowButton onClick={togglePopup}>
                    {primaryButtonText}
                  </BuyNowButton>
                </PlanAction>
              </Plan>
            ))}
          </PlansContainer>
          <PlansContainer isMobile={true}>
            {plans1.map((plan, index) => (
              <Plan key={index} featured={plan.featured}>
                {!plan.featured && <div className="planHighlight" css={highlightGradientsCss[index % highlightGradientsCss.length]} />}
                <PlanHeader>
                  <span className="name">{plan.name}</span>
                  <span className="price">{plan.price}</span>
                  <span className="duration">{plan.duration}</span>
                  <span className="originalPrice">Original Price: <del>{plan.originalPrice}</del></span>
                </PlanHeader>
                <PlanFeatures>
                  <span className="feature mainFeature">{plan.mainFeature}</span>
                  {plan.features.map((feature, index) => (
                    <span key={index} className="feature">
                      {feature}
                    </span>
                  ))}
                </PlanFeatures>
                <PlanAction>
                  <BuyNowButton onClick={() => window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLScihB35Mq52o8Eya2kdoYZ1eNWaQvIwY_peemJY6z1YMEnwTA/viewform?usp=sf_link"}>
                    Avail Now!
                  </BuyNowButton>

                </PlanAction>
                
              </Plan>
            ))}
          </PlansContainer>
        </PlansWrapper>
        {showPopup && (
          <PopupContainer>
            <PopupContent>
              <PopupCloseButton onClick={togglePopup} style={{ marginRight: "2px" }}>Close</PopupCloseButton>
              <PopupHeading>Registration is free!</PopupHeading>
              <PopupDescription>Visit the Individual Events under Events Page for Participation.</PopupDescription>
            </PopupContent>
          </PopupContainer>
        )}
      </ContentWithPaddingXl>
    </Container>
  );
};
