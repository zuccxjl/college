var express = require('express');  
var bodyParser = require('body-parser');
var app = express();  //创建express的实例


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var mysql = require('mysql'); 

app.use(require('cors')());

var connection = mysql.createConnection({      //创建mysql实例
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'31601187',
    database:'vue'
});
connection.connect();


var sql;
var str = " ";



//connection.end();

/*
app.get('/hello?username?password', function(req, res){
    console.log(req.params.username);
    console.log(req.params.password);
    console.log(req.params);
    res.send('Hello,myServer'); //服务器响应请求


});
*/

app.post('/minegamelogin',(req,res)=>{
    console.log(req.body.username);
    console.log(req.body.password);
    var userName=req.body.username;
    var password=req.body.password;
    sql= "select * from user where username = '"+userName+"'";
    connection.query(sql, function (err,result) {
        if(err){
            console.log('[SELECT ERROR]:',err.message);
            res.send('登录失败: '+err);
        }
        else{  
            console.log(result);

            
            if(result == ''){
                res.send('null');
            }
           
            else if(password == result[0].passwd){
                res.send('success');
            }
            else{
                res.send('login fail');
            }
            
        }
        
    });

})


app.post('/minegameregister',(req,res)=>{
    console.log(req.body.newUsername);
    console.log(req.body.newPassword);
    var newUsername=req.body.newUsername;
    var newPassword=req.body.newPassword;

    sql = "insert into user(username,passwd) values('"+newUsername+"','"+newPassword+"')";
    connection.query(sql, function (err,result) {
        if(err){
            console.log('[SELECT ERROR]:',err.message);
            res.send('注册失败: '+err);
        }
        else{
            console.log(result);
            res.send('success');
        }
        
    });

})

app.post('/minegamesavegoal',(req,res)=>{
    console.log(req.body.username);
    console.log(req.body.goal);
    var username=req.body.username;
    var goal=req.body.goal;
    if (username===""){
        username="游客";
    }
    sql = "insert into rank(username,goal) values('"+username+"','"+goal+"')";
    connection.query(sql, function (err,result) {
        if(err){
            console.log('[SELECT ERROR]:',err.message);
            res.send('添加失败: '+err);
        }
        else{
            console.log(result);
            res.send('success');
        }
        
    });

})

app.post('/minegamerank',(req,res)=>{

    sql="select * from rank order by goal asc limit 0,10";
    connection.query(sql, function (err,result) {
        if(err){
            console.log('[SELECT ERROR]:',err.message);
            res.send('连接失败: '+err);
        }
        else{  
            console.log(result);
            res.send(result);
            
            if(result == ''){
                res.send('null');
            }
            
        }
        
    });


});






app.listen(3001,function(){   //监听3001端口
    console.log("Server running at 3001 port");
});

