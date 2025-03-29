const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require('method-override');
const { faker } = require('@faker-js/faker');
let port = 3000;


app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.set("views",path.join(__dirname, "/views"));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('_method'));
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "delta_app",
    password : "Vibharam@137"
}); 



let getRandomUser = () => {
    return [
      faker.string.uuid(),
      faker.internet.username(), 
      faker.internet.email(),
      faker.internet.password()
    ];
  }

let q = "insert into user (id, username, email, password) values ?";
let data = [];
for(let i =1; i<=100; i++){
    data.push(getRandomUser());
}


//Home page
app.get("/" , (req, res) => {
    let q = `select count(*) from user`;
    try{
    connection.query(q, (err, result) => {
        if(err) {
            throw err;
            return;
        }
        let count = result[0]["count(*)"];
        res.render("home",{count});
    });

}catch(err){
    console.log(err);
    res.send("Some error in DB!");
}
});

// User data
app.get("/user", (req, res) =>{
    let q = `select * from user`;
    try{
        connection.query(q, (err, users) => {
        if(err) throw err;

        res.render("user", {users});
    });
    }catch(err){
        console.log("Some error in DB!");
    }
});

// User edit form
app.get("/user/:id/edit", (req, res) =>{
    let{id} = req.params;
    let q = `select * from user where id = '${id}'`;
    try{
    connection.query(q, (err, users) =>{
        if(err) throw err;
        let user = users[0];
        res.render("edit",{user});
    
    })
    }catch(err){
        res.send("Some error in Database!!");
    }
   
});

//Username edit done
app.patch("/user/:id", (req, res) =>{
    let{id} = req.params;
    let{username: newUserName, password: newPass} = req.body;
    let q = `select * from user where id = '${id}'`;
    try{
    connection.query(q, (err, users) =>{
        if(err) throw err;
        let user = users[0];
        if(user.password !== newPass){
            res.send("WRONG PASSWORD");
        }else{
            let changeName = `update user set username='${newUserName}' where id = '${id}'`;
            connection.query(changeName, (err,result) => {
                if(err) throw err;
                console.log("User edited successfully!");
                res.redirect("/user");
            });
        }
    });
    }catch(err){
        res.send("Some error in Database!!");
    }
});

//Add new user page
app.get("/user/newUser",(req, res) => {
    res.render("add");
});

// New user added successfully in DB
app.post("/user/newUser", (req, res) => {
    let { username, email, password } = req.body;
    let id = uuidv4();
    let q = `insert into user (id, username, email, password) values ('${id}','${username}','${email}','${password}') `;
  
    try {
      connection.query(q, (err, result) => {
        if (err) throw err;
        console.log("New user added successfully");
        res.redirect("/user");
      });
    } catch (err) {
      res.send("Some error occurred in DB");
    }
  }); 

  //Delete User form
  app.get("/user/:id/delete", (req, res) => {
    let { id } = req.params;
    let q = `select * from user where id ='${id}'`;
  
    try {
      connection.query(q, (err, result) => {
        if (err) throw err;

        let user = result[0];
        res.render("delete", { user });
      });
    } catch (err) {
      res.send("Some error with DB");
    }
  });

//User deleted successfully from DB
app.delete("/user/:id/", (req, res) => {
    let { id } = req.params;
    let { password } = req.body;
    let q = `select * from user where id ='${id}'`;
  
    try {
      connection.query(q, (err, users) => {
        if (err) throw err;
        let user = users[0];
  
        if (user.password != password) {
          res.send("Incorrect password !!");
        }else {
          let q2 = `delete from user where id ='${id}'`;
          connection.query(q2, (err, result) => {
            if (err) throw err;
            else {
              console.log(result);
              console.log("User deleted successfully!");
              res.redirect("/user");
            }
          });
        }
      });
    } catch (err) {
      res.send("Some error with DB");
    }
  });
app.listen(port, () =>{
    console.log(`Server is listening to ${port}`);
});
