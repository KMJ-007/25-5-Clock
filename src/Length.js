import React from "react";

export default function Length({ id,title, changeTime, type, time, formateTime,butdecid,btnincid,lengthId }) {
  return (
    <div className="length-control">
      <h3 className="title-length" id={id}>{title}</h3>
      <div className="time-set">
        <button
          id={butdecid}
          onClick={() => {
            changeTime(-1, type);
          }}
        >
          <i></i>-
        </button>
        <h3 id={lengthId}>{formateTime(time)}</h3>
        <button
          id={btnincid}
          onClick={() => {
            changeTime(1, type);
          }}
        >
          <i></i>+
        </button>
      </div>
    </div>
  );
}
