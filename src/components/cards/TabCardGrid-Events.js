import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line

import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { SectionHeading, Subheading } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";

import BEP from "../../images/BEP.jpeg"
import QT from "../../images/QT.png"
import thea from '../../images/theatre.jpeg';

const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row font-Philosopher justify-center`;
const Header = tw(SectionHeading)`font-Philosopher mb-3 text-center`;
const SubHeader = tw(Subheading)`font-Philosopher text-3xl mb-0 mt-12 justify-center text-orange-600`;
const TabsControl = tw.div`flex flex-wrap bg-orange-300 px-2 py-2 rounded leading-none mt-12 xl:mt-0`;

const TabControl = styled.div`
  ${tw`cursor-pointer px-6 py-3 mt-2 sm:mt-0 sm:mr-2 last:mr-0 font-Lato bg-gradient-to-r from-orange-400 to-yellow-500 text-orange-600  text-gray-600 transition duration-300 text-lg  sm:w-auto text-center font-Philosopher font-bold`}
  &:hover {
    ${tw`bg-gray-300 text-gray-700`}
  }
  ${props => props.active && tw`bg-black! text-gray-100!`}
  }
`;

const TabContent = tw(motion.div)`mt-0 mb-2 flex flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-12 font-Philosopher justify-center `;
const CardContainer = tw.div`mt-10 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 sm:pr-10 md:pr-6 lg:pr-12 font-Philosopher`;
const Card = tw(motion.a)`bg-gray-200 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0 

`;

const StyledCard = styled(Card)`
  border-radius: 30px; /* Adjust the value as needed */

`;

const CardRatingContainer = tw.div`leading-none absolute inline-flex bg-gray-100 bottom-0 left-0 ml-4 mb-4 rounded-full px-5 py-2 items-end`;
const CardRating = styled.div`
  ${tw`mr-1 text-sm font-bold flex items-end`}
  svg {
    ${tw`w-4 h-4 fill-current text-orange-400 mr-1`}
  }
`;

const CardHoverOverlay = styled(motion.div)`
  background-color: rgba(0, 0, 0, 1);
  ${tw`absolute inset-0 flex justify-center items-center`}
  opacity: 0;
  height: 0;
`;
const CardButton = tw(PrimaryButtonBase)`
  text-sm mt-2 hover:text-black hover:bg-gray-400
`;


const CardReview = tw.div`font-medium text-xs text-gray-600`;

const CardText = tw.div`p-4 text-gray-900 font-Philosopher text-center `;
const CardTitle = tw.h5` text-lg font-semibold group-hover:text-black font-Philosopher text-center`;
const CardContent = tw.p`mt-1 text-sm font-medium text-black font-Lato text-center `;
const CardPrice = tw.p`mt-4 text-xl font-bold`;


const CardImageContainer = styled.div`
  ${props => css`
    background-image: url("${props.imageSrc}");
    border-radius: 10px;
    border: 1px solid orange;
    transition: box-shadow 0.3s ease; /* Add transition for smooth effect */

    /* Initial box shadow */
    box-shadow: none;

    /* Box shadow on hover */
    &:hover {
        box-shadow: 0 0 15px orange; /* Orange shadow */
}
  `}
  ${tw`h-56 xl:h-64 bg-center bg-cover relative `}
`;


export default ({
  heading = "Event Schedule",///for iitj put in linkss1 else linkss.
  tabs = {
    Flagship: [
      {
        imageSrc:
          "https://www.arha.us/sites/default/files/2021-04/RibbonCut.jpg",
        title: "Opening Ceremony",
        description: "The opening ceremony is a grand kickoff event that marks the beginning of a significant occasion or gathering. It sets the tone and spirit for what's to come, often featuring speeches, performances, and symbolic gestures. Attendees gather to witness and celebrate the start of the event, fostering anticipation and excitement. It's a moment of unity, where participants come together to embark on a shared journey or experience.",
        date: "21-02-2024",
        timing: "8:30AM onwards",
        // price: "₹50",
        isFlagship: true,
        prize: "",
        ruleBookLink: "",
        url: "#",
        linkss: "",
        registrableEvent: false
      },

      {
        imageSrc: "https://miro.medium.com/v2/resize:fit:522/1*Z8yUeUqglktyEORtbZD7MA.jpeg",
        title: "Panel Discussion",
        description: "Panel discussions gather experts to explore topics, led by a moderator, in a collaborative setting. Diverse insights and solutions are shared, enhancing understanding, while audience engagement enriches the conversation. The aim is to inform, educate, and provoke thoughtful discussion, fostering deeper insight into complex issues and driving meaningful change.",
        date: "21-02-2024",
        timing: "9:15AM onwards",
        // price: "₹50",
        isFlagship: true,
        prize: "",
        ruleBookLink: "",
        url: "#",
        registrableEvent: false
      },

      {
        imageSrc:
          "https://e0.pxfuel.com/wallpapers/60/731/desktop-wallpaper-quiz-test-thumbnail.jpg",
        title: "General Quiz",
        description: "Unearth the treasures of culture in this captivating quiz that promises to transport its participants through our rich history of heritage and traditions. Get ready to flex your quiz muscles and test your intellect in this exciting quiz spear-headed by QM Major Chandrakant Nair!",
        date: "21-02-2024",
        timing: "11:00AM onwards",
        // price: "₹50",
        isFlagship: true,
        prize: "",
        ruleBookLink: "",
        url: "#",
        registrableEvent: true,
        linkss1: "https://docs.google.com/forms/d/e/1FAIpQLSfTK4ncO7LkIlHMyWlAMRMlhraDyCc5NaD9xJfOe6Bi9fZ4Pw/viewform",
        linkss:"https://forms.gle/dXmcnWA6oqkL2BVE7"
      },




      {
        //imageSrc:
        // musicshowImg,
        imageSrc: "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d3JpdGluZyUyMGElMjBzdG9yeXxlbnwwfHwwfHx8MA%3D%3D",
        title: "Prose Panorama",
        description: "  With clocks ticking and a challenging word limit, unleash your narrative prowess in Aaftaab’s Story Writing content! Dip your quill into the inkwell of imagination, let the words build worlds and craft a literary masterpiece!",
        date: "21-02-2024",
        timing: "11:00AM onwards",
        // price: "₹50",
        isFlagship: true,
        prize: "",
        ruleBookLink: "",
        url: "#",
        registrableEvent: true,
        linkss1: "https://forms.gle/7veN7wzvUKpcWsG2A",
        linkss:"https://forms.gle/worQiRWzFwj4tnhq6"
      },
      {
        //imageSrc: Maaz,
        imageSrc: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/word-board-games-1523385477.png",
        title: "WITZKRIEG: Wordcraft War",
        date: "21-02-2024",
        timing: "2:00PM onwards",
        // price: "₹50",
        description: `
        Tickle your linguistic genius with a thrilling concoction of clues, riddles and quirky challenges. Harness your inner wordsmith in Aaftaab’s Word Games and brace yourself for a wordplay showdown!
        `,
        isFlagship: true,
        prize: "",
        ruleBookLink: "",
        url: "#",
        registrableEvent: true,
        linkss1: "https://docs.google.com/forms/d/e/1FAIpQLSdmRk6N6j_PsgRxY4RG83p94RcOTx9_zsbVsmkN7umyui1k6g/viewform",
      linkss:"https://docs.google.com/forms/d/e/1FAIpQLScZv_k99sfTABny2Z3PvH8NVkwCDldyQ1VQ2-UYF_VEA-_YLw/viewform"
      },
      {
        imageSrc:
          "https://tse2.mm.bing.net/th?id=OIP.YLq3cU73aXPkViAIUXAiVwHaFN&pid=Api&P=0&h=220",
        title: "Verse Vortex",
        description: "Time to free your poems from the cages of paper with your symphony of verses! Channelize your inner Frost, awaken the Ghalib and recite your creations in Aaftaab’s one and only Slam Poetry event!",
        date: "21-02-2024",
        timing: "2:00PM onwards",
        // price: "₹50",
        isFlagship: true,
        prize: "",
        ruleBookLink: "",
        url: "#",
        registrableEvent: true,
        linkss1: "https://forms.gle/1fzS2z68u3EdnjZC7",
        linkss:"https://forms.gle/nki83dJD1y9pmjoJA"
      },
      {
        imageSrc:
          "https://w0.peakpx.com/wallpaper/196/268/HD-wallpaper-riddle-me-this-comics-riddle-villains-dc.jpg",
        title: "Cryptic Chronicles (Treasure Hunt)",
        description: "Get challenged by riddles and clues as you navigate your way through the maze-like campus of IIT Jodhpur in Aaftaab’s Campus Hunt! Meanwhile, get ready for tasks that add a dash of creativity by making you craft captivating captions for scenic snapshots along the way.",
        date: "21-02-2024",
        timing: "3:30PM onwards",
        // price: "₹50",
        isFlagship: true,
        prize: "",
        ruleBookLink: "",
        url: "#",
        registrableEvent: true,
        linkss1: "https://forms.gle/pkk7ksfJHq3A7fTE6",
        linkss:"https://forms.gle/LXBhqLk2VfjpPQBG9"
      },
      {
        imageSrc:
          "https://tse3.mm.bing.net/th?id=OIP.bkg9JfSripHJpZ3yGG0r5wHaGS&pid=Api&P=0&h=220",
        title: "JAM-inate : Expressive Minute Mosaic",
        date: "21-02-2024",
        timing: "04:00 PM onwards",
        description: `Grab the mic, unleash your spontaneity, and embark on a whirlwind of wit and words. Participate in Aaftaab’s JAM: Just a Minute, and challenge your wit with a random topic and a minute to talk!`,
        // price: "₹50",
        isFlagship: true,
        prize: "",
        ruleBookLink: "",
        url: "#",
        registrableEvent: true,
        linkss1: "https://forms.gle/dHmTopSoHPUDa3CTA",
        linkss:"https://forms.gle/Y4zJUBZUb2vs57kD6"

      },

      {
        imageSrc:
          "https://d2tmwrdh9omrnz.cloudfront.net/channels/kavi.jpg",
        title: "Kavi Sammelan",
        description: "Kavi Sammelan, a poetic symposium, originated in North India, fostering traditional poetic expression. Poets gather to recite compositions, showcasing creativity and linguistic prowess. Events feature competitive or collaborative formats and various styles and languages. Accompanied by musical performances, they enrich cultural gatherings. Platforms for social commentary, they share thoughts and emotions through the power of spoken word.",
        date: "21-02-2024",
        timing: "04:30PM onwards",
        // price: "₹50",
        isFlagship: true,
        prize: "",
        ruleBookLink: "",
        url: "#"
      },

      {
        imageSrc:thea,
        title: "Theatre Performance",
        description: "This is your chance to grab the mic and showcase your talent to a wide audience! So what are you waiting for? The stage is set, and it is all yours...",
        date: "21-02-2024",
        timing: "07:30PM onwards",
        isFlagship: true,
        prize: "",
        ruleBookLink: "",
        url: "#"
      },
      {
        imageSrc:
          "https://images.unsplash.com/photo-1473186505569-9c61870c11f9?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ldHJ5fGVufDB8fDB8fHww",
        title: "Snug Snippets (Instagram Event)",


        description: "A few prompts (words/phrases) shall be shared and people shall come up with small snippets of poetry on it. Entries must be short (15-30 words)No language barrier - writings can be in any language you want. Entries will be posted on Instagram on a first come first serve basis.Grading based on likes and comments  - 1 like = 1 point, 1 comment = 2 points.",

        date: "21-02-2024",
        timing: "Online Event",
        // price: "₹50",
        isFlagship: true,
        prize: "",
        ruleBookLink: "",
        url: "#",
        linkss: "https://forms.gle/U34gMgtLRCsNRjHp9"

      },
      {
        imageSrc:
          "https://thegradient.pub/content/images/2021/08/Screenshot-2021-08-20-020858.png",
        title: "Let AI Cook",

        description: " Participants will be given certain themes. Using these themes, they have to come up with creative prompts/synopsis and feed those to an AI model and generate the story. They will submit the story and the best/weirdest ones shall be the winners.",
        date: "21-02-2024",
        timing: "Online Event",
        // price: "₹50",
        isFlagship: true,
        prize: "",
        ruleBookLink: "",
        url: "#",
        linkss: "https://unstop.com/p/let-ai-cook-aaftaab-indian-institute-of-technology-iit-jodhpur-902089"



      },
      {
        imageSrc: BEP,
        title: "Literary Labyrinth",

        description: " The plots of some popular movies/novels shall be worded in a tricky manner. Participants have to identify the movie/novel. The quickest to do it shall get the most points.",
        date: "21-02-2024",
        timing: "Online Event",
        // price: "₹50",
        isFlagship: true,
        prize: "",
        ruleBookLink: "",
        url: "#",
        linkss: "https://unstop.com/o/QNGZneJ?lb=HkDM9ZX"



      },

      {
        imageSrc: QT,
        title: "Quiz Trivia",

        description: " Ignite your daily quest for knowledge! Participate, answer the questions, and claim the title of the daily quiz champion.",
        date: "21-02-2024",
        timing: "Online Event",

        isFlagship: true,
        prize: "",
        ruleBookLink: "",
        url: "#",
        linkss: "https://www.instagram.com/aaftaab_iitj/"



      },
      {
        imageSrc: "https://img.theweek.in/content/dam/week/leisure/society/images/2018/11/1/mun-1.jpg",
        title: "Model United Nations",

        description: " The Akshar Sabha MUN provides an excellent platform for students to enhance their public speaking, critical thinking, and negotiation skills while fostering a deeper understanding of international relations and global challenges. It seamlessly integrates with the literary theme of Akshar, demonstrating how the power of words extends beyond creative expression to shape policies and influence world events.",
        date: "09-11-2024",
        timing: "Offline Event",

        isFlagship: true,
        prize: "",
        ruleBookLink: "",
        url: "#",
        linkss: "https://www.instagram.com/aaftaab_iitj/"



      },

      {
        imageSrc:
          "data:image/jpeg;base64,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",
        title: "Closing Ceremony",
        timing: "XX:XX AM - XX:XX PM ",
        description: "Join us as we gather for the grand finale of our literary fest, where words have woven magic and dreams have taken flight. In the glow of twilight, we'll bid adieu to this enchanting journey filled with creativity and camaraderie. Come be a part of the closing ceremony, where memories will be cherished, friendships celebrated, and stories shared. Let's raise our glasses to the moments we've shared and the stories yet to unfold. Your presence will add a sparkle to this final chapter of our literary extravaganza. See you there!",
        date: "21-02-2024",
        timing: "9:00PM onwards   ",
        price: "₹50",
        isFlagship: true,
        prize: "",
        ruleBookLink: "",
        url: "#"



      }
    ],

  }
}) => {

  const tabsKeys = Object.keys(tabs);
  const [activeTab, setActiveTab] = useState(tabsKeys[0]);


  return (
    <Container>
      <ContentWithPaddingXl>
        <HeaderRow>
          <Header>{heading}</Header>

        </HeaderRow>

        {/* Online events */}
        {/* <div style={{ alignItems: 'center', paddingLeft: '4px', paddingRight: '4px' }}>
          <HeaderRow>
            <SubHeader>Online Events</SubHeader>
          </HeaderRow>
          <TabContent>
            {tabs[activeTab].map((card, index) => (
              card.timing === "Online Event" && (
                <CardContainer key={index} whileHover={{ scale: 1.05 }}>

                  <Link to={{
                    pathname: "/eventDetails",
                    search: `?name=${card.title}`,
                    state: card
                  }}>
                    <Card className="group" href={card.url} initial="rest" whileHover={{ scale: 1.1 }} animate="rest">
                      <CardImageContainer imageSrc={card.imageSrc}>

                      </CardImageContainer>
                      <CardText>

                        <CardTitle>
                          {card.title.split(' (')[0]}
                          <br />
                          {card.title.includes('(') && card.title.split(' (')[1] !== undefined && (
                            "(" + card.title.split(' (')[1]
                          )}
                        </CardTitle>

                        {<CardContent>{card.date}</CardContent>}
                        <CardContent>{card.timing}</CardContent>


                      </CardText>
                    </Card>
                  </Link>
                </CardContainer>
              )
            ))}
          </TabContent>
        </div> */}

        {/* Offline events */}
        <div>
          <HeaderRow>
            <SubHeader>Offline Event</SubHeader>
          </HeaderRow>
          <TabContent>
            {tabs[activeTab].map((card, index) => (
              card.title == "Model United Nations" && (
                <CardContainer key={index} whileHover={{ scale: 1.05 }}>
                  {/* <Link to="/eventDetails" state={card}> */}
                  <Link to={{
                    pathname: "/eventDetails",
                    search: `?name=${card.title}`,
                    state: card
                  }}>
                    {console.log(card)}
                    <Card className="group" href={card.url} initial="rest" whileHover={{ scale: 1.1 }} animate="rest">
                      <CardImageContainer imageSrc={card.imageSrc}>


                      </CardImageContainer>
                      <CardText>
                      <CardTitle>
                          {card.title.split(' (')[0]}
                          <br />
                          {card.title.includes('(') && card.title.split(' (')[1] !== undefined && (
                            "(" + card.title.split(' (')[1]
                          )}
                        </CardTitle>
                        {<CardContent>{card.date}</CardContent>}
                        <CardContent>{card.timing}</CardContent>

                        {/* {card.price ? <CardPrice>{card.price}</CardPrice> : null} */}
                      </CardText>
                    </Card>
                  </Link>
                </CardContainer>
              )
            ))}
          </TabContent>
        </div>
        
      </ContentWithPaddingXl>
    </Container>
    
  );
};