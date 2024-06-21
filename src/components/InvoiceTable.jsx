import React from 'react';

const InvoiceTable = ({ invoices }) => {
    return (
        <div className="mb-6">
            <table className="min-w-full divide-y divide-[#FAE7D5]">
                <thead className="bg-[#FAE7D5]">
                    <tr>
                        <th className="py-2 px-4 ">ID</th>
                        <th className="py-2 px-4">Date</th>
                        <th className="py-2 px-4">Amount</th>
                        <th className="py-2 px-4">Status</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-[#FAE7D5]">
                    {invoices.map((invoice) => (
                        <tr key={invoice.id}>
                            <td className="py-2 px-4 text-center">{invoice.id}</td>
                            <td className="py-2 px-4 text-center">{invoice.date}</td>
                            <td className="py-2 px-4 text-center">${invoice.amount.toFixed(2)}</td>
                            <td className="py-2 px-4 text-center">{invoice.paid ? 'Paid' : 'Unpaid'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InvoiceTable;