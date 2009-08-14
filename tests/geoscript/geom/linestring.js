var assert = require("test/assert"),
    geom = require("geoscript/geom");

exports.test_LineString = function() {
    
    var l = new geom.LineString([[-180, -90], [0, 0], [180, 90]]);
    
    assert.isTrue(l instanceof geom.Geometry, "line is a geometry");
    assert.isTrue(l instanceof geom.LineString, "line is a line");
    assert.isEqual(3, l.coordinates.length, "line has three coordinates");
    assert.isEqual(402.49223594996215, l.getLength(), "line has correct length");

    
};

exports.test_wkt = function() {

    var l = new geom.LineString([[-180, -90], [0, 0], [180, 90]]);
    assert.isEqual("LINESTRING (-180 -90, 0 0, 180 90)", l.toWKT(), "correct wkt");

};


if (require.main === module.id) {
    require("test/runner").run(exports);
}