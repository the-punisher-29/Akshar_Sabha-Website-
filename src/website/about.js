import React, { Component } from 'react';
import AnimationRevealPage from "helpers/AnimationRevealPage.js";

import Header from 'components/headers/light.js'
import MainFeature from "components/features/VerticalWithAlternateImageAndText-About.js";
import Footer from "components/footers/Home-Footer";

import imgLogo from "../images/Logo2024.jpg";

function About() {
    return (
        <AnimationRevealPage>
            <Header color="orange"/>
            <MainFeature />
            <Footer />
        </AnimationRevealPage>
    );
}

export default About;
