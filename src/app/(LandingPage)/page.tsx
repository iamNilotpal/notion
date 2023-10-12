import Header from './_components/Header';
import Hero from './_components/Hero';

const LandingPage = () => {
  return (
    <main className="min-h-screen flex flex-col md:py-20 md:px-10 lg:py-20 lg:px-10">
      <section className="flex flex-col items-center justify-center md:justify-start text-center gap-8 flex-1 px-6 pb-10">
        <Header />
        <Hero />
      </section>
    </main>
  );
};

export default LandingPage;
