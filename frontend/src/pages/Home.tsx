import { Link } from "react-router-dom";
import Layout from "../components/Layout";

function Home() {
  return (
    <Layout>

      <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white">

        <div className="max-w-7xl mx-auto px-8 py-24">

          <div className="grid md:grid-cols-2 gap-10 items-center">

            <div>

              <h1 className="text-6xl font-bold leading-tight">

                EduPredict AI

              </h1>

              <p className="mt-8 text-xl leading-8">

                AI Powered Student Performance Prediction System
                built using Machine Learning, FastAPI and MongoDB.

              </p>

              <div className="flex gap-4 mt-10">

                <Link
                  to="/register"
                  className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-200"
                >
                  Get Started
                </Link>

                <Link
                  to="/about"
                  className="border-2 border-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-700"
                >
                  Learn More
                </Link>

              </div>

            </div>

            <div className="flex justify-center">

              <img
                src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
                className="w-96"
                alt="AI Student"
              />

            </div>

          </div>

        </div>

      </section>

      <section className="py-20 bg-gray-100">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-4xl font-bold text-center mb-14">

            Why EduPredict AI?

          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white p-8 rounded-xl shadow-lg">

              <h2 className="text-4xl">🤖</h2>

              <h3 className="text-xl font-bold mt-4">

                AI Prediction

              </h3>

              <p className="mt-3">

                Predict future academic performance using AI.

              </p>

            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">

              <h2 className="text-4xl">📈</h2>

              <h3 className="text-xl font-bold mt-4">

                Analytics

              </h3>

              <p className="mt-3">

                View prediction history and performance.

              </p>

            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">

              <h2 className="text-4xl">💾</h2>

              <h3 className="text-xl font-bold mt-4">

                MongoDB

              </h3>

              <p className="mt-3">

                Secure cloud database storage.

              </p>

            </div>

          </div>

        </div>

      </section>

    </Layout>
  );
}

export default Home;