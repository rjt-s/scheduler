import  {useState, useEffect} from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers : {}
  });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
    .put(`/api/appointments/${id}`, {
      interview
    })
    .then((response) => {
      setState({
        ...state,
        appointments,
        days : updateSpots(appointments)
      })
    })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview : null
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios
    .delete(`/api/appointments/${id}`)
    .then((response) => {
      setState({
        ...state,
        appointments,
        days : updateSpots(appointments)
      })
    })
  }

  function updateSpots(appointments) {
    let updateDays = [];
    state.days.forEach((day) => {
      let spots = 0;
      for(let appointment of day.appointments){
        if(!appointments[appointment].interview){
          spots++;
        }
      }
      updateDays.push({...day, spots})
    })
    return updateDays;
  }

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      // set your states here with the correct values...
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, []);

  return {state, setDay, bookInterview, cancelInterview };
}
