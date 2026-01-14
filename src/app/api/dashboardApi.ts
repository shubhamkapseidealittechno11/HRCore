
import { getAuthToken } from "@/utils/token";
import routes from "./routes";

const dashboard = async () => {
  try {
    const token = getAuthToken();
    const url  = routes.DASHBOARD_LIST();
    // Calling our internal API proxy route to avoid CORS and show a clean API call in network tab
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Dashboard API fetch error:', error);
    throw error;
  }
};

export default dashboard;