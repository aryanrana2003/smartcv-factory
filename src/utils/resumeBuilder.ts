
/**
 * Utility functions for the resume builder
 * Handles resume creation, manipulation, and generation of suggestions
 */

import api from '@/services/api';

export interface ResumeSection {
  id: string;
  type: 'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'custom';
  title: string;
  content: any;
}

export interface ResumeTemplate {
  id: string;
  name: string;
  thumbnail: string;
  description: string;
}

export interface Resume {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  sections: ResumeSection[];
  template: string;
}

// Resume templates
export const getResumeTemplates = (): ResumeTemplate[] => {
  return [
    {
      id: 'template-1',
      name: 'Professional',
      thumbnail: '/placeholder.svg',
      description: 'A clean, professional template suitable for most industries.'
    },
    {
      id: 'template-2',
      name: 'Creative',
      thumbnail: '/placeholder.svg',
      description: 'A modern, creative template ideal for design and creative roles.'
    },
    {
      id: 'template-3',
      name: 'Executive',
      thumbnail: '/placeholder.svg',
      description: 'An elegant template for senior and executive positions.'
    },
    {
      id: 'template-4',
      name: 'Technical',
      thumbnail: '/placeholder.svg',
      description: 'Optimized for technical roles with focus on skills and projects.'
    }
  ];
};

// Create a new empty resume
export const createEmptyResume = (name: string = 'Untitled Resume'): Resume => {
  return {
    id: crypto.randomUUID(),
    name,
    createdAt: new Date(),
    updatedAt: new Date(),
    sections: [
      {
        id: crypto.randomUUID(),
        type: 'personal',
        title: 'Personal Information',
        content: {
          fullName: '',
          email: '',
          phone: '',
          location: '',
          linkedIn: '',
          website: ''
        }
      },
      {
        id: crypto.randomUUID(),
        type: 'summary',
        title: 'Professional Summary',
        content: {
          text: ''
        }
      },
      {
        id: crypto.randomUUID(),
        type: 'experience',
        title: 'Work Experience',
        content: {
          positions: []
        }
      },
      {
        id: crypto.randomUUID(),
        type: 'education',
        title: 'Education',
        content: {
          institutions: []
        }
      },
      {
        id: crypto.randomUUID(),
        type: 'skills',
        title: 'Skills',
        content: {
          skills: []
        }
      }
    ],
    template: 'template-1'
  };
};

// Generate AI suggestions for resume content
export const generateSuggestion = async (sectionType: string, context: string): Promise<string> => {
  console.log(`Generating suggestion for ${sectionType} with context: ${context}`);
  
  try {
    // In production environment, use the API
    if (import.meta.env.PROD) {
      const result = await api.resumeBuilder.generateSuggestion(sectionType, { context });
      return result.suggestion;
    }
    
    // Mock implementation for development
    // Mock delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock suggestions based on section type
    switch (sectionType) {
      case 'summary':
        return "Results-driven professional with 5+ years of experience in the industry. Skilled in project management, team leadership, and strategic planning with a proven track record of delivering successful outcomes.";
      
      case 'experience':
        return "• Led cross-functional team of 8 members to deliver project 15% ahead of schedule\n• Increased department efficiency by 22% through implementation of new processes\n• Reduced costs by $50K annually through strategic vendor negotiations";
      
      case 'skills':
        return "Project Management, Team Leadership, Strategic Planning, Budget Management, Stakeholder Communication, Risk Assessment, Microsoft Office Suite, CRM Systems";
      
      default:
        return "AI suggestion will appear here based on your input and the job description.";
    }
  } catch (error) {
    console.error("Error generating suggestion:", error);
    throw new Error("Failed to generate AI suggestion. Please try again.");
  }
};

// Save resume to backend
export const saveResume = async (resume: Resume): Promise<Resume> => {
  try {
    if (import.meta.env.PROD) {
      return await api.resumeBuilder.saveResume(resume);
    }
    
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Update the timestamps
    const updatedResume = {
      ...resume,
      updatedAt: new Date()
    };
    
    return updatedResume;
  } catch (error) {
    console.error("Error saving resume:", error);
    throw new Error("Failed to save resume. Please try again.");
  }
};

// Export and render resume to PDF
export const exportResumeToPdf = async (resume: Resume): Promise<void> => {
  try {
    console.log("Exporting resume to PDF", resume);
    
    if (import.meta.env.PROD) {
      const pdfBlob = await api.resumeBuilder.exportToPdf(resume.id);
      
      // Create a download link
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${resume.name.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      return;
    }
    
    // Mock implementation for development
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert("PDF export feature would be implemented here using a library like jsPDF or by calling a backend service.");
  } catch (error) {
    console.error("Error exporting PDF:", error);
    throw new Error("Failed to export resume to PDF. Please try again.");
  }
};
