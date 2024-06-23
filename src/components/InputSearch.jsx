import React from 'react';

const InputSearch = ({ searchTerm, onSearch }) => {
    return (
        <div className="flex justify-center mb-6">
            <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full md:w-1/2 lg:w-1/3 p-2 border border-gray-300 rounded-md"
            />
        </div>
    );
};

export default InputSearch;
