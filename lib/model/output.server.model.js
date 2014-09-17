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
 * Result getter
 * @returns {*}
 */
Output.prototype.getResult = function(){
    return this._result;
};

/**
 * Is Error
 * @returns {boolean}
 */
Output.prototype.isError = function(){
    return this.getError() !== null;
};

module.exports = Output;