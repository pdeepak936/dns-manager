import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const DNSForm = ({ fetchRecords, selectedRecord, handleUpdate }) => {
    const [domain, setDomain] = useState('');
    const [type, setType] = useState('');
    const [value, setValue] = useState('');
    const [ttl, setTtl] = useState('');

    useEffect(() => {
        if (selectedRecord) {
            setDomain(selectedRecord.domain);
            setType(selectedRecord.type);
            setValue(selectedRecord.value);
            setTtl(selectedRecord.ttl);
        } else {
            setDomain('');
            setType('');
            setValue('');
            setTtl('');
        }
    }, [selectedRecord]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newRecord = { domain, type, value, ttl };
        await handleUpdate(newRecord);
        fetchRecords();
    };

    return (
        <Card style={{ margin: '20px' }}>
            <Card.Body>
                <Card.Title>{selectedRecord ? 'Edit DNS Record' : 'Add DNS Record'}</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formDomain">
                        <Form.Label>Domain</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter domain"
                            value={domain}
                            onChange={(e) => setDomain(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formType">
                        <Form.Label>Type</Form.Label>
                        <Form.Control
                            as="select"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="A">A</option>
                            <option value="AAAA">AAAA</option>
                            <option value="CNAME">CNAME</option>
                            <option value="MX">MX</option>
                            <option value="NS">NS</option>
                            <option value="PTR">PTR</option>
                            <option value="SOA">SOA</option>
                            <option value="SRV">SRV</option>
                            <option value="TXT">TXT</option>
                            <option value="DNSSEC">DNSSEC</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formValue">
                        <Form.Label>Value</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter value"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formTtl">
                        <Form.Label>TTL</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter TTL"
                            value={ttl}
                            onChange={(e) => setTtl(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
                        {selectedRecord ? 'Update Record' : 'Add Record'}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default DNSForm;
