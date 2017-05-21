var db=require('../dbconnection'); //reference of dbconnection.js
var answer = {
  getAllAnswers: function(callback) {
    return db.query("SELECT * FROM comments WHERE root_id IS NOT NULL", callback);
  },

  addAnswer: function(answer, ip, callback) {
    return db.query('INSERT INTO comments (name, email, user_text, parent_id, root_id, ip_b) VALUES(?,?,?,?,?,?)',
    [answer.name, answer.email, answer.user_text, answer.parent_id, answer.root_id, ip], callback);
  },
};

 module.exports=answer;
