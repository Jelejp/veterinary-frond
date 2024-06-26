import React, { useState, useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from '@chakra-ui/react';
import axios from 'axios';

const InvoiceTable = () => {
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error("No token found in localStorage");
                }

                const response = await axios.get('http://localhost:8080/api-veterinary/current', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const account = response.data.account;
                if (account && account.chargedInvoices) {
                    setInvoices(account.chargedInvoices);
                } else {
                    setInvoices([]);
                }
            } catch (error) {
                console.error("Error fetching invoices:", error);
                setError('Failed to fetch invoices');
            } finally {
                setLoading(false);
            }
        };

        fetchInvoices();
    }, []);

    const openModal = (invoice) => {
        setSelectedInvoice(invoice);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedInvoice(null);
        setIsModalOpen(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (invoices.length === 0) {
        return <div>No invoices found.</div>;
    }

    return (
        <div className="mb-6">
            <table className="min-w-full divide-y divide-[#FAE7D5]">
                <thead className="bg-[#FAE7D5]">
                    <tr>
                        <th className="py-2 px-4">Action</th>
                        <th className="py-2 px-4">Date</th>
                        <th className="py-2 px-4">Amount</th>
                        <th className="py-2 px-4">Status</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-[#FAE7D5]">
                    {invoices.map((invoice) => (
                        <tr key={invoice.id}>
                            <td className="py-2 px-4 text-center">
                                <Button onClick={() => openModal(invoice)}>View</Button>
                            </td>
                            <td className="py-2 px-4 text-center">{new Date(invoice.issuedOn).toLocaleDateString()}</td>
                            <td className="py-2 px-4 text-center">${invoice.amount.toFixed(2)}</td>
                            <td className="py-2 px-4 text-center">{invoice.status === 'CHARGED' ? 'Paid' : 'Unpaid'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal isOpen={isModalOpen} onClose={closeModal} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Invoice Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {selectedInvoice && (
                            <div>
                                <p><strong>ID:</strong> {selectedInvoice.id}</p>
                                <p><strong>Date:</strong> {new Date(selectedInvoice.issuedOn).toLocaleString()}</p>
                                <p><strong>Amount:</strong> ${selectedInvoice.amount.toFixed(2)}</p>
                                <p><strong>Status:</strong> {selectedInvoice.status === 'CHARGED' ? 'Paid' : 'Unpaid'}</p>
                                <p><strong>Service:</strong> {selectedInvoice.billedService}</p>
                                <p><strong>Notes:</strong> {selectedInvoice.notes}</p>
                            </div>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={closeModal}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default InvoiceTable;