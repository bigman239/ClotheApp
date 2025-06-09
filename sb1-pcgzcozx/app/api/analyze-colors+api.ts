export async function POST(request: Request) {
  try {
    const { image } = await request.json();
    
    if (!image) {
      return new Response(JSON.stringify({
        error: 'Missing image data',
        message: 'Please provide a base64 encoded image'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get backend URL from environment or use default
    const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL || 'http://localhost:3001';
    
    const response = await fetch(`${backendUrl}/api/color-analysis/analyze-base64`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image,
        mimeType: 'image/jpeg'
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Backend request failed with status ${response.status}`);
    }

    const result = await response.json();
    return Response.json(result);

  } catch (error) {
    console.error('Error in color analysis proxy:', error);
    
    return new Response(JSON.stringify({
      error: 'Analysis failed',
      message: error instanceof Error ? error.message : 'Failed to analyze image colors'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}