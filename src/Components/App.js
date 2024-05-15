import React, { useState ,useEffect} from 'react';
import Header from './Header.jsx';
import CreateExpense from './CreateExpense.jsx';
import ExpenseHeader from './ExpenseHeader.jsx';
import ListExpense from './ListExpense.jsx';
import Records from './Records.jsx';
import TrackRecords from './TrackRecords.jsx';
import Axios from 'axios';

export default function App()
{
    const [expense,setExpense]=useState([]);
    const [total,setTotal]=useState(0);
    const [trackRecords,settrackRecords]=useState([]);
    const [unique,setUnique]=useState([]);

    async function getExpenses(){
      const response= await Axios.get("http://localhost:3001/expenses");
      setExpense(response.data);
  }
  async function getTotal()
    {
      const queryres=await Axios.get("http://localhost:3001/getTotal");
      setTotal(queryres.data);
    }
    async function getUniqueYears(){
      const response= await Axios.get("http://localhost:3001/uniqueYears");
      setUnique(response.data);
  }
    useEffect(()=>{
      getExpenses();
  },[]);
    useEffect(()=>{
      getTotal();
  },[]);
  useEffect(()=>{
    getUniqueYears();
},[]);
    async function addExpense(newItem){
      await Axios.post("http://localhost:3001/addExpense",{
        title:newItem.title,
        cost:newItem.cost,
        date:newItem.date,
        note:newItem.note
      });
      setExpense(prevXp=>{
        return[...prevXp,newItem]
      })
    }
    
    
    async function editExpense(newItem,id){
      setExpense(updateItems=>{
          return updateItems.map((items,index) => index===id?items=newItem:items)
      });
      await Axios.put(`http://localhost:3001/update/${id}`,{
          title:newItem.title,
          cost:newItem.cost,
          date:newItem.date,
          note:newItem.note
      });
  }
    async function orderDate(type)
    {
      const res=await Axios.get(`http://localhost:3001/filterDate/${type}`);
      setExpense(res.data);
    }
    async function orderMonth(type)
    {
      const res=await Axios.get(`http://localhost:3001/filterMonth/${type}`);
      setExpense(res.data);
    }
    async function orderPrice(type)
    {
      const res=await Axios.get(`http://localhost:3001/filterPrice/${type}`);
      setExpense(res.data);
    }
    
  async function getTrackRecords(year){
      const response= await Axios.get(`http://localhost:3001/trackRecord/${year}`);
      settrackRecords(response.data);
  }
  return(
    <div className='main'>
    <Header/>
    <div className='columnDisplay'>
        <div>
            <CreateExpense onAdd={addExpense}/>
            <ExpenseHeader sum={total}
                         filterPrice={orderPrice}
                         filterDate={orderDate}
                         filterMonth={orderMonth}
            />
            <div className='expenseList'>
                {expense.map(exp=>{
                    return(
                        <ListExpense
                            key={exp.xp_id}
                            id={exp.xp_id}
                            title={exp.xp_title}
                            cost={exp.truncost}
                            date={exp.formatted_date}
                            note={exp.xp_note}
                            onEdit={editExpense}
                        />
                    )
                    })
                }
            </div>
        </div>
        <div>
            <TrackRecords
                Disyears={unique}
                demandYear={getTrackRecords}
            />
            <div className='recordList'>
                <Records records={trackRecords}/>
            </div>
        </div>
    </div>
</div>
  )
}
