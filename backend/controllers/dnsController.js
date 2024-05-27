const AWS = require('aws-sdk');
const DNS = require('../models/dnsModel');

// Initialize Route53 client
const route53 = new AWS.Route53({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

// Helper function to get or create hosted zone
const getHostedZone = async (domain) => {
    try {
        const hostedZones = await route53.listHostedZonesByName({ DNSName: domain }).promise();
        if (hostedZones.HostedZones.length === 0) {
            const params = {
                Name: domain,
                CallerReference: `${Date.now()}`
            };
            const newZone = await route53.createHostedZone(params).promise();
            console.log(`Created new hosted zone for domain ${domain}:`, newZone.HostedZone.Id);
            return newZone.HostedZone.Id;
        }
        console.log(`Found existing hosted zone for domain ${domain}:`, hostedZones.HostedZones[0].Id);
        return hostedZones.HostedZones[0].Id;
    } catch (error) {
        console.error(`Error getting hosted zone for domain ${domain}:`, error);
        throw error;
    }
};

// Get all DNS records
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

// Create a new DNS record
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

        console.log("Creating record with params:", JSON.stringify(params, null, 2));

        const response = await route53.changeResourceRecordSets(params).promise();
        console.log("Create record response:", JSON.stringify(response, null, 2));

        const record = await newRecord.save();
        res.status(201).json(record);
    } catch (err) {
        console.error("Error creating record:", err);
        res.status(500).json({ message: err.message });
    }
};

// Update an existing DNS record
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

        console.log("Updating record with params:", JSON.stringify(params, null, 2));

        const response = await route53.changeResourceRecordSets(params).promise();
        console.log("Update record response:", JSON.stringify(response, null, 2));

        const record = await DNS.findByIdAndUpdate(id, req.body, { new: true });
        res.json(record);
    } catch (err) {
        console.error("Error updating record:", err);
        res.status(500).json({ message: err.message });
    }
};

// Delete a DNS record
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

        console.log("Deleting record with params:", JSON.stringify(params, null, 2));

        const response = await route53.changeResourceRecordSets(params).promise();
        console.log("Delete record response:", JSON.stringify(response, null, 2));

        await DNS.findByIdAndDelete(id);
        res.json({ message: 'Record deleted' });
    } catch (err) {
        console.error("Error deleting record:", err);
        res.status(500).json({ message: err.message });
    }
};
