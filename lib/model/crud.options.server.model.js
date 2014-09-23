'use strict';

var operations = require('../data/crud.operations.server.data'),
    RouteOptions = require('./route.options.server.model');

/**
 * Create a CrudOptions object from an js object
 * @param options - {Object}
 *      resourceType - {String}
 *          1. mongodb
 *          2. static
 *      id - {String} - id which by it db index will be resolved
 *      route - {Object} - specific route options
 *          list - {RouteOptions}
 *          create - {RouteOptions}
 *          read - {RouteOptions}
 *          update - {RouteOptions}
 *          delete - {RouteOptions}
 * @constructor
 */
function CrudOptions(options){
    this._id = options.id || '_id';
    this._resourceType = options.resourceType || 'mongodb';
    this._routes = {};

    // default route options
    if (!options.route){
        options.route = {};
    }
    this._init(options);
}

/**
 * Initialize Crud Options
 * @private
 */
CrudOptions.prototype._init = function(options){
    // Add all routes options
    var routeOptions;
    for (var i in operations){
        routeOptions = options.route[operations[i]];

        // set Default
        if (!routeOptions){
            routeOptions = {};
        }

        this._routes[operations[i]] = new RouteOptions(operations[i], routeOptions);
    }
};

/**
 * Id getter
 * @returns {String}
 */
CrudOptions.prototype.getId = function(){
    return this._id;
};

/**
 * ResourceType getter
 * @returns {string}
 */
CrudOptions.prototype.getResourceType = function(){
    return this._resourceType;
};

/**
 * RouteOptions Getter
 * @param routeName - {String} route
 * @returns {RouteOptions}
 */
CrudOptions.prototype.getRouteOptions = function(routeName){
    return this._routes[routeName];
};

module.exports = CrudOptions;