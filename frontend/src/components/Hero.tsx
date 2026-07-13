function Hero() {
  return (
    <section className="bg-gray-100 min-h-[90vh] flex items-center justify-center">
      <div className="text-center max-w-4xl px-6">

        <h1 className="text-6xl font-bold text-gray-900">
          🎓 EduPredict AI
        </h1>

        <p className="text-2xl text-blue-600 mt-4 font-semibold">
          AI Powered Student Performance Prediction System
        </p>

        <p className="text-gray-600 mt-6 text-lg">
          Predict student performance, identify weak subjects,
          analyze academic progress, and receive personalized
          study recommendations using Artificial Intelligence.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl">
            Get Started
          </button>

          <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-xl hover:bg-blue-50">
            Learn More
          </button>
        </div>

      </div>
    </section>
  );
}

export default Hero;