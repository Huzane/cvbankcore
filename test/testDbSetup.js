//Make sure I have the db as global object
//require this file at the begining of tests
var ldb;
if (global.db === undefined) {
    global.db = require("../lib/data/db.js")();
    ldb = global.db;
}else {
    ldb = global.db;
}

module.exports.open = function (callback) {
    ldb.open(callback);
};

module.exports.close = function (callback) {
    ldb.close();
};
