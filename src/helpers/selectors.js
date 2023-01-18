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

export function getInterview(state, interview) {
  if(interview) {
    const student = interview.student;
    let interviewerID = interview.interviewer;
    console.log('interviewers',state.interviewers);
    console.log('interview',interview);
    let interviewerObj = state.interviewers[interviewerID];
    console.log(interviewerObj);
    return {'student':student, 'interviewer': interviewerObj};
  }
  return null
}