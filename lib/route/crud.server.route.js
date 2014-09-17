'use strict';

var crudController = require('../controller/crud.server.controller');

/**
 * Create route for crud
 * @param app - {Express Application}
 * @param crud - {Crud}
 */
exports.route = function(app, crud){
    app.route(crud.getRoute(false))
        // Get List
        .get(piggyBagMiddleware(crud), crudController.getList, function(req, res){
            var output = res.output;

            if (output.isError()){
                return res.jsonp(400, output.getError());
            }

            return res.jsonp(200, output.getResult());
        });
        // Create
//        .post();

//    app.route(crud.getRoute(true))
//        .get()      // Get One
//        .put()      // Update
//        .delete();  // Delete One

    // Middleware
//    this._app.param()
};

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
};