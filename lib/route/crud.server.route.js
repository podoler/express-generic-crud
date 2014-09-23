'use strict';

var crudController = require('../controller/crud.server.controller'),
    contextService = require('../service/context.server.service'),
    middlewareService = require('../service/middleware.server.service');

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
    var route = app.route(crud.getRoute(false));

    if (crud.getOptions().getRouteOptions('list').isEnabled()) {
        // Get List
        route.get(piggyBagMiddleware(crud),
            contextService.createContext('list', 'pre'),
            middlewareService.pre.list,
            crud.getPreHookMethod('list'),
            crudController.getList,
            middlewareService.post.list,
            crud.getPostHookMethod('list'),
            tempEnd);
    }

    if (crud.getOptions().getRouteOptions('create').isEnabled()) {
        // Create
        route.post(piggyBagMiddleware(crud),
            contextService.createContext('create', 'pre'),
            middlewareService.pre.create,
            crud.getPreHookMethod('create'),
            crudController.create,
            middlewareService.post.create,
            crud.getPostHookMethod('create'),
            tempEnd);
    }

    route = app.route(crud.getRoute(true));

    if (crud.getOptions().getRouteOptions('read').isEnabled()) {
        // Get One
        route.get(piggyBagMiddleware(crud),
            contextService.createContext('read', 'pre'),
            middlewareService.pre.read,
            crud.getPreHookMethod('read'),
            crudController.get,
            middlewareService.post.read,
            crud.getPostHookMethod('read'),
            tempEnd);
    }

    if (crud.getOptions().getRouteOptions('update').isEnabled()) {
        // Update
        route.put(piggyBagMiddleware(crud),
            contextService.createContext('update', 'pre'),
            middlewareService.pre.update,
            crud.getPreHookMethod('update'),
            crudController.update,
            middlewareService.post.update,
            crud.getPostHookMethod('update'),
            tempEnd);
    }

    if (crud.getOptions().getRouteOptions('delete').isEnabled()) {
        // Delete
        route.delete(piggyBagMiddleware(crud),
            contextService.createContext('delete', 'pre'),
            middlewareService.pre.delete,
            crud.getPreHookMethod('delete'),
            crudController.delete,
            middlewareService.post.delete,
            crud.getPostHookMethod('delete'),
            tempEnd);
    }

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