const express = require('express');
const { addRepair, getRepairStatus } = require('../controllers/repairController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['admin', 'staff']), addRepair);
router.get('/:deviceId', authMiddleware, getRepairStatus);

module.exports = router;
