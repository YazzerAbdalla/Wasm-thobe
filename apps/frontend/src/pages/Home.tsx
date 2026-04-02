import Hero from "../components/Hero";
import StorySection from "../components/StorySection/StorySection";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="container mx-auto">
        <StorySection />
      </div>
    </>
  );
}
