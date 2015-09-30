var q       = require('q');
var _       = require('lodash');

function ParamsIntegrity() {

    /**
     * Checks the optional parameters
     *
     * @param optionalParams
     * @param data
     * @returns {boolean}
     */
    this.checkOptionalParams = function (optionalParams, data) {
        var deferred = q.defer();
        var length   = optionalParams.length - 1;
        var params   = [];

        _.forEach(optionalParams, function (param, index) {

                if (!_.isUndefined(data[param.name])) {
                    var expr = new RegExp(param.regex);
                    if (!expr.test(data[param.name])) {
                        deferred.reject('bad value for ' + param.name + ' (' + param.regex + ')');
                        return false;
                    }else {
                        params[param] = data[param];
                    }
                }

                if (length == index) {
                    deferred.resolve(optionalParams);
                }
            }
        );

        return deferred.promise;
    };


    /**
     * Checks if the required parameters are provided
     *
     * @param requiredParams
     * @param data
     */
    this.checkRequiredParams = function (requiredParams, data) {

        var deferred = q.defer();
        var length   = requiredParams.length - 1;
        var params   = [];

        requiredParams.map(function (param, index) {

            if (_.isUndefined(data[param])) {
                deferred.reject('Param ' + param + ' required');
                return false;
            } else {
                params[param] = data[param];
            }

            if (length >= index) {
                deferred.resolve(params);
            }
        });

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
            deferred.resolve({start: new Date(dDateStart), end: new Date(dDateEnd)});
        } else {
            deferred.reject('dateStart is not <= to dateEnd');
        }

        return deferred.promise;
    }
}


module.exports = new ParamsIntegrity();