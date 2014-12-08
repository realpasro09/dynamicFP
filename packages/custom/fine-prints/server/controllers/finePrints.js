'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    FinePrint = mongoose.model('FinePrint'),
    _ = require('lodash');


/**
 * Find finePrint by id
 */
exports.finePrint = function(req, res, next, id) {
    FinePrint.load(id, function(err, finePrint) {
        if (err) return next(err);
        if (!finePrint) return next(new Error('Failed to load finePrint ' + id));
        req.finePrint = finePrint;
        next();
    });
};

/**
 * Create an finePrint
 */
exports.create = function(req, res) {
    var finePrint = new FinePrint(req.body);
    finePrint.user = req.user;

    finePrint.save(function(err) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot save the finePrint'
            });
        }
        res.json(finePrint);

    });
};

/**
 * Update an finePrint
 */
exports.update = function(req, res) {
    var finePrint = req.finePrint;

    finePrint = _.extend(finePrint, req.body);

    finePrint.save(function(err) {
        if (err) {
            return res.json(500, {
                error: 'Cannot update the finePrint'
            });
        }
        res.json(finePrint);

    });
};

/**
 * Delete an finePrint
 */
exports.destroy = function(req, res) {
    var finePrint = req.finePrint;

    finePrint.remove(function(err) {
        if (err) {
            return res.json(500, {
                error: 'Cannot delete the finePrint'
            });
        }
        res.json(finePrint);

    });
};

/**
 * Show an finePrint
 */
exports.show = function(req, res) {
    res.json(req.finePrint);
};

/**
 * List of Fine Prints
 */
exports.all = function(req, res) {
    FinePrint.find({user:req.user}).sort('-created').populate('user', 'name username').exec(function(err, finePrints) {
        if (err) {
            return res.json(500, {
                error: 'Cannot list the finePrints'
            });
        }
        res.json(finePrints);

    });
};
