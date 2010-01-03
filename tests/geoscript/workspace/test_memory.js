var assert = require("test/assert");
var workspace = require("geoscript/workspace");

exports["test: constructor"] = function() {

    var mem = new workspace.Memory();
    
    assert.isTrue(mem instanceof workspace.Workspace, "instanceof Workspace");
    assert.isTrue(mem instanceof workspace.Memory, "instanceof Memory");    

};

if (require.main === module.id) {
    require("test/runner").run(exports);
}
