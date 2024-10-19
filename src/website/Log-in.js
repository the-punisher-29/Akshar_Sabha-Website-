import React, { useContext } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import illustration from "images/login-illustration.svg";
import logo from "images/old-logo-symbol.png";
import googleIconImageSrc from "images/google-icon.png";
import twitterIconImageSrc from "images/twitter-icon.png";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
import Footer from "components/footers/Home-Footer";
import { Link, useHistory, Redirect } from "react-router-dom";
import { backendUrl } from "backendUrl";
import { userContext } from "App.js";

const Container = tw(
  ContainerBase
)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -mx-8 -mt-8 sm:-my-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-32 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
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
const DividerText = tw.div`leading-none py-2 px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform -translate-y-1/2 absolute inset-x-0 top-1/2 bg-transparent`;

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
  ${tw`m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat`}
`;

const handleSubmit = (e) => {
  e.preventDefault();
  const data = {
    email: e.target.email.value,
    password: e.target.password.value,
  };
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  fetch(`${backendUrl}/api/login_participant/`, requestOptions)
    .then((response) =>{
      if(response.status==200){
        
        window.location.href = "/";
        return response.json();
      }
      return {};
    })
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
    
      } else {
        alert("Invalid Credentials");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export default ({
  illustrationImageSrc = illustration,
  headingText = "Log In To Aaftaab",
  submitButtonText = "Log In",
  SubmitButtonIcon = LoginIcon,
  forgotPasswordUrl = "#",
  signupUrl = "/signup",
}) => {
  const loggedIn = useContext(userContext).loggedIn;
  if (loggedIn) {
    return <Redirect to="/" />
  } 

  return (
  <AnimationRevealPage>
    <Container>
      <Content>
        <MainContainer>
          <Link to="/">
            <LogoLink>
              <LogoImage src={logo} />
            </LogoLink>
          </Link>
          <MainContent>
            <Heading>{headingText}</Heading>
            <FormContainer>
              <DividerTextContainer>
                <DividerText>Log in with your e-mail</DividerText>
              </DividerTextContainer>
              <Form onSubmit={handleSubmit}>
                <Input type="email" placeholder="Email" name="email" />
                <Input type="password" placeholder="Password" name="password" />
                <SubmitButton type="submit">
                  <SubmitButtonIcon className="icon" />
                  <span className="text">{submitButtonText}</span>
                </SubmitButton>
              </Form>
              <p tw="mt-8 text-sm text-gray-600 text-center">
                Dont have an account?{" "}
                <Link
                  to={signupUrl}
                  tw="border-b border-gray-500 border-dotted"
                >
                  Sign Up
                </Link>
              </p>
            </FormContainer>
          </MainContent>
        </MainContainer>
        <IllustrationContainer>
          <IllustrationImage imageSrc={illustrationImageSrc} />
        </IllustrationContainer>
      </Content>
    </Container>
    <Footer />
  </AnimationRevealPage>
)};
