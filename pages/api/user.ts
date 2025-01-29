import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const user = await prisma.user.findMany(); // Adjust based on your actual model
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  } else if (req.method === 'POST') {
    // Handle POST request to create a new user
    try {
      const { firstName, lastName, position, dateEmployed, status } = req.body; // Make sure body is parsed

      // Create new user in the database
      const newUser = await prisma.user.create({
        data: {
          firstName,
          lastName,
          position,
          dateEmployed: new Date(dateEmployed), // Ensure it's parsed as Date
          status,
        },
      });

      res.status(201).json(newUser); // Return the created user
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Failed to create user' });
    }
  } else {
    // Handle unsupported methods
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}