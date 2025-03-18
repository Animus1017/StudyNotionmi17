import React from "react";

const HighlightText = ({ text }) => {
  return (
    <span className="bg-[linear-gradient(118.19deg,#1FA2FF_-3.62%,#12D8FA_50.44%,#A6FFCB_104.51%)] bg-clip-text text-transparent">
      {text.split("\n").map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </span>
  );
};

export default HighlightText;
