const express = require("express");
const app = express();
const mongoose = require("mongoose")
const dotenv=require('dotenv');
dotenv.config({path:'./config.env'});
const cors = require("cors");


app.use(cors());
app.use(express.json());
const db = process.env.DATABASE;

mongoose.connect(db).then(()=>console.log("Connection Successful")).catch((err)=>console.log("no connection"))


const adSchema = new mongoose.Schema({
    companyId : {type: mongoose.Schema.Types.ObjectId, ref: "Company"},
    primaryText : {type:String,required:true},
    headline : {type:String,require:true},
    description : {type:String,require:true},
    CTA: {type:String},
    imageUrl: {type:String,require:true},
});




const companySchema = new mongoose.Schema({
    name: {type:String,require:true},
    url: {type:String,require:true}
});


const Ads = mongoose.model("Ad",adSchema)

const Company = mongoose.model("Company",companySchema)


app.get("/search/:key", async (req, res) => {
  let term = req.params.key;
  
  let data = await Ads.find().or([
    {headline: new RegExp(term, 'i')},
    {primaryText: new RegExp(term, 'i')},
    {description: new RegExp(term, 'i')},
    {CTA: new RegExp(term, 'i')},
]).populate("companyId");  
 
  res.status(201).send(data);
});




// app.post('/createAd',async (req, res) => {
//     const {name,description, imageUrl, headline,primaryText,CTA } = req.body;
//     const companyid= await Company.findOne({name:name})
//     const user = new Ads({ companyId: await Company.findOne({name:name}), description, imageUrl, headline,primaryText,CTA });
//        user.save((a,b)=>{
//             console.log(a)
//         });

//     res.send(user);
//     console.log(companyid);

   
   
//   })

// app.post('/createCompany',async (req, res) => {
//     const { name,url} = req.body;
    
//     const user = new Company({ name,url });
//        user.save((a,b)=>{
//             console.log(a)
//         });

//     res.send(user);
   
//   })
    

app.listen(1338);


    