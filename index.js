// Import database
const dbDriver = require('better-sqlite3');
//connect to db
const db = dbDriver('bands.sqlite3');
//Import express
const express = require('express');

//create express app
const app = express();

// Express set up 
// Serve a static frontend
app.use(express.static('frontend'));
// Tell express to use json
app.use(express.json());


//REST API routs
 app.get('/bands', (req,res)=> {
    //req = request
    //res = response
    const bands = db.prepare(`SELECT * FROM bands`).all();

    //send back JSON
    res.json(bands);
 })
 app.get('/bands/:id',(req,res)=>{
    //Get the url id
    const id= req.params.id;

    let statement= db.prepare('SELECT * FROM bands WHERE id = :id');
    let result = statement.all({
        id
    });
    // Send back band or error

    res.json(result[0] || {'error' : 'No band matching id'});
    });
 
//start the server
app.listen(3000,() => {
    console.log('server started on the port 3000');
});