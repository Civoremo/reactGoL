/** @format */

import React, { useRef, useEffect, useState } from "react";

const Canvas = (props) => {
  const { initialDraw, runCellAnimation } = props;
  const canvasRef = useRef(null);
  const [start, setStart] = useState(false);
  const [reset, setReset] = useState(false);

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

    const render = () => {
      runCellAnimation(ctx);
      animationFrameId = requestAnimationFrame(render);
    };
    if (start) {
      render();
    }

    // const render = () => {
    //   runCellAnimation(ctx);
    // };
    // if (start) {
    //   let interval = setInterval(render, 300);
    // }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [runCellAnimation, start]);

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
    </div>
  );
};

export default Canvas;
