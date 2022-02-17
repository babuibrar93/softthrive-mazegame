import React, { useState, useRef, useEffect } from "react";
import DraggableCore from "react-draggable";
import ball from "../../assets/WelcomePageBall.png";
import mazeJson from "./maze";
import "../../styles/PagesStyles/MazeGame/mazegame.css";

const MazeGame = () => {
  let ref = useRef();
  let [ballPosition, setBallPosition] = useState({ x: 0, y: 15 });
  //let myRef = React.createRef();
  let [smallBallPosition, setSmallBallPosition] = useState({ a: 0, b: 0 });
  const [disabled] = useState(false);
  let [img, setImage] = useState(ref);
  let [count, setCount] = useState(0);

  let json = Object.entries(mazeJson.layout)
  let [mazeJs, setMazeJs] = useState(json)

  console.log("mazeJs", mazeJs);

  console.log("smallBallPosition", smallBallPosition);
  let x;
  let y;
  let a;
  let b;
   const imageClick = (e) => {
    if (!ref.current) return;

    let offset = img.current.getBoundingClientRect();
    x = Math.abs(Math.round(e.pageX - offset.left));
    y = Math.abs(Math.round(e.pageY - offset.top));

     console.log("Ball X", x);
     console.log("Ball Y", y);
    setBallPosition({ x, y });
    handleOnDrop();
  };

  const DraggableEventHandler = (e) => {
   
    if (!ref.current) return;

    let offset = img.current.getBoundingClientRect();
    x = Math.abs(Math.round(e.pageX - offset.left));
    y = Math.abs(Math.round(e.pageY - offset.top));

    console.log("Ball X", x);
    console.log("Ball Y", y);
    setBallPosition({ x, y });
    if (
      ballPosition.x < 200 
    ) {
      let obj = mazeJs[2][1]
      obj.hide = true
      mazeJs[2][1] = obj
      console.log(obj)
    } 
    //handleOnDrop();
  }


  const imageClick2 = (e) => {
    if (!ref.current) return;

    let offset = img.current.getBoundingClientRect();
    a = Math.abs(Math.round(e.pageX - offset.left));
    b = Math.abs(Math.round(e.pageY - offset.top));

    // console.log("Coin X", a);
    // console.log("Coin Y", b);
    setSmallBallPosition({ a, b });
    handleOnDrop();
  };

  const exitPosition = (e) => {
    if (
      ballPosition.x > 120 &&
      ballPosition.x < 160 &&
      ballPosition.y > 1 &&
      ballPosition.y < 50
    ) {
      console.log("Ball Reached End");
    }
  };
  exitPosition();
  // mazeJson.layout.map((positions, index) => {
  //   // console.log("positions", positions.coin);
  //   if (positions.coin === true) {
  //     console.log("index", index);
  //   }
  // });

  // console.log("hey coin", mazeJs[7][1]);
  const handleOnDrop = () => {
    let collapsePosition = Math.abs(ballPosition.y - smallBallPosition.b);
    if (Math.abs(collapsePosition < 10)) {
      if (
        smallBallPosition.a < 230 &&
        smallBallPosition.a > 170 &&
        smallBallPosition.b > 510 &&
        smallBallPosition.b < 650
      ) {
        mazeJs[2][1].coin = false;
        count = count + 1;
         setCount(count);
      } else if (
        smallBallPosition.a > 120 &&
        smallBallPosition.a < 165 &&
        smallBallPosition.b > 555 &&
        smallBallPosition.b < 650
      ) {
        mazeJs[7][1].coin = false;
        count = count + 1;
         setCount(count);
      } else if (
        smallBallPosition.a > 60 &&
        smallBallPosition.a < 80 &&
        smallBallPosition.b > 500 &&
        smallBallPosition.b < 565
      ) {
        mazeJs[13][1].coin = false;
        count = count + 1;
         setCount(count);
      } else if (
        smallBallPosition.a > 70 &&
        smallBallPosition.a < 90 &&
        smallBallPosition.b > 380 &&
        smallBallPosition.b < 510
      ) {
        mazeJs[24][1].coin = false;
        count = count + 1;
         setCount(count);
      } else if (
        smallBallPosition.b > 300 &&
        smallBallPosition.b < 415 &&
        smallBallPosition.a > 45 &&
        smallBallPosition.a < 80
      ) {
        mazeJs[31][1].coin = false;
        count = count + 1;
         setCount(count);
      } else if (
        smallBallPosition.b > 180 &&
        smallBallPosition.b < 245 &&
        smallBallPosition.a > 230 &&
        smallBallPosition.a < 310
      ) {
        mazeJs[46][1].coin = false;
        count = count + 1;
         setCount(count);
      } else if (
        smallBallPosition.b > 50 &&
        smallBallPosition.b < 85 &&
        smallBallPosition.a > 50 &&
        smallBallPosition.a < 100
      ) {
        mazeJs[67][1].coin = false;
        count = count + 1;
         setCount(count);
      } else if (
        smallBallPosition.a > 0 &&
        smallBallPosition.a < 15 &&
        smallBallPosition.b > 0 &&
        smallBallPosition.b < 50
      ) {
        mazeJs[77][1].coin = false;
        count = count + 1;
         setCount(count);
      }
    }
  };

  // console.log("counter", count);

  // const toggleDraggable = () => {
  //   setDisabled(!disabled);
  // };

  const onStart = () => {
    setBallPosition(null);
  };

  return (
    <>
      <div style={{ background: "#0d091a" }}>
        <div className="maze_puzzle">
          <div className="maze_game">
            <h6>SO FAR WELL DONE!</h6>
            <p className="maze_paragraph">
              Now you will play a short series of mazes.<br></br>
              Try to complete the maze according to the instructions as{" "}
              <br></br>
              quickly as possible and in as few steps as possible
            </p>
          </div>

          <div className="maze_scroll">
            <h4>SCROLL DOWN TO START</h4>
            <a href="#bottom">
              <p className="maze_icon">\/</p>
            </a>
          </div>
          <div className="Message">
            <h1>Please, Open in desktop</h1>
          </div>
        </div>

        <div className="maze_collect" id="bottom">
          <div className="first_column">
            <div className="progressbar_section">
              <div className="first_quater">
                <div className="maze_warpper">
                  <div className="maze_fq_op_bar">
                    <p>1</p>
                    <span className="maze_circle">{count}</span>
                    <p style={{ marginLeft: "5px" }}>STEPS</p>
                  </div>
                </div>

                <div class="header">
                  <div class="progress-container">
                    <div class="progress-bar" id="myBar"></div>
                  </div>
                </div>
              </div>
              <div className="second_quater">
                <p className="first_column_text">
                  COMPLETE THE MAZE <br />
                  BY COLLECTING AT LEAST <br />
                  ONE COIN
                </p>
              </div>
            </div>
          </div>

          <div className="second_column">
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
              }}
            >
              <DraggableCore disabled={disabled} bounds="parent" onDrag= {DraggableEventHandler}  >
                <div
                  className={!disabled ? "draggable" : null}
                  style={{
                    width: 30,
                    backfaceVisibility: "green",
                  }}
                >
                  <img
                    id="ball"
                    alt="Ball"
                    className="Ball"
                    onMouseEnter={imageClick}
                     onDrop={handleOnDrop}
                    //ref={myRef}
                    src={ball}
                  />
                </div>
              </DraggableCore>

              {mazeJs.map((data) => {
                
                if (data[0] % 3 === 0) {
                  return (
                    <>
                      {data[1]["coin"] === true?  (
                        <img
                          alt="coin"
                          
                          
                          className={data[1]["hide"]===true? "smallBallsHidden" : "smallBalls"}
                          onMouseEnter={imageClick2}
                          // onDrop={handleOnDrop}
                          ref={img}
                          src={ball}
                          
                        />
                      ) : null}

                      <div
                        className="borderShape"
                        key={data[0]}
                        style={{
                          borderLeft:
                            data[1]["borderL"] === true
                              ? `5px solid rgb(135, 185, 135)`
                              : "",
                          borderRight:
                            data[1]["borderR"] === true
                              ? `5px solid rgb(135, 185, 135)`
                              : "",
                          borderBottom:
                            data[1]["borderB"] === true
                              ? `5px solid rgb(135, 185, 135)`
                              : "",
                          borderTop:
                            data[1]["borderT"] === true
                              ? `5px solid rgb(135, 185, 135)`
                              : "",
                        }}
                      ></div>
                    </>
                  );
                } else if (data[0] % 2 === 0) {
                  return (
                    <>
                      {data[1]["coin"] === true ? (
                        <img
                          alt="coin"
                          className={data[1]["hide"]===true? "smallBallsHidden" : "smallBalls"}
                          // style={{
                          //   display: data[1]["hide"]=== true? "none" : "block"
                          // }}
                          //className="smallBallsHidden"
                          onMouseEnter={imageClick2}
                          // onDrop={handleOnDrop}
                          ref={img}
                          src={ball}
                        />
                      ) : null}

                      <div
                        className="borderShape"
                        key={data[0]}
                        style={{
                          borderLeft:
                            data[1]["borderL"] === true
                              ? `5px solid #7953e0`
                              : "",
                          borderRight:
                            data[1]["borderR"] === true
                              ? `5px solid #7953e0`
                              : "",
                          borderBottom:
                            data[1]["borderB"] === true
                              ? `5px solid #7953e0`
                              : "",
                          borderTop:
                            data[1]["borderT"] === true
                              ? `5px solid #7953e0`
                              : "",
                        }}
                      ></div>
                    </>
                  );
                } else {
                  return (
                    <>
                      {data[1]["coin"] === true ? (
                        <img
                          alt="coin"
                          className={data[1]["hide"]===true? "smallBallsHidden" : "smallBalls"}
                          onMouseEnter={imageClick2}
                          // onDrop={handleOnDrop}
                          ref={img}
                          src={ball}
                        />
                      ) : null}

                      <div
                        className="borderShape"
                        key={data[0]}
                        style={{
                          borderLeft:
                            data[1]["borderL"] === true
                              ? `5px solid purple`
                              : "",
                          borderRight:
                            data[1]["borderR"] === true
                              ? `5px solid purple`
                              : "",
                          borderBottom:
                            data[1]["borderB"] === true
                              ? `5px solid purple`
                              : "",
                          borderTop:
                            data[1]["borderT"] === true
                              ? `5px solid purple`
                              : "",
                        }}
                      ></div>
                    </>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MazeGame;
