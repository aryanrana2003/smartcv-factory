
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { analyzeResume, getScoreColor, getScoreDescription } from '@/utils/resumeAnalyzer';
import { Sparkles, Upload, CheckCircle, XCircle, History, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

interface AnalysisHistoryEntry {
  id: string;
  date: Date;
  resumeText: string;
  jobDescription: string;
  result: any;
}

const ResumeAnalysis = () => {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisHistoryEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [comparisonResult, setComparisonResult] = useState<any>(null);
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Check file type (PDF or Word)
    const fileType = file.type;
    if (fileType !== 'application/pdf' && 
        fileType !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      toast.error('Please upload a PDF or Word document.');
      return;
    }
    
    // In a real app, we would extract text from the document
    // For now, we'll simulate it
    
    toast.success(`File "${file.name}" uploaded. Processing...`);
    
    // Simulate text extraction delay
    setTimeout(() => {
      setResumeText("Professional Summary\n\nExperienced software engineer with 5+ years developing web applications using JavaScript, React, and Node.js. Strong problem-solving skills with a focus on creating efficient, scalable solutions.\n\nWork Experience\n\nSenior Developer - ABC Tech (2020-Present)\n• Led development of company's flagship product, improving performance by 40%\n• Mentored junior developers and implemented code review practices\n\nWeb Developer - XYZ Solutions (2018-2020)\n• Built responsive web applications for clients in finance and healthcare\n• Reduced page load time by 60% through optimization techniques\n\nEducation\n\nBachelor of Science in Computer Science - University of Technology (2018)\n\nSkills\n\nJavaScript, React, Node.js, TypeScript, HTML/CSS, Git, RESTful APIs, MongoDB");
      toast.success("Resume processed successfully!");
    }, 1500);
  };
  
  const handleAnalyze = () => {
    if (!resumeText.trim()) {
      toast.error("Please enter your resume text or upload a file.");
      return;
    }
    
    setIsAnalyzing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      try {
        const result = analyzeResume(resumeText, jobDescription);
        setAnalysisResult(result);
        
        // Add to history
        const historyEntry: AnalysisHistoryEntry = {
          id: crypto.randomUUID(),
          date: new Date(),
          resumeText,
          jobDescription,
          result
        };
        
        setAnalysisHistory(prev => [historyEntry, ...prev]);
        
        toast.success("Analysis completed successfully!");
      } catch (error) {
        console.error("Analysis error:", error);
        toast.error("Failed to analyze resume. Please try again.");
      } finally {
        setIsAnalyzing(false);
      }
    }, 2000);
  };
  
  const handleCompare = (historyEntry: AnalysisHistoryEntry) => {
    if (!analysisResult) return;
    
    setCompareMode(true);
    setComparisonResult(historyEntry.result);
    
    toast.info("Comparing current analysis with previous version", {
      description: `Comparing with analysis from ${historyEntry.date.toLocaleDateString()}`
    });
  };
  
  const handleExitCompare = () => {
    setCompareMode(false);
    setComparisonResult(null);
  };
  
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-medium">Resume Analyzer</h2>
        <p className="text-muted-foreground">Get AI-powered feedback on your resume</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Upload Resume</h3>
              <div className="grid gap-4">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="mb-1 text-sm text-muted-foreground">
                      <span className="font-medium">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PDF or Word (max 5MB)
                    </p>
                  </div>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept=".pdf,.doc,.docx" 
                    onChange={handleFileUpload}
                  />
                </label>
                
                <Textarea 
                  placeholder="Or paste your resume text here..." 
                  className="min-h-[200px]" 
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Job Description (Optional)</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Add a job description to get tailored feedback for a specific role
              </p>
              <Textarea 
                placeholder="Paste job description here..." 
                className="min-h-[120px]" 
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </CardContent>
          </Card>
          
          <Button 
            className="w-full" 
            size="lg" 
            onClick={handleAnalyze}
            disabled={isAnalyzing || !resumeText.trim()}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
          </Button>
          
          {analysisHistory.length > 0 && (
            <Button
              className="w-full"
              variant="outline"
              onClick={() => setShowHistory(!showHistory)}
            >
              <History className="mr-2 h-4 w-4" />
              {showHistory ? 'Hide Analysis History' : 'Show Analysis History'}
            </Button>
          )}
          
          {showHistory && analysisHistory.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-3">Analysis History</h3>
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {analysisHistory.map((entry) => (
                    <div 
                      key={entry.id} 
                      className="flex items-center justify-between p-2 hover:bg-secondary rounded-md"
                    >
                      <div>
                        <p className="text-sm font-medium">
                          {entry.date.toLocaleDateString()} at {entry.date.toLocaleTimeString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Score: <span className={getScoreColor(entry.result.score)}>
                            {entry.result.score}
                          </span>
                        </p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleCompare(entry)}
                        disabled={!analysisResult}
                      >
                        Compare
                        <ChevronRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="lg:col-span-2">
          {analysisResult ? (
            <Card className="animate-fade-in">
              <CardContent className="p-6">
                {compareMode && (
                  <div className="mb-4 p-2 bg-secondary/50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium">Comparison Mode</p>
                      <Button variant="ghost" size="sm" onClick={handleExitCompare}>
                        Exit Comparison
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <p className="text-xs text-muted-foreground">Current Analysis</p>
                        <p className="text-sm font-medium">
                          Score: <span className={getScoreColor(analysisResult.score)}>
                            {analysisResult.score}
                          </span>
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Previous Analysis</p>
                        <p className="text-sm font-medium">
                          Score: <span className={getScoreColor(comparisonResult.score)}>
                            {comparisonResult.score}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium">Resume Score</h3>
                    <div className="text-xl font-medium">
                      <span className={getScoreColor(analysisResult.score)}>
                        {analysisResult.score}/100
                      </span>
                      <span className="ml-2 text-sm font-normal text-muted-foreground">
                        ({getScoreDescription(analysisResult.score)})
                      </span>
                    </div>
                  </div>
                  <Progress value={analysisResult.score} className="h-2" />
                </div>
                
                <Tabs defaultValue="strengths">
                  <TabsList className="w-full mb-4">
                    <TabsTrigger value="strengths" className="flex-1">Strengths</TabsTrigger>
                    <TabsTrigger value="improvements" className="flex-1">Improvements</TabsTrigger>
                    <TabsTrigger value="keywords" className="flex-1">Keywords</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="strengths" className="mt-0">
                    <div className="space-y-3">
                      {analysisResult.strengths.map((strength: string, index: number) => (
                        <div key={index} className="flex items-start gap-2 p-3 glass rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <p>{strength}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="improvements" className="mt-0">
                    <div className="space-y-3 mb-6">
                      {analysisResult.weaknesses.map((weakness: string, index: number) => (
                        <div key={index} className="flex items-start gap-2 p-3 glass rounded-lg">
                          <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                          <p>{weakness}</p>
                        </div>
                      ))}
                    </div>
                    
                    <h4 className="font-medium mb-3">Suggestions</h4>
                    <div className="space-y-3">
                      {analysisResult.suggestions.map((suggestion: string, index: number) => (
                        <div key={index} className="flex items-start gap-2 p-3 glass rounded-lg">
                          <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <p>{suggestion}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="keywords" className="mt-0">
                    <div className="mb-4">
                      <h4 className="font-medium mb-3">Keywords Found</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.keywordMatch.found.length > 0 ? (
                          analysisResult.keywordMatch.found.map((keyword: string, index: number) => (
                            <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              {keyword}
                            </Badge>
                          ))
                        ) : (
                          <p className="text-muted-foreground">No relevant keywords found.</p>
                        )}
                      </div>
                    </div>
                    
                    {analysisResult.keywordMatch.missing.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-3">Missing Keywords</h4>
                        <div className="flex flex-wrap gap-2">
                          {analysisResult.keywordMatch.missing.map((keyword: string, index: number) => (
                            <Badge key={index} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center px-4 py-16">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
                  <Sparkles className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-medium">Resume Analysis</h3>
                <p className="text-muted-foreground mt-2 max-w-md">
                  Enter your resume text or upload a file to get AI-powered feedback.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalysis;
