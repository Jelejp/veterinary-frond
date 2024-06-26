import React from 'react';

const ClientInfo = ({ client }) => {
    return (
        <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Client Information:</h2>
            <p><strong>Name:</strong> {client.clientName} </p>
            <p><strong>Email:</strong> {client.email}</p>
            <p><strong>Phone:</strong> {client.phone}</p>
        </div>
    );
};

export default ClientInfo;
