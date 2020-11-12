const http=require("http");//requiring the http module to make the http server
const port=8000;//port number on which the server is to be run
const fs=require("fs");//requiring the file system module for performing file read, write etc. operations

const server=http.createServer(requestHandler);//creating the http server and passing to it the requestHandler funciton to handle the incoming request

server.listen(port, function(err){

    if(err){
        console.log("Error in running the server : "+err);
        return ;
    }
    console.log("Server is up and running on port : "+port);
    
});//we ask the server to listen at the port number 8000 and then handle error(if there is any)

function requestHandler(req, res){

    res.writeHead(200, {"content-type": "text/html"});//this is used to tell the response header the status of the response(200 meaning successful) and the type of the data we are serving 

    let filePath=null;//default path value

    switch(req.url){

        case "/" :
            filePath="./home.html";
            break;
        case "/home" : 
            filePath="./home.html";
            break;
            
        case "/profile" : 
            filePath="./profile.html";
            break;
        default :
            filePath="./404.html";

    };//choosing the appropriate page to be sent as the response accoring to the url of the request

    fs.readFile(filePath, function(err, data){

        if(err){
            console.log("Error in reading the file : "+err);
            return res.end("<h1>Error in reading the file</h1>")
        }
        return res.end(data);

    });//here we're reading the file associated with the filePath and send the file if there is no error to the browser else we send an error message
 
};//this is the request handler function to handle the incoming request and provide a response