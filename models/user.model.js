const connection = require('../db/db');

module.exports = {
    findOrCreate: function(profile, callback){
        console.log(profile.id);
        connection.execute('select * from User where userId = ?;',[profile.id],(err, rows, fields)=>{
            if(rows[0]){
                console.log(rows[0]);
                callback(rows[0]);
            } else {
                connection.execute('insert into User(userid,username,email) values(?,?,?);',[profile.id,profile.displayName,profile.email]);
                connection.execute('select * from User where userId = "?";',[profile.id],(err, rows, fields)=>{
                    callback(rows[0]);
                });
            }
        });
    },
    findById: function(id, callback){
        connection.execute('select * from User where userId = ? limit 1;',[id],(err,rows,fields)=>{
            callback(err, rows[0]);
        })
    }
}