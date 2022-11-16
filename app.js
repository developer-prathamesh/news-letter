const bodyParser = require('body-parser')
const express = require('express')
const https = require('https')    
const request = require ('request')

const app = express()

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}))


app.get('/', (req, res, next) => {
    res.sendFile(__dirname+"/signup.html")

})

app.post('/', (req, res, next) => {

    const  firstName = req.body.fname
    const  lastName = req.body.lname
    const email = req.body.email

    const data = {
        members : [{
            email_address : email,
            status :"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName
            }
        }]

    }

    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/7ab21475e7c"
    const options = {
        method:"Post",
        auth:"psk:330284f1a3b1f43d0243920990caf370-us21"
    
    }

    const request = https.request(url,options,function(response){

        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html")
            
        }else{
            res.sendFile(__dirname+"/failure.html")

        }

        response.on("data",function(data){
            console.log(JSON.parse(data))
            
        })
    })
    request.write(jsonData)
    request.end()
})


app.post("/failure",function(req,res){
    // res.sendFile(__dirname+"/failure.html")
    res.redirect("/")

})
// 330284f1a3b1f43d0243920990caf370-us21
// 7b21475e7c


app.listen(process.env.PORT||3000,function(req,res) {
    console.log('listening on port 3000')

})