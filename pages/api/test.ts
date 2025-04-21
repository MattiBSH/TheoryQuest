// pages/api/test.ts
import type { NextApiRequest, NextApiResponse } from 'next'

type TestResponse = {
  message: string
  timestamp: number
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TestResponse>
) {
    console.log('Test API endpoint hit')
  res.status(200).json({ 
    message: 'API is working correctly!',
    timestamp: Date.now()
  })
}