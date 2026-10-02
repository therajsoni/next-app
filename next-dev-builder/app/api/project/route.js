import { getCollection } from '@/lib/mongodb';
import { defaultProject } from '@/data/default-project';
import { serialize } from '@/lib/serialize';

export async function GET() {
  const collection = await getCollection('projects');
  let project = await collection.findOne({ key: 'default' });
  if (!project) {
    const doc = { ...defaultProject, key: 'default', createdAt: new Date(), updatedAt: new Date() };
    await collection.insertOne(doc);
    project = doc;
  }
  return Response.json(serialize(project));
}

export async function PUT(request) {
  const body = await request.json();
  const collection = await getCollection('projects');
  await collection.updateOne({ key: 'default' }, { $set: { ...body, key: 'default', updatedAt: new Date() } }, { upsert: true });
  const project = await collection.findOne({ key: 'default' });
  return Response.json(serialize(project));
}
