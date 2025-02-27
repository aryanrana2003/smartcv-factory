
import { useState } from 'react';
import { createEmptyResume, Resume, generateSuggestion } from '@/utils/resumeBuilder';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Sparkles, Plus, Trash2, Download, Save } from 'lucide-react';

const ResumeForm = () => {
  const [resume, setResume] = useState<Resume>(createEmptyResume());
  const [activeSection, setActiveSection] = useState('personal');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Initialize the form
  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
      // Additional fields would be added here
    },
  });
  
  const handleGenerateSuggestion = async (sectionType: string) => {
    setIsGenerating(true);
    try {
      // In a real app, we would pass context like existing content or a job description
      const suggestion = await generateSuggestion(sectionType, "");
      
      if (sectionType === 'summary') {
        form.setValue('summary', suggestion);
      }
      
      toast.success("AI suggestion generated!");
    } catch (error) {
      console.error("Error generating suggestion:", error);
      toast.error("Failed to generate suggestion. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleSaveResume = (data: any) => {
    // Update resume with form data
    console.log("Form data to save:", data);
    
    // In a real app, this would update the resume state and possibly save to a backend
    
    toast.success("Resume saved successfully!");
  };
  
  const handleAddExperience = () => {
    // Add a new empty experience entry
    toast.info("Experience section would be expanded here");
  };
  
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-medium">Build Your Resume</h2>
          <p className="text-muted-foreground">Complete each section with your information</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              <nav className="space-y-1">
                {['personal', 'summary', 'experience', 'education', 'skills'].map((section) => (
                  <button
                    key={section}
                    onClick={() => setActiveSection(section)}
                    className={`w-full text-left px-4 py-2 rounded-md text-sm transition-colors ${
                      activeSection === section 
                        ? 'bg-primary text-primary-foreground font-medium' 
                        : 'hover:bg-secondary'
                    }`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>
      
        <div className="lg:col-span-2">
          <Card className="animate-fade-in">
            <CardContent className="p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSaveResume)} className="space-y-6">
                  {activeSection === 'personal' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="john.doe@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone</FormLabel>
                              <FormControl>
                                <Input placeholder="+1 (555) 123-4567" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Location</FormLabel>
                              <FormControl>
                                <Input placeholder="New York, NY" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  )}
                  
                  {activeSection === 'summary' && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Professional Summary</h3>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleGenerateSuggestion('summary')}
                          disabled={isGenerating}
                        >
                          <Sparkles className="mr-2 h-4 w-4" />
                          {isGenerating ? 'Generating...' : 'AI Suggestion'}
                        </Button>
                      </div>
                      <FormField
                        control={form.control}
                        name="summary"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Summary</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="A brief overview of your professional background and strengths" 
                                className="min-h-[120px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                  
                  {activeSection === 'experience' && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Work Experience</h3>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm" 
                          onClick={handleAddExperience}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Experience
                        </Button>
                      </div>
                      
                      <div className="glass p-6 rounded-lg">
                        <div className="text-center text-muted-foreground py-8">
                          <p>Add your work experience to enhance your resume.</p>
                          <Button 
                            type="button" 
                            variant="outline" 
                            className="mt-2"
                            onClick={handleAddExperience}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Experience
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeSection === 'education' && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Education</h3>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Education
                        </Button>
                      </div>
                      
                      <div className="glass p-6 rounded-lg">
                        <div className="text-center text-muted-foreground py-8">
                          <p>Add your educational background.</p>
                          <Button 
                            type="button" 
                            variant="outline" 
                            className="mt-2"
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Education
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeSection === 'skills' && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Skills</h3>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleGenerateSuggestion('skills')}
                          disabled={isGenerating}
                        >
                          <Sparkles className="mr-2 h-4 w-4" />
                          {isGenerating ? 'Generating...' : 'AI Suggestion'}
                        </Button>
                      </div>
                      
                      <div className="glass p-6 rounded-lg">
                        <div className="text-center text-muted-foreground py-8">
                          <p>Add your skills to showcase your expertise.</p>
                          <Button 
                            type="button" 
                            variant="outline" 
                            className="mt-2"
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Skill
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-end pt-4">
                    <Button type="submit">Save Changes</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;
