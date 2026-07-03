export const PopularCuisines = ({ image, title, onClick }) => {
  return (
    <div
      className="px-3 flex flex-col justify-center items-center cursor-pointer hover:opacity-75"
      onClick={() => onClick(title)}
    >
      <img
        className="w-[2rem] h-[2rem] lg:w-[4rem] lg:h-[4rem] rounded-full object-cover object-center"
        src={image}
        alt={title}
      />
      <span className="py-2 font-semibold text-xs text-gray-400">
        {title.length>6?title.substring(0,5)+"...":title}</span>
    </div>
  );
};
