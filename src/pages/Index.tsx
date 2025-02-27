
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeatureCard from '@/components/FeatureCard';
import CallToAction from '@/components/CallToAction';
import { 
  Sparkles, 
  FileSearch, 
  Layers, 
  Award, 
  Target, 
  Zap, 
  CheckCircle, 
  ArrowRight,
  FileText
} from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center space-y-6 animate-fade-in">
              <Badge className="text-xs font-medium px-3 py-1 bg-primary/10 text-primary">
                AI-Powered Resume Tool
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight">
                Build Standout Resumes with <span className="relative">
                  <span className="relative z-10">AI Precision</span>
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-primary/10 rounded-sm -z-10"></span>
                </span>
              </h1>
              <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
                Create professional resumes and get intelligent feedback to help you land your dream job.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <Button size="lg" className="animate-pulse-slow" asChild>
                  <Link to="/builder">
                    Create Your Resume
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/analyzer">Analyze Existing Resume</Link>
                </Button>
              </div>
            </div>
            
            <div className="mt-16 glass rounded-2xl p-6 md:p-8 animate-fade-in">
              <div className="aspect-video w-full rounded-lg bg-secondary flex items-center justify-center">
                <div className="text-center">
                  <FileText className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">Resume builder preview</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 px-6 bg-secondary/50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16 animate-fade-in">
              <Badge className="text-xs font-medium px-3 py-1 bg-primary/10 text-primary">
                Why Choose Us
              </Badge>
              <h2 className="text-3xl md:text-4xl font-medium mt-2 mb-4">
                Powerful Features
              </h2>
              <p className="max-w-2xl mx-auto text-muted-foreground">
                Our AI-powered tools help you create professional resumes and stand out from the competition.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                icon={<Sparkles className="h-6 w-6 text-primary" />}
                title="AI Resume Builder"
                description="Create professional resumes with AI-generated content tailored to your experience and target job."
                className="animate-slide-up [animation-delay:100ms]"
              />
              <FeatureCard
                icon={<FileSearch className="h-6 w-6 text-primary" />}
                title="Resume Analysis"
                description="Get detailed feedback on your resume with actionable suggestions for improvement."
                className="animate-slide-up [animation-delay:200ms]"
              />
              <FeatureCard
                icon={<Layers className="h-6 w-6 text-primary" />}
                title="Professional Templates"
                description="Choose from a variety of professionally designed templates to showcase your skills."
                className="animate-slide-up [animation-delay:300ms]"
              />
              <FeatureCard
                icon={<Target className="h-6 w-6 text-primary" />}
                title="Job Matching"
                description="Optimize your resume for specific job descriptions to increase your chances of getting interviews."
                className="animate-slide-up [animation-delay:400ms]"
              />
              <FeatureCard
                icon={<Award className="h-6 w-6 text-primary" />}
                title="Expert Recommendations"
                description="Receive expert advice on how to improve your resume based on industry standards."
                className="animate-slide-up [animation-delay:500ms]"
              />
              <FeatureCard
                icon={<Zap className="h-6 w-6 text-primary" />}
                title="Instant Export"
                description="Export your resume in multiple formats including PDF, Word, and plain text."
                className="animate-slide-up [animation-delay:600ms]"
              />
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16 animate-fade-in">
              <Badge className="text-xs font-medium px-3 py-1 bg-primary/10 text-primary">
                Simple Process
              </Badge>
              <h2 className="text-3xl md:text-4xl font-medium mt-2 mb-4">
                How It Works
              </h2>
              <p className="max-w-2xl mx-auto text-muted-foreground">
                Get started in minutes with our easy-to-use platform.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass p-6 rounded-xl text-center animate-slide-up [animation-delay:100ms]">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-medium">1</span>
                </div>
                <h3 className="text-xl font-medium mb-3">Input Your Details</h3>
                <p className="text-muted-foreground">
                  Enter your information or upload an existing resume to get started.
                </p>
              </div>
              
              <div className="glass p-6 rounded-xl text-center animate-slide-up [animation-delay:200ms]">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-medium">2</span>
                </div>
                <h3 className="text-xl font-medium mb-3">AI Enhancement</h3>
                <p className="text-muted-foreground">
                  Our AI analyzes and enhances your resume with tailored suggestions.
                </p>
              </div>
              
              <div className="glass p-6 rounded-xl text-center animate-slide-up [animation-delay:300ms]">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-medium">3</span>
                </div>
                <h3 className="text-xl font-medium mb-3">Export & Apply</h3>
                <p className="text-muted-foreground">
                  Download your polished resume and start applying for jobs with confidence.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 px-6 bg-secondary/50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16 animate-fade-in">
              <Badge className="text-xs font-medium px-3 py-1 bg-primary/10 text-primary">
                Success Stories
              </Badge>
              <h2 className="text-3xl md:text-4xl font-medium mt-2 mb-4">
                What Our Users Say
              </h2>
              <p className="max-w-2xl mx-auto text-muted-foreground">
                Discover how SmartCV has helped professionals land their dream jobs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass p-6 rounded-xl animate-slide-up [animation-delay:100ms]">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-medium">JD</span>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium">John Davis</h4>
                    <p className="text-sm text-muted-foreground">Software Engineer</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "The AI suggestions helped me highlight my achievements in a way I couldn't have done on my own. 
                  I received more interview calls after using SmartCV."
                </p>
              </div>
              
              <div className="glass p-6 rounded-xl animate-slide-up [animation-delay:200ms]">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-medium">SR</span>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium">Sarah Rodriguez</h4>
                    <p className="text-sm text-muted-foreground">Marketing Manager</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "The resume analyzer gave me specific feedback that I implemented right away. 
                  I landed a job at my dream company within two weeks!"
                </p>
              </div>
              
              <div className="glass p-6 rounded-xl animate-slide-up [animation-delay:300ms]">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-medium">MK</span>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium">Michael Kim</h4>
                    <p className="text-sm text-muted-foreground">Product Manager</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "The professional templates and AI content suggestions made my resume stand out. 
                  I received compliments from recruiters on my resume's quality."
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <CallToAction 
          title="Ready to Land Your Dream Job?"
          description="Create a professional resume now and increase your chances of getting interviews."
          primaryButtonText="Create Your Resume"
          primaryButtonLink="/builder"
          secondaryButtonText="Analyze Your Resume"
          secondaryButtonLink="/analyzer"
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
