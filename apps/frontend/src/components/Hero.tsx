import { Link } from "react-router-dom";
import { useIsMobile } from "../hooks/useIsMobile";
import ArrowIcon from "./ArrowIcon";
import SectionTitle from "./SectionTitle";
import Button from "./ui/Button";

const Hero = () => {
  const isMobile = useIsMobile();

  return <>{isMobile ? <MobileHero /> : <DesktopHero />}</>;
};

export default Hero;

function HeroContent() {
  return (
    <>
      <SectionTitle title="إرث من الإتقان" subtitle="craftsmanship" />

      <p className="text-2xl">
        ثياب نُشكّلها وفق أذواق مختارة، ومعالجة يدوية دقيقة.
      </p>
      <div className="flex gap-5 flex-wrap justify-center lg:flex-col">
        <Button variant="primary">صمّم ثوبك الخاص</Button>
        <Button variant="outline">احجز موعد قياس</Button>
      </div>
      <ArrowIcon />
      <Link to={"/story"} className="text-gold font-semibold text-xl ">
        اكتشف الرحلة
      </Link>
    </>
  );
}

function DesktopHero() {
  return (
    <section className="pt-20 flex flex-col lg:flex-row">
      {/* Content section */}
      <div className="w-1/2 pt-12 text-center order-1 flex flex-col items-center gap-9">
        <HeroContent />
      </div>
      <div className="w-1/2 pt-12 relative">
        <img
          src="/images/Hero.png"
          alt="Hero Image"
          className="w-full h-full object-cover"
        />

        {/* Black Fade Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/80 to-transparent" />
      </div>
    </section>
  );
}

function MobileHero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center text-center lg:text-right"
      style={{
        backgroundImage: "url('/images/Hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-linear-to-l from-black via-black/80 to-black/40" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-6 flex flex-col items-center lg:items-end gap-8 pt-20">
        <HeroContent />{" "}
      </div>
    </section>
  );
}
