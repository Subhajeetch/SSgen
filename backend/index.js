import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {

    console.log("The ip is:", req.ip)
    res.json({
        success: true,
        message: 'Server is running'
    });
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
