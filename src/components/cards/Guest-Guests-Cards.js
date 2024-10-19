import React, { useState } from "react";
import AnimationRevealPage from 'helpers/AnimationRevealPage';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";
import { ReactComponent as PriceIcon } from "feather-icons/dist/icons/dollar-sign.svg";
import { ReactComponent as LocationIcon } from "feather-icons/dist/icons/map-pin.svg";
import { ReactComponent as DateIcon} from "feather-icons/dist/icons/calendar.svg";
import { ReactComponent as StarIcon } from "feather-icons/dist/icons/star.svg";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";
import kaviSammelanImg from "../../images/flagship_events/Kavi samelan.png";
import djImg from "../../images/flagship_events/DJ Night.jpg";
import musicshowImg from "../../images/flagship_events/folk_music.jfif";
import BookImg from "../../images/flagship_events/Book Signings.jpg";
import InterviewImg from "../../images/flagship_events/Interview with Director.jpg";
import StandupIMG from "../../images/flagship_events/Standup.jpg";
import TreasurehuntImg from "../../images/flagship_events/Treasure Hunt.jpg";
import WorkshopIMG from "../../images/flagship_events/Workshops.jpg";
import Maaz from '../../images/flagship_events/Maaz-Bin-Bilal.jpg'
import BEP from '../../images/BEP.jpeg'
import ali from '../../images/ali (1).png';
import anupama from '../../images/anupama (1).png';
import chandra from '../../images/chandra1.png';
import detha from '../../images/detha (1).png';
import isha from '../../images/isha (1).png';
import sheen from '../../images/sheen (1).png';
import priyanka from '../../images/priyanka (1).png';
import major from '../../images/major (1).png';
import sonya from '../../images/sonya (1).png';
import shivaprakash from '../../images/shivaprakash (1).png';


import "./Homepage-Slider.css"
import "./Guest-Guests-Cards.css"




const ControlButton = styled(PrimaryButtonBase)`
${tw`
  mt-4 sm:mt-0 first:ml-0 ml-6 rounded-full p-2 bg-black
  hocus:bg-black hocus:text-black
  focus:shadow-outline
  border-b-0
  relative
`}

background: ${({ loggedIn }) => (loggedIn ? 'linear-gradient(180deg, #000, #000)' : 'linear-gradient(180deg, #000, #000)')};
color: ${({ loggedIn }) => (loggedIn ? '#fff' : '#fff')};
border: 3px solid transparent; /* Initial border */
transition: background 0.3s, color 0.3s;

&:hover {
  background: linear-gradient(180deg, #fff, #fff);
  color: #000;
  border-color: #000;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, transparent, #fff);
    animation: waveAnimation 1s infinite alternate;
    z-index: -1;
  }
}

@keyframes waveAnimation {
  to {
    transform: scaleY(1.2);
  }
}
`;

const CardSlider = styled(Slider)` 
  ${tw`mt-16 px-4 `}
  .slick-track { 
    ${tw`flex w-full h-full`}
  }
  .slick-slide {
    ${tw`w-full h-auto flex justify-center mb-1`}
  }
  speed: 0.0001
`;

const Container = styled.div`
  ${tw`mt-20 mb-20`}
  height: 100vh; /* Adjusts container height to fit full screen */
`;

const Content = tw.div`bg-black max-w-screen-xl mx-auto py-2 lg:py-2 font-Philosopher`;

const CardImage = styled.div`
  ${({ imageSrc }) => `background-image: url("${imageSrc}");`}
  ${tw`bg-contain bg-no-repeat relative rounded sm:rounded-none`}
  width: 100%;
  height: 0;
  padding-top: 100%; /* Maintain 1:1 aspect ratio */
  max-width: 100%; /* Ensure image does not exceed container width */
  box-shadow: 0 0 15px orange;
  margin: 0 1px; /* Adjust margin as needed */
`;




// const CardSlider = styled(Slider)`
//   ${tw`mt-16 `}
//   .slick-track { 
//     ${tw`flex w-full h-full`}
//   }
//   .slick-slide {
//     ${tw`w-full h-auto flex justify-center mb-1`}
//   }
//   speed: 0.0001
// `;


// const Container = tw.div`mt-20 mb-20`;
// const Content = tw.div`max-w-screen-xl mx-auto py-2 lg:py-2 font-Philosopher`;


// const CardImage = styled.div`
  
//   ${({ imageSrc }) => `background-image: url("${imageSrc}");`}
//   ${tw`w-96 h-96 bg-contain bg-no-repeat relative rounded sm:rounded-none`}
//   box-shadow: 0 0 15px orange;

  
// `;



const TextInfo = tw.div`py-6 text-black flex-1 flex flex-col sm:px-10 sm:py-6 `;
const TitleReviewContainer = tw.div`flex flex-col sm:flex-row sm:justify-between sm:items-center text-black font-Philosopher items-center`;
const Title = tw.h5`text-2xl font-bold font-Philosopher text-center mx-auto `;

const RatingsInfo = styled.div`
  ${tw`flex items-center sm:ml-4 mt-2 sm:mt-0`}
  svg {
    ${tw`w-6 h-6 text-yellow-500 fill-current`}
  }
`;


const Description = tw.p`text-lg leading-loose mt-2 sm:mt-4 font-Philosopher text-center `;



const PrimaryButton = styled.button`

  ${tw`
  mt-auto sm:text-lg lg:mx-0 lg:px-8 lg:py-3
  px-4 py-1 font-Lato rounded-none w-full rounded 
  hocus:bg-black hocus:text-black
  focus:shadow-outline
  border-b-0
  relative
  `}
  background: ${({ loggedIn }) => (loggedIn ? 'linear-gradient(180deg, teal, teal)' : 'linear-gradient(180deg, teal, teal)')};
  color: ${({ loggedIn }) => (loggedIn ? '#fff' : '#fff')};
  border: 3px solid transparent; /* Initial border */
  transition: background 0.3s, color 0.3s;

  &:hover {
    background: linear-gradient(180deg, white, #90EE90);
    color: #006400; 
    border-color: #90EE90;

    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(180deg, transparent, #fff);
      animation: waveAnimation 1s infinite alternate;
      z-index: -1;
    }
  }

  @keyframes waveAnimation {
    to {
      transform: scaleY(1.2);
    }
  }
`;

export default () => {
  // useState is used instead of useRef below because we want to re-render when sliderRef becomes available (not null)
  const [sliderRef, setSliderRef] = useState(null);
  let direction = 'left'; // Initial direction

  const sliderSettings = {
    arrows: true,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true, // Enable infinite loop
    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          arrows: false, // Hide arrows on larger screens
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false, // Hide arrows on smaller screens
          slidesToShow: 1,
        }
      },
    ],
  beforeChange: (_, next) => {
    if (next === 0) {
      direction = direction === 'left' ? 'right' : 'left'; // Toggle direction
    }
  },
  rtl: direction === 'right', // Set RTL based on direction
  swipeToSlide: true, 
};

  const titleSettings = {
    
    responsive: [
      
      {
        breakpoint: 768,
        settings: {
          fontSize: '200px',
          fontWeight: 'bold',
          
        }
      },
    ],
  
  };


  /* Change this according to your needs */
  const cards= [
      {
        imageSrc:ali,
        title: "Opening Ceremony",
        description: "The opening ceremony is a grand kickoff event that marks the beginning of a significant occasion or gathering. It sets the tone and spirit for what's to come, often featuring speeches, performances, and symbolic gestures. Attendees gather to witness and celebrate the start of the event, fostering anticipation and excitement. It's a moment of unity, where participants come together to embark on a shared journey or experience.",
        date: "21-02-2024",
        timing: "8:30AM onwards",
        // price: "₹50",
        isFlagship: true,
        prize: "",
        ruleBookLink: "",
        url: "#"
      },
      {
        imageSrc:anupama,
        title: "Let AI Cook",
       
        description: " Participants will be given certain themes. Using these themes, they have to come up with creative prompts/synopsis and feed those to an AI model and generate the story. They will submit the story and the best/weirdest ones shall be the winners.",
        date: "21-02-2024",
        timing: "Online Event",
        // price: "₹50",
        isFlagship: true,
        prize: "",
        ruleBookLink: "",
        url: "#"
      
   
  
      },

      {
        imageSrc:chandra,
        title: "Bad Explained Plots",
       
        description: " The plots of some popular movies/novels shall be worded in a tricky manner. Participants have to identify the movie/novel. The quickest to do it shall get the most points.",
        date: "21-02-2024",
        timing: "Online Event",
        // price: "₹50",
        isFlagship: true,
        prize: "",
        ruleBookLink: "",
        url: "#"
      
   
  
      },
      
      {
        imageSrc:detha,
        title: "Panel Discussion",
        description: "Panel discussions gather experts to explore topics, led by a moderator, in a collaborative setting. Diverse insights and solutions are shared, enhancing understanding, while audience engagement enriches the conversation. The aim is to inform, educate, and provoke thoughtful discussion, fostering deeper insight into complex issues and driving meaningful change.",
        date: "21-02-2024",
        timing: "9:15AM onwards",
        // price: "₹50",
        isFlagship: true,
        prize: "",
        ruleBookLink: "",
        url: "#",
      },
      
      {
        imageSrc:isha,
        title: "General Quiz",
        description: "Unearth the treasures of culture in this captivating quiz that promises to transport its participants through our rich history of heritage and traditions. Get ready to flex your quiz muscles and test your intellect in this exciting quiz spear-headed by QM Major Chandrakant Nair!",
        date: "21-02-2024",
        timing: "11:00AM onwards",
        // price: "₹50",
        isFlagship: true,
        prize: "",
        ruleBookLink: "",
        url: "#"
      },
      
      
      

      {
        //imageSrc:
        // musicshowImg,
        imageSrc: sheen,
        title: "Prose Panorama",
        description: "  With clocks ticking and a challenging word limit, unleash your narrative prowess in Aaftaab’s Story Writing content! Dip your quill into the inkwell of imagination, let the words build worlds and craft a literary masterpiece!",
        date: "21-02-2024",
        timing: "11:00AM onwards",
        // price: "₹50",
        isFlagship: true,
        prize: "",
        ruleBookLink: "",
        url: "#"
      },
      {
        //imageSrc: Maaz,
         imageSrc:priyanka,
        title: "WITZKRIEG: Wordcraft War",
        date: "21-02-2024",
        timing: "2:00PM onwards",
        // price: "₹50",
        description: `Tickle your linguistic genius with a thrilling concoction of clues, riddles and quirky challenges. Harness your inner wordsmith in Aaftaab’s Word Games and brace yourself for a wordplay showdown!
        `,
        isFlagship: true,
        prize: "",
        ruleBookLink: "",
        url: "#"
      },
      
      {
        imageSrc:major,
        title: "Cryptic Chronicles",
        description: "Get challenged by riddles and clues as you navigate your way through the maze-like campus of IIT Jodhpur in Aaftaab’s Campus Hunt! Meanwhile, get ready for tasks that add a dash of creativity by making you craft captivating captions for scenic snapshots along the way.",
        date: "21-02-2024",
        timing: "3:30PM onwards",
        // price: "₹50",
        isFlagship: true,
        prize: "",
        ruleBookLink: "",
        url: "#"
      },
      {
        imageSrc:sonya,
        title: "JAM-inate : Expressive Minute Mosaic",
        date: "21-02-2024",
        timing: "04:00 PM onwards",
        description: `Grab the mic, unleash your spontaneity, and embark on a whirlwind of wit and words. Participate in Aaftaab’s JAM: Just a Minute, and challenge your wit with a random topic and a minute to talk!`,
        // price: "₹50",
        isFlagship: true,
        prize: "",
        ruleBookLink: "",
        url: "#"
      },
      
      {
        imageSrc:shivaprakash ,
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
 
    ];
    

    
     
     
      
   
      
      

  

  return (
    <Container>
      <AnimationRevealPage >

       
        <CardSlider ref={setSliderRef} {...sliderSettings}>
          {cards.map((card, index) => (
            <div className="Card" key={index}>

              <CardImage imageSrc={card.imageSrc} />
             
       
            </div>
          ))}
        </CardSlider>
      </AnimationRevealPage>

      
    </Container>
  );
};


