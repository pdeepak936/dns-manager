// controllers/dnsController.js
const AWS = require('aws-sdk');
const DNS = require('../models/dnsModel');

const route53 = new AWS.Route53({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const getHostedZone = async (domain) => {
    const hostedZones = await route53.listHostedZonesByName({ DNSName: domain }).promise();
    if (hostedZones.HostedZones.length === 0) {
        // Create a new hosted zone if none exists
        const params = {
            Name: domain,
            CallerReference: `${Date.now()}`
        };
        const newZone = await route53.createHostedZone(params).promise();
        return newZone.HostedZone.Id;
    }
    return hostedZones.HostedZones[0].Id;
};

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

        const hostedZoneId = await getHostedZone(req.body.domain);

        const params = {
            ChangeBatch: {
                Changes: [
                    {
                        Action: 'CREATE',
                        ResourceRecordSet: {
                            Name: req.body.domain,
                            Type: req.body.type,
                            TTL: req.body.ttl,
                            ResourceRecords: [{ Value: req.body.value }]
                        }
                    }
                ],
                Comment: 'Created by DNS Manager'
            },
            HostedZoneId: hostedZoneId
        };

        await route53.changeResourceRecordSets(params).promise();

        const record = await newRecord.save();
        res.status(201).json(record);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const existingRecord = await DNS.findById(id);

        if (!existingRecord) {
            return res.status(404).json({ message: 'Record not found' });
        }

        const hostedZoneId = await getHostedZone(req.body.domain);

        const params = {
            ChangeBatch: {
                Changes: [
                    {
                        Action: 'DELETE',
                        ResourceRecordSet: {
                            Name: existingRecord.domain,
                            Type: existingRecord.type,
                            TTL: existingRecord.ttl,
                            ResourceRecords: [{ Value: existingRecord.value }]
                        }
                    },
                    {
                        Action: 'CREATE',
                        ResourceRecordSet: {
                            Name: req.body.domain,
                            Type: req.body.type,
                            TTL: req.body.ttl,
                            ResourceRecords: [{ Value: req.body.value }]
                        }
                    }
                ],
                Comment: 'Updated by DNS Manager'
            },
            HostedZoneId: hostedZoneId
        };

        await route53.changeResourceRecordSets(params).promise();

        const record = await DNS.findByIdAndUpdate(id, req.body, { new: true });
        res.json(record);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const existingRecord = await DNS.findById(id);

        if (!existingRecord) {
            return res.status(404).json({ message: 'Record not found' });
        }

        const hostedZoneId = await getHostedZone(existingRecord.domain);

        const params = {
            ChangeBatch: {
                Changes: [
                    {
                        Action: 'DELETE',
                        ResourceRecordSet: {
                            Name: existingRecord.domain,
                            Type: existingRecord.type,
                            TTL: existingRecord.ttl,
                            ResourceRecords: [{ Value: existingRecord.value }]
                        }
                    }
                ],
                Comment: 'Deleted by DNS Manager'
            },
            HostedZoneId: hostedZoneId
        };

        await route53.changeResourceRecordSets(params).promise();

        await DNS.findByIdAndDelete(id);
        res.json({ message: 'Record deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
