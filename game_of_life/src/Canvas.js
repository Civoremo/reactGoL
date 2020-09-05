/** @format */

import React, { useRef, useEffect, useState } from "react";

const Canvas = (props) => {
  const { initialDraw, runCellAnimation } = props;
  const canvasRef = useRef(null);
  const [start, setStart] = useState(false);
  const [reset, setReset] = useState(false);
  const [speed, setSpeed] = useState(50);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    setStart(false);
    initialDraw(ctx, true);
    // setReset(false)

    return () => {};
  }, [initialDraw, reset]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let interval;

    const render = () => {
      // console.log(speed);
      runCellAnimation(ctx);
    };

    const draw = () => {
      if (start) {
        interval = setInterval(() => {
          render();
        }, speed);
      }
    };
    // animationFrameId = requestAnimationFrame(render);
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(interval);
    };
  }, [runCellAnimation, start, speed]);

  const speedUp = () => {
    if (speed < 550) {
      setSpeed(speed + 100);
    }
  };

  const slowDown = () => {
    if (speed > 50) {
      setSpeed(speed - 100);
    }
  };

  return (
    <div style={{ margin: "20px" }}>
      <canvas
        width={600}
        height={600}
        ref={canvasRef}
        style={{
          background: "lightgray",
          zIndex: "-1",
          // position: "absolute",
        }}
      />
      <div>
        {start ? (
          <button onClick={() => setStart(!start)}>Stop</button>
        ) : (
          <button onClick={() => setStart(!start)}>Start</button>
        )}
        {start ? (
          <button disabled={true} onClick={() => setReset(!reset)}>
            Reset
          </button>
        ) : (
          <button onClick={() => setReset(!reset)}>Reset</button>
        )}
      </div>
      <div>
        {speed <= 50 ? (
          <button disabled={true}>Faster</button>
        ) : (
          <button disabled={false} onClick={() => slowDown()}>
            Faster
          </button>
        )}
        {speed >= 550 ? (
          <button disabled={true}>Slower</button>
        ) : (
          <button disabled={false} onClick={() => speedUp()}>
            Slower
          </button>
        )}
      </div>
    </div>
  );
};

export default Canvas;
