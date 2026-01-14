# CORS Error Fix - Airtable API Integration

## Problem
You were experiencing a CORS (Cross-Origin Resource Sharing) error when calling the Airtable API directly from your dashboard page component.

## Root Causes
1. **Client-side API call**: The dashboard page was making a direct fetch request to Airtable's API from the browser
2. **Missing Authorization**: The Airtable API requires a Bearer token in the Authorization header
3. **CORS restrictions**: Browsers block cross-origin requests without proper CORS headers

## Solution Implemented

### 1. Created Next.js API Route (`/src/app/api/airtable/route.ts`)
This server-side endpoint acts as a proxy between your frontend and Airtable:
- Handles the Airtable API authentication securely
- Runs on the server, avoiding CORS issues
- Keeps your API key secure (not exposed to the browser)

### 2. Updated Dashboard Service (`/src/app/api/dashboard.ts`)
Changed from calling Airtable directly to calling the local API route:
- Now calls `/api/airtable` instead of `https://api.airtable.com/...`
- Simplified error handling
- Better error messages

### 3. Updated Dashboard Page (`/src/app/(protected)/dashboard/page.tsx`)
Added proper state management for async data fetching:
- Added `useState` for data, loading, and error states
- Properly handles the async `dashboard()` call
- Better error handling and logging

## Environment Variables Required

You need to add the following to your `.env.local` file:

```env
# Airtable Configuration
NEXT_PUBLIC_AIRTABLE_BASE_ID=your_base_id_here
NEXT_PUBLIC_AIRTABLE_TABLE_NAME=your_table_name_here
NEXT_PUBLIC_AIRTABLE_VIEW_NAME=your_view_name_here

# IMPORTANT: This should NOT have NEXT_PUBLIC_ prefix (server-side only)
AIRTABLE_API_KEY=your_airtable_api_key_here
```

### How to Get Your Airtable Credentials:

1. **Base ID**: 
   - Go to https://airtable.com/api
   - Select your base
   - The Base ID is shown in the URL and documentation

2. **Table Name**: 
   - The name of your table in Airtable (e.g., "Candidates", "Interviews")

3. **View Name** (optional):
   - The name of a specific view if you want to filter data

4. **API Key**:
   - Go to https://airtable.com/account
   - Click "Generate API key" or copy your existing key
   - **IMPORTANT**: Keep this secret! Never commit it to git.

## Security Notes

- `AIRTABLE_API_KEY` does NOT have the `NEXT_PUBLIC_` prefix, which means it's only available server-side
- This prevents your API key from being exposed in the browser
- The API route runs on the server and securely handles authentication

## Testing

After adding the environment variables:
1. Restart your development server: `npm run dev`
2. Navigate to the dashboard page
3. Check the browser console for "Dashboard data:" log
4. The CORS error should be resolved

## Next Steps

You can now use the `dashboardData` state in your component to display real data from Airtable instead of the hardcoded values.

Example:
```tsx
{loading ? (
  <p>Loading...</p>
) : error ? (
  <p>Error: {error}</p>
) : (
  <div>
    {/* Use dashboardData here */}
    {dashboardData && JSON.stringify(dashboardData)}
  </div>
)}
```
