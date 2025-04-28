const LoggerController = require('../controllers/logger');

class LoggerApi {
    async logMessage(req, res) {
        const { message, level } = req.body;

        try {
            const log = await LoggerController.logMessage(message, level);
            return res.status(201).send(log);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }

    async getLogs(req, res) {
        try {
            const logs = await LoggerController.getLogs();
            return res.status(200).send(logs);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }
}

module.exports = new LoggerApi();