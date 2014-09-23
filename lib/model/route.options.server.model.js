'use strict';

/**
 * A Specific route Options
 * @param routeName
 * @param options
 * @constructor
 */
function RouteOptions(routeName, options){
    this._routeName = routeName;

}

/**
 * Route Name Getter
 * @returns {String}
 */
RouteOptions.prototype.getRouteName = function(){
    return this._routeName;
};

module.exports = RouteOptions;