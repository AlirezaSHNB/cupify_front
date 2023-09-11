import React from 'react';

function KnockoutForm({ newCupData, handleInputChange, handleSubmit, handleBackStep }) {
    return (
        <div className="modal-form">
            <div className="input-container">
                <label htmlFor="roundTrip">Round Trip</label>
                <input
                    type="checkbox"
                    id="roundTrip"
                    name="round_trip"
                    checked={newCupData.round_trip}
                    onChange={handleInputChange}
                />
            </div>
            <div className="input-container">
                <label htmlFor="awayGoal">Away Goal</label>
                <input
                    type="checkbox"
                    id="awayGoal"
                    name="away_goal"
                    checked={newCupData.away_goal}
                    onChange={handleInputChange}
                />
            </div>
            <div className="input-container">
                <label htmlFor="thirdPlaceMatch">Third Place Match</label>
                <input
                    type="checkbox"
                    id="thirdPlaceMatch"
                    name="third_place_match"
                    checked={newCupData.third_place_match}
                    onChange={handleInputChange}
                />
            </div>
            <button className="back-button" onClick={handleBackStep}>
                Back
            </button>
            <button type="submit" onClick={handleSubmit}>Create Cup</button>
        </div>
    );
}

export default KnockoutForm;
