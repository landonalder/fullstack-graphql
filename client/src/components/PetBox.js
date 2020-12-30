import React from 'react'

const PetBox = ({pet, onDelete}) => (
  <div className="pet">
    <figure>
      <img src={pet.img + `?pet=${pet.id}`} alt=""/>
    </figure>
    <div className="pet-name">{pet.name}</div>
    <div className="pet-type">{pet.type}</div>
    <button onClick={() => onDelete(pet.id)}>Delete</button>
  </div>
)

export default PetBox
