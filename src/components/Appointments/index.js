import React from "react";
import "components/Appointments/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from './Status';
import Confirm from "./Confirm";
import Error from "./Error";



export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const CONFIRM = 'CONFIRM';
  const EDIT = 'EDIT';
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';
  const DELETE = 'DELETING';

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);

    props
    .bookInterview(props.id,interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
  }

  function deleteInterviewPrompt(id) {
    transition(CONFIRM);
  }

  function deleteInterview(id){
    transition(DELETE, true);
    props
    .cancelInterview(id)
    .then(() => {transition(EMPTY)})
    .catch(error => transition(ERROR_DELETE, true));
  }

  function edit(){
    transition(EDIT);
  }
  
  console.log('props.interview',props.interview)
  return (
    <article className="appointment" data-testid="appointment" >
      <Header time={props.time}/>
      {mode === EMPTY && 
      <Empty onAdd={() => transition(CREATE)} 
      />}
      {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={() => deleteInterviewPrompt(props.id)}
        onEdit={() => edit()}
        />
        )}
       {mode === CREATE && 
       <Form
        interviewers = {props.interviewers}
        onCancel={() => back()}
        onSave={save}
       />}
        {mode === SAVING && 
       <Status
          message={'SAVING'}
       />}
       {mode === CONFIRM && 
       <Confirm
        onCancel={() => back()}
        onConfirm={() => deleteInterview(props.id)}
       />}
       {mode === EDIT && 
       <Form
        student = {props.interview.student}
        interviewers = {props.interviewers}
        interviewer={props.interview.interviewer.id}
        onCancel={() => back()}
        onSave={save}
       />}
       {mode === ERROR_SAVE && 
       <Error
          message={'Error during save operation'}
          onClose={() => back()}
       />}
       {mode === ERROR_DELETE && 
       <Error
          message={'Error during delete operation'}
          onClose={() => back()}
       />}
       {mode === DELETE && 
       <Status
          message={'Deleting'}
       />}
        
      {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty/>} */}
    </article>
  );
}