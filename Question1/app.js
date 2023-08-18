const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const REGISTER_URL = 'http://20.244.56.144/train/register';
const AUTH_URL = 'http://20.244.56.144/train/auth';


app.get("/",(req,res)=>{
    return res.json({
        "Hello":"Hello"
    })
})
app.post('/register', async (req, res) => {
    const registrationData=req.body;
    try {
        const response = await axios.post(REGISTER_URL, registrationData);
        if (response.status === 200) {
            const data = response.data;
            res.status(200).json(data);
        } else {
            res.status(400).json({ message: 'Registration failed' });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
});

app.post('/train/auth', async (req, res) => {
    const authData=req.body;

    try {
        const response = await axios.post(AUTH_URL, authData);
        if (response.status === 200) {
            const authTokenData = response.data;
            res.status(200).json(authTokenData);
        } else {
            res.status(401).json({ message: 'Authorization failed' });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
});





app.listen(3000,()=>{
        console.log("Server Is running on port 3000");
    });