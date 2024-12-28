"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const courseController_1 = require("../controllers/courseController");
const router = express_1.default.Router();
// GET all courses
router.get('/', courseController_1.getCourses);
// GET a single course
router.get('/:id', courseController_1.getCourse);
// POST a new course
router.post('/', courseController_1.createCourse);
// UPDATE a course
router.patch('/:id', courseController_1.updateCourse);
// DELETE a course
router.delete('/:id', courseController_1.deleteCourse);
exports.default = router;
