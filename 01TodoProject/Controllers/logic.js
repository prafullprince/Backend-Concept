const TodoSchema = require("../Models/model");

exports.createTodoLogic = async (req,res) => {
    try{
        const {title,description} = req.body ;
        const response = await TodoSchema.create({title,description});
        res.json({
            success:true,
            data:response,
            message:"entry created successfully"
        });
    }catch{
        (error)=>{
            console.log(error);
            console.error(error.message);
            res.json({
                success:false,
                data:"internal server error",
                message:error.message,
            })
        }
    }
}

exports.getTodoLogic = async (req,res) => {
    try{
        const responseData = await TodoSchema.find({});
        res.json({
            success:true,
            data:responseData,
            message:"data is fetched successfully"
        })
    }catch{
        (error)=>{
            console.log(error);
            console.error(error.message);
            res.json({
                success:false,
                data:"internal server error",
                message:error.message,
            })
        }
    }
}

exports.getTodoById = async (req,res) => {
    try{
        const {id} = req.params ;
        const responseData = await TodoSchema.findById({_id:id});
        if(!TodoSchema){
            return res.json({
                message:"post is not available to fetched"
            })
        }
        res.json({
            success:true,
            data:responseData,
            message:"data is fetched successfully"
        })
    }catch{
        (error)=>{
            console.log(error);
            console.error(error.message);
            res.json({
                success:false,
                data:"internal server error",
                message:error.message,
            })
        }
    }
}

exports.getTodoByIdAndUpdate = async (req,res) =>{
    try{
        const {id} = req.params;
        const {title,description} = req.body;
        const updatedTodo = await TodoSchema.findByIdAndUpdate(
            {_id:id},
            {title,description,updatedAt:Date.now()}
        )
        res.json({
            success:true,
            data:updatedTodo,
            message:"post updated successfully"
        })
    }catch{
        (error)=>{
            console.log(error);
            console.error(error.message);
            res.json({
                success:false,
                data:"internal server error",
                message:error.message,
            })
        }
    }
}

exports.getTododByIdAndDelete = async (req,res) => {
    try{
        const {id} = req.params;
        const post = await TodoSchema.findByIdAndDelete({_id:id});
        res.json({
            success:true,
            data:post,
            message:"post deleted successfully"
        })
    }catch{
        (error)=>{
            console.log(error);
            console.error(error.message);
            res.json({
                success:false,
                data:"internal server error",
                message:error.message,
            })
        }
    }
}