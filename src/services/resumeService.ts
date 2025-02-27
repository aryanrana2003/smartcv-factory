
/**
 * Resume service for connecting to backend APIs
 * This would be wired up to an actual backend in production
 */

import api from './api';

/**
 * Service for handling resume data operations
 */
export const resumeService = {
  /**
   * Get saved resumes for the current user
   */
  getSavedResumes: async () => {
    try {
      return await api.resumeBuilder.getSavedResumes();
    } catch (error) {
      console.error('Error fetching saved resumes:', error);
      throw new Error('Failed to fetch your saved resumes');
    }
  },

  /**
   * Save a resume to the backend
   */
  saveResume: async (resumeData: any) => {
    try {
      return await api.resumeBuilder.saveResume(resumeData);
    } catch (error) {
      console.error('Error saving resume:', error);
      throw new Error('Failed to save your resume');
    }
  },

  /**
   * Export a resume to PDF
   */
  exportResumeToPdf: async (resumeId: string) => {
    try {
      return await api.resumeBuilder.exportToPdf(resumeId);
    } catch (error) {
      console.error('Error exporting resume to PDF:', error);
      throw new Error('Failed to export your resume to PDF');
    }
  },

  /**
   * Generate AI suggestions for resume content
   */
  generateSuggestion: async (sectionType: string, context: any) => {
    try {
      return await api.resumeBuilder.generateSuggestion(sectionType, context);
    } catch (error) {
      console.error('Error generating suggestion:', error);
      throw new Error('Failed to generate AI suggestion');
    }
  }
};

/**
 * Service for handling resume analysis operations
 */
export const analyzerService = {
  /**
   * Analyze a resume against a job description
   */
  analyzeResume: async (resumeText: string, jobDescription?: string) => {
    try {
      return await api.resumeAnalyzer.analyzeResume(resumeText, jobDescription);
    } catch (error) {
      console.error('Error analyzing resume:', error);
      throw new Error('Failed to analyze your resume');
    }
  },

  /**
   * Get analysis history for the current user
   */
  getAnalysisHistory: async () => {
    try {
      return await api.resumeAnalyzer.getAnalysisHistory();
    } catch (error) {
      console.error('Error fetching analysis history:', error);
      throw new Error('Failed to fetch your analysis history');
    }
  },

  /**
   * Extract text from a resume file (PDF, DOCX)
   */
  extractResumeText: async (file: File) => {
    try {
      return await api.resumeAnalyzer.extractResumeText(file);
    } catch (error) {
      console.error('Error extracting text from file:', error);
      throw new Error('Failed to extract text from your resume file');
    }
  }
};
