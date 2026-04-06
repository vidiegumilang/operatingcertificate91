import React, { useState } from 'react';

const ScheduleTable = () => {
    const [flights, setFlights] = useState([
        { id: 1, period: '06:00 - 07:00', status: 'On Time' },
        { id: 2, period: '07:00 - 08:00', status: 'Delayed' },
        { id: 3, period: '08:00 - 09:00', status: 'Cancelled' },
        { id: 4, period: '09:00 - 10:00', status: 'On Time' },
        { id: 5, period: '10:00 - 11:00', status: 'On Time' },
        { id: 6, period: '11:00 - 12:00', status: 'Delayed' },
        { id: 7, period: '12:00 - 13:00', status: 'On Time' }
    ]);

    const updateFlightStatus = (id, newStatus) => {
        setFlights(flights.map(flight => flight.id === id ? { ...flight, status: newStatus } : flight));
    };

    const deleteFlight = (id) => {
        setFlights(flights.filter(flight => flight.id !== id));
    };

    return (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr>
                    <th>Period</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {flights.map(flight => (
                    <tr key={flight.id} style={{ backgroundColor: flight.status === 'On Time' ? '#d4edda' : flight.status === 'Delayed' ? '#ffeeba' : '#f8d7da' }}>
                        <td>{flight.period}</td>
                        <td>
                            <input
                                type="text"
                                value={flight.status}
                                onChange={(e) => updateFlightStatus(flight.id, e.target.value)}
                                style={{ width: '100%' }}
                            />
                        </td>
                        <td>
                            <button onClick={() => deleteFlight(flight.id)} style={{ color: 'red' }}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ScheduleTable;