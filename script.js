const sampleFlights = [
    {
        id: 1,
        flightNumber: "SD-101",
        from: "Jakarta",
        to: "Surabaya",
        date: "2026-04-06",
        departureTime: "08:00",
        arrivalTime: "10:30",
        aircraft: "Boeing 737",
        seats: "150",
        status: "Tepat Waktu"
    },
    {
        id: 2,
        flightNumber: "SD-202",
        from: "Bandung",
        to: "Yogyakarta",
        date: "2026-04-06",
        departureTime: "10:15",
        arrivalTime: "12:00",
        aircraft: "Airbus A320",
        seats: "180",
        status: "Tepat Waktu"
    }
];

function initializeData() {
    if (!localStorage.getItem('flights')) {
        localStorage.setItem('flights', JSON.stringify(sampleFlights));
    }
}

function getFlights() {
    initializeData();
    return JSON.parse(localStorage.getItem('flights')) || [];
}

function loadFlights() {
    const flights = getFlights();
    const flightsList = document.getElementById('flightsList');
    
    if (!flightsList) return;

    if (flights.length === 0) {
        flightsList.innerHTML = '<p>Tidak ada jadwal penerbangan</p>';
        return;
    }

    flightsList.innerHTML = flights.map(flight => `
        <div class="flight-card">
            <div class="card-header">
                <div>${flight.flightNumber}</div>
                <div class="flight-status">${flight.status}</div>
            </div>
            <div class="card-body">
                <div class="flight-route"><strong>${flight.from}</strong> → <strong>${flight.to}</strong></div>
                <div class="flight-info">
                    <div>Berangkat: ${flight.departureTime}</div>
                    <div>Tiba: ${flight.arrivalTime}</div>
                </div>
                <div>Tanggal: ${flight.date}</div>
                <div>Pesawat: ${flight.aircraft}</div>
            </div>
        </div>
    `).join('');
}

function setupSearchFilters() {
    const searchBtn = document.getElementById('searchBtn');
    const resetBtn = document.getElementById('resetBtn');

    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const date = document.getElementById('searchDate').value;
            const route = document.getElementById('searchRoute').value;
            
            const flights = getFlights();
            const filtered = flights.filter(flight => {
                const dateMatch = !date || flight.date === date;
                const routeMatch = !route || 
                    flight.from.toLowerCase().includes(route.toLowerCase()) ||
                    flight.to.toLowerCase().includes(route.toLowerCase());
                return dateMatch && routeMatch;
            });

            const flightsList = document.getElementById('flightsList');
            if (filtered.length === 0) {
                flightsList.innerHTML = '<p>Tidak ada hasil pencarian</p>';
            } else {
                flightsList.innerHTML = filtered.map(flight => `
                    <div class="flight-card">
                        <div class="card-header">
                            <div>${flight.flightNumber}</div>
                            <div class="flight-status">${flight.status}</div>
                        </div>
                        <div class="card-body">
                            <div class="flight-route"><strong>${flight.from}</strong> → <strong>${flight.to}</strong></div>
                            <div class="flight-info">
                                <div>Berangkat: ${flight.departureTime}</div>
                                <div>Tiba: ${flight.arrivalTime}</div>
                            </div>
                            <div>Tanggal: ${flight.date}</div>
                        </div>
                    </div>
                `).join('');
            }
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            document.getElementById('searchDate').value = '';
            document.getElementById('searchRoute').value = '';
            loadFlights();
        });
    }
}
