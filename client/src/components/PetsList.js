import React from "react";

import PetBox from "./PetBox";
import { OPTIMISTIC_ID } from "../../constants";

export default function PetsList({ pets }) {
  return (
    <div className="row">
      {pets.map((pet) => (
        <div
          className="col-xs-12 col-md-4 col"
          style={{ opacity: pet.id === OPTIMISTIC_ID ? "50%" : "100%" }}
          key={pet.id}
        >
          <div className="box">
            <PetBox pet={pet} />
          </div>
        </div>
      ))}
    </div>
  );
}

PetsList.defaultProps = {
  pets: [],
};
