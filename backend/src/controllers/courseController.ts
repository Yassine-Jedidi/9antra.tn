import { Request, Response } from 'express';
import Course from '../models/Course';

// Get all courses
export const getCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find({}).sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single course
export const getCourse = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create a new course
export const createCourse = async (req: Request, res: Response) => {
  const { title, price, image } = req.body;
  try {
    const course = await Course.create({ title, price, image });
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a course
export const updateCourse = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const course = await Course.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a course
export const deleteCourse = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}; 