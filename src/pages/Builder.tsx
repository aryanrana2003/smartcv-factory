
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ResumeForm from '@/components/ResumeForm';

const Builder = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-16 px-6">
        <ResumeForm />
      </main>
      
      <Footer />
    </div>
  );
};

export default Builder;
