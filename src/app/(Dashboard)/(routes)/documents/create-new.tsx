import { Button } from '@/components/ui/button';
import { useMutation } from 'convex/react';
import { PlusCircle } from 'lucide-react';
import { api } from '../../../../../convex/_generated/api';

const CreateNewDocument = () => {
  const create = useMutation(api.documents.create);

  return (
    <Button className="flex items-center gap-[6px]">
      <PlusCircle size={16} />
      <span>Create a document</span>
    </Button>
  );
};

export default CreateNewDocument;
