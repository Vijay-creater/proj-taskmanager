const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// require('dotenv').config();

const app = express();
app.use(cors()); 
const port = process.env.PORT || 3001;


task_status = [
    {
        "id": 1,
        "Status_name": "Not Started"
    },
    {
        "id": 2,
        "Status_name": "In Progress"
    },
    {
        "id": 3,
        "Status_name": "On Hold"
    },
    {
        "id": 4,
        "Status_name": "Completed"
    },
    {
        "id": 5,
        "Status_name": "Canceled"
    }
]
// Middleware to parse JSON
app.use(express.json());

// MongoDB Atlas connection string
// const mongoURI = 'mongodb+srv://jenithkumar:<password>@pythonflask.kykwc38.mongodb.net/company?retryWrites=true&w=majority&appName=pythonflask';
const mongoURI = 'mongodb+srv://kbvijay:<password>@vijay.3yy4jv1.mongodb.net/taskmanger?retryWrites=true&w=majority&appName=Vijay'

// Replace <password> with your actual password
const mongoURIWithPassword = mongoURI.replace('<password>', encodeURIComponent('Vijay@16@3'));

// Connect to MongoDB
mongoose.connect(mongoURIWithPassword, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Define the employee schema and model
const EmployeeSchema = new mongoose.Schema({
    title: String,
    description: String,
    due_date: String,
    status: Number
}, { collection: 'task' });  // specify collection name

const Taskquery = mongoose.model('Task', EmployeeSchema, 'task');

const useerSchema = new mongoose.Schema({
    user_name: String,
    password: String,
    email: String,
    display_name: String,
}, { collection: 'user' });  // specify collection name

const Userquery = mongoose.model('User', useerSchema, 'user');

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/register/', async (req, res) => {
    try {
        formdata = req.body
        if (!req.body.user_name) {
            res.status(500).send({ "user_name": ["This field is required."] })
        }
        if (!req.body.password) {
            res.status(500).send({ "password": ["This field is required."] })
        }
        const userquery = new Userquery(formdata);
        await userquery.save();
        res.json(userquery);
    } catch (err) {
        res.status(500).send(err);
    }
});

// POST method to check user credentials
app.post('/', async (req, res) => {
    formdata = req.body
    if (!req.body.user_name) {
        res.status(500).send({ "user_name": ["This field is required."] })
    }
    if (!req.body.password) {
        res.status(500).send({ "password": ["This field is required."] })
    }
    const { user_name, password } = req.body;
    
    try {
        // Check if user with given credentials exists
        const user = await Userquery.findOne({ user_name, password });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Return display_name and _id
        res.json({ user_name: user.display_name, user_id: user._id });
    } catch (err) {
        res.status(500).send(err);
    }
});


app.get('/task/', async (req, res) => {
    try {
        const tasklist = await Taskquery.find();
        const result_list = tasklist.map(task => {
            // Find the status name by task status ID
            const status = task_status.find(status => status.id === task.status);
            
            // Get the plain object representation of the task
            const plainTask = task.toObject ? task.toObject() : task;
            
            // Create the result dictionary
            const result_dict = {
                Status_name: status ? status.Status_name : "Unknown Status",
                ...plainTask
            };
            
            return result_dict;
        });
        res.json(result_list);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/task/', async (req, res) => {
    try {
        formdata = req.body
        newformdata = { ...formdata, "status": 1 }
        const newTaskquery = new Taskquery(newformdata);
        await newTaskquery.save();
        res.json(newTaskquery);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.put('/task/', async (req, res) => {
    const taskId = req.body.id;
    
    try {
        // Retrieve the updated form data from request body
        const updatedData = req.body;
        
        // Update the task in the database
        const updatedTask = await Taskquery.findByIdAndUpdate(taskId, updatedData, { new: true });
        
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(updatedTask);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.delete('/task/', async (req, res) => {
    const taskId = req.query.id; // Retrieve the task ID from query parameters
    
    try {
        if (!taskId) {
            return res.status(400).json({ message: 'Missing id parameter' });
        }
        
        // Find the task by ID and delete it
        const deletedTask = await Taskquery.findByIdAndDelete(taskId);
        
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        
        res.json({ message: 'Task deleted successfully', deletedTask });
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/task/status/', (req, res) => {
    res.send(task_status);
});



app.post('/task/status', async (req, res) => {
    const taskId = req.body.id;
    const { status } = req.body;
    console.log(taskId,status)
    try {
        // Find the task by ID and update its status
        const updatedTask = await Taskquery.findByIdAndUpdate(taskId, { status }, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(updatedTask);
    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});