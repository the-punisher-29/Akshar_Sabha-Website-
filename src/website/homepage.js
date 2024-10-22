import AnimationRevealPage from 'helpers/AnimationRevealPage';
import React from 'react';
import tw from 'twin.macro';
import Hero from 'components/hero/Hero-Section-Homepage';
import Slider from 'components/cards/Homepage-Slider';
import Features from 'components/features/Homepage-Sponsors-Preview';
import Footer from 'components/footers/Home-Footer';
import imgLogo from '../images/old-logo.png';
import Counter from '../components/features/Counter';
import { Button } from '@chakra-ui/react'; // Import Chakra UI Button

const CenteredContent = tw.div`flex flex-col items-center justify-center h-full`;

function Home() {
  const HighlightedText = tw.span`bg-gradient-to-r from-green-300 via-yellow-300 to-blue-200 px-4 text-teal-700  transform -skew-x-12 inline-block font-Philosopher`;
  const DescriptionText = tw.p`text-lg text-teal-700 font-Philosopher`; // 
  // Function to open the PDF in a new tab
  const handleOpenPDF = () => {
    window.open('/PR_Brochure_Akshar.pdf', '_blank');
  };

  return (
    <AnimationRevealPage>
      <Hero
        heading={(
          <>
            The <HighlightedText>Akshar Sabha</HighlightedText>
            {/* Add button after HighlightedText */}
            <Button
              onClick={handleOpenPDF}
              colorScheme="teal"
              variant="solid"
              ml={4} // Margin-left to space it from the text
              size="md"
            >
              Detailed Description
            </Button>
          </>
        )}
        description={
          <CenteredContent>
            <DescriptionText style={{ fontFamily: 'Lato', color: 'teal' }}>
              A highlight of Akshar is the Akshar Sabha, a Model United Nations (MUN) conference that adds a diplomatic dimension to the literary festival. The Akshar Sabha brings together students passionate about global affairs, allowing them to step into the shoes of international delegates and engage in stimulating debates on pressing world issues. This unique blend of literature and diplomacy encourages participants to apply their literary skills in crafting persuasive arguments, drafting resolutions, and delivering compelling speeches.
            </DescriptionText>
          </CenteredContent>
        }
        imageSrc={imgLogo}
      />
      {/* <Slider /> */}
      {/* <Counter /> */}
      <Features />
      <Footer />
    </AnimationRevealPage>
  );
}

export default Home;
