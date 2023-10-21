const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId, upsert } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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
    const dataBase = client.db("brandShop");
    const productsCollection = dataBase.collection("allProducts");
    const cartCollection = dataBase.collection("cart");

    // get all phone data
    app.get("/all_items", async (req, res) => {
      const response = productsCollection.find();
      const products = await response.toArray();
      res.send(products);
    });

    // get all phone data based on phone brand
    app.get("/brand/:name", async (req, res) => {
      const brandname = req.params.name;
      console.log(brandname);
      const query = { brandName: brandname };
      const response = await productsCollection.find(query);
      const expectedData = await response.toArray();
      console.log(expectedData);
      res.send(expectedData);
    });

    // get all cart data
    app.get("/cart", async (req, res) => {
      const response = cartCollection.find();
      const products = await response.toArray();
      res.send(products);
    });

    // get single phone data , based on id
    app.get("/product/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const expectedData = await productsCollection.findOne(query);
      // console.log(expectedData);
      res.send(expectedData);
    });

    // add product
    app.post("/product", async (req, res) => {
      const data = req.body;
      // console.log(data);
      const result = await productsCollection.insertOne(data);
      res.send(result);
    });

    // add product to cart
    app.post("/addcart", async (req, res) => {
      const data = req.body;

      const { id, loggedUser } = data;

      const query = { _id: new ObjectId(id) };
      const expectedData = await productsCollection.findOne(query);
      const withUID = { ...expectedData, loggedUser };
      const option = { upsert: true };
      const update = {
        $set: {
          ...withUID,
        },
      };
      const result = await cartCollection.updateOne(query, update, option);

      res.send(result);
      console.log(withUID);
    });

    //  update item
    app.put("/update/:id", async (req, res) => {
      const id = req.params.id;

      const updatedData = req.body;

      const query = { _id: new ObjectId(id) };
      const option = { upsert: true };
      const update = {
        $set: {
          ...updatedData,
        },
      };
      const result = await productsCollection.updateOne(query, update, option);
      res.send(result);

      //
    });

    // delete from cart
    app.delete(`/addcart/:id`, async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await cartCollection.deleteOne(query);
      res.send(result);
    });

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
