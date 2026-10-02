import { getCollection } from '@/lib/mongodb';
import { serialize } from '@/lib/serialize';

export async function GET() {
  const apis = await (await getCollection('apiDefinitions')).find({}).sort({ createdAt: -1 }).toArray();
  return Response.json(serialize(apis));
}

export async function POST(request) {
  const body = await request.json();
  const now = new Date();
  const doc = { ...body, database: 'mongodb', createdAt: now, updatedAt: now };
  const result = await (await getCollection('apiDefinitions')).insertOne(doc);
  return Response.json(serialize({ ...doc, _id: result.insertedId }), { status: 201 });
}
