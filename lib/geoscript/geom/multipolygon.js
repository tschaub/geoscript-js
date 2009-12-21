var GeometryCollection = require("geoscript/geom/collection").GeometryCollection;
var Polygon = require("geoscript/geom/polygon").Polygon;
var util = require("geoscript/util");
var jts = Packages.com.vividsolutions.jts;

/** api: (define)
 *  module = geom
 *  class = MultiPolygon
 */

/** api: (extends)
 *  geom/collection.js
 */
var MultiPolygon = util.extend(GeometryCollection, {
    
    /** private: componentDimension
     *  ``Number``
     *  The dimension of component geometries.
     */
    componentDimension: 2,
    
    /** private: property[_Type]
     *  ``Class``
     *  The jts geometry constructor for this collection.
     */
    _Type: jts.geom.MultiPolygon,
    
    /** api: constructor
     *  .. class:: MultiPolygon
     *  
     *      :arg coords: ``Array`` Coordinates array.
     *
     *      Create a new multipolygon geometry.  The items in the coords array
     *      may be polygon coordinates or :class:`Polygon` objects.
     */
    constructor: function MultiPolygon(coords) {
        GeometryCollection.prototype.constructor.apply(this, [coords]);
    }
    
});

/** api: example
 *  Sample code to new multi-polygon:
 * 
 *  .. code-block:: javascript
 * 
 *      var p1 = new geom.Polygon([
 *          [ [-180, -90], [-180, 90], [180, 90], [180, -90], [-180, -90] ],
 *          [ [-90, -45], [-90, 45], [90, 45], [90, -45], [-90, -45] ]
 *      ]);
 *      var p2 = new geom.Polygon([
 *          [ [-60, -30], [-60, 30], [60, 30], [60, -30], [-60, -30] ]
 *      ]);
 *      var mp = new geom.MultiPolygon([p1, p2]);
 *
 *  Alternate method to create the same geometry as above:
 * 
 *  .. code-block:: javascript
 * 
 *      var mp = new geom.MultiPolygon([
 *          [
 *              [ [-180, -90], [-180, 90], [180, 90], [180, -90], [-180, -90] ],
 *              [ [-90, -45], [-90, 45], [90, 45], [90, -45], [-90, -45] ]
 *          ], [
 *              [ [-60, -30], [-60, 30], [60, 30], [60, -30], [-60, -30] ]
 *          ]
 *      ]);
 */

exports.MultiPolygon = MultiPolygon;

// register a polygon factory for the module
var geom = require("geoscript/geom");
var Factory = require("geoscript/factory").Factory;
var _prepConfig = require("geoscript/geom/geometry")._prepConfig;

geom.register(new Factory(MultiPolygon, {
    handles: function(config) {
        config = _prepConfig(config);
        var capable = false;
        if (config.coordinates && config.coordinates instanceof Array) {
            for (var i=0, ii=config.coordinates.length; i<ii; ++i) {
                var c = config.coordinates[i];
                if (c instanceof Array) {
                    for (var j=0, jj=c.length; j<jj; ++j) {
                        var r = c[j];
                        if (r instanceof Array) {
                            for (var k=0, kk=r.length; k<kk; ++k) {
                                var p = r[k];
                                var len = p.length;
                                if (len === 2 || len === 3) {
                                    capable = true;
                                    for (var l=0; l<len; ++l) {
                                        capable = capable && (typeof p[l] === "number");
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return capable;
    }
}));