const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const user = [
    { id: 1, name: "Alice Johnson", email: "alice.johnson@example.com" },
    { id: 2, name: "Bob Smith", email: "bob.smith@example.com" },
    { id: 3, name: "Charlie Brown", email: "charlie.brown@example.com" },
    { id: 4, name: "Diana Prince", email: "diana.prince@example.com" },
  ];

app.get('/',(req,res) => {
    res.send('User Management Server is Running!!')
});

app.get('/users',(req,res) => {
    res.send(user);
});

app.post('/users',(req,res) => {
    console.log(req.body);
    const newuser = req.body;
    user.push(newuser);
    res.send(newuser);
});

app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
});