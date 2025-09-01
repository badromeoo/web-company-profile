import { client } from '@/lib/sanity.client';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { postId } = await request.json();
    if (!postId) {
      return NextResponse.json({ message: 'Post ID is required' }, { status: 400 });
    }

    // Use the Sanity client to delete the document
    await client.delete(postId);

    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { message: 'Failed to delete post', error },
      { status: 500 }
    );
  }
}