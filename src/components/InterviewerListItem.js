import React from "react";
import "components/InterviewerListItem.scss";

import classNames from "classnames";


export default function InterviewerListItem(props) {

  let interviewClass = classNames('interviewers__item',{'interviewers__item--selected': props.selected });
  
  function Name(props) { 
    return (props.selected && <p> {props.name}</p>);
  }


  return (
  <li className={interviewClass} onClick={props.setInterviewer}>
    <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
   {Name(props)}
  </li>
  );
}

