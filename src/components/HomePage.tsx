import React from 'react';
import {db} from '../firebase';
import { collection, addDoc } from "firebase/firestore";


const styles = {
  heading: 'text-5xl text-center text-primary-dark font-bold mb-10 pl-9',
  inputItem: 'flex tems-center mb-6',
  inputlabelDiv: 'w-1/3',
  inputlabel: 'block text-primary-dark font-bold text-right mb-1 md:mb-0 pr-4',
  inputFieldDiv: 'w-2/3',
  inputField: 'appearance-none border-2 border-primary-main rounded w-full py-2 px-4 text-primary-dark leading-tight focus:outline-none focus:bg-white',
  inputSelectionDiv: 'w-2/3',
  inputSelection: 'bg-primary-light appearance-none border-2 border-primary-main rounded w-full py-2 px-4 text-primary-dark leading-tight focus:outline-none focus:bg-white',
  buttonDiv: 'flex justify-center',
  addButton: 'bg-primary-main text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline width-full',
  doneLabel: 'text-1xl text-center text-secondary-main font-bold width-full',
} 

const HomePage = () => {

  const today = new Date();
  today.setDate(today.getDate());
  const todayDate = today.toISOString().substring(0,10);

  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [dueDate, setDueDate] = React.useState(todayDate);
  const [priority, setPriority] = React.useState('Low');
  const [status, setStatus] = React.useState('To-Do');  
  const [done, setDone] = React.useState('');

  const saveToFirebase = async (e: any) => {
    e.preventDefault();
    console.log('saveToFirebase - button clicked');

    // Get the form data
    if (title === '') {
      alert('Please enter a title');
      return;
    }
    const dateInput = new Date(dueDate);
    if (dateInput < today) {
      alert('Due date must be in the future');
      return;
    }
    if (dueDate === '') {
      alert('Please enter a due date');
      return;
    }
    if (priority === '') {
      alert('Please enter a priority');
      return;
    }
    if (status === '') {
      alert('Please enter a status');
      return;
    }

    console.log('title: ', title);
    console.log('description: ', description);
    console.log('dueDate: ', dueDate);
    console.log('priority: ', priority);
    console.log('status: ', status);
    

    // Save to Firebase
    const docRef = await addDoc(collection(db, "tasks"), {
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority,
      status: status,
    });
    setDone('Task Added: ' + docRef.id);
  }



  return (
    <div className="w-screen h-screen">
      <div className="flex justify-center flex-col items-center w-full h-full">
        <h1 className={styles.heading}>Scaffold Tool (WIP)</h1>

        {/* Collect Data: title, descripion, Due Date, Priority = high/med/low, Status = To-Do/In Progress/Compelted */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <form className="w-full max-w-sm" onSubmit={saveToFirebase}>
          
            {/* TITLE */}
            <div className={styles.inputItem}>
              <div className={styles.inputlabelDiv}>
                <label className={styles.inputlabel}>Title</label>
              </div>
              <div className={styles.inputFieldDiv}>
                <input value={title} onChange={(e) => setTitle(e.target.value)} 
                    className={styles.inputField} type='text' placeholder='Title'/>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className={styles.inputItem}>
              <div className={styles.inputlabelDiv}>
                <label className={styles.inputlabel}>Description</label>
              </div>
              <div className={styles.inputFieldDiv}>
                <input value={description} onChange={(e) => setDescription(e.target.value)}
                    className={styles.inputField} type='text' placeholder='Description'/>
              </div>
            </div>
            
            {/* DUE DATE */}
            <div className={styles.inputItem}>
              <div className={styles.inputlabelDiv}>
                <label className={styles.inputlabel}>Due Date</label>
              </div>
              <div className={styles.inputFieldDiv}>
                <input value={dueDate} onChange={(e) => setDueDate(e.target.value)}
                    className={styles.inputField} type='date'/>
              </div>
            </div>

            {/* PRIORITY */}
            <div className={styles.inputItem}>
              <div className={styles.inputlabelDiv}>
                <label className={styles.inputlabel}>Priority</label>
              </div>
              <div className={styles.inputSelectionDiv}>
                <select value={priority} onChange={(e) => setPriority(e.target.value)} className={styles.inputSelection}>
                  <option defaultValue='Low'>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
            </div>

            {/* STATUS */}
            <div className={styles.inputItem}>
              <div className={styles.inputlabelDiv}>
                <label className={styles.inputlabel}>Status</label>
              </div>
              <div className={styles.inputSelectionDiv}>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className={styles.inputSelection}>
                  <option>To-Do</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>
            </div>

            {/* ADD BUTTON */}
            <div className={styles.buttonDiv}>
              <button id='AddButton' className={styles.addButton} type='submit'>Add</button>
            </div>
          </form>
        </div>
        <div>
          <textarea className={styles.doneLabel} value={done} readOnly></textarea>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
