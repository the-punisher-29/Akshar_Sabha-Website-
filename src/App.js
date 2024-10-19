import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";
import React, {useEffect,createContext,useState} from "react";
import { css } from "styled-components/macro"; //eslint-disable-line
import { backendUrl } from "backendUrl";



import LoginPage from "website/Log-in.js";
import SignupPage from "website/Sign-up";
import ComponentRenderer from "ComponentRenderer.js";
import MainLandingPage from "MainLandingPage.js";
import ThankYouPage from "ThankYouPage.js";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "website/homepage";
import About from "website/about";
import Events from "website/events";
import Sponsors from "website/sponsors";
import Team from "website/team";
import EventDetails from "website/eventDetails";
import Register from "website/register"
import EventRegistration from "website/eventRegistration";
import Dashboard from "website/dashboard";
// import Guest from "website/guest"
import Admin from "website/admin"

import ScrollToTop from "website/scrollToTop";

export const userContext =createContext();
export default function App() {

  const [loggedIn,SetLoggedIn]=useState(false);

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
        SetLoggedIn(true);
      }
      else{
        SetLoggedIn(false);
      }
    })
    .catch((error) => {
      console.log(error);
    }
    );
  }, []);

  const toggleLoggedIn=()=>{
    SetLoggedIn(!loggedIn);
  }
  // If you want to disable the animation just use the disabled `prop` like below on your page's component
  // return <AnimationRevealPage disabled>xxxxxxxxxx</AnimationRevealPage>;

  return (
    <userContext.Provider value={{loggedIn,toggleLoggedIn}}>
      
    <Router>
      <ScrollToTop>
        <Switch>
          <Route path="/admin">
            <Admin></Admin>
          </Route>
          <Route path="/about">
            <About></About>
          </Route>
          <Route path="/events">
            <Events></Events>
          </Route>
          {/* <Route path="/sponsors">
            <Sponsors />
          </Route> */}
          {/* <Route path="/login"> 
            <LoginPage />
          </Route> */}
          <Route path="/team">
            <Team />
          </Route>
          {/* <Route path="/guests">
            <Guest />
          </Route> */}
          <Route path="/eventDetails">
            <EventDetails />
          </Route>
          <Route path="/signup">
            <SignupPage />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/eventRegistration">
            <EventRegistration />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard></Dashboard>
          </Route>
          <Route path="/">
            <Home></Home>
          </Route>
        </Switch>
      </ScrollToTop>
    </Router>
    </userContext.Provider>
  );
}

// export default EventLandingPage;
// export default HotelTravelLandingPage;
// export default AgencyLandingPage;
// export default SaaSProductLandingPage;
// export default RestaurantLandingPage;
// export default ServiceLandingPage;
// export default HostingCloudLandingPage;

// export default LoginPage;
// export default SignupPage;
// export default PricingPage;
// export default AboutUsPage;
// export default ContactUsPage;
// export default BlogIndexPage;
// export default TermsOfServicePage;
// export default PrivacyPolicyPage;

// export default MainLandingPage;
