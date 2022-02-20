import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import ball from "../../assets/WelcomePageBall.png";
import mazeJson from "./mazejson.json";
// import mazeJson from "./maze";
import "../../styles/PagesStyles/MazeGame/mazegame.css";

const MazeGame = () => {
  let containerRef = useRef();
  let ballRef = useRef();
  let coinRef = useRef();
  let [ballPosition, setBallPosition] = useState({ x: 0, y: 0 });
  const [disabled] = useState(false);
  let [count, setCount] = useState(0);

  let [positionsArray, setPositionsArray] = useState([]);
  let [indexArray, setIndexArray] = useState([]);

  positionsArray.map((item) => {
    if (
      item?.coinPosition?.a === ballPosition?.x &&
      item?.coinPosition?.b === ballPosition?.y
    ) {
      let obj = item.coinPosition.key[1];
      obj.hide = true;
      item.coinPosition.key[1] = obj;
    }
  });

  let json = Object.entries(mazeJson.layout);
  let [mazeJs, setMazeJs] = useState(json);

  // console.log("ballPosition", ballPosition);
  // console.log("coinPosition", coinPosition);
  // console.log("positionsArray", positionsArray);
  // console.log("mazeJs", mazeJs);

  mazeJs.map((positions, index) => {
    // console.log("positions", positions[1].coin);
    if (positions[1].hide === true) {
      count = count + 1;
    }
    if (positions[1].coin === true) {
      indexArray.push(index);
    }
  });

  let x, y, a, b;
  const ballPositions = (e) => {
    if (!containerRef.current) return;

    let offset = e.target.getBoundingClientRect(); // position of ball to relative to parent container
    x = Math.abs(Math.round(e.pageX - offset.left));
    y = Math.abs(Math.round(e.pageY - offset.top));

    // console.log("Ball X", x);
    // console.log("Ball Y", y);
    setBallPosition({ x, y });
  };

  const coinPositions = (e, coinKeys) => {
    if (!containerRef.current) return;
    // console.log("coinKeys", coinKeys);
    let offset = e.target.getBoundingClientRect(); // position of coin to relative to parent container
    a = Math.abs(Math.round(e.pageX - offset.left));
    b = Math.abs(Math.round(e.pageY - offset.top));

    // console.log("Coin X", a);
    // console.log("Coin Y", b);
    positionsArray.push({
      coinPosition: {
        a: a,
        b: b,
        key: coinKeys,
      },
    });
  };

  const DraggableEventHandler = (e) => {
    if (!containerRef.current) return;

    let offset = e.target.getBoundingClientRect(); // position of ball to relative to parent container
    x = Math.abs(Math.round(e.pageX - offset.left));
    y = Math.abs(Math.round(e.pageY - offset.top));

    setBallPosition({ x, y });
  };

  const onStart = () => {
    setBallPosition(null);
  };

  const gameReachedEnd = () => {
    if (indexArray.slice(0, 7)?.length + 1 === count) {
      console.log("Game Completed");
    }
  };

  gameReachedEnd();

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

          <div className="second_column" ref={containerRef}>
            <div

            // style={{
            //   position: "absolute",
            //   width: "100%",
            //   height: "100%",
            // }}
            >
              <Draggable
                disabled={disabled}
                bounds="parent"
                {...onStart}
                onDrag={DraggableEventHandler}
              >
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
                    onMouseEnter={ballPositions}
                    ref={ballRef}
                    src={ball}
                  />
                </div>
              </Draggable>

              {Object.entries(mazeJson.layout).map((data) => {
                // console.log("hey", data[0]);
                if (data[0] % 3 === 0) {
                  return (
                    <>
                      {data[1]["coin"] === true ? (
                        <img
                          alt="coin"
                          className={
                            data[1]["hide"] === true
                              ? "smallBallsHidden"
                              : "smallBalls"
                          }
                          onMouseEnter={(e) => coinPositions(e, data)}
                          ref={coinRef}
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
                          className={
                            data[1]["hide"] === true
                              ? "smallBallsHidden"
                              : "smallBalls"
                          }
                          onMouseEnter={(e) => coinPositions(e, data)}
                          ref={coinRef}
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
                          alt="coin"
                          className={
                            data[1]["hide"] === true
                              ? "smallBallsHidden"
                              : "smallBalls"
                          }
                          onMouseEnter={(e) => coinPositions(e, data)}
                          ref={coinRef}
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
