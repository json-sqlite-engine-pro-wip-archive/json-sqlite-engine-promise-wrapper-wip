function newDatabaseConnection(jsonDatabaseEngine, jsonDatabaseHandle) {
  return {
    executeStatement: function executeStatement(statement, argsOrNil) {
      return new Promise(function(resolve, reject) {
        var args = !argsOrNil || !argsOrNil.length
            ? []
            : (function() {
                var a = argsOrNil;
                var r = [];
                var l = argsOrNil.length;
                for (var i=0; i<l; ++i) r.push(a[i]);
                return r;
	      })();

        var a2 = [].concat(null, statement, args.length, args, null);

        jsonDatabaseEngine.jsonExecuteStatement(
          [jsonDatabaseHandle, JSON.stringify(a2)],
          function(res) {
            var rs = JSON.parse(res);
            resolve(rs);
          }, function(error) {
            // XXX TODO PARSE the error (...)
            reject(error);
          });
      });
    },
    /** FUTURE TODO:
    *** executeBatch: function executeBatch(batch) {
    ***   // ...
    *** }
    **/
  }
}

var jsonSQLiteEnginePromiseWrapper = {
  newDatabaseConnection: newDatabaseConnection
};

if (typeof window !== ('' + undefined))
  window.jsonSQLiteEnginePromiseWrapper = jsonSQLiteEnginePromiseWrapper;

if (typeof module !== ('' + undefined))
  module.exports = jsonSQLiteEnginePromiseWrapper;
