
/**
 * Utility functions for the resume builder
 * In a real application, these would connect to an AI backend service
 */

interface ResumeSection {
  id: string;
  type: 'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'custom';
  title: string;
  content: any;
}

interface ResumeTemplate {
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

// Mock resume templates
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

// Generate AI suggestions for resume content (mock implementation)
export const generateSuggestion = async (sectionType: string, context: string): Promise<string> => {
  console.log(`Generating suggestion for ${sectionType} with context: ${context}`);
  
  // This is a mock implementation
  // In a real app, this would call an AI API
  
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
};

// Export and render resume to PDF (mock implementation)
export const exportResumeToPdf = (resume: Resume): void => {
  console.log("Exporting resume to PDF", resume);
  alert("PDF export feature would be implemented here using a library like jsPDF or by calling a backend service.");
};
