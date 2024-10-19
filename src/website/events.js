import AnimationRevealPage from 'helpers/AnimationRevealPage';
import React, { Component } from 'react';
import tw from "twin.macro";

import TabGrid from "components/cards/TabCardGrid-Events.js";
import Header from 'components/headers/light.js'
import Footer from "components/footers/Home-Footer";

function Events() {

    const HighlightedText = tw.span`bg-gradient-to-r from-orange-600 to-yellow-500 text-orange-600 text-gray-100 px-4 transform -skew-x-12 inline-block`;

    return (
        <AnimationRevealPage>
            <Header color="orange" />
            <TabGrid
                heading={
                <>
                    Model <HighlightedText>United Nations</HighlightedText>
                </>
                }
            />
            <Footer />
        </AnimationRevealPage>
    );
}

export default Events;