const DNS = require('../models/dnsModel');
const jwt = require('jsonwebtoken');

exports.getAllRecords = async (req, res) => {
    try {
        const { search, type } = req.query;
        const filter = { user: req.user.id };

        if (search) {
            filter.$or = [
                { domain: { $regex: search, $options: 'i' } },
                { value: { $regex: search, $options: 'i' } }
            ];
        }

        if (type) {
            filter.type = type;
        }

        const records = await DNS.find(filter);
        res.json(records);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createRecord = async (req, res) => {
    try {
        const newRecord = new DNS({ ...req.body, user: req.user.id });
        const record = await newRecord.save();
        res.status(201).json(record);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const record = await DNS.findOneAndUpdate({ _id: id, user: req.user.id }, req.body, { new: true });

        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }

        res.json(record);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const record = await DNS.findOneAndDelete({ _id: id, user: req.user.id });

        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }

        res.json({ message: 'Record deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
