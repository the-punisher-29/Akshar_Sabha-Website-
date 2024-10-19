import React, { useContext,useEffect,useState} from "react";
import { Link,useHistory } from "react-router-dom";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import StatsIllustrationSrc from "images/stats-illustration.svg";
import { ReactComponent as SvgDotPattern } from "images/dot-pattern.svg";
import { userContext } from "App";
import "./TwoColSingleFeatureWithStats2-button.css";
import { eventMap } from "eventMap";
import { backendUrl } from "backendUrl";
const Container = tw.div`relative px-6`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto relative`;
const TextColumn = styled(Column)(props => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-contain bg-no-repeat bg-center h-full `,
 
]);
const TextContent = tw.div`lg:py-8 text-center md:text-left `;

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(
  SectionHeading
)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight text-teal-800 `;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-black`;

const Statistics = tw.div`flex flex-col items-start sm:block text-center md:text-left mt-4`;
const Statistic = tw.div`text-left sm:inline-block sm:mr-12 last:mr-0 mt-4`;
const Value = tw.div`font-bold text-lg sm:text-xl lg:text-2xl text-secondary-500 tracking-wide`;
const Key = tw.div`font-medium text-primary-700`;

const PrimaryButton = styled(PrimaryButtonBase)`
  ${tw`mt-8 bg-teal-700 md:mt-10 mr-8 text-sm inline-block hover:bg-white hover:text-black`}
  
  @media (max-width: 768px) {
    ${tw`mx-auto block`}
  }
`;





const DecoratorBlob = styled(SvgDotPattern)(props => [
  tw`w-20 h-20 absolute right-0 bottom-0 transform translate-x-1/2 translate-y-1/2 fill-current text-primary-500 -z-10`
]);

export default ({
  subheading = "",
  heading = (
    <>
      We have been doing this <wbr /> since <span tw="text-primary-500">1999.</span>
    </>
  ),
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  primaryButtonText = "Register Now!",
  imageSrc = StatsIllustrationSrc,
  imageCss = null,
  imageContainerCss = null,
  imageDecoratorBlob = false,
  imageDecoratorBlobCss = null,
  imageInsideDiv = true,
  statistics = null,
  textOnLeft = false,
  event_registered="",
  registrableEvent = false,
  minTeamSize = 1,
  maxTeamSize = 1,
  isFlagship = false,
  rulebookLink = "",
  timing=false,
  prize = "",
  linkss="",
  linkss1="",
}) => {
  const loggedIn = useContext(userContext).loggedIn;
  const [passType,setPassType] = useState("none");
  console.log(loggedIn);
  useEffect(async ()=>{

    if(loggedIn){
      const token = localStorage.getItem("token");
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      await fetch(`${backendUrl}/api/get_user_pass_type/`, requestOptions)
      .then((response)=>{
        if(response.status===200){
          return response.json();
        }
        else{
          return {pass_type:"none"};
        }
      }
      )
      .then((data)=>{
        setPassType(data.pass_type);
        console.log(passType);
      })
      .catch((err)=>{
        console.log(err);
      }
      );
    }


  },[])



  const defaultStatistics = [
    {
      key: "Clients",
      value: "2282+"
    },
    {
      key: "Projects",
      value: "3891+"
    },
    {
      key: "Awards",
      value: "1000+"
    }
  ];

  // if (!statistics) statistics = defaultStatistics;

  const handleEventRegistration = () => {
    
  };

  function validPassType(isFlagship, passType) {
    // if (isFlagship) {
    //   if (passType == "flagship" || passType == "events_and_flagship") return true;
    //   else return false;
    // } else {
    //   if (passType == "events" || passType == "events_and_flagship") return true;
    //   else return false;
    // }
    if(passType=="events") return true
    return false
  }

  const card = {
    title: heading,
    imageSrc: imageSrc,
    minTeamSize: minTeamSize,
    maxTeamSize: maxTeamSize,
    isFlagship: isFlagship,
  }

  

  return (
    <Container>
      <TwoColumn css={!imageInsideDiv && tw`md:items-center`}>
        <ImageColumn css={imageContainerCss}>
          {imageInsideDiv ? <Image imageSrc={imageSrc} css={imageCss} /> : <img src={imageSrc} css={imageCss} alt="" />}
          {imageDecoratorBlob && <DecoratorBlob css={imageDecoratorBlobCss} />}
        </ImageColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            {subheading && <Subheading>{subheading}</Subheading>}
            <Heading>
              {heading.split(' (')[0]}
              <br />
              {heading.includes('(') && heading.split(' (')[1] !== undefined && (
                "(" + heading.split(' (')[1]
              )}
            </Heading>
            <Description>{description}</Description>
            {
              statistics && 
              <Statistics>
                {statistics.map((statistic, index) =>{
                  if(statistic.value != ""){
                    console.log(statistic.key);
                    return (
                      <Statistic key={index}>
                        <Value>{statistic.value}</Value>
                        <Key>{statistic.key}</Key>
                      </Statistic>
                    );
                  }
                  else{
                    return null;
                  }
                }
                )}
              </Statistics>
            }
             {
              (timing && (!loggedIn) ) ?
              (
                <Link to="/login">
                  <PrimaryButton  >
                    Login to Register!
                    
                  </PrimaryButton>
                </Link>
              ) :
              (
                (timing & loggedIn )) ? 
                (                     
                  <PrimaryButton onClick={() => window.location.href = linkss}>
                  Participate Now!
                </PrimaryButton>

                )
                :
                null
            }
            
            {
              (registrableEvent && (!loggedIn)) ?//block of iit j
              (
                <Link to="/login">
                  <PrimaryButton  >
                    Login to Register (Only for IIT J Peeps)
                    
                  </PrimaryButton>
                </Link>
              ) :
              (
                (registrableEvent && loggedIn )) ? 
                (                     
                    
                    <PrimaryButton onClick={() => window.location.href = linkss1}>
                  {primaryButtonText} (Only for IIT J Peeps)
                </PrimaryButton>
                )
                :
                null
            }
            {
              (registrableEvent && (!loggedIn)) ?//block of iit j
              (
                <Link to="/login">
                  <PrimaryButton  >
                    Login to Register 
                    
                  </PrimaryButton>
                </Link>
              ) :
              (
                (registrableEvent && loggedIn )) ? 
                (                     
                    
                    <PrimaryButton onClick={() => window.location.href = linkss}>
                  {primaryButtonText} 
                </PrimaryButton>
                )
                :
                null
            }
            
          </TextContent>
        </TextColumn>
      </TwoColumn>
    </Container>
  );
};




// {
//   (registrableEvent && (!loggedIn)) ?
//   (
//     <Link to="/login">
//       <PrimaryButton >
//         Login to Register                
        
//       </PrimaryButton>
//     </Link>
//   ) :
//   (
//     // (registrableEvent && loggedIn && (passType == "none")) ? 
//     (registrableEvent && loggedIn) ? 
//     (
//       <PrimaryButton disabled className="disabledEventRegisterBtn">
//         Register Now!                
//       </PrimaryButton>
//     )
//     :
//     (
//       (registrableEvent && loggedIn ) ? 
//       // (registrableEvent && loggedIn && (!validPassType(isFlagship, passType))) ? 
//       (
//         <PrimaryButton disabled className="disabledEventRegisterBtn">
//           You don't have a valid pass!                 
//         </PrimaryButton>
//       )
//       :
//       (
//         (registrableEvent && loggedIn && validPassType(isFlagship, passType)) ? 
//         (                     
//           <PrimaryButton onClick={() => window.location.href = linkss}>
//           {primaryButtonText}                  
//         </PrimaryButton>
//         )
//         :
//         null
//       )
        
//     )
//   )
// }