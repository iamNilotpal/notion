import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Header = () => {
  return (
    <header className="max-w-3xl space-y-4">
      <h1 className="text-3xl md:text-6xl font-bold">
        Your wiki, docs, & projects. Together.
      </h1>
      <p className="text-base md:text-2xl font-medium">
        Notion is the connected workspace where better, faster work happens.
      </p>
      <Button>
        <span className="mr-2">Get Notion For Free</span>
        <ArrowRight size={20} />
      </Button>
    </header>
  );
};

export default Header;
