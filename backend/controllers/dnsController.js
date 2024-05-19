// const dnsModel = require('../models/dnsModel');

// exports.getAllRecords = async (req, res) => {
//     try {
//         const { search, type } = req.query;
//         const filter = {};

//         if (search) {
//             filter.$or = [
//                 { domain: { $regex: search, $options: 'i' } },
//                 { value: { $regex: search, $options: 'i' } }
//             ];
//         }

//         if (type) {
//             filter.type = type;
//         }

//         const records = await dnsModel.find(filter);
//         res.json(records);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// exports.createRecord = async (req, res) => {
//     const { domain, type, value, ttl } = req.body;

//     const newRecord = new dnsModel({
//         domain,
//         type,
//         value,
//         ttl
//     });

//     try {
//         const savedRecord = await newRecord.save();
//         res.status(201).json(savedRecord);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// };

// exports.updateRecord = async (req, res) => {
//     const { id } = req.params;
//     const { domain, type, value, ttl } = req.body;

//     try {
//         const record = await dnsModel.findById(id);

//         if (!record) {
//             return res.status(404).json({ message: 'Record not found' });
//         }

//         record.domain = domain;
//         record.type = type;
//         record.value = value;
//         record.ttl = ttl;

//         const updatedRecord = await record.save();
//         res.json(updatedRecord);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// };

// exports.deleteRecord = async (req, res) => {
//     const { id } = req.params;

//     try {
//         // Check if ID format is valid
//         if (!id.match(/^[0-9a-fA-F]{24}$/)) {
//             return res.status(400).json({ message: 'Invalid ID format' });
//         }

//         const record = await dnsModel.findById(id);

//         if (!record) {
//             return res.status(404).json({ message: 'Record not found' });
//         }

//         await dnsModel.findByIdAndDelete(id); // Using findByIdAndDelete instead of remove

//         res.json({ message: 'Record deleted successfully' });
//     } catch (err) {
//         console.error(`Error deleting record with ID ${id}:`, err);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };


const dnsModel = require('../models/dnsModel');

exports.getAllRecords = async (req, res) => {
    try {
        const { search, type } = req.query;
        const filter = { user: req.user._id }; // Filter by the logged-in user

        if (search) {
            filter.$or = [
                { domain: { $regex: search, $options: 'i' } },
                { value: { $regex: search, $options: 'i' } }
            ];
        }

        if (type) {
            filter.type = type;
        }

        const records = await dnsModel.find(filter);
        res.json(records);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createRecord = async (req, res) => {
    const { domain, type, value, ttl } = req.body;

    const newRecord = new dnsModel({
        domain,
        type,
        value,
        ttl,
        user: req.user._id // Associate the record with the logged-in user
    });

    try {
        const savedRecord = await newRecord.save();
        res.status(201).json(savedRecord);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateRecord = async (req, res) => {
    const { id } = req.params;
    const { domain, type, value, ttl } = req.body;

    try {
        const record = await dnsModel.findOne({ _id: id, user: req.user._id });

        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }

        record.domain = domain;
        record.type = type;
        record.value = value;
        record.ttl = ttl;

        const updatedRecord = await record.save();
        res.json(updatedRecord);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteRecord = async (req, res) => {
    const { id } = req.params;

    try {
        const record = await dnsModel.findOne({ _id: id, user: req.user._id });

        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }

        await record.remove();
        res.json({ message: 'Record deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
