import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCups, createCup } from '../../utils/api';
import '../../index.css';
import CreateModal from './CreateModal';
import LeagueForm from './LeagueForm';
import KnockoutForm from './KnockoutForm';
import CombinationForm from './CombinationForm';

function Cups({ numToShow }) {
    const [cups, setCups] = useState([]);
    const navigate = useNavigate();
    const cupsToDisplay = numToShow !== undefined ? cups.slice(0, numToShow) : cups;
    const [fieldOptions, setFieldOptions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCupData, setNewCupData] = useState({
        name: '',
        start_date: '',
        end_date: '',
        field: '',
        number_of_players: 0,
        min_number_of_participants: 0,
        max_number_of_participants: 0,
        type: '',
        points_for_win: 0,
        points_for_draw: 0,
        points_for_lost: 0,
        round_trip_group: false,
        round_trip_knockout: false,
        round_trip_final: false,
        away_goal: false,
        third_place_match: false,
        win_order: ["points", "wins", "rounds_diff", "scores_diff", "face_to_face_match", "rounds", "scores", "red_cards", "yellow_cards", "fouls"]
    });
    const typeOptions = ['league', 'knockout', 'combination'];
    const [step, setStep] = useState(1);

    const handleNextStep = () => {
        if (newCupData.type !== '') {
            setStep(step + 1);
        } else {
            // Show an error message or prevent proceeding
        }
    };

    const handleBackStep = () => {
        setStep(step - 1);
    };

    const handleOrderChange = (newOrder) => {
        setNewCupData({
            ...newCupData,
            win_order: newOrder,
        });
    };

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!!token) {
            fetchCups()
            .then(data => {
                setCups(data.cups);
                setFieldOptions(data.football_base_fields)
            })
            .catch(error => console.error('Error fetching cups:', error));
        } else {
            navigate('/login', { replace:true })
        }
    }, [navigate]);

    const handleShowCup = (cupId) => {
        navigate(`/cups/${cupId}`);
    };

    const handleShowCreateModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setNewCupData({
            name: '',
            start_date: '',
            end_date: '',
            field: '',
            number_of_players: 0,
            min_number_of_participants: 0,
            max_number_of_participants: 0,
            type: '',
        });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewCupData({
            ...newCupData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(newCupData)
        createCup(newCupData)
            .then(() => {
                fetchCups()
                    .then(data => {
                        setCups(data.cups);
                        setIsModalOpen(false);
                    })
                    .catch(error => console.error('Error fetching cups:', error));
            })
            .catch(error => console.error('Error creating cup:', error));
    };

    return (
        <div>
            <h2>Cups</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Field</th>
                        <th>State</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Winner</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {cupsToDisplay.map(cup => (
                        <tr>
                            <td>{ cup.name }</td>
                            <td>{ cup.field }</td>
                            <td>{ cup.state }</td>
                            <td>{ cup.start_date }</td>
                            <td>{ cup.end_date }</td>
                            <td>{ cup.winner?.name }</td>
                            <td>
                                <button className="show-button" onClick={() => handleShowCup(cup.id)}>Show</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br></br>
            <button className="show-button" onClick={() => handleShowCreateModal()}>Create New Cup</button>
            <br></br>

            {isModalOpen && (
                <CreateModal onClose={handleCloseModal}>
                    {step === 1 && (
                        <div className="modal-form">
                            <div className="input-container">
                                <label htmlFor="cupName">Cup Name</label>
                                <input
                                    type="text"
                                    id="cupName"
                                    name="name"
                                    value={newCupData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="input-container">
                                <label htmlFor="cupStartDate">Start Date</label>
                                <input
                                    type="date"
                                    id="cupStartDate"
                                    name="start_date"
                                    value={newCupData.start_date}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="input-container">
                                <label htmlFor="cupEndDate">End Date</label>
                                <input
                                    type="date"
                                    id="cupEndDate"
                                    name="end_date"
                                    value={newCupData.end_date}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="input-container">
                                <label htmlFor="cupField">Field</label>
                                <select
                                    id="cupField"
                                    name="field"
                                    value={newCupData.field}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select a field</option>
                                    {fieldOptions.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-container">
                                <label htmlFor="cupNumberOfPlayers">Number of Players</label>
                                <input
                                    type="number"
                                    id="cupNumberOfPlayers"
                                    name="number_of_players"
                                    value={newCupData.number_of_players}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="input-container">
                                <label htmlFor="cupMinParticipants">Min Number of Participants</label>
                                <input
                                    type="number"
                                    id="cupMinParticipants"
                                    name="min_number_of_participants"
                                    value={newCupData.min_number_of_participants}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="input-container">
                                <label htmlFor="cupMaxParticipants">Max Number of Participants</label>
                                <input
                                    type="number"
                                    id="cupMaxParticipants"
                                    name="max_number_of_participants"
                                    value={newCupData.max_number_of_participants}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="input-container">
                                <label htmlFor="cupType">Type</label>
                                <select
                                    id="cupType"
                                    name="type"
                                    value={newCupData.type}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select a type</option>
                                    {typeOptions.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="modal-step">
                                <button className="next-button" onClick={handleNextStep}>
                                    Next
                                </button>
                            </div>
                            {/* <button type="submit">Create Cup</button> */}
                        </div>
                    )}
                    {step === 2 && (
                        <div className="modal-step">
                            <h3>Step 2: Fill Cup Details</h3>
                            {newCupData.type === 'league' && (
                                <LeagueForm
                                    newCupData={newCupData}
                                    handleInputChange={handleInputChange}
                                    handleSubmit={handleSubmit}
                                    handleBackStep={handleBackStep}
                                    handleOrderChange={handleOrderChange}
                                />
                            )}
                            {newCupData.type === 'knockout' && (
                                <KnockoutForm
                                    newCupData={newCupData}
                                    handleInputChange={handleInputChange}
                                    handleSubmit={handleSubmit}
                                    handleBackStep={handleBackStep}
                                />
                            )}
                            {newCupData.type === 'combination' && (
                                <CombinationForm
                                    newCupData={newCupData}
                                    handleInputChange={handleInputChange}
                                    handleSubmit={handleSubmit}
                                    handleBackStep={handleBackStep}
                                    handleOrderChange={handleOrderChange}
                                />
                            )}
                        </div>
                    )}
                </CreateModal>
            )}
        </div>
    );
}

export default Cups;
