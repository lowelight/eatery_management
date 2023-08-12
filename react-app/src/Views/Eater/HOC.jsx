import React from "react";

export default function HOC(Component, idName) {
  const colorType = {
    home: "from-white to-pink-50 from-50% to-50% bg-gradient-to-b",
    menu: "bg-orange-100 bg-[url('assets/menu.jpg')] bg-contain bg-center bg-no-repeat bg-blend-multiply", //photo
    book: "bg-amber-100",
    review:
      "bg-violet-200 bg-[url('assets/Eatery_UPD.png')] bg-contain bg-right-top bg-no-repeat bg-blend-multiply",
  };
  return function (props) {
    return (
      <div
        key={idName}
        className={`transition-transform ${colorType[idName]} w-screen h-screen overflow-hidden text-black `}
      >
        <span id={idName} className=" hash-span">
          &nbsp;
        </span>
        <Component props={props} />
      </div>
    );
  };
}
