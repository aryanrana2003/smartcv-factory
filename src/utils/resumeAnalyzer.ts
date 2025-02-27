
/**
 * Simple resume analyzer utility
 * In a real application, this would connect to an AI backend service
 */

interface ResumeAnalysisResult {
  score: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  keywordMatch: {
    found: string[];
    missing: string[];
    score: number;
  };
}

/**
 * Analyzes a resume text against a job description
 * This is a mock function that would be replaced with actual AI analysis
 */
export const analyzeResume = (resumeText: string, jobDescription?: string): ResumeAnalysisResult => {
  console.log("Analyzing resume...", { resumeText, jobDescription });
  
  // This is a simplified mock implementation
  // In a real application, this would send the data to an API endpoint
  
  const mockStrengths = [
    "Clear professional summary",
    "Well-structured work experience section",
    "Quantifiable achievements included",
    "Relevant skills highlighted"
  ];
  
  const mockWeaknesses = [
    "Missing specific technical skills that match the job requirements",
    "Work experience lacks detail in some areas",
    "Education section could be more prominent for this role"
  ];
  
  const mockSuggestions = [
    "Add more keywords from the job description",
    "Quantify your achievements with specific numbers and percentages",
    "Add a dedicated skills section with technical and soft skills",
    "Customize your professional summary to match this specific role"
  ];
  
  // Mock keyword analysis
  const mockFoundKeywords = ["project management", "leadership", "communication", "analytics"];
  const mockMissingKeywords = jobDescription 
    ? ["machine learning", "data visualization", "Python", "SQL"] 
    : [];
  
  // Calculate a mock score between 0-100
  // This would be replaced with a more sophisticated algorithm
  const calculateMockScore = () => {
    // Basic score based on length of resume (more detail usually scores higher)
    const lengthScore = Math.min(65, resumeText.length / 100);
    
    // Keywords score
    const keywordsScore = mockFoundKeywords.length * 5;
    
    // Penalty for weaknesses
    const weaknessPenalty = mockWeaknesses.length * 3;
    
    // Calculate total score (capped at 100)
    return Math.min(100, Math.max(0, lengthScore + keywordsScore - weaknessPenalty));
  };
  
  const score = calculateMockScore();
  
  return {
    score,
    strengths: mockStrengths,
    weaknesses: mockWeaknesses,
    suggestions: mockSuggestions,
    keywordMatch: {
      found: mockFoundKeywords,
      missing: mockMissingKeywords,
      score: mockFoundKeywords.length * 10
    }
  };
};

/**
 * Returns a color based on the score
 */
export const getScoreColor = (score: number): string => {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-yellow-600";
  return "text-red-600";
};

/**
 * Returns a descriptive text based on the score
 */
export const getScoreDescription = (score: number): string => {
  if (score >= 90) return "Excellent";
  if (score >= 80) return "Very Good";
  if (score >= 70) return "Good";
  if (score >= 60) return "Average";
  if (score >= 50) return "Needs Improvement";
  return "Poor";
};
