'use string';

var route = require('../route/crud.server.route');

/**
 * Crud object
 * @param name - {String} name of the Crud module
 * @param resource - {Object} resource to use for the crud
 * @param options - {CrudOptions}
 * @param app - {Express Application}
 * @param owner {Crud} owner of this object
 * @constructor
 */
function Crud(name, resource, options, app, owner){
    this._name = name;
    this._resource = resource;
    this._options = options;
    this._app = app;
    this._owner = owner;
    this._route = '/' + name;
    this._parameter = '/:' + options.getId();

    this._init();
}

/**
 * Initialize Crud Object
 * @private
 */
Crud.prototype._init = function(){
    // Create Routes
    route.route(this._app, this);
};

/**
 * Get The Route URL
 * @param isParam - {Boolean} to return with the parameter
 */
Crud.prototype.getRoute = function(isParam){
    return this._route + (isParam ? this.param : '');
};

/**
 * Resource getter
 * @returns {*}
 */
Crud.prototype.getResource = function(){
    return this._resource;
};

/**
 * Options getter
 * @returns {CrudOptions}
 */
Crud.prototype.getOptions = function(){
    return this._options;
};

/**
 * Middleware to piggybag crud over request
 * @param req - {Request}
 * @param res - {Response}
 * @param next - {Function}
 */
Crud.prototype.piggyBagMiddleware = function(req, res, next){
    // piggybag me
    req._crud = this;

    // use getter
    req.getCrud = function(){
        return this._crud;
    };

    // continue
    next();
};

module.exports = Crud;