import { google } from 'googleapis';
import { FormData, ZavisApiPayload } from './types';

// Google Sheets configuration
export const setupGoogleAuth = () => {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
    ],
  });
};

// Save form data to Google Sheets
export const saveToGoogleSheets = async (formData: FormData) => {
  const auth = setupGoogleAuth();
  const sheets = google.sheets({ version: 'v4', auth });
  
  // Get the spreadsheet ID from environment variable
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  
  if (!spreadsheetId) {
    throw new Error('GOOGLE_SHEETS_SPREADSHEET_ID is not defined');
  }
  
  // Format the date
  const date = new Date().toLocaleString();
  
  // Prepare the values to be inserted
  const values = [
    [
      date,
      formData.name,
      formData.phoneNumber,
      formData.location,
      formData.eid,
      formData.plan,
      formData.nationality || 'Not provided'
    ]
  ];

  // Append the values to the spreadsheet
  return await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'Sheet1!A:G', // Adjust the range according to your sheet
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values,
    },
  });
};

// Create Zavis API payload from form data
export const createZavisPayload = (formData: FormData): ZavisApiPayload => {
  return {
    agent_id: "Jw0JrQmJEWDfN6q6MC1k",
    recipient: {
      name: formData.name,
      phoneNumber: formData.phoneNumber
    },
    dynamicVariables: {
      emid: formData.eid,
      location: formData.location,
      nationality: formData.nationality || "",
      phone_number: formData.phoneNumber,
      plan: formData.plan
    }
  };
};

// Call Zavis API
export const callZavisApi = async (payload: ZavisApiPayload) => {
  console.log('Sending payload to Zavis API:', JSON.stringify(payload, null, 2));
  
  const response = await fetch("https://zavis-ai.vercel.app/api/calls", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2ODI2ZjcwNjUwOWQ3YjgwZWYwMmYyYTUiLCJ0eXBlIjoiYWRtaW4iLCJpYXQiOjE3NDY2ODA1MDMsImV4cCI6MTg0NzI4NTMwM30.yxrrOW4E-Qn5yoNKn98tYlCjNk_hffH-5U7pPCaHC64"
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();
  console.log('Zavis API response:', data);

  if (!response.ok) {
    throw new Error(`Failed to initiate call: ${data.message || 'Unknown error'}`);
  }

  return data;
}; 