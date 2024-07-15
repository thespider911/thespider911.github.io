const API_URL = `http://localhost:3000`;

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

async function getAllBikes() {
    clearBikeListData()
    clearProfileData()

        document.getElementById('loading').innerHTML = 'Loading bike list....'
        const data = await fetchData(`${API_URL}/api/all-bikes`);
        if (data && data.bikes) {
            displayBikes(data.bikes);
            document.getElementById('loading').innerHTML = ''
        } else {
            displayError('Failed to fetch bikes data');
        }
}

async function getSingleBike(id) {
    clearBikeListData()
    clearProfileData()

        document.getElementById('loading').innerHTML = 'Loading bike list....'
        const data = await fetchData(`${API_URL}/api/bike/${id}`);
        console.log(data)
        if (data && data.bikes) {
            displayBikes(data.bikes);
            document.getElementById('loading').innerHTML = ''
        } else {
            displayError('Failed to fetch bikes data');
        }
}

async function getMyProfile() {
    clearBikeListData()
    clearProfileData()

    document.getElementById('loading').innerHTML = 'Loading profile....'
    const data = await fetchData(`${API_URL}/api/my-profile`);
    if (data) {
        document.getElementById('profileList').innerHTML = `
        <ul>
                <li>ID: ${data.id}</li>
                <li>Name: ${data.user.name}</li>
                <li>Email: ${data.user.email}</li>
                <li>Total Bikes: ${data.bike_ids.length}</li>
            </ul>`

            document.getElementById('loading').innerHTML = ''
        } else {
            displayError('Failed to fetch your bikes data');
        }
}

function displayBikes(bikes) {
    const bikesList = document.getElementById('bikesList');
    bikesList.innerHTML = '';

    if (bikes && bikes.length > 0) {
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        // Add table headers
        thead.innerHTML = `
            <tr>
                <th>Name</th>
                <th>Manufacturer</th>
                <th>Model</th>
                <th>Colors</th>
                <th>Year</th>
                <th>Action</th>
            </tr>
        `;
        table.appendChild(thead);

        bikes.forEach(bike => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${bike.title}</td>
                <td>${bike.manufacturer_name}</td>
                <td>${bike.frame_model}</td>
                <td>${bike.frame_colors}</td>
                <td>${bike.year}</td>
                <td><a href='${bike.url}' target='_blank'>view</a></td>
            `;
            tbody.appendChild(tr);
        });

        table.appendChild(tbody);
        bikesList.appendChild(table);
    } else {
        bikesList.textContent = 'No bikes found.';
    }
}

function clearBikeListData () {
    const bikesList = document.getElementById('bikesList');
    bikesList.innerHTML = '';
}

function clearProfileData () {
    document.getElementById('profileList').innerHTML = '';
}

function displayError(message) {
    const bikesList = document.getElementById('bikesList');
    bikesList.innerHTML = `<p style="color: red;">${message}</p>`;
}