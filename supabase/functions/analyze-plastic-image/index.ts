import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { image } = await req.json();
    
    if (!image) {
      throw new Error('No image provided');
    }

    console.log('Analyzing image with OpenAI...');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are an expert plastic identification AI. Analyze the uploaded image and determine if it contains plastic materials. If plastic is detected, provide detailed analysis including type, quality, recycling code, and market value estimation.

Return your response as a JSON object with this exact structure:
{
  "isPlastic": boolean,
  "plasticType": string,
  "quality": "high" | "medium" | "low",
  "recyclingCode": string,
  "estimatedValue": number,
  "description": string,
  "properties": string[],
  "marketDemand": "high" | "medium" | "low",
  "nearbyVendors": number
}

If no plastic is detected, set isPlastic to false and provide a brief explanation in the description field.

For plastic identification, consider:
- Common plastic types: PET, HDPE, PVC, LDPE, PP, PS, etc.
- Quality based on visible condition, cleanliness, and integrity
- Recycling codes (1-7)
- Market value in Indian Rupees per gram
- Properties like durability, recyclability, flexibility
- Market demand based on current recycling trends`
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Please analyze this image to identify if it contains plastic and provide detailed analysis if plastic is found.'
              },
              {
                type: 'image_url',
                image_url: {
                  url: image
                }
              }
            ]
          }
        ],
        max_tokens: 1000
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API Error:', response.status, response.statusText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('OpenAI Response:', JSON.stringify(data, null, 2));
    
    const content = data.choices[0].message.content;
    
    try {
      const analysisResult = JSON.parse(content);
      
      // Validate the response structure
      if (!analysisResult.hasOwnProperty('isPlastic')) {
        throw new Error('Invalid response structure from AI');
      }

      return new Response(JSON.stringify(analysisResult), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      // Return a fallback response
      return new Response(JSON.stringify({
        isPlastic: false,
        plasticType: "Unknown",
        quality: "medium",
        recyclingCode: "7",
        estimatedValue: 0,
        description: "Unable to analyze the image. Please ensure the image is clear and contains visible plastic items.",
        properties: ["Analysis Failed"],
        marketDemand: "low",
        nearbyVendors: 0
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error in analyze-plastic-image function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      isPlastic: false,
      plasticType: "Error",
      quality: "low",
      recyclingCode: "7",
      estimatedValue: 0,
      description: "An error occurred during analysis. Please try again.",
      properties: ["Error"],
      marketDemand: "low",
      nearbyVendors: 0
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});