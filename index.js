var q       = require('q');
var _       = require('lodash');
var winston = require('winston');

function ParamsIntegrity () {

    var self = this;

    /**
     * Checks the optional parameters
     *
     * @param optionalParams
     * @param data
     * @returns {boolean}
     */
    this.checkOptionalParams = function (optionalParams, data) {
        var deferred     = q.defer();
        var length       = optionalParams.length - 1;
        var success      = true;
        var errorMessage = "";
        var params       = {};

        optionalParams.map(function (param, index) {

                if (!_.isUndefined(data[param.name])) {
                    var expr = new RegExp(param.regex);
                    if (!expr.test(data[param.name])) {
                        success      = false;
                        errorMessage = "bad value for " + param.name + " (" + param.regex + ")";
                    } else {
                        params[param] = data[param];
                    }
                }
            }
        );

        if (success) {
            deferred.resolve(params);
        } else {
            deferred.reject(errorMessage);
        }

        return deferred.promise;
    };


    /**
     * Checks if the required parameters are provided
     *
     * @param requiredParams
     * @param data
     */
    this.checkRequiredParams = function (requiredParams, data) {

        var deferred     = q.defer();
        var length       = requiredParams.length - 1;
        var params       = {};
        var success      = true;
        var errorMessage = "";

        requiredParams.map(function (param, index) {

            if (_.isUndefined(data[param])) {
                success      = false;
                errorMessage = 'Param ' + param + ' required';
            } else {
                params[param] = data[param];
            }
        });

        if (success) {
            winston.info('[checkRequiredParams] params : ', params);
            deferred.resolve(params);
        } else {
            winston.error('[checkRequiredParams] missing');
            deferred.reject(errorMessage);
        }

        return deferred.promise;
    };


    /**
     * Checks if the provided dates respects the right chronological constraints
     *
     * @param dDateStart
     * @param dDateEnd
     * @returns {*|promise}
     */
    this.checkDateOrdering = function (dDateStart, dDateEnd) {
        var deferred = q.defer();

        if (new Date(dDateStart) <= new Date(dDateEnd)) {
            deferred.resolve({
                start: new Date(dDateStart),
                end  : new Date(dDateEnd)
            });
        } else {
            deferred.reject('dateStart is not <= to dateEnd');
        }

        return deferred.promise;
    };
}

module.exports = new ParamsIntegrity();