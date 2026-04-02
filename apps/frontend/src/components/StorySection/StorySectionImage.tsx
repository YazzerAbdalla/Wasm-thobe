import { toArabicNumbers } from "../../utils/toArabicNumbers";

type StorySectionImageProps = {
  index: number;
  title: string;
  description: string;
};

const StorySectionImage = ({
  index,
  description,
  title,
}: StorySectionImageProps) => {
  return (
    <div className="group relative overflow-hidden">
      {/* Container with luxury aspect ratio (4:5 portrait for elegance) */}
      <div className="relative aspect-4/5 w-full overflow-hidden rounded-sm shadow-2xl">
        {/* Image with overlay effects */}
        <div className="absolute inset-0 bg-linear-to-br from-amber-900/5 to-transparent z-10 pointer-events-none" />

        <img
          src={`/images/story-${index + 1}.png`}
          alt={title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
        />

        {/* Premium gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

        {/* Elegant border accent */}
        <div className="absolute inset-0 border border-amber-700/20 group-hover:border-amber-600/40 transition-colors duration-500 rounded-sm" />

        {/* Gold corner accent */}
        <div className="absolute top-0 right-0 w-16 h-16 md:w-20 md:h-20 bg-linear-to-br from-amber-600/10 to-transparent" />
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-10 z-20">
        {/* Step number with luxury styling */}
        <div className="mb-3 md:mb-4">
          <div className="inline-flex items-baseline gap-1 font-serif">
            <span className="text-4xl md:text-5xl lg:text-6xl font-light text-amber-600/40 tracking-wider">
              {toArabicNumbers(0)}
            </span>
            <span className="text-5xl md:text-6xl lg:text-7xl font-light text-amber-500/60 tracking-wider">
              {toArabicNumbers(index + 1)}
            </span>
          </div>

          {/* Decorative line */}
          <div className="h-px w-12 md:w-16 bg-linear-to-r from-amber-600/60 to-transparent mt-2 md:mt-3" />
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-100 mb-2 md:mb-3 leading-tight tracking-wide">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm md:text-base lg:text-lg text-gray-300 leading-relaxed max-w-md opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
          {description}
        </p>

        {/* Bottom decorative element */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-amber-600/30 to-transparent" />
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-linear-to-t from-amber-600/0 to-amber-600/0 group-hover:from-amber-600/5 group-hover:to-transparent transition-all duration-500 pointer-events-none rounded-sm" />
    </div>
  );
};

export default StorySectionImage;
