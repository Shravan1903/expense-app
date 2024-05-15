import express, { query } from "express";
import bodyParser from "body-parser";
import pg from "pg"
import cors from "cors"

const app = express();
const port = 3001;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "ExpenseTracker",
  password: "sk@123",
  port: 5000,
});
db.connect();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.get('/expenses',async(req,res)=>{
  const queryRes=await db.query("SELECT xp_id,xp_title,trunc(xp_cost) as truncost,TO_CHAR(xp_date, 'DD/MM/YYYY') AS formatted_date,xp_note FROM expense ORDER BY xp_id desc");
  res.json(queryRes.rows);
})

app.post('/addExpense',async(req,res)=>{
    const {title,cost,date,note}=req.body;
   await db.query("insert into expense(xp_title,xp_cost,xp_date,xp_note) values ($1,$2,$3,$4) returning * ",[title,cost,date,note]);
})

app.get('/getTotal',async(req,res)=>{
  const queryres= await db.query("select SUM(xp_cost) as totalcost from expense");
  res.json(queryres.rows[0].totalcost);
})

app.put('/update/:id',async(req,res)=>{
  const item_id=req.params.id;
  const {title,cost,date,note}=req.body;
  await db.query("UPDATE expense SET xp_title=$1,xp_cost=$2,xp_date=$3,xp_note=$4 where xp_id=$5",[title,cost,date,note,item_id]);
})

app.get('/filterMonth/:type',async(req,res)=>{
  const type=req.params.type;
  const queryRes=await db.query("SELECT xp_id,xp_title,trunc(xp_cost) as truncost,TO_CHAR(xp_date, 'DD/MM/YYYY') AS formatted_date,xp_note FROM expense WHERE EXTRACT(MONTH FROM xp_date)=$1",[type])
  res.json(queryRes.rows);
});

app.get('/filterPrice/:type',async(req,res)=>{
  const type=req.params.type;
  if(type=="asc")
  {
    const queryres=await db.query("select xp_id,xp_title,trunc(xp_cost) as trunCost,TO_CHAR(xp_date, 'DD/MM/YYYY') AS formatted_date,xp_note FROM expense ORDER BY trunCost")
    res.json(queryres.rows);
  }
  else
  {
    const queryres=await db.query("select xp_id,xp_title,trunc(xp_cost) as trunCost,TO_CHAR(xp_date, 'DD/MM/YYYY') AS formatted_date,xp_note FROM expense ORDER BY trunCost DESC")
    res.json(queryres.rows);

  }
})

app.get('/filterDate/:type',async(req,res)=>{
  const type=req.params.type;
  if(type==="old"){ 
      const queryRes=await db.query("SELECT xp_id,xp_title,trunc(xp_cost) as truncost,TO_CHAR(xp_date, 'DD/MM/YYYY') AS formatted_date,xp_note FROM expense ORDER BY formatted_date")
      res.json(queryRes.rows);
  }
  else{
      const queryRes=await db.query("SELECT xp_id,xp_title,trunc(xp_cost) as truncost,TO_CHAR(xp_date, 'DD/MM/YYYY') AS formatted_date,xp_note FROM expense ORDER BY formatted_date DESC")
      res.json(queryRes.rows);
  }
})
app.get('/trackRecord/:year',async(req,res)=>{
  const year=req.params.year;
  const queryRes=await db.query("SELECT EXTRACT(YEAR FROM xp_date) as years,TO_CHAR(xp_date, 'Month') as months,SUM(xp_cost) as sum from expense where EXTRACT(YEAR FROM xp_date)=$1 group by years,months",[year]);
  res.json(queryRes.rows);
})
app.get('/uniqueYears',async(req,res)=>{
  const queryRes=await db.query("SELECT DISTINCT EXTRACT(YEAR FROM xp_date) as years from expense");
  res.json(queryRes.rows);
})
app.listen(port, () =>{
  console.log(`Listening on port ${port}`);
});























// app.get('/expense',async(req,res)=>{
//   const queryres=await db.query("SELECT xp_id,xp_title,trunc(xp_cost) as truncost,TO_CHAR(xp_date,'DD/MM/YYYY') AS formatted_date,xp_note FROM expense ORDER BY xp_id desc");
//   res.json(queryres.rows);
// })

