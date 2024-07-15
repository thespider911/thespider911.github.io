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

// Fetch all bikes data from bikes api
app.get('/api/all-bikes', async (req, res) => {
    try {
        const response = await fetchBikesData('https://bikeindex.org/api/v3/search');
        if (response.status === true) {
            res.json(response.data);
        } else {
            res.status(500).json({message: 'Oops! Something went wrong!'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
});

// Fetch bike by id
app.get('/api/bike/:id', async (req, res) => {
    try {
        const response = await fetchBikesData(`https://bikeindex.org/api/v3/bikes/${req.params.id}`);
        if (response.status === true) {
            res.json(response.data);
        } else {
            res.status(500).json({message: 'Oops! Something went wrong!'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
});

// Fetch my bikes - token
app.get('/api/my-profile', async (req, res) => {
    try {
        const response = await fetchBikesData(`https://bikeindex.org:443/api/v3/me?access_token=${process.env.BIKE_INDEX_API_KEY}`);
        if (response.status === true) {
            res.json(response.data);
        } else {
            res.status(500).json({message: 'Oops! Something went wrong!'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});