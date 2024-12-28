import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Course from '../models/Course';

interface MongoError extends Error {
  code?: number;
}

// Get all courses
export const getCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find({});
    res.status(200).json(courses);
  } catch (error) {
    const mongoError = error as MongoError;
    res.status(400).json({ error: mongoError.message || 'Error fetching courses' });
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
    const mongoError = error as MongoError;
    res.status(400).json({ error: mongoError.message || 'Error fetching course' });
  }
};

// Create a new course
export const createCourse = async (req: Request, res: Response) => {
  const { title, price, image } = req.body;
  try {
    const course = await Course.create({ title, price, image });
    res.status(201).json(course);
  } catch (error) {
    const mongoError = error as MongoError;
    res.status(400).json({ error: mongoError.message || 'Error creating course' });
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
    const mongoError = error as MongoError;
    res.status(400).json({ error: mongoError.message || 'Error updating course' });
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
    const mongoError = error as MongoError;
    res.status(400).json({ error: mongoError.message || 'Error deleting course' });
  }
}; 