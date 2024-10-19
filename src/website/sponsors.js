import AnimationRevealPage from 'helpers/AnimationRevealPage';
import React  from 'react';
import Features from "components/features/SponsersCard";
import Header from "components/headers/light"
import Footer from "components/footers/Home-Footer";

function Sponsors() {
    return (
        <AnimationRevealPage>
            <Header color="orange"/>
            <Features />
            <Footer />
        </AnimationRevealPage>
    );
}
export default Sponsors;