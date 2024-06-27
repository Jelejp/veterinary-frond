import React, { Fragment } from 'react';

const PetCard = ({image, petName, species, breed, petAge, petSize, specialTreatment }) => (
<div className='w-100% bg-[#FAE7D5]  rounded-lg shadow-md '>
        <img src={image} /* alt={`${petName}`} */ style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }} className="mb-4 rounded-tl-lg rounded-tr-lg" />
    <div className="  p-4 ">
        <h2 className="text-xl font-bold mb-2">{petName}</h2>
        <p><strong>Species:</strong> {species}</p>
        <p><strong>Breed:</strong> {breed}</p>
        <p><strong>Age:</strong> {petAge}</p>
        <p><strong>Size:</strong> {petSize}</p>
        <p><strong>Special Treatment:</strong> {specialTreatment}</p>
    </div>
    </div>
);

export default PetCard;