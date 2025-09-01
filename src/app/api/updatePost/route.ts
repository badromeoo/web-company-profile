import { client } from '@/lib/sanity.client';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { postId, title, caption } = await request.json();

    await client
      .patch(postId) // Specify the document to patch
      .set({ title: title, caption: caption }) // Set the new values
      .commit(); // Commit the patch

    return NextResponse.json({ message: 'Post updated successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update post', error }, { status: 500 });
  }
}