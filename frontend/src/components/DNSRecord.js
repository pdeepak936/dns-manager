import React from 'react';

const DNSRecord = ({ record, onDelete, onEdit }) => {
    return (
        <tr>
            <td>{record.domain}</td>
            <td>{record.type}</td>
            <td>{record.value}</td>
            <td>{record.ttl}</td>
            <td>
                <button className="btn btn-primary me-2" onClick={() => onEdit(record)}>Edit</button>
                <button className="btn btn-danger" onClick={() => onDelete(record._id)}>Delete</button>
            </td>
        </tr>
    );
};

export default DNSRecord;
