const express=require("express");
const bodyParser = require("body-parser");
const ejs=require("ejs");
const _=require("lodash");

const app=express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("vendor"));

class personDetails{
    constructor(name,branch){
        this.name=name;
        this.branch=branch;
        this.posts=[];
    }
}
const person=[new personDetails("Sagar","CHEM"),
               new personDetails("Shivam","ECE"),
            new personDetails("Bansal","ECE"),
        new personDetails("Yash","CSE"),
        new personDetails("Sagar","CHEM"),
        new personDetails("Shivam","ECE"),
     new personDetails("Bansal","ECE"),
 new personDetails("Yash","CSE")];

    // p=new personDetails("Sagar","Chem");
    // p.posts.push("GOOOOd");
    // p.posts.push("BBBSSDSD");
    // p.posts.push("BGJDBSJSIGISDOIGSD");
    // person.push(p);


    // personDetails=new personDetails("GAGA","CSE");
    // personDetails.posts.push("hello dear");
    // personDetails.posts.push("bad baaa");
    // personDetails.posts.push("gamer");
    // person.push(personDetails);    


app.get("/",function(req,res){
    res.render("index",{
        person:person
    })
})

app.get("/posts/:postName",function(req,res){
    const temp=_.lowerCase(req.params.postName);
    person.forEach(function(p){
        if(temp===_.lowerCase(p.name))
            res.render("posts",{
                pName:p.name,
                pBranch:p.branch
            })
    })
});


app.post("/",function(req,res){
    personDetails=new personDetails(req.body.name,req.body.branch);
    personDetails.posts.push(req.body.post);
    person.push(personDetails);
    res.redirect("/");
})

app.get("/login",function(req,res){
    res.sendFile(__dirname+"/login.html");
})

app.get("/signup",function(req,res){
    res.send("Sign Up");
})



app.listen(3000,function(){
    console.log("Server running on port 3000");
})