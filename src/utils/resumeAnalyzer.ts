
/**
 * Resume analyzer utility
 * Provides interface for resume analysis functionality
 */

import api from '@/services/api';

export interface ResumeAnalysisResult {
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
 * In production, this calls the actual API endpoint
 */
export const analyzeResume = async (resumeText: string, jobDescription?: string): Promise<ResumeAnalysisResult> => {
  console.log("Analyzing resume...", { resumeText, jobDescription });
  
  try {
    // In production, use the API
    if (import.meta.env.PROD) {
      return await api.resumeAnalyzer.analyzeResume(resumeText, jobDescription);
    }
    
    // In development, use a mock implementation for faster testing
    // This would be replaced with actual API calls in production
    
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
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
  } catch (error) {
    console.error("Resume analysis error:", error);
    throw new Error("Failed to analyze resume. Please try again.");
  }
};

/**
 * Extract text from resume file (PDF, DOCX)
 */
export const extractResumeText = async (file: File): Promise<string> => {
  try {
    if (import.meta.env.PROD) {
      const result = await api.resumeAnalyzer.extractResumeText(file);
      return result.text;
    }
    
    // Mock implementation for development
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return "Professional Summary\n\nExperienced software engineer with 5+ years developing web applications using JavaScript, React, and Node.js. Strong problem-solving skills with a focus on creating efficient, scalable solutions.\n\nWork Experience\n\nSenior Developer - ABC Tech (2020-Present)\n• Led development of company's flagship product, improving performance by 40%\n• Mentored junior developers and implemented code review practices\n\nWeb Developer - XYZ Solutions (2018-2020)\n• Built responsive web applications for clients in finance and healthcare\n• Reduced page load time by 60% through optimization techniques\n\nEducation\n\nBachelor of Science in Computer Science - University of Technology (2018)\n\nSkills\n\nJavaScript, React, Node.js, TypeScript, HTML/CSS, Git, RESTful APIs, MongoDB";
  } catch (error) {
    console.error("Text extraction error:", error);
    throw new Error("Failed to extract text from file. Please try a different file or paste the content manually.");
  }
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
