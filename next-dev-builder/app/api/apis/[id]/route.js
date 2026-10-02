import { ObjectId } from 'mongodb';
import { getCollection } from '@/lib/mongodb';
import { serialize } from '@/lib/serialize';

export async function PATCH(request, { params }) {
  const id = (await params).id;
  if (!ObjectId.isValid(id)) return Response.json({ error: 'Invalid id' }, { status: 400 });
  const body = await request.json();
  await (await getCollection('apiDefinitions')).updateOne({ _id: new ObjectId(id) }, { $set: { ...body, updatedAt: new Date() } });
  const api = await (await getCollection('apiDefinitions')).findOne({ _id: new ObjectId(id) });
  return Response.json(serialize(api));
}

export async function DELETE(_request, { params }) {
  const id = (await params).id;
  if (!ObjectId.isValid(id)) return Response.json({ error: 'Invalid id' }, { status: 400 });
  await (await getCollection('apiDefinitions')).deleteOne({ _id: new ObjectId(id) });
  return Response.json({ ok: true });
}
