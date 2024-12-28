import express from 'express';
import {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../controllers/courseController';
import upload from '../middleware/upload';

const router = express.Router();

// GET all courses
router.get('/', getCourses);

// GET a single course
router.get('/:id', getCourse);

// POST a new course
router.post('/', upload.single('image'), createCourse);

// UPDATE a course
router.patch('/:id', upload.single('image'), updateCourse);

// DELETE a course
router.delete('/:id', deleteCourse);

export default router; 