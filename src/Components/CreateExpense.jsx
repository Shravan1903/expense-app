import React, { useState } from "react";



export default function CreateExpense(props)
{

  const d=new Date();
  const currDate=d.getDate();
  const currMonth=d.getMonth();
  const currYear=d.getFullYear();
  const date= currDate < 10 ? currYear+"-"+currMonth+1+"-"+"0"+currDate :  currYear+"-"+currMonth+1+"-"+currDate;
  
  const [newExpense,setnewExpense]=useState({
      title:"",
      cost:"",
      date:"",
      note:""
  })
  function handlechange(event)
  {
    console.log(event.target);
    const {name,value}=event.target;
    setnewExpense(prevExpense=>{
      return { ...prevExpense,
        [name]:value
      }
    })
  }
  function handleCreate(event)
  {
    event.preventDefault();
    props.onAdd(newExpense);
    setnewExpense({
      title:"",
      cost:"",
      date:"",
      note:""
    });
    window.location.reload();
  }

  return (
          <div className="createXp">
            <p className="titlexpense">Add New Expense</p>
            <form onSubmit={handleCreate}>
              <div className="outerDetails">
                  <div className="formDetails">
                    <div>
                      <input type="text" className="form-control" id="myForm" placeholder="Title" name="title" onChange={handlechange} value={newExpense.title}/>
                    </div>
                    <div className="costForm">
                      <span className="rupee">&#8377;</span>
                      <input type="number" className="form-control" id="myForm" placeholder="Cost" name="cost" onChange={handlechange} value={newExpense.cost}/>
                    </div>
                    <div>
                      <input type='date' className="form-control" id="myForm" placeholder="Date" max={date} name="date" onChange={handlechange} value={newExpense.date}/>
                    </div>
                  </div>
                  <div>
                    <textarea className="form-control" placeholder="Notes" name="note" onChange={handlechange} value={newExpense.note}></textarea>
                  </div>
                  <button className="btn btn-success" type="submit">Add Expense</button>
              </div>
            </form>
          </div>
  )
}