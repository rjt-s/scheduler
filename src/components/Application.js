import React, {useState, useEffect} from "react";
import axios from "axios";
import Appointment from "./Appointments";
import { getAppointmentsForDay } from "helpers/selectors";
import { getInterview } from "helpers/selectors";
import { getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

import "components/Application.scss";
import DayList from "./DayList";

// const appointments = {
//   "1": {
//     id: 1,
//     time: "12pm",
//   },
//   "2": {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   "3": {
//     id: 3,
//     time: "2pm",
//   },
//   "4": {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   "5": {
//     id: 5,
//     time: "4pm",
//   }
// };

// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

export default function Application(props) {
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);
  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers : {}
  // });

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();


  const dailyAppointments =  getAppointmentsForDay(state,state.day);
  console.log(dailyAppointments);
  const interviewersList = getInterviewersForDay(state,state.day);
  console.log(interviewersList);

  // function bookInterview(id, interview) {
  //   console.log(id, interview);
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: { ...interview }
  //   };
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };
  //   console.log(appointments,appointment)
  //   return axios
  //   .put(`/api/appointments/${id}`, {
  //     interview
  //   })
  //   .then((response) => {
  //     console.log(response);
  //     setState({
  //       ...state,
  //       appointments
  //     })
  //   })
  //   // .catch((error) => {
  //   //   console.log(error.response.status);
  //   // });
  // }

  // function cancelInterview(id) {
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview : null
  //   }

  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   }

  //   return axios
  //   .delete(`/api/appointments/${id}`)
  //   .then((response) => {
  //     console.log(response);
  //     setState({
  //       ...state,
  //       appointments
  //     })
  //   })
  //   // .catch((error) => {
  //   //   console.log(error.response.status);
  //   // });

  // }

  console.log('state',state);

  // const setDay = day => setState({ ...state, day });
  // const setDays = (days) => setState(prev => ({ ...prev, days }));

  // useEffect(() => {
  //   Promise.all([
  //     axios.get('http://localhost:8001/api/days'),
  //     axios.get('http://localhost:8001/api/appointments'),
  //     axios.get('http://localhost:8001/api/interviewers')
  //   ]).then((all) => {
  //     // set your states here with the correct values...
  //     console.log(all[1].data)
  //     setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
  //   })
  // }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler"/>
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
        days={state.days}
        value={state.day}
        onChange={setDay}/>
        </nav>
        <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs"/>
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {dailyAppointments.map((appointment) => {
          const interview = getInterview(state, appointment.interview);
          return (
            <Appointment
            key={appointment.id} 
            id={appointment.id} 
            time={appointment.time} 
            interview={interview} 
            interviewers={interviewersList}
            bookInterview={bookInterview}
            cancelInterview={cancelInterview}
            />
          )
        }) }
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
