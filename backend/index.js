//express to create server with path using (Get,Post) method
import express from "express";
//mysql database to store structural data
import mysql from "mysql";
import cors from "cors";
const app = express();

//initialize db connection
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"qwerty2002",
    database:"test123" 
});//39:10

app.use(express.json());
app.use(cors())

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
    const q = "INSERT INTO books (`title`,`desc`,`price`,`cover`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ];
    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Book has been created successfully");
    });
});

app.delete("/books/:id", (req,res)=>{
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?";

    db.query(q,[bookId],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Book has been deleted successfully");
    });
})


app.listen(8800, ()=>{
    console.log("Connected to backend..");
});
