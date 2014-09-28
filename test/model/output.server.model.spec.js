'use strict';

describe('Output Model Unit-Test', function(){
    var Output = require('../../lib/model/output.server.model');

    var output;

    it ('should test Output API', function(){
        output = new Output(null, 'OUTPUT');

        expect(typeof output.getError).toEqual('function');
        expect(typeof output.setError).toEqual('function');
        expect(typeof output.getResult).toEqual('function');
        expect(typeof output.setResult).toEqual('function');
        expect(typeof output.isError).toEqual('function');
    });

    it ('should test Error Output methods', function(){
        output = new Output();

        output.setError(new Error(''));
        expect(output.isError()).toBeTruthy();
        expect(output.getError()).toEqual(new Error(''));
        output.setError(null);
        expect(output.isError()).toBeFalsy();
        expect(output.getError()).toEqual(null);
    });

    it ('should test Success Output methods', function(){
        output = new Output();

        output.setResult('OUTPUT');
        expect(output.getResult()).toEqual('OUTPUT');
    });
});