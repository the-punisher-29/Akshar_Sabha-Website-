import AnimationRevealPage from "helpers/AnimationRevealPage";
import React, { Component } from "react";
import Header from "components/headers/light.js";
import TeamCard from "components/cards/Team-Teams-Card";
import Footer from "components/footers/Home-Footer";
 
import { ReactComponent as EmailIcon } from "images/email-envelope.svg";
import { ReactComponent as LinkedinIcon } from "images/linkedin-icon.svg";
import { ReactComponent as GithubIcon } from "images/github-icon.svg";
import { ReactComponent as InstagramIcon } from "images/icons8-instagram.svg";

import { Link } from "react-router-dom/cjs/react-router-dom.min";
import a from '../images/team/varshit.jpeg';
import b from '../images/team/SriGanesh.jpg';
import a2 from '../images/team/atharva.jpg';
import a3 from '../images/Harsh Agarwal .jpg';
import a4 from '../images/team/avichal.jpg';
import c from '../images/team/soumen.jpg';

function Team() {
  const team4 = {
    heading: "Web Development Team",
    description: "Meet our passionate team dedicated to web development.",
    cards: [
      // Head Members
      {
        imageSrc: a,
        position:"Head",
        name: "Varshit Manikanta",
        links: [
          {
            url: "https://www.instagram.com/varshit_manikanta/",
            icon: InstagramIcon,
          },
 
          {
            mail: "b22ai038@iitj.ac.in",
            icon: EmailIcon
          },
          {
            url: "https://www.linkedin.com/in/varshit-manikanta-079b65255/",
            icon: LinkedinIcon,
          },
          
        ],
      },
      {
        imageSrc: b,
        position: "Head",
        name: "Sri Ganesh Thota",
        links: [
          {
            url: "https://www.instagram.com/tsg_the_greatest/",
            icon: InstagramIcon,
          },
 
          {
            mail: "b22cs054@iitj.ac.in",
            icon: EmailIcon
          },
          {
            url: "https://www.linkedin.com/in/sri-ganesh-thota-687a12256/",
            icon: LinkedinIcon,
          },
          
        ],
      },
      {
        imageSrc: c,
        position: "Head",
        name: "Soumen Kumar",
        links: [
          {
            url: "https://www.instagram.com/soumen_kr/",
            icon: InstagramIcon,
          },
          {
            mail: "b22es006@iitj.ac.in",
            icon: EmailIcon,
          },
          {
            url: "https://www.linkedin.com/in/soumen2919/",
            icon: LinkedinIcon,
          },
        ],
      }
      
      // Add more team members here following the same structure
    ],

    // cards_ah:[
    //   {
    //     imageSrc: c,
    //     position: "Assistant Head",
    //     name: "Gayathiri B.S",
    //     links: [
    //       {
    //         url: "https://www.instagram.com/reshsha08?igsh=eHF1ZnAyMzV0ZHVo",
    //         icon: InstagramIcon,
    //       },
 
    //       {
    //         mail: "b22ee017@iitj.ac.in ",
    //         icon: EmailIcon
    //       },
    //       {
    //         url: "https://www.linkedin.com/in/gayathiri-b-s-398470236",
    //         icon: LinkedinIcon,
    //       },
    //     ]
            
    //   },      
    //   {
    //     imageSrc: d,
    //     position: "Assistant Head",
    //     name: "Swaksh Patwari",
    //     links: [
    //       {
    //         url: "http://www.instagram.com/swakshpatwari",
    //         icon: InstagramIcon,
    //       },
 
    //       {
    //         mail: "b22ai065@iitj.ac.in",
    //         icon: EmailIcon
    //       },
    //       {
    //         url: "https://www.linkedin.com/in/swaksh-patwari-0aa891276?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    //         icon: LinkedinIcon,
    //       },
          
    //     ],
    //   },
 
    //   {
    //     imageSrc: e,
    //     position: "Assistant Head",
    //     name: "Indusri Siramsetty",
    //     links: [
    //       {
    //         url: "https://www.instagram.com/indusri_siramsetty?igsh=MXIzdDRkN2xtZ2Fs",
    //         icon: InstagramIcon,
    //       },
 
    //       {
    //         mail: "b22ai039@iitj.ac.in",
    //         icon: EmailIcon
    //       },
    //       {
    //         url: "https://www.linkedin.com/in/indusri-siramsetty-ab6597272",
    //         icon: LinkedinIcon,
    //       },
          
    //     ],
    //   },
    //   {
    //     imageSrc: f,
    //     position: "Assistant Head",
    //     name: "Mandari Shirisha",
    //     links: [
    //       {
    //         url: "https://www.instagram.com/hayathi_333?igsh=ZjB1MXIzd2g5bTh6",
    //         icon: InstagramIcon,
    //       },
 
    //       {
    //         mail: "b22bb025@iitj.ac.in",
    //         icon: EmailIcon
    //       },
    //       {
    //         url: "https://www.linkedin.com/in/shirisha-mandari-119bba26a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    //         icon: LinkedinIcon,
    //       },
          
    //     ],
    //   },      
    // ]
  };
  
  const team0 = {
    heading: "Festival Chiefs",
  
    cards: [
      {
        imageSrc:a2,     
        name: "A.K.R Deshpande",
        position: "",
        links: [
          {
            url: "https://www.instagram.com/a.k.r.deshpande/",
            icon: InstagramIcon,
          },
 
          {
            mail: "b22ee013@iitj.ac.in",
            icon: EmailIcon
          },
          {
            url: "https://in.linkedin.com/in/a-k-r-deshpande-078bab252",
            icon: LinkedinIcon
          }
        
          
        ],
      },
      {
        imageSrc: a3,
        name: "Harsh Agarwal",
        position: "",
        links: [
          {
            url: "https://www.instagram.com/harsh_ag_7.iitj/",
            icon: InstagramIcon,
          },
          {
            mail: "b22mt019@iitj.ac.in",
            icon: EmailIcon
          },
          {
            url: "https://www.linkedin.com/in/harsh-agarwal-5a5911255?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
            icon: LinkedinIcon
          }
          
         
        ],
      },
      {
        imageSrc: a4,
        name: "Avichal Sinha",
        position: "",
        links: [
          {
            url: "https://www.instagram.com/avichal_sinha/profilecard/?igsh=dDA0bnJ6MnhidWxl",
            icon: InstagramIcon,
          },
          {
            mail: "b22ch004@iitj.ac.in",
            icon: EmailIcon
          },
          {
            url: "https://www.linkedin.com/in/avichal-sinha-22854020b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
            icon: LinkedinIcon
          }
          
        ],
      },
    ],
  };

 
  
  return (
    <AnimationRevealPage>
      <Header color="orange" />

       <TeamCard heading={team0.heading}
        subheading={team0.subheading}
        description={team0.description}
        cards={team0.cards}
         />

        <TeamCard heading={team4.heading}
        subheading={team4.subheading}
        description={team4.description}
        cards={team4.cards}
        cards_ah={team4.cards_ah} />


      <Footer />
    </AnimationRevealPage>
  );
  }

export default Team;
 
 