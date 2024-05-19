const mongoose = require('mongoose');

const dnsRecordSchema = new mongoose.Schema({
    domain: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['A', 'AAAA', 'CNAME', 'MX', 'NS', 'PTR', 'SOA', 'SRV', 'TXT', 'DNSSEC'],
        required: true
    },
    value: {
        type: String,
        required: true
    },
    ttl: {
        type: Number,
        required: true
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const DNSRecord = mongoose.model('DNSRecord', dnsRecordSchema);

module.exports = DNSRecord;
