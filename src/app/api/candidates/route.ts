
import { NextResponse } from 'next/server';
import routes from '@/app/api/routes';
import { getAuthToken } from '@/utils/token'; // Note: getAuthToken uses localStorage, might not work on server. We need to forward headers.

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '10';

    const url = routes.CANDIDATE_LIST({ page, limit });
    
    // For server-to-server proxy, we might need to pass the token from the incoming request's Authorization header
    const authHeader = request.headers.get('Authorization');

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Forward the Authorization header if it exists
        ...(authHeader && { 'Authorization': authHeader }),
      },
      cache: 'no-store'
    });

    if (!response.ok) {
        // Handle error gracefully or throw
        console.error("External API Error Status:", response.status);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching candidates:", error);
    return NextResponse.json({ error: 'Failed to fetch candidates' }, { status: 500 });
  }
}
