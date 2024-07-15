const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
const API_URL = 'https://bikeindex.org/api/v3';

// fetch data
async function fetchData(url) {
    try {
        const response = await fetch(CORS_PROXY + url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

// all bikes
async function getAllBikes() {
    clearBikeListData();
    clearProfileData();

    document.getElementById('loading').innerHTML = 'Loading bike list....';
    const data = await fetchData(`${API_URL}/search`);
    if (data && data.bikes) {
        displayBikes(data.bikes);
        document.getElementById('loading').innerHTML = '';
    } else {
        displayError('Failed to fetch bikes data');
    }
}

// single bike
async function getSingleBike(id) {
    clearBikeListData();
    clearProfileData();

    document.getElementById('loading').innerHTML = 'Loading bike list....';
    const data = await fetchData(`${API_URL}/bikes/${id}`);
    if (data && data.bike) {
        displayBikes([data.bike]);
        document.getElementById('loading').innerHTML = '';
    } else {
        displayError('Failed to fetch bike data');
    }
}

async function getMyProfile() {
    clearBikeListData()
    clearProfileData()

    document.getElementById('loading').innerHTML = 'Loading profile....'
    const data = await fetchData(`${API_URL}/me?access_token=${process.env.BIKE_INDEX_API_KEY}`);
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
                <td>${bike.title || 'N/A'}</td>
                <td>${bike.manufacturer_name || 'N/A'}</td>
                <td>${bike.frame_model || 'N/A'}</td>
                <td>${bike.frame_colors ? bike.frame_colors.join(', ') : 'N/A'}</td>
                <td>${bike.year || 'N/A'}</td>
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

// clear bike list data
function clearBikeListData() {
    const bikesList = document.getElementById('bikesList');
    bikesList.innerHTML = '';
}

// clear ptofile data
function clearProfileData() {
    document.getElementById('profileList').innerHTML = '';
}


// display errors
function displayError(message) {
    const bikesList = document.getElementById('bikesList');
    bikesList.innerHTML = `<p style="color: red;">${message}</p>`;
}


// get data on load
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('allBikesBtn').addEventListener('click', getAllBikes);
    document.getElementById('singleBikeBtn').addEventListener('click', () => {
        const bikeId = prompt('Enter bike ID:');
        if (bikeId) getSingleBike(bikeId);
    });
});