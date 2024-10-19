import React from "react";
import tw from "twin.macro";
import { motion } from "framer-motion";
import useInView from "@owaiswiz/use-in-view";
import demoimage from "../images/bgg-blur.png"; // Adjust the path accordingl bg--contain

const StyledDiv = tw.div`
  font-display min-h-screen text-secondary-500 px-1 py-8 sm:px-4 lg:px-8 overflow-hidden
  bg-img1 bg-cover bg-no-repeat ml-4 mr-24
`;


function AnimationReveal({ disabled, children }) {
  if (disabled) {
    return <>{children}</>;
  }

  if (!Array.isArray(children)) children = [children];

  const directions = ["left", "right"];
  const childrenWithAnimation = children.map((child, i) => {
    if (i === 0 || i === children.length - 1) {
      return <React.Fragment key={i}>{child}</React.Fragment>;
    }
    return (
      <AnimatedSlideInComponent
        key={i}
        direction={directions[(i + 1) % directions.length]}
      >
        {child}
      </AnimatedSlideInComponent>
    );
  });
  return (
    <>
      {childrenWithAnimation}
    </>
  );
}

function AnimatedSlideInComponent({ direction = "left", offset = 30, children }) {
  const [ref, inView] = useInView(30);

  const x = { initial: direction === "left" ? "-150%" : "150%", target: "0%" };

  return (
    <motion.section
      initial={{ x: x.initial }}
      animate={{ x: inView ? x.target : x.initial }}
      transition={{ type: "spring", damping: 19 }}
      ref={ref}
      style={{ zIndex: 1 }}
    >
      {children}
    </motion.section>
  );
}

export default function App(props) {
  return (
    <StyledDiv className="App" style={{ backgroundImage: `url(${demoimage})`,
    backgroundSize: '100vw 100%',
    }}>
      <AnimationReveal {...props} />
    </StyledDiv>
  );
}
