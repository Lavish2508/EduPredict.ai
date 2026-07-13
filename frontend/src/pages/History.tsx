import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../api/api";

interface Prediction {
  _id: string;
  name: string;
  attendance: number;
  study_hours: number;
  assignments: number;
  previous_marks: number;
  predicted_score: number;
  result: string;
}

function History() {
  const [history, setHistory] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await API.get("/prediction/history");
      setHistory(res.data);
    } catch (error) {
      console.error(error);
      alert("Unable to load prediction history");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>

      <div className="min-h-screen bg-gray-100 py-10">

        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-4xl font-bold text-blue-700 mb-2">
            📜 Prediction History
          </h1>

          <p className="text-gray-600 mb-8">
            All predictions stored in MongoDB Atlas.
          </p>

          {loading ? (

            <div className="text-center text-xl">
              Loading...
            </div>

          ) : history.length === 0 ? (

            <div className="bg-white rounded-xl shadow-lg p-10 text-center">

              <h2 className="text-2xl font-bold">
                No Predictions Found
              </h2>

              <p className="mt-3 text-gray-500">
                Go to the Predict page and create your first prediction.
              </p>

            </div>

          ) : (

            <div className="bg-white rounded-xl shadow-lg overflow-x-auto">

              <table className="w-full">

                <thead className="bg-blue-700 text-white">

                  <tr>

                    <th className="p-4">Student</th>
                    <th>Attendance</th>
                    <th>Study Hours</th>
                    <th>Assignments</th>
                    <th>Previous Marks</th>
                    <th>Predicted Score</th>
                    <th>Result</th>

                  </tr>

                </thead>

                <tbody>

                  {history.map((item) => (

                    <tr
                      key={item._id}
                      className="border-b hover:bg-gray-50 text-center"
                    >

                      <td className="p-4">
                        {item.name}
                      </td>

                      <td>{item.attendance}</td>

                      <td>{item.study_hours}</td>

                      <td>{item.assignments}</td>

                      <td>{item.previous_marks}</td>

                      <td className="font-bold text-blue-700">
                        {Number(item.predicted_score).toFixed(2)}
                      </td>

                      <td>

                        <span
                          className={
                            item.result === "PASS"
                              ? "text-green-600 font-bold"
                              : "text-red-600 font-bold"
                          }
                        >
                          {item.result}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </Layout>
  );
}

export default History;