const express=require("express");
const app=express();
const path=require('path');

const bodyParser=require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/aa1', {useNewUrlParser: true});

const port =process.env.PORT || 4008;
require("dotenv").config();
const { auth, requiresAuth } = require('express-openid-connect');




//middleware for static files
const staticpath=path.join(__dirname,"../public")
app.use(express.static(path.join(staticpath)));

//view engine Handlebars 
app.engine("html",require("hbs").__express);
app.set("view engine","html");
app.set('views',path.join(__dirname,"../views"));

// authentication
app.use(
    auth({
  
      authRequired : false,
      auth0Logout : true,
      issuerBaseURL: process.env.ISSUER_BASE_URL,
      baseURL: process.env.BASE_URL,
      clientID: process.env.CLIENT_ID,
      secret: process.env.SECRET,
      idpLogout: true,
    })
  );

const formatePath=path.join(__dirname , '../public/formate.html');
app.get("/",(req,res)=>{

    req.oidc.isAuthenticated() ?  res.redirect("/formate"): res.redirect("/login");
    
});


var db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',function(){
    console.log("\nDatabase connected...");
});

const firmDetails=new mongoose.Schema({
    companyName :{
        type : String,
        required : true,
        
    },
    ownerName :{
        type : String,
        required : true,
        
    },
    companyAddress :{
        type : String,
        required : true,
        
    },
    phone1 :{
        type : Number,
        required : true
        
    },
    email :{
        type : String,
        required : true,
        
    },
    GSTID :{
        type : String,
        required : true,
        
    }

})
const newusers=new mongoose.model("newUser",firmDetails);



app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));


app.get('/formate',function(req,res){
    
    const profile=req.oidc.user;

    
    try {
        var test =profile['name'];

        const getDocument= async() =>{
            const myformate = await newusers.find( { email:  profile['name'] } ).limit(1);
            
    
            myformate[0] !== undefined ? res.redirect("/invoice") : res.sendFile(formatePath);
            
        }
        
        getDocument();
        
    } catch (error) {
        res.redirect('/login');
    }
    
    

    
});

app.get('/editFormate',function(req,res){
    
        res.sendFile(formatePath);  
});



app.post("/formate",function(req,res){
    
        

        
       //Adding new user's firm details into db.
    const profile=req.oidc.user;
 
    
    const fetchDocument= async() =>{
        

        const myformate = await newusers.find( { email:  profile['name'] } ).limit(1);
        //for existing user (edit mode) 
        if( myformate[0] !== undefined )
        {   
            // console.log("change");
            var changeableDocument = { email: profile['name'] };
            const newValues={ $set : {
            companyName :req.body.companyName,
            ownerName :req.body.ownerName,
            companyAddress :req.body.companyAddress,
            phone1 :req.body.phone1,
            email : profile['name'],
            GSTID :req.body.GSTID
        }};
            newusers.updateOne(changeableDocument, newValues,()=>{
                ;
            });
        } 

        // for new user
        else{

            
            const createDocument= async ()=>{


            const current=new newusers({
                companyName :req.body.companyName,
                ownerName :req.body.ownerName,
                companyAddress :req.body.companyAddress,
                phone1 :req.body.phone1,
                email : profile['name'],
                GSTID :req.body.GSTID
            });


            await current.save();
        }
        createDocument();

        }
        
    }
    
    fetchDocument();
    
    
        res.redirect('/invoice');
        
   
});


// Today's Date (not backend)
var getDate = ()=>{

    today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    
    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;
    return (dd+'/'+mm+'/'+yyyy);
};

const invoicePath=path.join(__dirname , '../public/Invoice.html');
app.get('/invoice',function(req,res){

    
    const profile=req.oidc.user;

    try {

        var test =profile['name'];


        const getDocument= async() =>{
            const myformate = await newusers.find( { email:  profile['name'] } ).limit(1);
    
            
            if(myformate[0]!==undefined){
            res.render("invoice.html",{
                contact : myformate[0]['phone1'],
                email :  myformate[0]['email'].toLowerCase(),
                gstid :  myformate[0]['GSTID'],
                companyName :  myformate[0]['companyName'].toUpperCase(),
                companyAddress :  myformate[0]['companyAddress'].toUpperCase(),
                ownerName: myformate[0]['ownerName'].toUpperCase(),
                Date : getDate()
        
            });
            }
            else res.redirect('/login');
        }
    
        getDocument();
        
    } catch (error) {

        res.redirect('/login');
        
    }
   

});

app.listen(4008,function(){
    console.log("\nserver started.");
});

