import ArrowIcon from "../ArrowIcon";
import SectionTitle from "../SectionTitle";
import StorySectionImage from "./StorySectionImage";

const STORY_INFO = [
  {
    title: "القص بدقّة",
    description:
      "كل قطعة تبدأ بقرار صحيح وقصّ متقن، لأن التفاصيل الصغيرة هي أساس الشكل النهائي المثالي.",
  },
  {
    title: "الاختيار",
    description:
      "ننتقي الخامات بعناية شديدة، لنضمن توازنًا مثاليًا بين الملمس، المتانة، وأناقة المظهر.",
  },
  {
    title: "المهارة اليدوية",
    description:
      "حرفية متوارثة تُنفّذ يدويًا، حيث يلتقي الصبر مع الخبرة لصناعة قطعة تدوم وتُحسّ.",
  },
];

const StorySection = () => {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 w-full overflow-hidden bg-linear-to-b from-black via-zinc-950 to-black">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/images/texture.png')] opacity-[0.02] mix-blend-overlay pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center gap-8 md:gap-12 text-center mb-12 md:mb-20">
          <SectionTitle title="مراحل ولادة التحفة" subtitle="our process" />
          <ArrowIcon />
        </div>

        {/* Desktop & Tablet: Staggered Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 xl:gap-12 max-w-7xl mx-auto">
          {STORY_INFO.map((item, index) => (
            <div
              key={index}
              className="transform transition-all duration-500 hover:scale-[1.02]"
              style={{
                marginTop: `${index * 3}rem`,
                animationDelay: `${index * 150}ms`,
              }}
            >
              <StorySectionImage
                title={item.title}
                description={item.description}
                index={index}
              />
            </div>
          ))}
        </div>

        {/* Mobile: Vertical Stack */}
        <div className="md:hidden flex flex-col gap-8 max-w-md mx-auto">
          {STORY_INFO.map((item, index) => (
            <div key={index} className="transform transition-all duration-500">
              <StorySectionImage
                title={item.title}
                description={item.description}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StorySection;
