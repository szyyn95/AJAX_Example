var mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;

mongoose.connect("mongodb://localhost/todo_api");

var todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Name can't be blanked"
    },
    completed: {
        type: Boolean,
        default: false
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Todo", todoSchema);