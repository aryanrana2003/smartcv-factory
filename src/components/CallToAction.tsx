
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface CallToActionProps {
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  className?: string;
}

const CallToAction = ({
  title,
  description,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  className = '',
}: CallToActionProps) => {
  return (
    <div className={`py-16 px-6 ${className}`}>
      <div className="container mx-auto max-w-4xl text-center">
        <div className="inline-block mb-3 text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
          Start Now
        </div>
        <h2 className="text-3xl md:text-4xl font-medium mb-4">{title}</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">{description}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="w-full sm:w-auto" asChild>
            <Link to={primaryButtonLink}>
              {primaryButtonText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          
          {secondaryButtonText && secondaryButtonLink && (
            <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
              <Link to={secondaryButtonLink}>{secondaryButtonText}</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
