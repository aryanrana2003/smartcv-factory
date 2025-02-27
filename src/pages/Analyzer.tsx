
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ResumeAnalysis from '@/components/ResumeAnalysis';

const Analyzer = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-16 px-6">
        <ResumeAnalysis />
      </main>
      
      <Footer />
    </div>
  );
};

export default Analyzer;
