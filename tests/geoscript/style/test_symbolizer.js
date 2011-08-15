var ASSERT = require("assert");
var STYLE = require("geoscript/style");
var Filter = require("geoscript/filter").Filter;

exports["test: constructor"] = function() {
    
    var symbolizer = new STYLE.Symbolizer({});
    
    ASSERT.ok(symbolizer instanceof STYLE.Symbolizer, "is Symbolizer");

};

exports["test: where"] = function() {

    var symbolizer = new STYLE.Symbolizer({});
    
    ASSERT.ok(!symbolizer.filter, "no filter before where");
    
    var o = symbolizer.where("foo='bar'");
    
    ASSERT.ok(o === symbolizer, "where returns self");
    ASSERT.ok(symbolizer.filter instanceof Filter, "where sets filter");
    
    ASSERT.strictEqual(symbolizer.filter.cql, "foo = 'bar'", "correct filter");
    
};

exports["test: range"] = function() {

    var symbolizer = new STYLE.Symbolizer({});
    
    ASSERT.ok(!symbolizer.minScaleDenominator, "no min before range");
    ASSERT.ok(!symbolizer.maxScaleDenominator, "no max before range");
    
    var o = symbolizer.range({min: 10, max: 20});
    
    ASSERT.ok(o === symbolizer, "range returns self");
    
    ASSERT.strictEqual(symbolizer.minScaleDenominator, 10, "correct min");
    ASSERT.strictEqual(symbolizer.maxScaleDenominator, 20, "correct max");
    
};

exports["test: and"] = function() {
    
    var s1 = new STYLE.Symbolizer({});
    var s2 = new STYLE.Symbolizer({});
    
    var composite = s1.and(s2);
    ASSERT.ok(composite instanceof STYLE.Composite, "is Composite");
    
    ASSERT.strictEqual(composite.parts.length, 2, "composite has two parts");
    ASSERT.ok(composite.parts[0] === s1, "first part");
    ASSERT.ok(composite.parts[1] === s2, "second part");

};

exports["test: opacity"] = function() {
    
    var symbolizer;
    
    // opacity in config
    symbolizer = new STYLE.Symbolizer({opacity: 0.5});
    ASSERT.strictEqual(symbolizer.opacity.text, "0.5", "opacity in config");
    
    symbolizer.opacity = 0.75;
    ASSERT.strictEqual(symbolizer.opacity.text, "0.75", "opacity setter");

    ASSERT.throws(function() {
        symbolizer.opacity = 1.5;
    }, Error, "opacity greater than 1");

    ASSERT.throws(function() {
        symbolizer.opacity = -2;
    }, Error, "opacity less than 0");

    ASSERT.throws(function() {
        symbolizer.opacity = "foo";
    }, Error, "bogus opacity");
    
};


if (require.main == module.id) {
    system.exit(require("test").run(exports));
}
