import { NextResponse } from 'next/server';
import { FormData } from '../../../lib/types';
import { saveToGoogleSheets, createZavisPayload, callZavisApi } from '../../../lib/api-utils';

export async function POST(req: Request) {
  try {
    const body = await req.json() as FormData;
    
    // First, store the data in Google Sheets
    await saveToGoogleSheets(body);
    
    // Create payload for Zavis API
    const zavisPayload = createZavisPayload(body);

    console.log('Calling Zavis AI API with payload:', zavisPayload);

    // Call Zavis API
    const zavisData = await callZavisApi(zavisPayload);

    console.log('Zavis API response:', zavisData);

    return NextResponse.json({ 
      success: true, 
      message: 'Data successfully stored and call initiated',
      callData: zavisData
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process request: ' + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
} 