import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
const Question = ({ title, description,titleData,titleDataTutorial }) => {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <article className="question" onClick={() => setShowInfo(!showInfo)}>
      <header>
        <h4>{title}</h4>
        <button className="btn" onClick={() => setShowInfo(!showInfo)}>
          {showInfo ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </button>
      </header>
      {showInfo && (
        <div>
          <div>
            {description.split("#").map((data) => {
              return (
                <div key={data}>
                  <p>{data}</p>
                </div>
              );
            })}
          </div>
          <div className="data-link">
            {titleData !== "" &&
              (title === "¿como ver mi plan de estudio?" ? (
                <a href={titleData} target="_blank">Plan de Estudio</a>
              ) : (
                title==="¿como ver codigos de pago?"?(
                  <a href={titleData} target="_blank">Codigos de pago</a>
                ):(
                  title==="¿Como recuperar contraseña?"?(
                    <div>
                    <a href={titleData} target="_blank">3.- Ver manual</a>
                    </div>
                  ):(
                    title==="¿Como ver la escala de pago?"?(
                      <div>
                      <a href={titleData} target="_blank">1.- Ver manual</a>
                      </div>
                    ):(
                      <a>error</a>
                    )
                  )
                )
              ))
            }
          </div>
          <div className="data-link">
            {
              titleDataTutorial!=="" && (titleDataTutorial==="¿Como recuperar contraseña?"?(
                <a>gaa</a>
              ):(
                <a href={titleData} target="_blank">4.- Ver tutorial</a>
              ))
            }
          </div>
        </div>
      )}
    </article>
  );
};

export default Question;
