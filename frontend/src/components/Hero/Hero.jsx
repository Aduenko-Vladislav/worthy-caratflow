import diamondImg from "../../assets/diamond.webp";

function Hero() {
  return (
    <section
      className="relative flex justify-center items-center min-h-screen 
                bg-linear-to-b from-[#0e1230] to-[#8093fd] text-white overflow-hidden px-6 md:px-12"
    >
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-[1440px] w-full">
        <div className="max-w-xl text-center lg:text-left">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 drop-shadow-lg">
            Discover the true value
            <br />
            of your <span className="text-blue-300">Diamond</span>
          </h1>

          <h4 className="text-lg md:text-xl text-slate-200 mb-8">
            Our calculator helps you estimate the real value of your diamond
            based on its key characteristics such as cut, color, and carat
            weight.
          </h4>

          <a
            href="#calculator"
            className="inline-block px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500
                       font-semibold text-lg transition shadow-lg"
          >
            Calculate Price
          </a>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <img
            src={diamondImg}
            alt="Diamond"
            className="w-full max-w-[700px] h-auto max-h-[70vh] object-contain
                       drop-shadow-[0_0_60px_rgba(255,255,255,0.25)]"
          />
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm animate-bounce">
        <a href="#calculator">↓ Scroll down</a>
      </div>
    </section>
  );
}

export default Hero;
