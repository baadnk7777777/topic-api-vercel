
require('dotenv').config();
const express = require('express');
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set } = require('firebase/database');
const bcrypt = require("bcrypt")
const saltRounds = 10
const bodyParser = require('body-parser');



const PORT = process.env.PORT || 4252;

const firebaseConfig = {
  databaseURL: 'https://toeic-api-c54f8-default-rtdb.asia-southeast1.firebasedatabase.app/',
};

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize Firebase app and database
const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Database URL: ${process.env.DATABASE_URL}`);
});

async function hashPassword(password) {
    return bcrypt.hash(password, saltRounds);
  }

app.get('/', (req, res) => {
    res.send('Hello World Toeic Services!');
});

app.post('/api/create', async (req, res)  =>  {
    var username = req.body.username;
    var password = req.body.password;
   

    try {
       
        hashPassword(password).then((hash) => {
            const passwordHash = hash;
            console.log(passwordHash);
            set(ref(db, 'users/' + username), {
                username: username,
                password: passwordHash,
                score:0,
                date: new Date().toISOString(),
              })
        });
      
      return res.status(200).json({ message: 'User created' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
