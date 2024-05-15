import React, { useState } from "react";

export default function ListExpense(props)
{
  const [editExpense,seteditExpense]=useState({
    title:props.title,
    cost:props.cost,
    date:props.date,
    note:props.note
  })
  const [clicked,setClicked]=useState(false);

  function handleClick(){
    setClicked(!clicked);
  }

  function handleChange(event){
    const {name,value}=event.target;
    seteditExpense(prev=>{
      return {
        ...prev,
        [name]:value
    }
    })
  }
  function handleSubmit(event){
    setClicked(!clicked);
    props.onEdit(editExpense,props.id)
    document.getElementById("updateField").setAttribute("hidden",true);
    event.preventDefault();
    window.location.reload();
}
  return (
  !clicked ?(
    <div className="list-group">
        <div className="list-group-item list-group-item-actions">
            <div className="d-flex w-100 justify-content-between">
                <h4 className="mb-1 myEdits">{props.title}</h4>
                <p className='myEdits'>&#8377; {props.cost}</p>
            </div>
            <p className="mb-1 myEdits">{props.note}</p>
            <div className='d-flex w-100 justify-content-between'>
                <small className='myEdits'>{props.date}</small>
                <i onClick={handleClick} type="button" className="fa fa-pencil"></i>
            </div>
        </div>
    </div>
    ) 
  :(
    <div>
        <form>
            <div className="list-group">
                <div className="list-group-item list-group-item-actions">
                    <div className="d-flex w-100 justify-content-between">
                        <h4 className="mb-1"><input id='updateField' className='editIn' type='text' name='title' onChange={handleChange} value={editExpense.title}/></h4>
                        <p>&#8377; <input id='updateField' className='editIn shortBox'  type='text' name='cost' onChange={handleChange} value={editExpense.cost}/></p>
                    </div>
                    <p className="mb-1"><input id='updateField' className='editIn'  type='text' name='note' onChange={handleChange} value={editExpense.note}/></p>
                    <div className='d-flex w-100 justify-content-between'>
                        <small><input id='updateField' className='editIn'type='text' name='date' onChange={handleChange} value={editExpense.date}/></small>
                        <span className='my'onClick={handleSubmit} type="submit">&#10003;</span>
                    </div>
                </div>
            </div>
      </form>
    </div>
  )
)
}