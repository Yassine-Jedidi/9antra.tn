import Students from "../assets/Students.jpg";

const Hero = () => {
  return (
    <section className="relative h-[600px]">
      <div className="absolute inset-0">
        <img
          src={Students}
          alt="Students"
          className="w-full h-full object-cover brightness-75"
        />
      </div>
      <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
        <div className="bg-white/80 p-8">
          <h1 className="text-4xl font-bold mb-4">
            Improve your skills on your own
          </h1>
          <h1 className="text-4xl font-bold mb-6">
            To prepare for a better future
          </h1>
          <button className="bg-[#C1316D] text-white px-14 py-3 rounded-full text-lg font-semibold hover:bg-[#A12759]">
            REGISTER NOW
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
