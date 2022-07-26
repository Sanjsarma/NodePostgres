const {Client} = require('pg');
const express=require('express');
const { appendFile } = require('fs');

const client = new Client({
    user: "postgres",
    password: "",
    host: "localhost",
    port: 5432,
    database: "stud"
});

const app = express();
console.log('test');
client.connect()
.then(() => console.log("Connected successfully"))
.then(() => client.query('select * from student'))
.then(results => console.table(results.rows))
.catch(e=> console.log)


app.get('/',(req,res)=>{
    var sql='select * from student';
    client.query(sql,(err,data)=>{
        if(err) throw err;
        console.log(data.rows);
        res.send(data.rows);
    });
});

app.listen(3000);
