
// import React from 'react';

// const PetCard = ({ image, petName, species, breed, petAge, petSize, specialTreatment }) => (
//     <div className="bg-[#FAE7D5] rounded-lg shadow-md p-4 mb-4">
//         <img src={pet.image} alt={`${pet.petName}`} style={{ width: '100%', maxHeight: '450px' }} className="mb-4" />
//         <h2 className="text-xl font-bold mb-2">{pet.petName}</h2>
//         <p><strong>Species:</strong> {pet.species}</p>
//         <p><strong>Breed:</strong> {pet.breed}</p>
//         <p><strong>Age:</strong> {pet.petAge}</p>
//         <p><strong>Size:</strong> {pet.petSize}</p>
//         <p><strong>Special Treatment:</strong> {pet.specialTreatment}</p>
//     </div>
// );
// };

// export default PetCard;

// PetCard.jsx
import React from 'react';

const PetCard = ({ image, petName, species, breed, petAge, petSize, specialTreatment }) => {
    return (
        <div className="bg-[#FAE7D5] rounded-lg shadow-md p-4 mb-4">
            <img src={image} alt={petName}  style={{ width: '100%', maxHeight: '450px' }} className="mb-4" />
            <div className="pet-card-details">
                <h3>{petName}</h3>
                <p>Species: {species}</p>
                <p>Breed: {breed}</p>
                <p>Age: {petAge}</p>
                <p>Size: {petSize}</p>
                <p>Special Treatment: {specialTreatment}</p>
            </div>
        </div>
    );
};

export default PetCard;