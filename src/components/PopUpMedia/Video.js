export const Video = ({ videoUrl }) => {
  return (
    <iframe
      src={videoUrl}
      width="100%"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      title="A first look at the KUMA Q a Toyota Hiace campervan"
      className="aspect-16-9 laptop:h-[495px] tablet:h-[435px] h-[197px]"
    ></iframe>
  );
};
