'use strict';

var Context = require('../model/context.server.model');

/**
 * Create a relevan context object
 */
exports.createContext = function(){
    // Extend context and delegate callback
    return function(req, res, next){
        var context = new Context();

        req._crudContext = context;
        req.getCurdContext = function(){
            return this._crudContext;
        };

        next();
    };
};