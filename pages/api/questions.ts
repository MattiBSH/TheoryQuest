// pages/api/products.js
import { MongoClient } from 'mongodb';
export default async function handler(req:any, res:any) {

  const url = process.env.url
  const client = new MongoClient(url!);
  try {
    await client.connect();
    const db = client.db('theory');
    const collection = db.collection('qna');
    const products = await collection.find({}).toArray();
    res.status(200).json(products);
  } catch (err) {
    if (err instanceof Error) {
        res.status(500).json({ message: 'MongoDB error', error: err.message });
    } else {
        res.status(500).json({ message: 'Unknown error', error: String(err) });
    }
} finally {
    await client.close();
  }
}
