"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourse = exports.updateCourse = exports.createCourse = exports.getCourse = exports.getCourses = void 0;
const Course_1 = __importDefault(require("../models/Course"));
// Get all courses
const getCourses = async (req, res) => {
    try {
        const courses = await Course_1.default.find({}).sort({ createdAt: -1 });
        res.status(200).json(courses);
    }
    catch (error) {
        const mongoError = error;
        res.status(400).json({ error: mongoError.message || 'Error fetching courses' });
    }
};
exports.getCourses = getCourses;
// Get a single course
const getCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course_1.default.findById(id);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json(course);
    }
    catch (error) {
        const mongoError = error;
        res.status(400).json({ error: mongoError.message || 'Error fetching course' });
    }
};
exports.getCourse = getCourse;
// Create a new course
const createCourse = async (req, res) => {
    const { title, price, image } = req.body;
    try {
        const course = await Course_1.default.create({ title, price, image });
        res.status(201).json(course);
    }
    catch (error) {
        const mongoError = error;
        res.status(400).json({ error: mongoError.message || 'Error creating course' });
    }
};
exports.createCourse = createCourse;
// Update a course
const updateCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course_1.default.findByIdAndUpdate(id, { ...req.body }, { new: true });
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json(course);
    }
    catch (error) {
        const mongoError = error;
        res.status(400).json({ error: mongoError.message || 'Error updating course' });
    }
};
exports.updateCourse = updateCourse;
// Delete a course
const deleteCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course_1.default.findByIdAndDelete(id);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json(course);
    }
    catch (error) {
        const mongoError = error;
        res.status(400).json({ error: mongoError.message || 'Error deleting course' });
    }
};
exports.deleteCourse = deleteCourse;
