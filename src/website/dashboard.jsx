import React, { Component, useEffect, useState,useContext } from "react";
import { Redirect } from "react-router-dom";
import tw from "twin.macro";
import { backendUrl } from "backendUrl";
import AnimationRevealPage from "helpers/AnimationRevealPage";

import Header from "components/headers/light.js";
import Footer from "components/footers/Home-Footer.js"
import EventDetailSection from "components/blogs/PopularAndRecentBlogPosts-Dashboard.js"
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { SectionHeading } from "components/misc/Headings.js";
import { Container, ContentWithPaddingXl as ContentWithPaddingXlBase } from "components/misc/Layouts.js";

import { userContext } from "App";
import "./dashboard.css"

const HeaderRow = tw.div`flex justify-between items-start flex-col`;
const PrimaryButton = tw(PrimaryButtonBase)`bg-orange-500 hocus:bg-orange-800 mt-8 md:mt-10 text-sm ml-auto
`;
const HighlightedText = tw.span`bg-orange-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
const HeadingText = tw(SectionHeading)``;
const ContentWithPaddingXl = tw(ContentWithPaddingXlBase)`py-6 lg:py-10`

function Dashboard() {
  const [userName, setUserName] = useState("");
  const [events, setEvents] = useState([]);
  const [passType, setPassType] = useState("none");

  useEffect(async () => {
    const token = localStorage.getItem("token");
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    await fetch(`${backendUrl}/api/get_all_events_for_an_user/`, requestOptions)
      
        .then((response) =>{
      
          if(response.status==200){
            window.location.replace("/dashboard");
            
            return response.json();
          }
          else{
         
            //window.location.replace("/dashboard");
            
            return {};
          }
        })
        .then((data) => {
        
          setUserName(data.user_name);
          setEvents(data.event_list);
          setPassType(data.pass_type);
        })

        .catch((error)=>{
          console.log(error);
        })
  }, []);


  const logoutButtonPressed=()=>{
    localStorage.removeItem("token");
    window.location.replace("/");
  }

  const loggedIn = useContext(userContext).loggedIn;
  // if (!loggedIn) {
  //   return <Redirect to="/" />
  // }

  return (
    <AnimationRevealPage>
      <Header color="orange" />
      <Container>
        <ContentWithPaddingXl>          
          <HeaderRow>
            <HeadingText>Hi <HighlightedText>Welcome to Aaftaab 2024!</HighlightedText></HeadingText>
            <PrimaryButton onClick={logoutButtonPressed}>
              Logout
            </PrimaryButton>
          </HeaderRow>
        </ContentWithPaddingXl>
      </Container>

      <EventDetailSection eventsRegistered_Name={events} passType={passType}/>
      
      <Footer />
    </AnimationRevealPage>
  );
}

export default Dashboard;
