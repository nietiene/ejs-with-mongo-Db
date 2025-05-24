const express = require("express");
// const mongoose = require("mongoose");
const user = require("./user.js");
const router = express.Router();

//Get data from the user
router.get('/', async (req, res) => {
    try {
        const users = await user.find();
        
        if (users.length > 0) {

          res.render("user", {user: users});
        } else {
            res.status(404).json("no user in system");
        }
    } catch (err) {
        res.status(404).json("no user in system", err.message);
    }
});
// get data based on the specified Id before update
router.get('/edit/:id', async (req, res) => {
    try {
    
    const id = parseInt(req.params.id);
    const index = await user.findOne({id: id});

    if (index) {
        res.render("updateForm", {user: index});
    } else {
        res.status(404).send("Data not found");
    }
} catch (err) {console.error(err)}
});

// Peform update operation
router.post('/edit/:id', async (req, res) => {
    try {
    const id = parseInt(req.params.id);
    const update = await user.findOneAndUpdate(
        {id: id},
        req.body,
        {new: true}
    );
    
    if (update) {
        res.redirect('/user');
    }
} catch (err) {
    res.status(500).json("Data not updated", err);
}
});

// Delete data based on the specified id 
router.post('/delete/:id', async (req, res) => {
    try {
    
    const id = parseInt(req.params.id);
    const deleted = await user.findOneAndDelete({id: id});

    if (deleted) {
        res.redirect('/user');
    } else {
        res.status(404).send("No user found");
    }
} catch (err) {res.status(500).send("Server error")};
});

// Provide some form lo login
router.get('/add', (req, res) => {
    res.render("AddForm");
});

// Peform Insert Operation
router.post('/add', async (req, res) => {
    try {
        
   const newUser = await user.create({
    id: parseInt(req.body.id),
    name: req.body.name,
    password: req.body.password
   });

   if (newUser) {
    res.redirect("/user");
   } else {
    res.status(500).send("user not inserted")
   }
} catch (err) {
    res.status(500).send({message:"user not inseted", error: err.message});
}
});
module.exports = router;

// I'll perform validation and styling  at the school