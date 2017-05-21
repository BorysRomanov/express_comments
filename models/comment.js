var db=require('../dbconnection'); //reference of dbconnection.js
var comment = {
  getAllComments: function(page, res) {
    db.query('SELECT COUNT(*) AS `totalRows` FROM comments WHERE root_id IS NULL', function(err, rows) {
      var length = getCommentsCount(rows);
      var totalPage = Math.ceil(length / 25);
      var offset = getPage(page);
      if (length / 25 < offset -1) offset = 1;
      var result = {totalPage: totalPage, currentPage: offset};
      writeJsonResponse(offset, result, res);
    });
  },

  addComment: function(comment, ip, callback) {
    return db.query('INSERT INTO comments (name, email, user_text, ip_b) VALUES(?,?,?,?)',
    [comment.name, comment.email, comment.user_text, ip], callback);
  },
}

function getPage(page) {
  return page < 1 ? 1 : page;
}

function writeJsonResponse(offset, result, response) {
  db.query('SELECT * FROM comments WHERE root_id IS NULL ORDER BY add_date DESC LIMIT ?, ?',
    [(offset - 1) * 25, 25], function(err, rows) {
      result.comments = rows;
      response.json(result);
  });
}

function getCommentsCount(rows) {
  return rows[0].totalRows;
}

module.exports=comment;
