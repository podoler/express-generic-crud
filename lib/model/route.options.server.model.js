'use strict';

/**
 * A Specific route Options
 * @param routeName
 * @param options
 *          enable - Enable the specific route
 * @constructor
 */
function RouteOptions(routeName, options){
    this._routeName = routeName;

    this._enabled = typeof options.enable === 'undefined' ? true : options.enable;
}

/**
 * Route Name Getter
 * @returns {String}
 */
RouteOptions.prototype.getRouteName = function(){
    return this._routeName;
};

/**
 * isEnable Getter
 * @returns {boolean}
 */
RouteOptions.prototype.isEnabled = function(){
    return this._enabled;
};

module.exports = RouteOptions;