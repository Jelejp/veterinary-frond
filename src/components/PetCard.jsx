import React from 'react';

const PetCard = ({ pet }) => (
    <div className="bg-[#FAE7D5] rounded-lg shadow-md p-4 mb-4">
        <h2 className="text-xl font-bold mb-2">{pet.petName}</h2>
        <p><strong>Species:</strong> {pet.species}</p>
        <p><strong>Breed:</strong> {pet.breed}</p>
        <p><strong>Age:</strong> {pet.petAge}</p>
        <p><strong>Size:</strong> {pet.animalSize}</p>
        <p><strong>Special Treatment:</strong> {pet.specialTreatment}</p>
    </div>
);

export default PetCard;