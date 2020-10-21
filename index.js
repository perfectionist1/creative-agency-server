const  express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());



const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://organicUser:Bangladesh331551@cluster0.plevr.mongodb.net/creative-agency?retryWrites=true&w=majority";


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const WebDetails = client.db("creative-agency").collection("web");
  
   

    app.post('/order', (req, res) => {
        const order = req.body;
        WebDetails.insertOne(order)
        .then( result => {
            res.send(result.insertedCount > 0)
        })     
        console.log(order);   
    })

    app.get('/order', (req, res) => {
        WebDetails.find({})
        .toArray( (err, documents) => {
            res.send(documents);
        })
    })

    app.get('/', (req, res) => {
    res.send('Hey, how are you Node?');
    });



  //client.close();
});



app.listen(process.env.PORT || 4000);