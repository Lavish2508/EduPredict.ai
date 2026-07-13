import Layout from "../components/Layout";

function About() {
  return (
    <Layout>

      <div className="bg-gray-100 min-h-screen">

        <div className="max-w-6xl mx-auto py-16 px-8">

          <h1 className="text-5xl font-bold text-blue-700 mb-8">
            About EduPredict AI
          </h1>

          <p className="text-lg text-gray-700 leading-8">
            EduPredict AI is an Artificial Intelligence based Student
            Performance Prediction System developed to predict a student's
            academic performance using Machine Learning.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-12">

            <div className="bg-white p-8 rounded-xl shadow-lg">

              <h2 className="text-2xl font-bold mb-4">
                🤖 AI Features
              </h2>

              <ul className="space-y-3">

                <li>✔ Student Performance Prediction</li>

                <li>✔ Smart Analytics</li>

                <li>✔ Prediction History</li>

                <li>✔ FastAPI Backend</li>

                <li>✔ MongoDB Atlas Database</li>

              </ul>

            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">

              <h2 className="text-2xl font-bold mb-4">
                💻 Technologies Used
              </h2>

              <ul className="space-y-3">

                <li>React + TypeScript</li>

                <li>Tailwind CSS</li>

                <li>FastAPI</li>

                <li>MongoDB Atlas</li>

                <li>Machine Learning</li>

              </ul>

            </div>

          </div>

        </div>

      </div>

    </Layout>
  );
}

export default About;