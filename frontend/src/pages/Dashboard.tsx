import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../api/api";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function Dashboard() {

  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
  try {
    const res = await API.get("/prediction/dashboard");

    console.log("Dashboard Response:", res.data);

    setStats(res.data);

  } catch (err) {
    console.log(err);
  }
};
  if (!stats) {

    return (

      <Layout>

        <div className="min-h-screen flex items-center justify-center text-3xl font-bold">

          Loading Dashboard...

        </div>

      </Layout>

    );

  }

  const pieData = [

    { name: "Pass", value: stats.pass_count },

    { name: "Fail", value: stats.fail_count }

  ];

  const COLORS = ["#16a34a", "#dc2626"];

  return (

    <Layout>

      <div className="min-h-screen bg-gray-100">

        <div className="max-w-7xl mx-auto py-10 px-6">

          <h1 className="text-5xl font-bold mb-10">

            📊 AI Dashboard

          </h1>
          <div className="grid md:grid-cols-4 gap-6">

  <div className="bg-blue-600 text-white rounded-xl shadow-lg p-6">

    <h2 className="text-lg">👨‍🎓 Total Students</h2>

    <p className="text-5xl font-bold mt-4">

      {stats.total_students}

    </p>

  </div>

  <div className="bg-green-600 text-white rounded-xl shadow-lg p-6">

    <h2 className="text-lg">✅ Pass Students</h2>

    <p className="text-5xl font-bold mt-4">

      {stats.pass_count}

    </p>

  </div>

  <div className="bg-red-600 text-white rounded-xl shadow-lg p-6">

    <h2 className="text-lg">❌ Failed Students</h2>

    <p className="text-5xl font-bold mt-4">

      {stats.fail_count}

    </p>

  </div>

  <div className="bg-purple-600 text-white rounded-xl shadow-lg p-6">

    <h2 className="text-lg">📈 Average Score</h2>

    <p className="text-5xl font-bold mt-4">

      {stats.average_score}

    </p>

  </div>

</div>
<div className="grid md:grid-cols-3 gap-6 mt-10">

  <div className="bg-white rounded-xl shadow-lg p-6">

    <h2 className="text-2xl font-bold">

      🏆 Top Performer

    </h2>

    <p className="text-3xl mt-6 font-semibold">

      {stats.topper}

    </p>

    <p className="text-5xl text-blue-700 mt-4 font-bold">

      {stats.highest_score}

    </p>

  </div>

  <div className="bg-white rounded-xl shadow-lg p-6">

    <h2 className="text-2xl font-bold">

      📊 Average Attendance

    </h2>

    <p className="text-5xl mt-6 text-green-700 font-bold">

      {stats.average_attendance}%

    </p>

  </div>

  <div className="bg-white rounded-xl shadow-lg p-6">

    <h2 className="text-2xl font-bold">

      ⚠ High Risk Students

    </h2>

    <p className="text-5xl mt-6 text-red-700 font-bold">

      {stats.high_risk}

    </p>

  </div>

</div>
<div className="grid md:grid-cols-2 gap-8 mt-10">

  {/* ================= BAR CHART ================= */}

  <div className="bg-white rounded-xl shadow-lg p-6">

    <h2 className="text-2xl font-bold mb-6">

      📈 Student Performance

    </h2>

    <div style={{ width: "100%", height: 350 }}>

      <ResponsiveContainer>

        <BarChart
          data={[
            {
              name: "Average Score",
              score: stats.average_score,
            },
            {
              name: "Attendance",
              score: stats.average_attendance,
            },
          ]}
        >

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="score" fill="#2563eb" radius={[10,10,0,0]} />

        </BarChart>

      </ResponsiveContainer>

    </div>

  </div>

  {/* ================= PIE CHART ================= */}

  <div className="bg-white rounded-xl shadow-lg p-6">

    <h2 className="text-2xl font-bold mb-6">

      🥧 Pass vs Fail

    </h2>

    <div style={{ width: "100%", height: 350 }}>

      <ResponsiveContainer>

        <PieChart>

          <Pie
            data={pieData}
            dataKey="value"
            outerRadius={120}
            label
          >

             pieData.map((_,index)=> (

              <Cell
                key={index}
                fill={COLORS[index]}
              />

            ))}

          </Pie>

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

    </div>

  </div>

</div>
<div className="grid md:grid-cols-2 gap-8 mt-10">

  <div className="bg-white rounded-xl shadow-lg p-8">

    <h2 className="text-2xl font-bold mb-6">

      🤖 AI Insights

    </h2>

    <div className="space-y-5 text-lg">

      <p>

        👨‍🎓 Total Students :
        <strong> {stats.total_students}</strong>

      </p>

      <p>

        🟢 Successful Students :
        <strong> {stats.pass_count}</strong>

      </p>

      <p>

        🔴 Failed Students :
        <strong> {stats.fail_count}</strong>

      </p>

      <p>

        📊 Average Performance :
        <strong> {stats.average_score}%</strong>

      </p>

    </div>

  </div>

  <div className="bg-gradient-to-r from-blue-700 to-purple-700 text-white rounded-xl shadow-lg p-8">

    <h2 className="text-2xl font-bold mb-6">

      🎯 AI Summary

    </h2>

    <p className="leading-8 text-lg">

      EduPredict AI continuously analyses
      student performance using attendance,
      study habits, previous marks and
      assignment scores to predict academic
      success and identify students who may
      require additional support.

    </p>

  </div>

</div>
        </div>

      </div>

    </Layout>

  );

}

export default Dashboard;