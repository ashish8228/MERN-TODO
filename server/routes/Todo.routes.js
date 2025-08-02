import express, { text } from "express";
import Todo from "../model/todo.model.js";


const router = express.Router();

// Get all Todos
router.get("/", async (req, res) => {
    try {
        const Todos = await Todo.find();
        res.json(Todos);
    }
    catch (errr) {
        res.status(500).json({ message: errr.message })
    }
})

// Add new todo 
router.post("/", async (req, res) => {
    const todo = new Todo({
        text: req.body.text
    })
    try {
        const newtodo = await todo.save();
        res.status(201).json(newtodo)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})


// Update to do 
router.patch("/:id", async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: "todo not found " });
        if (req.body.text !== undefined) {
            todo.text = req.body.text;
        }
        if (req.body.completed !== undefined) {
            todo.completed = req.body.completed;
        }
        const Updatedtodo = await todo.save();
        res.json(Updatedtodo);
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})


// Delete todo
router.delete("/:id", async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: "Todo Deletd" })
    }
    catch {
        res.status(500).json({ message: err.message });
    }
})



export default router;