import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Initialize Google GenAI
const ai = new GoogleGenAI({ apiKey: process.env.AIzaSyDGm_3HU1wxhwRvM8MBAQWyQfh60FwDfAE });
const History = [];

app.use(express.json());
app.use(express.static(__dirname));

// API endpoint for chat
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        // Add user message to history
        History.push({
            role: 'user',
            parts: [{ text: message }]
        });

        // Generate response
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: History
        });

        // Add AI response to history
        History.push({
            role: 'model',
            parts: [{ text: response.text }]
        });

        res.json({ response: response.text });
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Serve the frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`COSMOS AI server running at http://localhost:${port}`);
});
