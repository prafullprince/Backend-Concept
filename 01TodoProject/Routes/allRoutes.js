const express = require("express");
const router = express.Router();
const { createTodoLogic, getTodoLogic, getTodoById, getTodoByIdAndUpdate,getTododByIdAndDelete } = require("../Controllers/logic");

// path
router.post("/createTodoLogic",createTodoLogic);
router.get("/getAllTodo",getTodoLogic);
router.get("/getSingleTodo/:id",getTodoById);
router.put("/updateTodoById/:id",getTodoByIdAndUpdate);
router.delete("/getTododByIdAndDelete/:id",getTododByIdAndDelete);

module.exports = router ;