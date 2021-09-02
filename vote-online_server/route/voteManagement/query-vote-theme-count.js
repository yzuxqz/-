const voteManagementDao = require("../../dao/votemanagementDao");

module.exports = async (req,res) => {
  const {category} = req.query
  if(category){
    try {
      const count = await voteManagementDao.queryVoteThemeCountByCategory(category);
      res.send({
        code: "000",
        data: {
          count
        },
      });
    } catch (err) {
      res.send({
        code: "005",
        data: {
          message: `数据库错误${err}`,
        },
      });
    }
  }else{
    try {
      const count = await voteManagementDao.queryVoteThemeCount();
      res.send({
        code: "000",
        data: {
          count
        },
      });
    } catch (err) {
      res.send({
        code: "005",
        data: {
          message: `数据库错误${err}`,
        },
      });
    }
  }

};
