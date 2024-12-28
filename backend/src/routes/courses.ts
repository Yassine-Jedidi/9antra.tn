import express from 'express';
import {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../controllers/courseController';

const router = express.Router();

// GET all courses
router.get('/', getCourses);

// GET a single course
router.get('/:id', getCourse);

// POST a new course
router.post('/', createCourse);

// UPDATE a course
router.patch('/:id', updateCourse);

// DELETE a course
router.delete('/:id', deleteCourse);

export default router; 