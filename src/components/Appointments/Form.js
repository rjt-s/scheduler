import React from "react";
import { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";


export default function Form(props) {

  const [student,setStudent] = useState(props.student || "");
  const [interviewerID, setInterviewerID] = useState(props.interviewer || null);

  const reset = () => {
    setStudent('');
    setInterviewerID(null);
  }

  const cancel = () => {
    reset()
    props.onCancel()
  }

  const save = () => {
    console.log(student,interviewerID)
    props.onSave(student,interviewerID)
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        value={student}
        onChange={(event) => setStudent(event.target.value)}
      />
    </form>
    <InterviewerList 
      /* your code goes here */
      interviewers={props.interviewers}
      interviewer={interviewerID}
      setInterviewer={setInterviewerID}
    />
    </section>
    <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={() => cancel()}>Cancel</Button>
      <Button confirm onClick={() => save()}>Save</Button>
    </section>
    </section>
  </main>
  );
}