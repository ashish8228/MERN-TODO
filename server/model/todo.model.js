import mongoose, { mongo } from "mongoose";

const TodoSchema = new mongoose.Schema({
    text: {
        type : String,
        required : true
    },
    completed : {
        type : Boolean,
        deafult : false
    },
},{timestamps : true}
)


const Todo = mongoose.model("Todo", TodoSchema);

export default Todo;