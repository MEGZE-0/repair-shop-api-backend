const Repair = require('../models/Repair');
const Device = require('../models/Device');

exports.addRepair = async (req, res) => {
    const { device, progress, expectedCompletion, notes } = req.body;

    try {
        const repair = new Repair({ device, progress, expectedCompletion, notes });
        await repair.save();

        await Device.findByIdAndUpdate(device, { $push: { repairProgress: repair._id } });
        res.status(201).json(repair);
    } catch (error) {
        res.status(500).json({ message: 'Error adding repair' });
    }
};

exports.getRepairStatus = async (req, res) => {
    const { deviceId } = req.params;

    try {
        const repairs = await Repair.find({ device: deviceId });
        res.json(repairs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching repair status' });
    }
};
