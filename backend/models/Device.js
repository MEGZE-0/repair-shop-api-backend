const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    model: { type: String, required: true },
    status: { type: String, enum: ['in repair', 'repaired', 'picked up'], default: 'in repair' },
    repairDetails: { type: String },
    repairProgress: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Repair' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

deviceSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Device', deviceSchema);
