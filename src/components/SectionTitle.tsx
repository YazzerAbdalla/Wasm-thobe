const SectionTitle = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="flex flex-col gap-7">
      <p className="gold-gradient-text uppercase font-semibold  tracking-[0.45rem]">
        {subtitle}
      </p>
      <h1 className="gold-gradient-text">{title}</h1>
    </div>
  );
};

export default SectionTitle;
