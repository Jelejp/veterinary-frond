import React from 'react';
import PetCard from './PetCard';

const PetsList = ({ pets }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
        ))}
    </div>
);

export default PetsList;