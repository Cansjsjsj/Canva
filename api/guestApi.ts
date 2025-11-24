
import type { GuestData } from '../types';

// --- Supabase Configuration ---
const SUPABASE_URL = 'https://agrblxtizgtkbyokhkru.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFncmJseHRpemd0a2J5b2toa3J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0MDgzMzgsImV4cCI6MjA3Nzk4NDMzOH0.4iO-eujqlw_yMiorNOLnmEqf-zsIQMmH_SaN4opLr-8';

const headers = {
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json'
};

/**
 * Maps a row from the Supabase 'guests' table to the app's GuestData type.
 * @param supabaseGuest The raw object from the Supabase API.
 * @returns A GuestData object.
 */
const mapSupabaseToGuestData = (supabaseGuest: any): GuestData => {
  return {
    id: supabaseGuest.id.toString(),
    field1: supabaseGuest.field1,
    field2: supabaseGuest.field2,
    timestamp: supabaseGuest.created_at ? new Date(supabaseGuest.created_at).toLocaleString() : '',
  };
};


// --- Public API ---

/**
 * Fetches all guest data from the Supabase server.
 */
export const getGuestData = async (): Promise<GuestData[]> => {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/guests?select=*&order=id.desc`, {
    headers: headers
  });

  if (!response.ok) {
    console.error('Failed to fetch data from Supabase', await response.text());
    throw new Error('Failed to fetch data from the server.');
  }

  const data = await response.json();
  return data.map(mapSupabaseToGuestData);
};

/**
 * Adds a new guest entry to the Supabase server.
 */
export const addGuestData = async (data: { field1: string; field2: string; }): Promise<GuestData> => {
    const payload = {
        field1: data.field1,
        field2: data.field2
    };

    const response = await fetch(`${SUPABASE_URL}/rest/v1/guests`, {
    method: 'POST',
    headers: {
        ...headers,
        'Prefer': 'return=representation' // Asks Supabase to return the newly created row
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    console.error('Failed to save data to Supabase', await response.text());
    throw new Error('Failed to save data to the server.');
  }
  
  const createdData = await response.json();
  
  // The response is an array with the single new object
  if (createdData && createdData.length > 0) {
      return mapSupabaseToGuestData(createdData[0]);
  } else {
      throw new Error('Server did not return the new data.');
  }
};
