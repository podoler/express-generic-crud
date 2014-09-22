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
    this._hooks = {
        pre : {},
        post : {}
    };

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
    return this._route + (isParam ? this._parameter : '');
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
 * Name getter
 * @returns {String}
 */
Crud.prototype.getName = function(){
    return this._name;
};

/**
 * Pre Hook
 * @param method - {String} one of the methods
 * @param callback - {Function} in the form of callback(done)
 *          done - {Function} in the form of done(err)
 *              err - {Error}
 */
Crud.prototype.pre = function(method, callback){
    this._hooks.pre[method] = callback;
};

/**
 * Post Hook
 * @param method - {String} one of the methods
 * @param callback - {Function} in the form of callback(done)
 *          done - {Function} in the form of done(err)
 *              err - {Error}
 */
Crud.prototype.post = function(method, callback){
    this._hooks.post[method] = callback;
};

/**
 * Returns pre hook middleware
 * @param method - {String} one of the methods
 */
Crud.prototype.getPreHookMethod = function(method){
    var _this = this;
    return function(req, res, next){
        var runMethod = _this._hooks.pre[method];

        if (typeof runMethod !== 'function'){
            return next();
        }

        runMethod(req.getCrudContext(), next);
    };
};

/**
 * Returns post hook middleware
 * @param method - {String} one of the methods
 */
Crud.prototype.getPostHookMethod = function(method){
    var _this = this;
    return function(req, res, next) {
        var runMethod = _this._hooks.post[method];

        if (typeof runMethod !== 'function') {
            return next();
        }

        runMethod(req.getCrudContext(), next);
    }
};

module.exports = Crud;