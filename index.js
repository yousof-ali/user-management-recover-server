const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// recapUserManagement
// xfIe7sCrJGqVQv0P


const uri = "mongodb+srv://recapUserManagement:xfIe7sCrJGqVQv0P@cluster0.lewcb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
     
    const databaseCollections = client.db("UserManagement").collection("users");

    app.get('/',(req,res) => {
        res.send("User Management Server is running !!")
    })

    app.get('/users',async(req,res) => {
        const result = await databaseCollections.find().toArray();
        res.send(result);
    });

    app.get('/details/:id',async(req,res) => {
        const id = req.params.id
        const query = {_id : new ObjectId(id)}
        const result = await databaseCollections.findOne(query);
        res.send(result);
    });

    app.put('/update/:id',async(req,res) => {
      const id = req.params.id
      const updateContent = req.body
      const query = {_id:new ObjectId(id)}
      Option = {upsert:true};

      const updateData = {
        $set:{
          name:updateContent.name,
          email:updateContent.email
        }
       
      }
      console.log(updateData);
      const result = await databaseCollections.updateOne(query,updateData,Option);
      res.send(result);

    })

    app.post('/users',async(req,res) => {
        const data = req.body;
        const result = await databaseCollections.insertOne(data);
        res.send({result,data});
    });

    app.delete('/user-delete/:id',async(req,res) => {
        const id = req.params.id;
        const query = {_id : new ObjectId(id)};
        const result = await databaseCollections.deleteOne(query);
        res.send(result);

    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
});