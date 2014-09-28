'use strict';

describe('Crud Model Unit-Test', function(){
    var Crud = require('../../lib/model/crud.server.model'),
        CrudOptions = require('../../lib/model/crud.options.server.model');

    // Mocks
    var app = {
        route : function(){
            return {
                get : function(){},
                post : function(){},
                put : function(){},
                delete : function(){}
            }
        },
        param : function(){}
    };

    var crud;

    beforeEach(function(){
        crud = new Crud('name',
            {RESOURCE : 'RESOURCE'},
            new CrudOptions({}),
            app);
    });

    it ('should test Crud methods API', function(){
        expect(typeof crud.getRoute).toEqual('function');
        expect(typeof crud.getResource).toEqual('function');
        expect(typeof crud.getOptions).toEqual('function');
        expect(typeof crud.getName).toEqual('function');
        expect(typeof crud.pre).toEqual('function');
        expect(typeof crud.post).toEqual('function');
        expect(typeof crud.getPreHookMethod).toEqual('function');
        expect(typeof crud.getPostHookMethod).toEqual('function');
    });

    it ('should test Gettes', function(){
        expect(crud.getName()).toEqual('name');
        expect(crud.getRoute(false)).toEqual('/name');
        expect(crud.getRoute(true)).toEqual('/name/:_id');
        expect(crud.getResource()).toEqual({
            RESOURCE : 'RESOURCE'
        });
    });

    it ('should test Pre Hooking flow', function(done){
        crud.pre('get', function(context, callback){
            expect(typeof callback).toEqual('function');
            expect(typeof context).toEqual('object');

            done();
        });

        crud.getPreHookMethod('get')({
            getCrudContext : function(){ return {};}
        },{}, function(){});
    });

    it ('should test Post Hooking flow', function(done){
        crud.post('get', function(context, callback){
            expect(typeof callback).toEqual('function');
            expect(typeof context).toEqual('object');

            done();
        });

        crud.getPostHookMethod('get')({
            getCrudContext : function(){ return {};}
        },{}, function(){});
    });
});