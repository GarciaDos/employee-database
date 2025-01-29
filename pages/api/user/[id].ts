import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  if (req.method === 'DELETE') {
    try {
      const deletedUser = await prisma.user.delete({
        where: {
          id: Number(id),
        },
      });
      console.log('Deleted User:', deletedUser);
      return res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
      console.error('Error deleting user:', error);
      return res.status(500).json({ error: 'Failed to delete user' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { firstName, lastName, status, dateEmployed } = req.body;
  
      // Validate input data
      if (!firstName || !lastName || !status || !dateEmployed) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      // Ensure dateEmployed is in a valid ISO 8601 format
      const validDate = new Date(dateEmployed);
      if (isNaN(validDate.getTime())) {
        return res.status(400).json({ error: 'Invalid date format for dateEmployed' });
      }
  
      const updatedUser = await prisma.user.update({
        where: { id: Number(id) },
        data: { firstName, lastName, status, dateEmployed: validDate.toISOString() },
      });
  
      return res.status(200).json(updatedUser);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error updating user:", error.stack); // Log detailed error stack
      }
      return res.status(500).json({ error: 'Failed to update user' });
    }
  }
}  