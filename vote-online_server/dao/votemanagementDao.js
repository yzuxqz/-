const db = require("../db");

module.exports = {
  /**
   * 增加投票主题
   */
  addVoteTheme: function (
    category,
    title,
    begin_date,
    finish_date,
    ip_limit,
    vote_num,
    everyday
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        const {
          insertId,
        } = await db.query(
          "INSERT INTO vote_theme ( category, title,begin_date,finish_date,ip_limit,vote_num,everyday) VALUES (?,?,?,?,?,?,?)",
          [
            category,
            title,
            begin_date,
            finish_date,
            ip_limit,
            vote_num,
            everyday,
          ]
        );
        resolve(insertId);
      } catch (err) {
        reject(err);
      }
    });
  },
  /**
   * 增加投票选项
   */
  addVoteOption: function (content, img, vote_theme_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const {
          insertId,
        } = await db.query(
          "INSERT INTO vote_option ( content, img,vote_theme_id) VALUES (?,?,?)",
          [content, img, vote_theme_id]
        );
        resolve(insertId);
      } catch (err) {
        reject(err);
      }
    });
  },
  /**
   * 查询投票选项中的总数
   */
  queryAllCount:function (id){
    return new Promise(async (resolve, reject) => {
      try {
        const res = await db.query(
            "SELECT all_count FROM vote_option WHERE id=?",
            [id]
        );
        resolve(res);
      } catch (err) {
        reject(err);
      }
    });
  },
  /**
   * 更新投票选项中的总数
   */
  addAllCount:function (id,allCount){
    return new Promise(async (resolve, reject) => {
      try {
        const res = await db.query(
            "UPDATE vote_option SET all_count=? WHERE id=?",
            [allCount,id]
        );
        resolve(res);
      } catch (err) {
        reject(err);
      }
    });
  },
  /**
   * 增加额外信息
   */
  addExtraInfo: function (
    type,
    value,
    options,
    label,
    vote_theme_id,
    required,
    name
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        const {
          insertId,
        } = await db.query(
          "INSERT INTO vote_extra_per_info (type,value,options,label,vote_theme_id,required,name) VALUES (?,?,?,?,?,?,?)",
          [type, value, options, label, vote_theme_id, required, name]
        );
        resolve(insertId);
      } catch (err) {
        reject(err);
      }
    });
  },

queryAllVoteThemes:function (){
    return new Promise(async (resolve,reject)=>{
      try {
        const result = await db.query("SELECT * FROM vote_theme WHERE exist=1");
        resolve(result);
      } catch (err) {
        reject(err);
      }
    })
},
  /**
   * 分页查询投票主题
   */
  queryVoteThemes: function (pageSize, currentPage) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await db.query("SELECT * FROM vote_theme WHERE exist=1 LIMIT ?,?", [
          (currentPage - 1) * pageSize,
          pageSize * 1,
        ]);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  },
  queryVoteThemeByCategory: function (category, pageSize, currentPage) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await db.query(
          "SELECT * FROM vote_theme WHERE category=? AND exist=1 LIMIT ?,?",
          [category, (currentPage - 1) * pageSize, pageSize * 1]
        );
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  },
  queryVoteThemeCount: function () {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await db.query("SELECT count(*) FROM vote_theme WHERE exist=1");
        resolve(result[0]["count(*)"]);
      } catch (err) {
        reject(err);
      }
    });
  },
  queryVoteThemeCountByCategory:function(category){
    return new Promise(async (resolve, reject) => {
      try {
        const result = await db.query("SELECT count(*) FROM vote_theme WHERE category=? AND exist=1",[category]);
        resolve(result[0]["count(*)"]);
      } catch (err) {
        reject(err);
      }
    });
  },
  deleteVoteTheme:function(id){
    return new Promise(async (resolve, reject) => {
      try { 
        const {changedRows} = await db.query('UPDATE vote_theme SET exist=0 WHERE id=?', [id])
        resolve(changedRows);
      } catch (err) {
        reject(err);
      }
    });
  },
  /**
   * 查询投票选项
   */
  queryVoteOptions:function (id){
    return new Promise(async (resolve, reject) => {
      try {
        const result = await db.query('select * FROM vote_option  WHERE vote_theme_id=? and exist=1', [id])
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  },
  /**
   * 查询额外采集表
   */
  queryVoteExtraInfo:function (id){
    return new Promise(async (resolve, reject) => {
      try {
        const result = await db.query('select * FROM vote_extra_per_info  WHERE vote_theme_id=? and exist=1', [id])
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }
};
