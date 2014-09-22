'use strict';

var Context = require('../model/context.server.model'),
    logger = require('winston'),
    _ = require('lodash');

/**
 * Create a relevan context object
 * @param method - {String} list, create, read, update, delete
 * @param type - {String} pre, post
 */
exports.createContext = function(method, type){
    logger.info('Creating new Context for [' + method + ']');
    var extendMethod = contextService[type][method.toLocaleLowerCase()];

    if (!extendMethod || typeof extendMethod !== 'function'){
        logger.warning('Could not find [' + method + '] to extend context');
        return callback(null, context);
    }

    // Extend context and delegate callback
    return function(req, res, next){
        var context = new Context();
        extendMethod(req , res, context, function(err, context){
            if (err){
                return next(err);
            }

            req._crudContext = context;
            req.getCurdContext = function(){
                return this._crudContext;
            };

            next();
        });
    }
};

/**
 * A Context Service Instance
 */
var contextService = {
    pre : {
        list: function (req, res, context, callback) {
            return callback(null, context);
        },
        create: function (req, res, context, callback) {
            // Get the details
            context._details = _.cloneDeep(req.body);

            context.getDetails = function(){
                return this._details;
            };

            context.setDetails = function(newDetails){
                this._details = newDetails;
            };

            return callback(null, context);
        },
        read: function (req, res, context, callback) {
            return callback(null, context);
        },
        update: function (req, res, context, callback) {
            // Get the details
            context._details = _.cloneDeep(req.body);

            context.getDetails = function(){
                return this._details;
            };

            context.setDetails = function(newDetails){
                this._details = newDetails;
            };

            return callback(null, context);
        },
        delete: function (req, res, context, callback) {
            return callback(null, context);
        }
    },

    post : {
        list: function (req, res, context, callback) {
            return callback(null, context);
        },
        create: function (req, res, context, callback) {
            return callback(null, context);
        },
        read: function (req, res, context, callback) {
            return callback(null, context);
        },
        update: function (req, res, context, callback) {
            return callback(null, context);
        },
        delete: function (req, res, context, callback) {
            return callback(null, context);
        }
    }
};