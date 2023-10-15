import Header from './_components/header';
import Hero from './_components/hero';

const LandingPage = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <section className="h-screen flex flex-col items-center justify-center text-center gap-8 flex-1 px-6 pb-10">
        <Header />
        <Hero />
      </section>
    </main>
  );
};

export default LandingPage;
