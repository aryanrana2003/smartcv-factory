
/**
 * API service for handling all backend requests
 */

const API_URL = import.meta.env.VITE_API_URL || 'https://api.smartcv.example/v1';

// Generic fetch wrapper with error handling
async function fetchWithErrorHandling<T>(url: string, options: RequestInit = {}): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}

export default {
  // Resume builder endpoints
  resumeBuilder: {
    // Get user's saved resumes
    getSavedResumes: async () => {
      return fetchWithErrorHandling(`${API_URL}/resumes`);
    },
    
    // Get a specific resume by ID
    getResume: async (resumeId: string) => {
      return fetchWithErrorHandling(`${API_URL}/resumes/${resumeId}`);
    },
    
    // Save or update a resume
    saveResume: async (resumeData: any) => {
      return fetchWithErrorHandling(`${API_URL}/resumes`, {
        method: resumeData.id ? 'PUT' : 'POST',
        body: JSON.stringify(resumeData),
      });
    },
    
    // Delete a resume
    deleteResume: async (resumeId: string) => {
      return fetchWithErrorHandling(`${API_URL}/resumes/${resumeId}`, {
        method: 'DELETE',
      });
    },
    
    // Generate AI suggestion for resume content
    generateSuggestion: async (sectionType: string, context: any) => {
      return fetchWithErrorHandling(`${API_URL}/suggestions`, {
        method: 'POST',
        body: JSON.stringify({ sectionType, context }),
      });
    },
    
    // Export resume to PDF
    exportToPdf: async (resumeId: string) => {
      const response = await fetch(`${API_URL}/resumes/${resumeId}/export/pdf`, {
        headers: {
          'Accept': 'application/pdf',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Export failed with status ${response.status}`);
      }
      
      return response.blob();
    },
  },
  
  // Resume analyzer endpoints
  resumeAnalyzer: {
    // Analyze a resume against job description
    analyzeResume: async (resumeText: string, jobDescription?: string) => {
      return fetchWithErrorHandling(`${API_URL}/analyze`, {
        method: 'POST',
        body: JSON.stringify({ resumeText, jobDescription }),
      });
    },
    
    // Get analysis history
    getAnalysisHistory: async () => {
      return fetchWithErrorHandling(`${API_URL}/analyze/history`);
    },
    
    // Extract text from resume file (PDF, DOCX)
    extractResumeText: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch(`${API_URL}/extract-text`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Text extraction failed with status ${response.status}`);
      }
      
      return response.json();
    },
  },
};
