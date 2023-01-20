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
        appointments
      })
    })
    // .catch((error) => {
    //   console.log(error.response.status);
    // });
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
      console.log(response);
      setState({
        ...state,
        appointments
      })
    })
    // .catch((error) => {
    //   console.log(error.response.status);
    // });

  }

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      // set your states here with the correct values...
      console.log(all[1].data)
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, []);



  return {state, setDay, bookInterview, cancelInterview };
}