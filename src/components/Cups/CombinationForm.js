import React, { useState } from 'react';

function CombinationForm({ newCupData, handleInputChange, handleSubmit, handleBackStep,
    handleOrderChange}) {

    const [selectedItem, setSelectedItem] = useState(null);
    const [winOrder, setWinOrder] = useState([...newCupData.win_order]);

    const handleSelectItem = (item) => {
        setSelectedItem(item);
    };

    const handleMoveItem = (direction) => {
        const index = winOrder.indexOf(selectedItem);
        if (index !== -1) {
            const newIndex = direction === 'up' ? index - 1 : index + 1;
            if (newIndex >= 0 && newIndex < winOrder.length) {
                const updatedOrder = [...winOrder];
                [updatedOrder[index], updatedOrder[newIndex]] = [updatedOrder[newIndex], updatedOrder[index]];
                setWinOrder(updatedOrder);
            }
        }
    };

    const handleConfirmOrder = () => {
        handleOrderChange(winOrder);
        setSelectedItem(null);
    };

    return (
        <div className="modal-form">
            <div className="input-container">
                <label htmlFor="pointsForWin">Points for Win</label>
                <input
                    type="number"
                    id="pointsForWin"
                    name="points_for_win"
                    value={newCupData.points_for_win}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="input-container">
                <label htmlFor="pointsForDraw">Points for Draw</label>
                <input
                    type="number"
                    id="pointsForDraw"
                    name="points_for_draw"
                    value={newCupData.points_for_draw}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="input-container">
                <label htmlFor="pointsForLost">Points for Lost</label>
                <input
                    type="number"
                    id="pointsForLost"
                    name="points_for_lost"
                    value={newCupData.points_for_lost}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="input-container">
                <label htmlFor="roundTripGroup">Round Trip Group</label>
                <input
                    type="checkbox"
                    id="roundTripGroup"
                    name="round_trip_group"
                    checked={newCupData.round_trip_group}
                    onChange={handleInputChange}
                />
            </div>
            <div className="input-container">
                <label htmlFor="roundTripKnockout">Round Trip Knockout</label>
                <input
                    type="checkbox"
                    id="roundTripKnockout"
                    name="round_trip_knockout"
                    checked={newCupData.round_trip_knockout}
                    onChange={handleInputChange}
                />
            </div>
            <div className="input-container">
                <label htmlFor="roundTripFinal">Round Trip Final</label>
                <input
                    type="checkbox"
                    id="roundTripFinal"
                    name="round_trip_final"
                    checked={newCupData.round_trip_final}
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
            <div className="input-container">
                <label>Win Order</label>
                <ol>
                    {winOrder.map((team, index) => (
                        <li
                            key={team}
                            className={selectedItem === team ? 'selected' : ''}
                            onClick={() => handleSelectItem(team)}
                        >
                            {team}
                            {selectedItem === team && (
                                <div className="order-buttons">
                                    <button onClick={() => handleMoveItem('up')}>&uarr;</button>
                                    <button onClick={() => handleMoveItem('down')}>&darr;</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ol>
            </div>
            {selectedItem && (
                <div className="confirm-order">
                    <button onClick={handleConfirmOrder}>Confirm Order</button>
                </div>
            )}
            <button className="back-button" onClick={handleBackStep}>
                Back
            </button>
            <button type="submit" onClick={handleSubmit}>Create Cup</button>
        </div>
    );
}

export default CombinationForm;
