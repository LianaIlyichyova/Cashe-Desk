import React from "react";

 
export default function PopUp (props) {
    return (
        <div className="popup-box">
          <div className="box">
            <span className="close-icon" onClick={props.handleClose}>x</span>
            {props.content}
          </div>
        </div>
      );
}