import React, { useState, useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from '@chakra-ui/react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const InvoiceTable = () => {
	const [selectedInvoice, setSelectedInvoice] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [invoices, setInvoices] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const token = useSelector(store => store.authReducer.token);


	const fetchInvoices = async () => {
		try {
			const response = await axios.get('https://mh-veterinary-api.onrender.com/api-veterinary/current', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

            const account = response.data.account;
            console.log("🚀 ~ fetchInvoices ~ response.data.account;:", response.data.account)
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

    useEffect(() => {
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

    return (
        <div className="mb-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#FAE7D5]">
                    <tr>
                        <th className="py-2 px-4 sm:px-6 text-center">Action</th>
                        <th className="py-2 px-4 sm:px-6 text-center">Date</th>
                        <th className="py-2 px-4 sm:px-6 text-center">Amount</th>
                        <th className="py-2 px-4 sm:px-6 text-center">Status</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {invoices.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="py-4 px-6 text-center text-gray-500">
                                No invoices found.
                            </td>
                        </tr>
                    ) : (
                        invoices.map((invoice) => (
                            <tr key={invoice.id}>
                                <td className="py-2 px-4 sm:px-6 text-center">
                                    <Button onClick={() => openModal(invoice)}>View</Button>
                                </td>
                                <td className="py-2 px-4 sm:px-6 text-center">{new Date(invoice.issuedOn).toLocaleDateString()}</td>
                                <td className="py-2 px-4 sm:px-6 text-center">${invoice.amount.toFixed(2)}</td>
                                <td className="py-2 px-4 sm:px-6 text-center">{invoice.status === 'CHARGED' ? 'Paid' : 'Unpaid'}</td>
                            </tr>
                        ))
                    )}
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
								<p><strong>Service:</strong> {selectedInvoice.offering}</p>
								<p><strong>Description:</strong> {selectedInvoice.offeringDescription}</p>
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
