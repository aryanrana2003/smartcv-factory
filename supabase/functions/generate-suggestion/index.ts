
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
    const { sectionType, context } = await req.json();

    // Validate input
    if (!sectionType) {
      return new Response(
        JSON.stringify({ error: 'Section type is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate content suggestion
    const suggestion = await generateSuggestion(sectionType, context);

    // Return the suggestion
    return new Response(
      JSON.stringify({ suggestion }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in generate-suggestion function:', error);
    
    return new Response(
      JSON.stringify({ error: error.message || 'An error occurred generating the suggestion' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// Function to generate content suggestion based on section type and context
async function generateSuggestion(sectionType: string, context: any) {
  // If OpenAI API key is not available, return fallback suggestions
  if (!OPENAI_API_KEY) {
    return getFallbackSuggestion(sectionType);
  }

  try {
    // Construct prompt based on section type
    const prompt = getPromptForSectionType(sectionType, context);

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a professional resume writer helping job seekers create effective content.' },
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
    return data.choices[0]?.message?.content || getFallbackSuggestion(sectionType);
  } catch (error) {
    console.error('Error generating suggestion:', error);
    return getFallbackSuggestion(sectionType);
  }
}

// Function to construct prompts based on section type
function getPromptForSectionType(sectionType: string, context: any) {
  switch (sectionType) {
    case 'summary':
      return `Write a professional summary for a resume. Focus on highlighting strengths, experience, and value proposition.
      ${context ? `Use this information as context: ${JSON.stringify(context)}` : ''}
      Keep it concise (3-4 sentences) and impactful. Avoid clichés and generic statements.`;
    
    case 'experience':
      return `Create 3-4 bullet points describing professional achievements for a resume work experience section.
      ${context ? `Use this information as context: ${JSON.stringify(context)}` : ''}
      Include quantifiable results and focus on impact rather than duties. Use action verbs and be specific.`;
    
    case 'skills':
      return `Generate a list of professional skills for a resume.
      ${context ? `Use this information as context: ${JSON.stringify(context)}` : ''}
      Include a mix of technical skills, soft skills, and industry-specific competencies. Format as a comma-separated list.`;

    default:
      return `Generate professional resume content for a ${sectionType} section.
      ${context ? `Use this information as context: ${JSON.stringify(context)}` : ''}
      Make it concise, specific, and achievement-oriented.`;
  }
}

// Fallback suggestions if AI generation fails
function getFallbackSuggestion(sectionType: string): string {
  switch (sectionType) {
    case 'summary':
      return "Results-driven professional with 5+ years of experience in the industry. Skilled in project management, team leadership, and strategic planning with a proven track record of delivering successful outcomes. Adept at stakeholder communication and identifying opportunities for process improvement.";
    
    case 'experience':
      return "• Led cross-functional team of 8 members to deliver project 15% ahead of schedule\n• Increased department efficiency by 22% through implementation of new processes\n• Reduced costs by $50K annually through strategic vendor negotiations\n• Managed relationships with 12 key clients, resulting in 95% client retention rate";
    
    case 'skills':
      return "Project Management, Team Leadership, Strategic Planning, Budget Management, Stakeholder Communication, Risk Assessment, Microsoft Office Suite, CRM Systems, Data Analysis, Process Improvement, Client Relationship Management";
    
    default:
      return "AI suggestion could not be generated. Please try again or create your own content.";
  }
}
