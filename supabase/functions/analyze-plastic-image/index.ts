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
    console.log('Analyze plastic image function called');
    
    const { image } = await req.json();
    
    if (!image) {
      console.error('No image provided in request');
      throw new Error('No image provided');
    }

    if (!openAIApiKey) {
      console.error('OpenAI API key not configured');
      throw new Error('OpenAI API key not configured');
    }

    console.log('Analyzing image with OpenAI...', { 
      imageLength: image.length,
      imagePrefix: image.substring(0, 30) 
    });

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
            content: `You are an expert plastic identification AI specializing in recycling and waste management. Your task is to analyze images for plastic materials and provide accurate, detailed assessments.

ANALYSIS REQUIREMENTS:
1. Identify if the image contains ANY plastic materials (bottles, containers, packaging, bags, etc.)
2. If plastic is found, provide comprehensive analysis
3. Focus on recyclable plastic types commonly found in India
4. Be realistic about market values and demand

PLASTIC IDENTIFICATION GUIDE:
- PET (#1): Clear bottles, food containers - highly recyclable
- HDPE (#2): Milk jugs, detergent bottles - good market value  
- PVC (#3): Pipes, bottles - limited recycling
- LDPE (#4): Plastic bags, wraps - lower value
- PP (#5): Yogurt containers, bottle caps - moderate value
- PS (#6): Disposable cups, foam - low recyclability
- Other (#7): Mixed plastics - varies

QUALITY ASSESSMENT:
- High: Clean, undamaged, clear labels/codes visible
- Medium: Some dirt/wear but structurally sound
- Low: Damaged, heavily soiled, or degraded

MARKET VALUES (Indian market):
- PET: ₹15-25 per kg
- HDPE: ₹20-30 per kg  
- PP: ₹18-28 per kg
- LDPE: ₹10-18 per kg
- PS: ₹5-12 per kg
- PVC: ₹8-15 per kg

Return ONLY valid JSON in this exact structure:
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

IMPORTANT: 
- If no clear plastic is visible, set isPlastic to false
- For estimatedValue, calculate based on estimated weight and market rate
- Include 3-5 relevant properties
- Set nearbyVendors between 3-15 based on plastic type demand
- Keep descriptions concise but informative`
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Please analyze this image to identify if it contains plastic and provide detailed analysis if plastic is found. Focus on accuracy and realistic market assessments for the Indian recycling market.'
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
        max_tokens: 1500
      }),
    });

    console.log('OpenAI API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API Error:', response.status, response.statusText, errorText);
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('OpenAI Response received:', { 
      hasChoices: !!data.choices,
      choicesLength: data.choices?.length,
      finishReason: data.choices?.[0]?.finish_reason
    });
    
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      console.error('No content in OpenAI response:', data);
      throw new Error('Empty response from OpenAI');
    }

    console.log('OpenAI content:', content.substring(0, 200) + '...');
    
    try {
      // Clean the content to extract JSON
      let jsonContent = content.trim();
      
      // Remove code blocks if present
      if (jsonContent.startsWith('```json')) {
        jsonContent = jsonContent.replace(/```json\n?/, '').replace(/```$/, '');
      } else if (jsonContent.startsWith('```')) {
        jsonContent = jsonContent.replace(/```\n?/, '').replace(/```$/, '');
      }
      
      const analysisResult = JSON.parse(jsonContent);
      
      // Validate the response structure
      if (!analysisResult.hasOwnProperty('isPlastic')) {
        console.error('Missing isPlastic field in response');
        throw new Error('Invalid response structure from AI - missing isPlastic field');
      }

      console.log('Successfully parsed analysis result:', analysisResult);

      return new Response(JSON.stringify(analysisResult), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', parseError);
      console.error('Raw content:', content);
      
      // Return a fallback response
      const fallbackResponse = {
        isPlastic: false,
        plasticType: "Analysis Error",
        quality: "medium",
        recyclingCode: "7",
        estimatedValue: 0,
        description: "Unable to parse the AI analysis response. The image may be unclear or contain no identifiable plastic items. Please try uploading a clearer image of plastic items.",
        properties: ["Parse Error"],
        marketDemand: "low",
        nearbyVendors: 0
      };
      
      return new Response(JSON.stringify(fallbackResponse), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error in analyze-plastic-image function:', error);
    
    const errorResponse = {
      isPlastic: false,
      plasticType: "System Error",
      quality: "low",
      recyclingCode: "7",
      estimatedValue: 0,
      description: `Analysis failed: ${error.message}. Please try again with a clear image of plastic items.`,
      properties: ["System Error"],
      marketDemand: "low",
      nearbyVendors: 0
    };
    
    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});