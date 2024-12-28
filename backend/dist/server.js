"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const courses_1 = __importDefault(require("./routes/courses"));
// Load environment variables
dotenv_1.default.config();
// Create Express app
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/courses', courses_1.default);
// Connect to MongoDB
mongoose_1.default
    .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/9antra')
    .then(() => {
    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
    .catch((error) => {
    console.log('Error connecting to MongoDB:', error);
});
