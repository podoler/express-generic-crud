'use strict';

function Output(err, result){
    this._err = err;
    this._result = result;
}

/**
 * Error getter
 * @returns {Error}
 */
Output.prototype.getError = function(){
    return this._err;
};

/**
 * Error setter
 * @param {Error} - New Error
 */
Output.prototype.setError = function(err){
    this._err = err;
};

/**
 * Result getter
 * @returns {*}
 */
Output.prototype.getResult = function(){
    return this._result;
};

/**
 * Result setter
 * @param {Object} new Result
 */
Output.prototype.setResult = function(result){
    this._result = result;
};

/**
 * Is Error
 * @returns {boolean}
 */
Output.prototype.isError = function(){
    return this.getError() !== null;
};

module.exports = Output;