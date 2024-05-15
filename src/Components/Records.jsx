import React from "react";

function Records(props){

    return(
        <div className="listRec">
            {props.records.map(rec=>{
                return(
                    <div>
                        <div className="list-group list-group-flush">
                            <li class="list-group-item myItems">
                                <div>{rec.months}</div> 
                                <div>&#8377; {rec.sum}</div>
                            </li>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Records;