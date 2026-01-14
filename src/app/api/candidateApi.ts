"use server";

import { toast } from "sonner";

const candidateApi = async () => {
  try {
    const baseId = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID_USER;
    const tableName = process.env.NEXT_PUBLIC_AIRTABLE_TABLE_NAME_USER;
    const viewName = process.env.NEXT_PUBLIC_AIRTABLE_VIEW_NAME_USER;
    const apiKey = process.env.AIRTABLE_API_KEY;

    if (!baseId || !tableName || !apiKey) {
      toast.error('Missing Airtable configuration: Check environment variables');
    }

    const url = `https://api.airtable.com/v0/${baseId}/${tableName}${viewName ? `?view=${viewName}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Ensure fresh data
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to fetch dashboard data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Dashboard API error:', error);
    throw error;
  }
};

export default candidateApi;