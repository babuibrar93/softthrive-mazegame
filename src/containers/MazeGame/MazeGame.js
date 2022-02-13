import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import ball from "../../assets/WelcomePageBall.png";
import mazeJson from "./maze";
import "../../styles/PagesStyles/MazeGame/mazegame.css";

const MazeGame = () => {
  let ref = useRef();
  let [ballPosition, setBallPosition] = useState({ x: 0, y: 15 });
  let [smallBallPosition, setSmallBallPosition] = useState({ a: 0, b: 0 });
  const [disabled, setDisabled] = useState(false);
  let [img, setImage] = useState(ref);
  let [count, setCount] = useState(0);

  // console.log("ball position", ballPosition);
  // console.log("smallBallPosition", smallBallPosition);
  let x;
  let y;
  let a;
  let b;
  const imageClick = (e) => {
    let offset = img.current.getBoundingClientRect();
    x = Math.abs(Math.round(e.pageX - offset.left));
    y = Math.abs(Math.round(e.pageY - offset.top));

    // console.log("Ball X", x);
    // console.log("Ball Y", y);
    setBallPosition({ x, y });
    handleOnDrop();
  };

  const imageClick2 = (e) => {
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

  // console.log("hey coin", Object.entries(mazeJson.layout)[7][1]);
  const handleOnDrop = () => {
    let collapsePosition = Math.abs(ballPosition.y - smallBallPosition.b);
    if (Math.abs(collapsePosition < 10)) {
      if (
        smallBallPosition.a < 220 &&
        smallBallPosition.a > 200 &&
        smallBallPosition.b > 580 &&
        smallBallPosition.b < 650
      ) {
        Object.entries(mazeJson.layout)[2][1].coin = false;
        count = count + 1;
        return setCount(count);
      } else if (
        smallBallPosition.a > 142 &&
        smallBallPosition.a < 165 &&
        smallBallPosition.b > 585 &&
        smallBallPosition.b < 650
      ) {
        Object.entries(mazeJson.layout)[7][1].coin = false;
        count = count + 1;
        return setCount(count);
      } else if (
        smallBallPosition.a > 60 &&
        smallBallPosition.a < 75 &&
        smallBallPosition.b > 500 &&
        smallBallPosition.b < 565
      ) {
        Object.entries(mazeJson.layout)[13][1].coin = false;
        count = count + 1;
        return setCount(count);
      } else if (
        smallBallPosition.b > 370 &&
        smallBallPosition.a < 565 &&
        smallBallPosition.a > 140 &&
        smallBallPosition.a < 160
      ) {
        Object.entries(mazeJson.layout)[16][1].coin = false;
        count = count + 1;
        return setCount(count);
      } else if (
        smallBallPosition.a > 70 &&
        smallBallPosition.a < 85 &&
        smallBallPosition.b > 460 &&
        smallBallPosition.b < 550
      ) {
        Object.entries(mazeJson.layout)[24][1].coin = false;
        count = count + 1;
        return setCount(count);
      } else if (
        smallBallPosition.b > 350 &&
        smallBallPosition.b < 415 &&
        smallBallPosition.a > 55 &&
        smallBallPosition.a < 75
      ) {
        Object.entries(mazeJson.layout)[31][1].coin = false;
        count = count + 1;
        return setCount(count);
      } else if (
        smallBallPosition.b > 65 &&
        smallBallPosition.b < 80 &&
        smallBallPosition.a > 50 &&
        smallBallPosition.a < 100
      ) {
        Object.entries(mazeJson.layout)[67][1].coin = false;
        count = count + 1;
        return setCount(count);
      } else if (
        smallBallPosition.a > 0 &&
        smallBallPosition.a < 15 &&
        smallBallPosition.b > 0 &&
        smallBallPosition.b < 50
      ) {
        Object.entries(mazeJson.layout)[77][1].coin = false;
        count = count + 1;
        return setCount(count);
      }
    }
  };

  // console.log("counter", count);

  const toggleDraggable = () => {
    setDisabled(!disabled);
  };

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
              <Draggable disabled={disabled} bounds="parent" {...onStart}>
                <div
                  className={!disabled ? "draggable" : null}
                  style={{
                    width: 30,
                    backfaceVisibility: "green",
                  }}
                >
                  <img
                    id="ball"
                    className="Ball"
                    onMouseEnter={imageClick}
                    onDrop={handleOnDrop}
                    ref={img}
                    src={ball}
                  />
                </div>
              </Draggable>

              {Object.entries(mazeJson.layout).map((data) => {
                // console.log("hey", data);
                if (data[0] % 3 === 0) {
                  return (
                    <>
                      {data[1]["coin"] === true ? (
                        <img
                          className="smallBalls"
                          onMouseEnter={imageClick2}
                          onDrop={handleOnDrop}
                          ref={img}
                          src={ball}
                          onChange={(e) => setImage(e.target.onMouseEnter)}
                        />
                      ) : null}

                      <div
                        className="borderShape"
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
                          className="smallBalls"
                          onMouseEnter={imageClick2}
                          onDrop={handleOnDrop}
                          ref={img}
                          src={ball}
                        />
                      ) : null}

                      <div
                        className="borderShape"
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
                          className="smallBalls"
                          onMouseEnter={imageClick2}
                          onDrop={handleOnDrop}
                          ref={img}
                          src={ball}
                        />
                      ) : null}

                      <div
                        className="borderShape"
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
