const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

const users = [
    { id: 1, name: 'Abdul Satter', email: 'satter@gmail.com' }
];

// userOne
// 2aa837hG72YlObPH

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://userOne:2aa837hG72YlObPH@cluster0.hlsud.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const userCollection = client.db('simpleNodePrac').collection('users');
        // const user = { name: 'Abdul Hi', email: 'hi@gmail.com' };
        // const result = await userCollection.insertOne(user);
        // console.log(result)
        app.get('/users', async (req, res) => {
            const cursor = userCollection.find({});
            const users = await cursor.toArray();
            res.send(users)

        });

        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            user._id = users.insertedId;
            console.log(user)
            res.send(user)
        })

    }
    finally {

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("port is running on")
})

// app.get('/users', (req, res) => {
//     if (req.query.name) {
//         const search = req.query.name;
//         const filtered = users.filter(ur => ur.name.toLowerCase().indexOf(search) >= 0);
//         res.send(filtered)
//     }
//     else {
//         res.send(users)
//     }
// });

// app.post('/users', (req, res) => {
//     const user = req.body;
//     user.id = users.length + 1;
//     console.log(user)
//     res.send(user)
// })


app.listen(port, () => {
    console.log(`port is running on ${port}`);
})

