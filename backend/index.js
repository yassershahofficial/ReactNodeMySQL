//express to create server with path using (Get,Post) method
import express from "express";
//mysql database to store structural data
import mysql from "mysql";

//18.37
const app = express();

//initialize db connection
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"qwerty2002",
    database:"test123" 
});

app.use(express.json());

//excute get code if path --> /
app.get("/", (req,res)=>{
    res.json("Backend Connected to HomePage");
});

//excute get code if path --> /books
app.get("/books", (req,res)=>{
    const q = "SELECT * FROM books"
    db.query(q,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    });
});

//excute post code if path --> /books
app.post("/books", (req,res)=>{
    const q = "INSERT INTO books (`title`,`desc`,`cover`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover
    ];
    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Book has been created successfully");
    });
});

app.listen(8800, ()=>{
    console.log("Connected to backend..");
});
