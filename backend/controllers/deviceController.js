const Device = require('../models/Device');

exports.addDevice = async (req, res) => {
    const { type, model, status, repairDetails } = req.body;

    try {
        const device = new Device({ owner: req.user.id, type, model, status, repairDetails });
        await device.save();
        res.status(201).json(device);
    } catch (error) {
        res.status(500).json({ message: 'Error adding device' });
    }
};

exports.getDevices = async (req, res) => {
    try {
        const devices = await Device.find({ owner: req.user.id });
        res.json(devices);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching devices' });
    }
};

exports.updateDeviceStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const device = await Device.findByIdAndUpdate(id, { status }, { new: true });
        res.json(device);
    } catch (error) {
        res.status(500).json({ message: 'Error updating device status' });
    }
};
