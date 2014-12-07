'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * FinePrint Schema
 */
var FinePrintSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    selectedLayout: {
        type: String,
        required: true,
        trim: true
    },
    field1: {
        type: String,
        required: true,
        trim: true
    },
    field1MarkAsShowMeHow: {
        type: Boolean,
        required: true
    },
    field2: {
        type: String,
        required: true,
        trim: true
    },
    field2MarkAsShowMeHow: {
        type: Boolean,
        required: true
    },
    field3: {
        type: String,
        trim: true
    },
    field3MarkAsShowMeHow: {
        type: Boolean
    },
    field4: {
        type: String,
        trim: true
    },
    field4MarkAsShowMeHow: {
        type: Boolean
    },
	link: {
		type: String,
		required: true,
		trim: true
	},
	field1Help: {
		type: String,
		trim: true
	},
	field2Help: {
		type: String,
		trim: true
	},
	field3Help: {
		type: String,
		trim: true
	},
	field4Help: {
		type: String,
		trim: true
	},
	user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
FinePrintSchema.path('title').validate(function(title) {
    return !!title;
}, 'Title cannot be blank');

/**
 * Statics
 */
FinePrintSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('FinePrint', FinePrintSchema);
