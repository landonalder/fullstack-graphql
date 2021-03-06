import React from 'react';

import EditOrCreatePet from './EditOrCreatePet';

export default function NewPetModal({ onSubmit, onCancel }) {
    return (
        <div className="row center-xs">
            <div className="col-xs-8">
                <EditOrCreatePet onSubmit={onSubmit} onCancel={onCancel} />
            </div>
        </div>
    );
}
