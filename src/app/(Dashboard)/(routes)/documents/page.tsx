import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Greeting from './Greeting';

const DocumentPage = () => {
  return (
    <section className="h-full flex items-center justify-center flex-col gap-2">
      <Greeting />
      <Button className="flex items-center gap-[6px]">
        <PlusCircle size={16} />
        <span>Create a document</span>
      </Button>
    </section>
  );
};

export default DocumentPage;
