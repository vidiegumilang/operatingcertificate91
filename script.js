// ==================== FLIGHT DATA MANAGEMENT ====================

// Sample flight data
const sampleFlights = [
    {
        id: 1,
        flightNumber: "SD-101",
        from: "Jakarta",
        to: "Surabaya",
        date: "2026-04-06",
        departureTime: "08:00",
        arrivalTime: "10:30",
        aircraft: "PK-AEA",
        seats: "150",
        instructor: "Capt. Budi",
        status: "Tepat Waktu",
        notes: ""
    },
    {
        id: 2,
        flightNumber: "SD-202",
        from: "Bandung",
        to: "Yogyakarta",
        date: "2026-04-06",
        departureTime: "09:30",
        arrivalTime: "11:00",
        aircraft: "PK-AEB",
        seats: "180",
        instructor: "Capt. Ahmad",
        status: "Tepat Waktu",
        notes: ""
    },
    {
        id: 3,
        flightNumber: "SD-303",
        from: "Jakarta",
        to: "Bali",
        date: "2026-04-06",
        departureTime: "14:00",
        arrivalTime: "16:45",
        aircraft: "PK-AEC",
        seats: "250",
        instructor: "Capt. Rudi",
        status: "Tertunda",
        notes: ""
    }
];

// Initialize localStorage with sample data if empty
function initializeData() {
    if (!localStorage.getItem('flights')) {
        localStorage.setItem('flights', JSON.stringify(sampleFlights));
    }
}

// Get all flights from localStorage
function getFlights() {
    initializeData();
    return JSON.parse(localStorage.getItem('flights')) || [];
}

// Add new flight
function addFlight(flight) {
    const flights = getFlights();
    flight.id = Math.max(...flights.map(f => f.id), 0) + 1;
    flights.push(flight);
    localStorage.setItem('flights', JSON.stringify(flights));
    return flight;
}

// Delete flight
function deleteFlight(id) {
    const flights = getFlights().filter(f => f.id !== id);
    localStorage.setItem('flights', JSON.stringify(flights));
}

// Edit flight
function editFlight(id) {
    console.log('Edit flight with ID:', id);
}

// ==================== INSTRUCTORS MANAGEMENT ====================

// Sample instructor data
const sampleInstructors = [
    {
        id: 1,
        name: "Capt. Budi",
        email: "budi@sekolah.com",
        phone: "081234567890",
        specialization: "Pilot"
    },
    {
        id: 2,
        name: "Capt. Ahmad",
        email: "ahmad@sekolah.com",
        phone: "082345678901",
        specialization: "Co-Pilot"
    },
    {
        id: 3,
        name: "Capt. Rudi",
        email: "rudi@sekolah.com",
        phone: "083456789012",
        specialization: "Pilot"
    }
];

// Initialize instructors if empty
function initializeInstructors() {
    if (!localStorage.getItem('instructors')) {
        localStorage.setItem('instructors', JSON.stringify(sampleInstructors));
    }
}

// Get all instructors
function getInstructors() {
    initializeInstructors();
    return JSON.parse(localStorage.getItem('instructors')) || [];
}

// Add new instructor
function addInstructor(instructor) {
    const instructors = getInstructors();
    instructor.id = Math.max(...instructors.map(i => i.id), 0) + 1;
    instructors.push(instructor);
    localStorage.setItem('instructors', JSON.stringify(instructors));
    console.log('Instructor added:', instructor);
}

// Delete instructor
function deleteInstructor(id) {
    const instructors = getInstructors().filter(i => i.id !== id);
    localStorage.setItem('instructors', JSON.stringify(instructors));
    console.log('Instructor deleted with ID:', id);
}

// ==================== STUDENTS MANAGEMENT ====================

// Initialize students if empty
function initializeStudents() {
    if (!localStorage.getItem('students')) {
        localStorage.setItem('students', JSON.stringify([]));
    }
}

// Get all students
function getStudents() {
    initializeStudents();
    return JSON.parse(localStorage.getItem('students')) || [];
}

// Add new student
function addStudent(student) {
    const students = getStudents();
    student.id = Math.max(...students.map(s => s.id), 0) + 1;
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));
    console.log('Student added:', student);
}

// Delete student
function deleteStudent(id) {
    const students = getStudents().filter(s => s.id !== id);
    localStorage.setItem('students', JSON.stringify(students));
    console.log('Student deleted with ID:', id);
}

// ==================== SCHEDULE FUNCTIONS ====================

// Time periods definition
const timePeriods = [
    { name: 'Pagi (06:00 - 12:00)', class: 'morning', start: '06:00', end: '12:00' },
    { name: 'Siang (12:00 - 18:00)', class: 'afternoon', start: '12:00', end: '18:00' },
    { name: 'Malam (18:00 - 00:00)', class: 'evening', start: '18:00', end: '00:00' },
    { name: 'Tengah Malam (00:00 - 06:00)', class: 'night', start: '00:00', end: '06:00' }
];

// Load schedule by date
function loadSchedule(date) {
    const flights = getFlights().filter(f => f.date === date);
    const container = document.getElementById('scheduleContainer');
    
    if (!container) return;
    
    // Format tanggal
    const dateObj = new Date(date + 'T00:00:00');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = dateObj.toLocaleDateString('id-ID', options);
    
    let html = `<div class="schedule-date">${formattedDate}</div>`;
    
    // Tampilkan jadwal untuk setiap periode
    timePeriods.forEach(period => {
        const periodFlights = flights.filter(f => {
            const time = f.departureTime;
            return time >= period.start && time < period.end;
        });
        
        html += createPeriodTable(period, periodFlights);
    });
    
    if (flights.length === 0) {
        html += `<div style="padding: 40px; text-align: center; color: #999;">Tidak ada penerbangan pada tanggal ini</div>`;
    }
    
    container.innerHTML = html;
}

// Create table for time period
function createPeriodTable(period, flights) {
    let html = `
        <div class="time-period">
            <div class="period-header ${period.class}">
                <span>${period.name}</span>
                <span>${flights.length} penerbangan</span>
            </div>
            <table class="flights-table">
                <thead>
                    <tr>
                        <th>Nomor</th>
                        <th>Rute</th>
                        <th>Dari</th>
                        <th>Tujuan</th>
                        <th>Berangkat</th>
                        <th>Tiba</th>
                        <th>Pesawat</th>
                        <th>Kursi</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    if (flights.length === 0) {
        html += `
                    <tr class="flight-row">
                        <td colspan="9" class="empty-slot">Tidak ada penerbangan</td>
                    </tr>
        `;
    } else {
        flights.forEach(flight => {
            html += `
                    <tr class="flight-row">
                        <td class="flight-num">${flight.flightNumber}</td>
                        <td class="flight-route">${flight.from} → ${flight.to}</td>
                        <td>${flight.from}</td>
                        <td>${flight.to}</td>
                        <td class="flight-time">${flight.departureTime}</td>
                        <td class="flight-time">${flight.arrivalTime}</td>
                        <td>${flight.aircraft}</td>
                        <td class="flight-seat">${flight.seats}</td>
                        <td>
                            <span class="status-badge status-${getStatusClass(flight.status).replace('status-', '')}">
                                ${flight.status}
                            </span>
                        </td>
                    </tr>
            `;
        });
    }
    
    html += `
                </tbody>
            </table>
        </div>
    `;
    
    return html;
}

function getStatusClass(status) {
    const statusMap = {
        'Tepat Waktu': 'status-ontime',
        'Tertunda': 'status-delayed',
        'Selesai': 'status-completed'
    };
    return statusMap[status] || 'status-ontime';
}

// Get today's date in YYYY-MM-DD format
function getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

// Format time for display
function formatTime(time) {
    return time.slice(0, 5);
}

// Load and display flights in card view
function loadFlights() {
    const flights = getFlights();
    const flightsList = document.getElementById('flightsList');
    
    if (!flightsList) return;

    if (flights.length === 0) {
        flightsList.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <h3>Tidak ada jadwal penerbangan</h3>
                <p>Silakan tambahkan jadwal penerbangan dari panel admin</p>
            </div>
        `;
        return;
    }

    flightsList.innerHTML = flights.map(flight => `
        <div class="flight-card">
            <div class="card-header">
                <div class="flight-number">${flight.flightNumber}</div>
                <div class="flight-status ${getStatusClass(flight.status)}">${flight.status}</div>
            </div>
            <div class="card-body">
                <div class="flight-info">
                    <div class="flight-route">
                        <strong>${flight.from}</strong> → <strong>${flight.to}</strong>
                    </div>
                </div>
                <div class="flight-info">
                    <div class="flight-time">
                        <div class="flight-time-label">Keberangkatan</div>
                        <div class="flight-time-value">${flight.departureTime}</div>
                    </div>
                    <div class="flight-time">
                        <div class="flight-time-label">Tiba</div>
                        <div class="flight-time-value">${flight.arrivalTime}</div>
                    </div>
                </div>
                <div class="flight-details">
                    <div class="detail-item">
                        <div class="detail-label">Tanggal</div>
                        <div class="detail-value">${flight.date}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Pesawat</div>
                        <div class="detail-value">${flight.aircraft}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Kursi</div>
                        <div class="detail-value">${flight.seats}</div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Filter flights based on search criteria
function filterFlights(date, route) {
    const flights = getFlights();
    
    return flights.filter(flight => {
        const dateMatch = !date || flight.date === date;
        const routeMatch = !route || 
            flight.from.toLowerCase().includes(route.toLowerCase()) ||
            flight.to.toLowerCase().includes(route.toLowerCase());
        
        return dateMatch && routeMatch;
    });
}

// Display filtered flights
function displayFilteredFlights(filteredFlights) {
    const flightsList = document.getElementById('flightsList');
    
    if (!flightsList) return;

    if (filteredFlights.length === 0) {
        flightsList.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <h3>Tidak ada hasil pencarian</h3>
                <p>Coba ubah filter pencarian Anda</p>
            </div>
        `;
        return;
    }

    flightsList.innerHTML = filteredFlights.map(flight => `
        <div class="flight-card">
            <div class="card-header">
                <div class="flight-number">${flight.flightNumber}</div>
                <div class="flight-status ${getStatusClass(flight.status)}">${flight.status}</div>
            </div>
            <div class="card-body">
                <div class="flight-info">
                    <div class="flight-route">
                        <strong>${flight.from}</strong> → <strong>${flight.to}</strong>
                    </div>
                </div>
                <div class="flight-info">
                    <div class="flight-time">
                        <div class="flight-time-label">Keberangkatan</div>
                        <div class="flight-time-value">${flight.departureTime}</div>
                    </div>
                    <div class="flight-time">
                        <div class="flight-time-label">Tiba</div>
                        <div class="flight-time-value">${flight.arrivalTime}</div>
                    </div>
                </div>
                <div class="flight-details">
                    <div class="detail-item">
                        <div class="detail-label">Tanggal</div>
                        <div class="detail-value">${flight.date}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Pesawat</div>
                        <div class="detail-value">${flight.aircraft}</div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Setup search filters
function setupSearchFilters() {
    const searchBtn = document.getElementById('searchBtn');
    const resetBtn = document.getElementById('resetBtn');
    const searchDate = document.getElementById('searchDate');
    const searchRoute = document.getElementById('searchRoute');

    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const date = searchDate.value;
            const route = searchRoute.value;
            const filtered = filterFlights(date, route);
            displayFilteredFlights(filtered);
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            if (searchDate) searchDate.value = '';
            if (searchRoute) searchRoute.value = '';
            loadFlights();
        });
    }

    // Allow Enter key to search
    if (searchDate) {
        searchDate.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') searchBtn.click();
        });
    }

    if (searchRoute) {
        searchRoute.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') searchBtn.click();
        });
    }
}

// ==================== SCHEDULE BOARD FUNCTIONS ====================

// Aircraft registration list
const aircraftRegistrations = [
    'PK-AEA', 'PK-AEB', 'PK-AEC', 'PK-AED', 'PK-AEE',
    'PK-AEF', 'PK-AEG', 'PK-AEH', 'PK-AEI', 'PK-AEJ',
    'PK-AEK', 'PK-AEL', 'PK-AEM', 'PK-AEN', 'PK-AEO'
];

// Period definitions for schedule board
const periods = [
    { start: '06:00', end: '07:30', name: 'Periode 1' },
    { start: '07:30', end: '09:00', name: 'Periode 2' },
    { start: '09:00', end: '10:30', name: 'Periode 3' },
    { start: '10:30', end: '12:00', name: 'Periode 4' },
    { start: '13:00', end: '14:30', name: 'Periode 5' },
    { start: '14:30', end: '16:00', name: 'Periode 6' },
    { start: '16:00', end: '17:30', name: 'Periode 7' },
    { start: '17:30', end: '19:00', name: 'Periode 8' }
];

// Load schedule board
function loadBoard(date) {
    const flights = getFlights().filter(f => f.date === date);
    const boardBody = document.getElementById('boardBody');
    
    if (!boardBody) return;
    
    let html = '';

    aircraftRegistrations.forEach(registration => {
        html += `<tr><td>${registration}</td>`;

        periods.forEach(period => {
            // Find flights for this aircraft and period
            const flightInPeriod = flights.find(f => 
                f.aircraft === registration &&
                f.departureTime >= period.start &&
                f.departureTime < period.end
            );

            if (flightInPeriod) {
                const statusClass = flightInPeriod.status === 'Tertunda' ? 'delayed' : 
                                  flightInPeriod.status === 'Selesai' ? 'completed' : '';
                html += `
                    <td>
                        <div class="flight-cell ${statusClass}" onclick="showFlightDetail(${flightInPeriod.id})">
                            <div class="flight-number">${flightInPeriod.flightNumber}</div>
                            <div class="flight-time">${flightInPeriod.departureTime}</div>
                            <div class="flight-route">${flightInPeriod.from} → ${flightInPeriod.to}</div>
                        </div>
                    </td>
                `;
            } else {
                html += '<td><span class="empty-cell">-</span></td>';
            }
        });

        html += '</tr>';
    });

    boardBody.innerHTML = html;
}

// Show flight detail in modal
function showFlightDetail(flightId) {
    const flights = getFlights();
    const flight = flights.find(f => f.id === flightId);

    if (!flight) return;

    const modalBody = document.getElementById('modalBody');
    if (!modalBody) return;
    
    modalBody.innerHTML = `
        <div class="detail-row">
            <span class="detail-label">Nomor Penerbangan:</span>
            <span class="detail-value">${flight.flightNumber}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Dari:</span>
            <span class="detail-value">${flight.from}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Ke:</span>
            <span class="detail-value">${flight.to}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Tanggal:</span>
            <span class="detail-value">${flight.date}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Berangkat:</span>
            <span class="detail-value">${flight.departureTime}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Tiba:</span>
            <span class="detail-value">${flight.arrivalTime}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Pesawat:</span>
            <span class="detail-value">${flight.aircraft}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Jumlah Kursi:</span>
            <span class="detail-value">${flight.seats}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Instruktur:</span>
            <span class="detail-value">${flight.instructor || '-'}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Status:</span>
            <span class="detail-value">${flight.status}</span>
        </div>
        ${flight.notes ? `<div class="detail-row">
            <span class="detail-label">Catatan:</span>
            <span class="detail-value">${flight.notes}</span>
        </div>` : ''}
    `;

    const modal = document.getElementById('flightModal');
    if (modal) modal.classList.add('active');
}

// Close modal
function closeModal() {
    const modal = document.getElementById('flightModal');
    if (modal) modal.classList.remove('active');
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('flightModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }
});
