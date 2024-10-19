import AnimationRevealPage from "helpers/AnimationRevealPage";
import React, { Component,useEffect,useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import tw from "twin.macro";

import Feature from "components/features/TwoColSingleFeatureWithStats2-button.js";
import Header from "components/headers/light.js";
import Footer from "components/footers/Home-Footer";
import { eventMap } from "../eventMap";
// import { createBrowserHistory } from 'history'

// export const history = createBrowserHistory({forceRefresh: true})

import { Container as ContainerBase } from "components/misc/Layouts";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import illustration from "images/signup-illustration.svg";
import logo from "images/old-logo-symbol.png";
import googleIconImageSrc from "images/google-icon.png";
import twitterIconImageSrc from "images/twitter-icon.png";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/user-plus.svg";
import { Link } from "react-router-dom";
import { backendUrl } from "backendUrl";
//import {backendUrl} from "backendUrl.js";

const Container = tw(
  ContainerBase
)`min-h-screen text-white font-medium flex justify-center my-2 -mx-8`;
const Content = tw.div`max-w-screen-xl my-0 mx-10 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-32 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center text-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const SocialButtonsContainer = tw.div`flex flex-col items-center`;
const SocialButton = styled.a`
  ${tw`w-full max-w-xs font-semibold rounded-lg py-3 border text-gray-900 bg-gray-100 hocus:bg-gray-200 hocus:border-gray-400 flex items-center justify-center transition-all duration-300 focus:outline-none focus:shadow-outline text-sm mt-5 first:mt-0`}
  .iconContainer {
    ${tw`bg-white p-2 rounded-full`}
  }
  .icon {
    ${tw`w-4`}
  }
  .text {
    ${tw`ml-4`}
  }
`;

const DividerTextContainer = tw.div`my-12 border-b text-center relative`;
const DividerText = tw.div`leading-none p-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform -translate-y-1/2 absolute inset-x-0 top-1/2 bg-transparent`;

const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${(props) => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-lg bg-contain bg-center bg-no-repeat`}
`;

function goBackToEvents(history) {
  history.push("/events");
  history.go(0);
}

function EventRegistration() {

  const [statusDict,setStatusDict] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:token,
    }
    };
    fetch(`${backendUrl}/api/check_login/`, requestOptions)
    .then((response)=>{
      if(response.status===200){
      }
      else{
        alert("session expired");
        window.location.replace("/");
      }
    })
    .catch((error) => {
      console.log(error);
    }
    );
  }, []);
  const location = useLocation();
  const card = location.state;
  const history = useHistory();

  if (!card) goBackToEvents(history, card);

  // console.log(card.teamSize);
  const SubmitButtonIcon = SignUpIcon;
  const submitButtonText = "Submit";

  // function validPassType(isFlagship, passType) {
  //   if (isFlagship) {
  //     if (passType == "flagship" || passType == "events_and_flagship") return true;
  //     else return false;
  //   } 
  //   else {
  //     if (passType == "events" || passType == "events_and_flagship") return true;
  //     else return false;
  //   }
  // }

    function validPassType(passType) {   
  
      if (passType == "events") return true;
      else return false;
   
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email_list = [];
    for (let i = 0; i < card.maxTeamSize-1; i++) {
      const num = i+2;
      const search = "email" + num;
      const email = e.target[search].value;
      if(email !== "" && email !=null){
        email_list.push(email);
      }
    }
    console.log("Email List:", email_list);


    //check if all users have registered and are valid
    const tempRequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        email_list: email_list,
      }),
    };
    
    var isTeamRegistrable = true;
    let al = "";

    await fetch(`${backendUrl}/api/check_if_team_registrable/`, tempRequestOptions)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setStatusDict(data);

        for (let email in data) {
          //console.log(email);
          if (data[email]["registered"] === false) {
            isTeamRegistrable = false;
            al += "User " + email + " has not signed up.\n";
          }
          else {
            if (data[email]["pass_type"] === "none") {
              isTeamRegistrable = false;
              al += "User " + email + " has not bought any pass.\n"; 
            }
            else {
              if (!validPassType(data[email]["pass_type"])) {
                // console.log(card.isFlagship, email["pass_type"]);
                isTeamRegistrable = false;
                al += "User " + email + " does not have a valid pass.\n";
              }
            }
          }
        }
        
        
      })
      .catch((error) => {
        console.log(error);
      });
      // return;

    if (isTeamRegistrable === false) {
      alert(al);    
      return;  
    }
    


    const data = {
      teamname: e.target.elements.teamname.value,
      email_list: email_list,
      event_registered: eventMap[card.title],
    };
    const token = localStorage.getItem("token");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify(data),
    };
    
    await fetch(backendUrl + "/api/create_team/", requestOptions)
      .then((response) => {
        if (response.status === 201) {
          alert("Successfully Registered");
          history.push("/dashboard");
          history.go(0);
        } 
        else if(response.status==409){
          alert("You've already registered for this event");
          window.location.replace("/dashboard")
        }else {
          alert("Error in registering");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;

  function isFieldRequired(index, minTeamSize) {
    if (index < minTeamSize - 1) {
      return true;
    }
    return false;
  }
  return (
    <AnimationRevealPage>
      <Header />
      <Container>
        <Content>
          <MainContainer>
            <Link onClick={history.goBack}>
              <LogoLink>
                <LogoImage src={card.imageSrc} />
              </LogoLink>
            </Link>
            <MainContent>
              <Heading>{card.title}</Heading>
              <FormContainer>
                <Form id="myForm" onSubmit={handleSubmit}>
                  <Input type="name" placeholder="Team Name" name="teamname" />
                  {Array.from(
                    { length: card.maxTeamSize - 1 },
                    (_, i) => i + 2
                  ).map((val, index) => (
                    <div>
                      <DividerTextContainer>
                        <DividerText>Team Member: {val}</DividerText>
                      </DividerTextContainer>
                      <Input
                        type="email"
                        placeholder="Email"
                        name={`email${val}`}
                        required={val < card.minTeamSize + 1 ? true : false}
                      />
                      <Input type="name" placeholder="Name" name="name" />
                      <Input
                        type="phone"
                        placeholder="Phone Number"
                        name="phone_number"
                      />
                    </div>
                  ))}
                  <SubmitButton type="submit">
                    <SubmitButtonIcon className="icon" />
                    <span className="text" style={{"margin": 0}}>{submitButtonText}</span>
                  </SubmitButton>
                </Form>
              </FormContainer>
            </MainContent>
          </MainContainer>
          {/* <IllustrationContainer>
                <IllustrationImage imageSrc={illustrationImageSrc} />
              </IllustrationContainer> */}
        </Content>
      </Container>
      <Footer />
    </AnimationRevealPage>
  );
}

export default EventRegistration;
