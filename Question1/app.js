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

app.post('/auth', async (req, res) => {
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
app.get('/trains', async (req, res) => {
    try {
        const authToken = req.header('Authorization');
        // console.log(authToken);
        if (!authToken) {
            return res.status(401).json({ message: 'Authorization token missing' });
        }
        

        const response = await axios.get("http://20.244.56.144/train/trains", {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });

        if (response.status === 200) {
            const trainDetails = response.data;
            res.status(200).json(trainDetails);
        } else {
            res.status(500).json({ message: 'Failed to fetch train details' });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
});

// app.get("train/trains/:trainNumber", async (req, res) => {
//     try {
//       const trainNumber = req.params.trainNumber;
  
//       // Get the authorization token from the request headers
//       const authToken = req.headers.authorization;
  
//       const headers = {
//         Authorization: `Bearer ${authToken}`
//       };
  
//       const response = await axios.get(`http://20.244.56.144/train/trains/${trainNumber}`, {
//         headers
//       });
  
//       const trainDetails = response.data;
//       res.status(200).json(trainDetails);
//     } catch (error) {
//       console.error("Error fetching train details:", error);
//       res.status(500).json({ error: "Failed to fetch train details" });
//     }
//   });

// Define the endpoint to get details of a particular train
app.get("/trains/:trainNumber", async (req, res) => {
    try {
      const trainNumber = req.params.trainNumber;
      const authToken = req.headers.authorization;
  
      const headers = {
        Authorization: authToken
      };
  
      const response = await axios.get(`http://20.244.56.144/train/trains/${trainNumber}`, {
        headers
      });
  
      const trainDetails = response.data;
      res.status(200).json(trainDetails);
    } catch (error) {
      console.error("Error fetching train details:", error);
      res.status(500).json({ error: "Failed to fetch train details" });
    }
  });


app.listen(3001,()=>{
        console.log("Server Is running on port 3000");
    });
