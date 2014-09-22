'use strict';

var _ = require('lodash');

/**
 * Middleware Service
 */
module.exports = {
    pre : {
        list: function (req, res, next) {
            next();
        },
        create: function (req, res, next) {
            var context = req.getCrudContext();
            // Get the details
            context._details = _.cloneDeep(req.body);

            context.getDetails = function(){
                return this._details;
            };

            context.setDetails = function(newDetails){
                this._details = newDetails;
            };

            next();
        },
        read: function (req, res, next) {
            next();
        },
        update: function (req, res, next) {
            var context = req.getCrudContext();
            // Get the details
            context._details = _.cloneDeep(req.body);

            context.getDetails = function(){
                return this._details;
            };

            context.setDetails = function(newDetails){
                this._details = newDetails;
            };

            next();
        },
        delete: function (req, res, next) {
            next();
        }
    },

    post : {
        list: function (req, res, next) {
            var context = req.getCrudContext();
            addContextOutput(context, res._crudOutput);

            next();
        },
        create: function (req, res, next) {
            var context = req.getCrudContext();
            addContextOutput(context, res._crudOutput);

            next();
        },
        read: function (req, res, next) {
            var context = req.getCrudContext();
            addContextOutput(context, res._crudOutput);

            next();
        },
        update: function (req, res, next) {
            var context = req.getCrudContext();
            addContextOutput(context, res._crudOutput);

            next();
        },
        delete: function (req, res, next) {
            var context = req.getCrudContext();
            addContextOutput(context, res._crudOutput);

            next();
        }
    }
};

function addContextOutput(context, output){
    context._crudOutput = output;

    context.setOutput = function(newOutput){
        this._crudOutput = newOutput
    };

    context.getOutput = function(){
        return this._crudOutput;
    };
}