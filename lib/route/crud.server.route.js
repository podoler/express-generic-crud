'use strict';

var crudController = require('../controller/crud.server.controller'),
    contextService = require('../service/context.server.service'),
    logger = require('winston');

/**
 * Create route for crud
 * @param app - {Express Application}
 * @param crud - {Crud}
 */
exports.route = function(app, crud){
    if (crud.getOptions().getResourceType() === 'static'){
        return routeStatic(app, crud);
    }

    routeMongoDB(app, crud);
};

function routeStatic(app, crud){
    app.route(crud.getRoute(false))
        // Get List
        .get(crudController.staticGet(crud.getResource()), tempEnd)
}

function routeMongoDB(app, crud){
    app.route(crud.getRoute(false))
        // Get List
        .get(   piggyBagMiddleware(crud),
                contextService.createContext('list', 'pre'),
                crud.getPreHookMethod('list'),
                crudController.getList,
                crud.getPostHookMethod('list'),
                tempEnd)
        // Create
        .post(  piggyBagMiddleware(crud),
                contextService.createContext('create', 'pre'),
                crud.getPreHookMethod('create'),
                crudController.create,
                crud.getPostHookMethod('create'),
                tempEnd);

    app.route(crud.getRoute(true))
        // Get One
        .get(   piggyBagMiddleware(crud),
                contextService.createContext('read', 'pre'),
                crud.getPreHookMethod('read'),
                crudController.get,
                crud.getPostHookMethod('read'),
                tempEnd)
        // Update
        .put(   piggyBagMiddleware(crud),
                contextService.createContext('update', 'pre'),
                crud.getPreHookMethod('update'),
                crudController.update,
                crud.getPostHookMethod('update'),
                tempEnd)
        // Delete
        .delete(piggyBagMiddleware(crud),
                contextService.createContext('delete', 'pre'),
                crud.getPreHookMethod('delete'),
                crudController.delete,
                crud.getPostHookMethod('delete'),
                tempEnd);

    // Middleware
    app.param(crud.getOptions().getId(), crudController.getCrudByID(crud));
}

function tempEnd(req, res){
    var output = res._crudOutput;

    if (output.isError()){
        return res.jsonp(400, output.getError());
    }

    return res.jsonp(200, output.getResult());
}

function piggyBagMiddleware(crud){
    /**
     * Middleware to piggybag crud over request
     * @param req - {Request}
     * @param res - {Response}
     * @param next - {Function}
     */
    return function(req, res, next) {
        // piggybag me
        req._crud = crud;

        // use getter
        req.getCrud = function () {
            return this._crud;
        };

        // continue
        next();
    }
}