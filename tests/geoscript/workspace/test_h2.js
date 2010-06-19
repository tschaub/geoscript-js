var assert = require("assert");
var workspace = require("geoscript/workspace");
var layer = require("geoscript/layer");
var FS;
try {
    // CommonJS
    FS = require("fs");
} catch (err) {
    // Narwhal
    FS = require("file");
}

var admin = require("../../admin");

var database = FS.join(admin.h2.dest, "geoscript");
exports.setUp = admin.h2.setUp;
exports.tearDown = admin.h2.tearDown;

exports["test: constructor"] = function() {

    var h2 = new workspace.H2();
    
    assert.ok(h2 instanceof workspace.Workspace, "instanceof Workspace");
    assert.ok(h2 instanceof workspace.H2, "instanceof H2");    
    
    h2.close();

};

exports["test: names"] = function() {

    var h2 = new workspace.H2({database: database});
    // TODO: change this when "_GEOH2" is filtered from layer names
    assert.ok(h2.names.indexOf("states") > -1, "h2.names includes 'states'");

    h2.close();
    
};

exports["test: get"] = function() {

    var h2 = new workspace.H2({database: database});
    
    var states = h2.get("states");
    assert.ok(states instanceof layer.Layer, "get returns a layer instance");

    h2.close();

};

if (require.main == module.id) {
    require("test").run(exports);
}
