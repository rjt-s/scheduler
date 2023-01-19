// import React, {useState} from "react";

// export default function useVisualMode(initial) {
//   const [mode, setMode] = useState(initial); 
//   const [history, setHistory] = useState([initial]);

// //code for moving forwards to the next mode 
//   const transition = (mode, replace = false) => {

// //when we transition we use push to add a top layer to history
//     if (!replace) {
//       setMode(mode)
//       history.push(mode)      
//     } else {
//       setMode(mode)
//     }
//   }
// //when we go back we use pop to peel away the top layer of history 
//   const back = () => {
//     if (history.length > 1) {
//       history.pop();
      
//       setMode(history[history.length - 1])
//     }
  
//   }
//   return { mode, transition, back };
// } 