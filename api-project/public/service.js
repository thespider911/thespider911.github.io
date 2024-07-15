import express from 'express';
import 'dotenv/config';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse JSON request body
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const API_URL = `https://bikeindex.org/api/v3`;

async function fetchBikesData(url) {
    try {
        const headers = { 'Content-Type': 'application/json' };
        const response = await fetch(url, { headers });
        const body = await response.json();
        if (response.ok) {
            console.log('Success');
            return { status: true, data: body };
        } else {
            console.log('Oops! Something went wrong!');
            return { status: false };
        }
    } catch (error) {
        console.error(error);
        return { status: false, error: error };
    }
}

async function fetchData(url) {
    try {
        const response = await fetchBikesData(url);
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
        const data = await fetchData(`${API_URL}/search`);
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
        const data = await fetchData(`${API_URL}/bikes/${id}`);
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