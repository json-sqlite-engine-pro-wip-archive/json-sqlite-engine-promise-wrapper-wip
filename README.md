# json-sqlite-engine-promise-wrapper-wip

Promise wrapper for `cordova-json-sqlite-memory-engine-pro-wip-free`

**AUTHOR:** Christopher J. Brody <chris@brody.consulting>

**LICENSE:** MIT

## Quick usage

### Quick sample usage

To open a database and create a promise wrapper object:

```js
// database connection wrapper object:
var databaseConnection = null;

document.addEventListener('deviceready', function() {
  window.jsonSQLiteEngine.openDatabaseHandle([':memory:'], function(result) {
    var databaseHandle = result[0];
    databaseConnection =
      window.jsonSQLiteEnginePromiseWrapper.newDatabaseConnection(
        window.jsonSQLiteEngine, databaseHandle);
  });
});
```

SELECT data with no arguments:

```js
databaseConnection.executeStatement(
  "SELECT upper('Test string') AS upperText")
    .then(function(rs) {
      console.log(
        'received upperText result value (ALL CAPS): ' +
         rs[0].rows[0].upperText);
    })
    .catch(function(error) {
      console.log('SELECT value error: ' + error.message);
    });
```

SELECT data with an argument parameter:

```js
databaseConnection.executeStatement(
  'SELECT upper(?) AS upperText', ['Test string'])
    .then(function(rs) {
      console.log('received upperText result value (ALL CAPS): ' + rs[0].rows[0].upperText);
    })
    .catch(function(error) {
      console.log('SELECT value error: ' + error.message);
    });
```

INSERT some data:

```js
databaseConnection.executeStatement(
  'INSERT INTO SampleTable VALUES (?,?)', ['User '+newUserId, newUserId])
    .then(function() {
      console.log('INSERT OK');
      ++newUserId;
    })
    .catch(function(error) {
      console.log('INSERT error: ' + error.message);
    });
```

