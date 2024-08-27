var mysql=require("mysql")
var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root459",
    database:"foodize"
});
con.connect(function(err) {
    if (err) throw err;
    console.log('Database is connected successfully !');
})
// con.end();
module.exports=con;