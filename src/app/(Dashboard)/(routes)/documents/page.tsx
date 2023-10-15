import Image from 'next/image';
import CreateNewDocument from './create-new';
import Greeting from './greeting';

const DocumentPage = () => {
  return (
    <section className="h-full flex items-center justify-center flex-col gap-2">
      <Image
        width={350}
        height={350}
        src="/paper-documents.svg"
        className="bg-transparent"
        alt="Empty state illustration"
      />
      <Greeting />
      <CreateNewDocument />
    </section>
  );
};

export default DocumentPage;
