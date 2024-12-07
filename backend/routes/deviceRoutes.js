const express = require('express');
const { addDevice, getDevices, updateDeviceStatus } = require('../controllers/deviceController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['admin', 'staff']), addDevice);
router.get('/', authMiddleware, getDevices);
router.put('/:id/status', authMiddleware, roleMiddleware(['admin', 'staff']), updateDeviceStatus);

module.exports = router;
