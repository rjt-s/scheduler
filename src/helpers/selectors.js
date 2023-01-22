export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  for(let element of state.days) {
    if (element.name === day) {
      let appointments = []
      for(let item of element.appointments){
        let key = String(item);
        appointments.push(state.appointments[key]);
      }
      return appointments;
    }
  }
  return [];
}

export function getInterviewersForDay(state, day) {
  //... returns an array of interviewers for that day
  for(let element of state.days) {
    if (element.name === day) {
      let interviewers = []
      for(let item of element.interviewers){
        let key = String(item);
        interviewers.push(state.interviewers[key]);
      }
      return interviewers;
    }
  }
  return [];
}


export function getInterview(state, interview) {
  if(interview) {
    const student = interview.student;
    let interviewerID = interview.interviewer;
    let interviewerObj = state.interviewers[interviewerID];
    return {'student':student, 'interviewer': interviewerObj};
  }
  return null
}
