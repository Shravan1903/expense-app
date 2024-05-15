import React from "react";
import iconImg from "../images/expense.png"
export default function ExpenseHeader(props)
{
  function handlePrice(type){
    document.getElementById("me").value=type
    var x = document.getElementById("me").value;
    props.filterPrice(x);
  }
  function handleDate(type){
    document.getElementById("me").value=type
    var x=document.getElementById("me").value;
    props.filterDate(x);
  }
  function handleMonth(type){
    document.getElementById("me").value=type
    var x=document.getElementById("me").value;
    props.filterMonth(x);
  }
  


  return(
    <div className="expenseHead">
    <img src={iconImg} alt="icon-img"/>
      <div>
        <button className="btn btn-sm btn-primary" >Sort By</button>
        <button type="button" className="btn btn-sm btn-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
        <span className="visually-hidden">Toggle Dropdown</span>
        </button>
        <ul className="dropdown-menu">
            <input type="hidden" id="me" />  
            <li><button className="dropdown-item" onClick={()=>handlePrice('asc')} >Price:Low To High</button></li>
            <li><button className="dropdown-item" onClick={()=>handlePrice('dec')} >Price: High To Low</button></li>
            <li><button className="dropdown-item" onClick={()=>handleDate('new')} >Date: Added Recently</button></li>
            <li><button className="dropdown-item" onClick={()=>handleDate('old')} >Date:Added Before</button></li>
        </ul>
      </div>
      <div>
      <button className="btn btn-sm btn-primary" type="button">Filter By Month</button>
      <button type="button" class="btn btn-sm btn-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
        <span className="visually-hidden">Toggle Dropdown</span>
      </button>
      <ul className="dropdown-menu">
        <li><button className="dropdown-item" onClick={()=>handleMonth('1')} >January</button></li>
        <li><button className="dropdown-item" onClick={()=>handleMonth('2')} >February</button></li>
        <li><button className="dropdown-item" onClick={()=>handleMonth('3')} >March</button></li>
        <li><button className="dropdown-item" onClick={()=>handleMonth('4')} >April </button></li>
        <li><button className="dropdown-item" onClick={()=>handleMonth('5')} >May</button></li>
        <li><button className="dropdown-item" onClick={()=>handleMonth('6')} >June</button></li>
        <li><button className="dropdown-item" onClick={()=>handleMonth('7')} >July</button></li>
        <li><button className="dropdown-item" onClick={()=>handleMonth('8')} >August</button></li>
        <li><button className="dropdown-item" onClick={()=>handleMonth('9')} >September</button></li>
        <li><button className="dropdown-item" onClick={()=>handleMonth('10')} >October</button></li>
        <li><button className="dropdown-item" onClick={()=>handleMonth('11')} >November</button></li>
        <li><button className="dropdown-item" onClick={()=>handleMonth('12')} >December</button></li>
      </ul>
      </div>
      <p className="price">Total : &#8377; {props.sum}</p>
    </div>
  )
}