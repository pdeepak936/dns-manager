import React from 'react';

const DNSRecord = ({ record, onDelete, onEdit }) => {
    return (
        <tr>
            <td>{record.domain}</td>
            <td>{record.type}</td>
            <td>{record.value}</td>
            <td>
                <button onClick={() => onEdit(record)}>Edit</button>
                <button onClick={() => onDelete(record._id)}>Delete</button>
            </td>
        </tr>
    );
};

export default DNSRecord;
