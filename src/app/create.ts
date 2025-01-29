
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { firstName, lastName, dateEmployed, status } = req.body;

    const newEmployee = await prisma.user.create({
      data: {
        firstName,
        lastName,
        dateEmployed: new Date(dateEmployed),
        status,
      },
    });

    res.status(201).json(newEmployee);
  }
}