const Shimmer = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-24">
      {Array(8)
        .fill("")
        .map((_, index) => (
          <div
            key={index}
            className="w-[300px] h-[260px] bg-gray-300 animate-pulse rounded-lg shadow-md"
          ></div>
        ))}
    </div>
  );
};

export default Shimmer;
