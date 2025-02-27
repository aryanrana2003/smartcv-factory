
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// In a real implementation, we would use environment variables for this
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

// CORS headers to allow cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Main function to handle the request
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse the request body
    const { resumeText, jobDescription } = await req.json();

    // Validate input
    if (!resumeText) {
      return new Response(
        JSON.stringify({ error: 'Resume text is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Construct the prompt for the AI model
    const prompt = constructPrompt(resumeText, jobDescription);

    // Call OpenAI API for analysis
    const analysisResult = await analyzeWithAI(prompt);

    // Process the result and format it for the client
    const formattedResult = formatAnalysisResult(analysisResult, resumeText, jobDescription);

    // Return the analysis result
    return new Response(
      JSON.stringify(formattedResult),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in analyze-resume function:', error);
    
    return new Response(
      JSON.stringify({ error: error.message || 'An error occurred during resume analysis' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// Helper function to construct a prompt for the AI model
function constructPrompt(resumeText: string, jobDescription?: string) {
  let prompt = `Analyze the following resume and provide feedback:

Resume:
${resumeText}
`;

  if (jobDescription) {
    prompt += `\nJob Description:
${jobDescription}

Please analyze this resume against the job description above.
`;
  } else {
    prompt += `\nPlease provide general feedback on the resume's quality and effectiveness.`;
  }

  prompt += `
Your analysis should include:
1. Overall score (0-100)
2. Key strengths of the resume
3. Areas for improvement
4. Specific suggestions for enhancement
5. Keywords found in the resume that are relevant to job search
6. If a job description was provided, identify keywords missing from the resume but present in the job description

Format your response as JSON with the following structure:
{
  "score": number,
  "strengths": string[],
  "weaknesses": string[],
  "suggestions": string[],
  "keywordMatch": {
    "found": string[],
    "missing": string[],
    "score": number
  }
}
`;

  return prompt;
}

// Function to call OpenAI API for analysis
async function analyzeWithAI(prompt: string) {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key is not configured');
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a professional resume reviewer with expertise in HR and recruitment.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenAI API error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No response from AI model');
    }

    // Extract the JSON response from the AI model
    try {
      // The model should return a JSON string, but we'll handle potential parsing issues
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    } catch (error) {
      console.error('Failed to parse AI response as JSON:', error);
      throw new Error('Failed to process AI analysis results');
    }
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
}

// Function to format and validate the analysis result
function formatAnalysisResult(aiResult: any, resumeText: string, jobDescription?: string) {
  // If AI result is not valid, generate a fallback result
  if (!aiResult || typeof aiResult !== 'object') {
    return generateFallbackAnalysis(resumeText, jobDescription);
  }

  // Ensure the result has the expected structure
  const result = {
    score: typeof aiResult.score === 'number' ? aiResult.score : 65,
    strengths: Array.isArray(aiResult.strengths) ? aiResult.strengths : [],
    weaknesses: Array.isArray(aiResult.weaknesses) ? aiResult.weaknesses : [],
    suggestions: Array.isArray(aiResult.suggestions) ? aiResult.suggestions : [],
    keywordMatch: {
      found: Array.isArray(aiResult.keywordMatch?.found) ? aiResult.keywordMatch.found : [],
      missing: Array.isArray(aiResult.keywordMatch?.missing) ? aiResult.keywordMatch.missing : [],
      score: typeof aiResult.keywordMatch?.score === 'number' ? aiResult.keywordMatch.score : 0
    }
  };

  // Cap the score to be between 0 and 100
  result.score = Math.min(100, Math.max(0, result.score));

  return result;
}

// Fallback function to generate analysis if AI fails
function generateFallbackAnalysis(resumeText: string, jobDescription?: string) {
  // Basic analysis based on resume length and structure
  const score = Math.min(85, Math.max(40, resumeText.length / 100));
  
  return {
    score,
    strengths: [
      "Resume has been properly submitted for analysis",
      "Contains structured information about your experience"
    ],
    weaknesses: [
      "Our analysis system could not fully process your resume",
      "Consider adding more specific details to your experiences"
    ],
    suggestions: [
      "Use more quantifiable achievements in your resume",
      "Ensure your contact information is clearly visible",
      "Include a strong summary statement at the top"
    ],
    keywordMatch: {
      found: [],
      missing: [],
      score: 0
    }
  };
}
