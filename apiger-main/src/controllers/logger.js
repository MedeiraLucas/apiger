const Logger = require('../models/logger');

class LoggerController {
    async logMessage(message, level) {
        try {
            const log = await Logger.create({ message, level });
            return log;
        } catch (error) {
            throw new Error('Error logging message: ' + error.message);
        }
    }

    async getLogs() {
        try {
            const logs = await Logger.findAll();
            return logs;
        } catch (error) {
            throw new Error('Error fetching logs: ' + error.message);
        }
    }
}

module.exports = new LoggerController();