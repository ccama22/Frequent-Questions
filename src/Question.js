import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
// import ImageZoom from "react-medium-image-zoom";
// import Zoom from 'react-medium-image-zoom'
const Question = ({ title, info }) => {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <article className="question">
      <header>
        <h4>{title}</h4>
        <button className="btn" onClick={() => setShowInfo(!showInfo)}>
          {showInfo ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </button>
      </header>
      {showInfo && (
        <div>
          <p>
            {info.split(",").map((data) => {
              return <p>{data}</p>;
            })}
          </p>
        </div>
      )}
    </article>
  );
};

export default Question;
