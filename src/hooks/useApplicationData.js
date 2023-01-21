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
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log(appointments,appointment)
    return axios
    .put(`/api/appointments/${id}`, {
      interview
    })
    .then((response) => {
      console.log(response);
      setState({
        ...state,
        appointments,
        days : updateSpots(appointments)
      })
    })
    // .catch((error) => {
    //   console.log(error.response.status);
    // });
  }

  function cancelInterview(id) {
    console.log(id);
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
      console.log(response);
      setState({
        ...state,
        appointments,
        days : updateSpots(appointments)
      })
    })
    // .catch((error) => {
    //   console.log(error.response.status);
    // });

  }

  function updateSpots(appointments) {
    // input arguments and output
    // should i make spots a separate state object
    // iterate over all the appointments for a particular day and set spot value equal to null counts for interview
    // output should be an updated days object
    // console.log('appointments',appointments);
    // return state.days
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
      console.log(all[1].data)
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, []);



  return {state, setDay, bookInterview, cancelInterview };
}