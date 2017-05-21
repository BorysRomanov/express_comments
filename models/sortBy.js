var db=require('../dbconnection'); //reference of dbconnection.js
var sortComments = {
  getAllSortComments: function(colum, order, page, res) {
    db.query('SELECT COUNT(*) AS `totalRows` FROM comments WHERE root_id IS NULL', function(err, rows) {
      var length = getSortCommentsCount(rows);
      var totalPage = Math.ceil(length / 25);
      var offset = getPage(page);
      if (length / 25 < offset -1) offset = 1;
      var result = {totalPage: totalPage, currentPage: offset};
      writeSortJsonResponse(colum, order, offset, result, res);
    });
  },
};

function getPage(page) {
  return page < 1 ? 1 : page;
}

function writeSortJsonResponse(colum, order, offset, result, response) {
  console.log(colum, order);
  var sorting = 'SELECT * FROM comments WHERE root_id IS NULL ORDER BY ' + colum + ' ' + order +' LIMIT ?, ?';
  db.query(sorting, [(offset - 1) * 25, 25], function(err, rows) {
      result.comments = rows;
      response.json(result);
  });
}

function getSortCommentsCount(rows) {
  return rows[0].totalRows;
}

module.exports=sortComments;
