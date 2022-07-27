const {Client} = require('pg');
const express=require('express');
const { appendFile } = require('fs');
const bodyParser=require('body-parser');

const client = new Client({
    user: "postgres",
    password: "",
    host: "localhost",
    port: 5432,
    database: "stud"
});

const app = express();
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('view engine','ejs');

console.log('test');
client.connect()
.then(() => console.log("Connected successfully"))
.then(() => client.query('select * from student'))
.then(results => console.table(results.rows))
.catch(e=> console.log)

// client.query(
//     "INSERT INTO student(rno, name) values(4, 'clay')",(err,res)=>{
//         if(err) throw err;
//     }
// )

app.get('/',(req,res)=>{
    var sql='select * from student';
    client.query(sql,(err,data)=>{
        if(err) throw err;
        console.log(data.rows);
        res.send(data.rows);
    });
});
app.get('/form',(req,res)=>{
    res.render('form');
});
app.get('/delete',(req,res)=>{
    res.render('del');
});
app.get('/update',(req,res)=>{
    res.render('update');
});

app.post('/insert', urlencodedParser, async(req,res)=>{
    // try{
    //     const newrno=req.body.rno;
    //     console.log(newrno);
    //     const newname= req.body.name;
    //     const newitem= await client.query("INSERT INTO student(rno, name) VALUES($1, $2)", [newrno, newname]);
    //     res.json(newitem);
    // }
    // catch(err){
    //     console.error(err.message);
    // }
    try{
    var rollnum=req.body.rno;
    var newname=req.body.name;
    console.log(rollnum);
    console.log(newname);
    var sqlitem=await client.query("insert into student values ($1, $2)",[rollnum, newname]);
    }
    catch(err){
        console.log(err);
    }
}); 
app.post('/delete', urlencodedParser, async(req,res)=>{
     try{
        var rollnum=req.body.rno;
        var newname=req.body.name;
        var sqlitem=await client.query("delete from student where rno=$1",[rollnum]);
        console.log('deleted');
        res.redirect('/');
    }
    catch(err){
        console.error(err.message);
    }
});
app.post('/update', urlencodedParser, async(req,res)=>{
   try{
    var rollnum=req.body.rno;
    var newname=req.body.name;
    var sqlitem=await client.query("update student set name=$1 where rno=$2",[newname, rollnum])
    res.redirect('/')  
 }
   catch(err){
    console.log(error);
   }
});
app.listen(3000);
