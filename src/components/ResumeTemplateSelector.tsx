
import { useState } from 'react';
import { getResumeTemplates } from '@/utils/resumeBuilder';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface ResumeTemplateSelectorProps {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
}

const ResumeTemplateSelector = ({ 
  selectedTemplate,
  onSelectTemplate 
}: ResumeTemplateSelectorProps) => {
  const templates = getResumeTemplates();
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Choose a Template</h3>
      <div className="grid grid-cols-2 gap-4">
        {templates.map((template) => (
          <Card 
            key={template.id}
            className={`cursor-pointer hover:shadow-md transition-all duration-300 ${
              selectedTemplate === template.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => onSelectTemplate(template.id)}
          >
            <CardContent className="p-4">
              <div className="aspect-[3/4] bg-secondary rounded-md mb-3 relative">
                <img 
                  src={template.thumbnail} 
                  alt={template.name}
                  className="w-full h-full object-cover rounded-md opacity-80"
                />
                {selectedTemplate === template.id && (
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              <h4 className="font-medium text-sm">{template.name}</h4>
              <p className="text-xs text-muted-foreground">{template.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ResumeTemplateSelector;
