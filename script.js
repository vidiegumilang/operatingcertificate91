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
