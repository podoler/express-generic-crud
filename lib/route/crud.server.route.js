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
        .get(this.piggyBagMiddleware, crudController.getList, function(req, res){
            var output = req.output;

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