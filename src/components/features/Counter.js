import React, { useState, useEffect } from "react";
import './Counter.css'

function Counter() {
    const [event, setEvent] = useState(-1);
    const [footfall, setFootFall] = useState(-1);
    const [pw, setPW] = useState(-1);

    useEffect(() => {
      let intervalId1;
      let intervalId2;
      let intervalId3;
  
      const increaseEventValue1 = () => {
          intervalId1 = setInterval(() => {
              setEvent((prevEvent) => {
                  const nextEvent = prevEvent + 1;
                  if (nextEvent >= 15) {
                      clearInterval(intervalId1); // Clear interval temporarily
                      setTimeout(() => {
                          setEvent(0); // Reset counter to 0
                          increaseEventValue1(); // Restart counting loop after 1 second pause
                      }, 2000);
                      return 15; // Ensure the counter stays at 14 during the pause
                  } else {
                      return nextEvent; // Continue incrementing normally
                  }
              });
          }, 80);
      };
  
      increaseEventValue1();
  
      const increaseEventValue2 = () => {
          intervalId2 = setInterval(() => {
              setFootFall((prevEvent) => {
                  const nextEvent = prevEvent + 1;
                  if (nextEvent >= 200) {
                      clearInterval(intervalId2); // Clear interval temporarily
                      setTimeout(() => {
                          setFootFall(0); // Reset counter to 0
                          increaseEventValue2(); 
                      }, 3000);
                      return 200; // Ensure the counter stays at 100 during the pause
                  } else {
                      return nextEvent; // Continue incrementing normally
                  }
              });
          }, 10);
      };
  
      increaseEventValue2();
  
      const increaseEventValue3 = () => {
          intervalId3 = setInterval(() => {
              setPW((prevEvent) => {
                  const nextEvent = prevEvent + 1;
                  if (nextEvent >= 100) {
                      clearInterval(intervalId3); // Clear interval temporarily
                      setTimeout(() => {
                          setPW(0); // Reset counter to 0
                          increaseEventValue3(); // Restart counting loop after 4.2 second pause
                      }, 3000);
                      return 100; // Ensure the counter stays at 100 during the pause
                  } else {
                      return nextEvent; // Continue incrementing normally
                  }
              });
          }, 30);
      };
  
      increaseEventValue3();
  
      return () => {
          clearInterval(intervalId1);
          clearInterval(intervalId2);
          clearInterval(intervalId3);
      };
  }, []);
  

    return (
        <div className="boxes">
            <div
              style={{
                width: "310px",
                maxWidth: "310px",
                height: "100px",
                margin: "0 auto",
                backgroundColor: "white",
                borderRadius: "10px",
                boxShadow: "0px 0px 15px teal",
                padding: "15px",
                fontFamily: "Philosopher, sans-serif",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "30px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <h1 style={{ fontSize: "1.5em", marginBottom: "6px" }}>
                  <span style={{ fontSize: "0.7em" }}>Events : </span>
                  {event}
                </h1>
                
              </div>
            </div>


            <div
              style={{
                width: "310px",
                maxWidth: "310px",
                height: "100px",
                margin: "0 auto",
                backgroundColor: "white",
                borderRadius: "10px",
                boxShadow: "0px 0px 15px teal",
                padding: "15px",
                fontFamily: "Philosopher, sans-serif",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "30px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <h1 style={{ fontSize: "1.5em", marginBottom: "6px" }}>
                  <span style={{ fontSize: "0.7em" }}>Footfall : </span>
                  {footfall}
                </h1>
                
              </div>
            </div>

            <div
              style={{
                width: "310px",
                maxWidth: "310px",
                height: "100px",
                margin: "0 auto",
                backgroundColor: "white",
                borderRadius: "10px",
                boxShadow: "0px 0px 15px teal",
                padding: "15px",
                fontFamily: "Philosopher, sans-serif",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "30px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <h1 style={{ fontSize: "1.5em", marginBottom: "6px" }}>
                  <span style={{ fontSize: "0.7em" }}>Prize Worth : </span>
                  {pw}K
                </h1>
               
                  
              </div>
            </div>
        </div>
    );
}

export default Counter;
