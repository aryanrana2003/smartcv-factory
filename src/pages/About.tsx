
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Sparkles, Users, Mail, ArrowRight } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-medium mb-4">About SmartCV</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're on a mission to help job seekers create outstanding resumes and land their dream jobs.
            </p>
          </div>
          
          <div className="space-y-12">
            <Card className="animate-fade-in">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-full md:w-1/2">
                    <h2 className="text-2xl font-medium mb-4">Our Story</h2>
                    <p className="text-muted-foreground mb-4">
                      SmartCV was founded with a simple goal: to make the resume creation process easier, 
                      more effective, and accessible to everyone. We recognized that many talented professionals 
                      struggle to effectively showcase their skills and experience on paper.
                    </p>
                    <p className="text-muted-foreground">
                      By combining cutting-edge AI technology with human expertise in recruitment and career development, 
                      we've created a platform that empowers job seekers at every stage of their career journey.
                    </p>
                  </div>
                  <div className="w-full md:w-1/2 aspect-video rounded-lg bg-secondary flex items-center justify-center">
                    <div className="text-center">
                      <Users className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                      <p className="text-muted-foreground">Team photo</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="animate-slide-up [animation-delay:100ms]">
                <CardContent className="p-6">
                  <h3 className="text-xl font-medium mb-3">Our Mission</h3>
                  <p className="text-muted-foreground">
                    To democratize access to professional resume creation tools and empower job seekers 
                    to present their best selves to potential employers.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="animate-slide-up [animation-delay:200ms]">
                <CardContent className="p-6">
                  <h3 className="text-xl font-medium mb-3">Our Vision</h3>
                  <p className="text-muted-foreground">
                    A world where everyone has the tools and knowledge to create compelling resumes 
                    that accurately reflect their skills and potential.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="animate-slide-up [animation-delay:300ms]">
                <CardContent className="p-6">
                  <h3 className="text-xl font-medium mb-3">Our Values</h3>
                  <p className="text-muted-foreground">
                    Innovation, accessibility, accuracy, and empowerment guide everything we do 
                    at SmartCV.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Card className="animate-fade-in">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-medium mb-6">The Technology Behind SmartCV</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="w-12 h-12 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Sparkles className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">AI-Powered Analysis</h3>
                    <p className="text-muted-foreground">
                      Our advanced machine learning algorithms analyze your resume against industry 
                      standards and job descriptions to provide targeted feedback and suggestions.
                    </p>
                  </div>
                  
                  <div>
                    <div className="w-12 h-12 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Expert-Crafted Content</h3>
                    <p className="text-muted-foreground">
                      Our AI suggestions are developed and refined by career experts, HR professionals, 
                      and industry specialists to ensure high-quality, relevant content.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="text-center pt-6 animate-fade-in">
              <h2 className="text-2xl font-medium mb-4">Ready to Build Your Resume?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Start creating your professional resume today with our easy-to-use tools and AI-powered suggestions.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" asChild>
                  <Link to="/builder">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
