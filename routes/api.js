var express = require("express");
var router = express.Router({mergeParams: true});
var Todos = require("../models/Todos.js");

router.get("/", function(req, res){
    Todos.find()
    .then(function(todos){
        res.json(todos);
    })
    .catch(function(err){
        res.send(err);
    });
});

router.post("/", function(req, res){
    Todos.create(req.body)
    .then(function(newtodo){
        res.status(201).json(newtodo);
    })
    .catch(function(err){
        res.send(err);
    });
});

router.get("/:id", function(req, res){
    Todos.findById(req.params.id)
    .then(function(todo){
        res.json(todo);
    })
    .catch(function(err){
        res.send(err);
    });
});

router.put("/:id", function(req, res){
    Todos.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(function(todo){
        res.json(todo);
    })
    .catch(function(err){
        res.send(err);
    });
});

router.delete("/:id", function(req, res){
    Todos.findByIdAndRemove(req.params.id)
    .then(function(){
        res.json({message: "Deleted"});
    })
    .catch(function(err){
        res.send(err);
    });
});

module.exports = router;