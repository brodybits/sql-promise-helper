module.exports = function(db) {
  return {
    sqlBatch: function(batch, ok, error) {
      db.transaction(function(tx) {
        for (var i=0; i<batch.length; ++i) {
          const e = batch[i];
          const hasParams = e instanceof Array;
          const sql = hasParams ? e[0] : e;
          const params = hasParams ? e[1] : null;
          tx.executeSql(sql, params);
        }
      }, error, ok);
    }
  }
}
