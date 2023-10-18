const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId, upsert } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

console.log(process.env.DB_USER);
console.log(process.env.DB_PASS);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@coffeemaster.pnefqpd.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    //   const dataBase = client.db("CoffeeMaster");
    //   const dataCollection = dataBase.collection("coffeeRecipe");
    //   const userCollection = dataBase.collection("userCollection");

    // get all recipe
    //   app.get("/recipe", async (req, res) => {
    //     const response = dataCollection.find();
    //     const responseData = await response.toArray();
    //     console.log(responseData);
    //     res.send(responseData);
    //   });

    // get single data
    //   app.get("/recipe/:id", async (req, res) => {
    //     const id = req.params.id;
    //     const query = { _id: new ObjectId(id) };

    //     const expectedData = await dataCollection.findOne(query);

    //     console.log(expectedData);

    //     res.send(expectedData);
    //   });

    // add recipe
    //   app.post("/recipe", async (req, res) => {
    //     const data = req.body;

    //     console.log(data);
    //     const result = await dataCollection.insertOne(data);

    //     res.send(result);
    //   });

    // add user
    //   app.post("/user", async (req, res) => {
    //     const data = req.body;

    //     console.log(data);

    //     const result = await userCollection.insertOne(data);

    //     res.send(result);
    //   });

    // update item
    //   app.put("/recipe/:id", async (req, res) => {
    //     const id = req.params.id;
    //     const updatedData = req.body;
    //     console.log(updatedData);
    //     const query = { _id: new ObjectId(id) };
    //     const option = { upsert: true };
    //     const update = {
    //       $set: {
    //         ...updatedData,
    //       },
    //     };
    //     const result = await dataCollection.updateOne(query, update, option);
    //     res.send(result);
    //   });

    // delete a recipe
    //   app.delete(`/recipe/:id`, async (req, res) => {
    //     const id = req.params.id;
    //     const query = { _id: new ObjectId(id) };
    //     const result = await dataCollection.deleteOne(query);
    //     res.send(result);
    //   });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("brand shop server is running ");
});

app.listen(port, () => {
  console.log(`listening from port ${port}`);
});
