import React from "react";

function TrackRecords(props){

    function handleClick(year){
        props.demandYear(year);
    }


    return(
        <div className="records">
            <p className="titleEdit">Track Your Expenses</p>
            <div className="btn-group btn-edit">
                <button class="btn btn-secondary btns-lg dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Select Year
                </button>
                <ul class="dropdown-menu myMenu">
                    {props.Disyears.map(year=>{
                        return(
                            <li><button class="dropdown-item myMenuItem" onClick={()=>handleClick(year.years)}>{year.years}</button></li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default TrackRecords;