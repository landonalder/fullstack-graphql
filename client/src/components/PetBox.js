import React from 'react';

const PetBox = ({ pet, onDelete, onEdit }) => (
    <div className="pet">
        <figure>
            <img src={pet.img + `?pet=${pet.id}`} alt="" />
        </figure>
        <div className="pet-name">{pet.name}</div>
        <div className="pet-type">{pet.type}</div>
        <div className="pet-toys">{pet.toys}</div>
        <div style={{ marginTop: '8px' }}>
            <button onClick={() => onEdit(pet.id)} style={{ marginRight: '8px' }}>
                Edit
            </button>
            <button onClick={() => onDelete(pet.id)}>Delete</button>
        </div>
    </div>
);

export default PetBox;
