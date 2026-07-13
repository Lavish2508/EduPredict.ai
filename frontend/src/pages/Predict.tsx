import { useState } from "react";
import Layout from "../components/Layout";
import API from "../api/api";
import { ResponsiveContainer,
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

function Predict() {

  const [form, setForm] = useState({
    

    // Student Information
    name: "",
    roll_no: "",
    age: "",
    gender: "",
    course: "",
    semester: "",

    // Academic
    attendance: "",
    study_hours: "",
    assignments: "",
    sgpa: "",
    cgpa: "",
    internal_marks: "",
    practical_marks: "",

    

    // Study Habits
    sleep_hours: "",
    mobile_usage: "",
    study_time: "",
    revision: "",

    // Lifestyle
    stress: "",
    exercise: "",
    parent_support: ""

  });

  const [prediction, setPrediction] = useState<any>(null);

  const [loading, setLoading] = useState(false);
  const pieData = prediction
  ? prediction.subjects.map((s:any)=>({
      name:s.subject,
      value:s.marks
    }))
  : [];

const COLORS=["#2563eb","#16a34a","#dc2626","#ca8a04","#9333ea","#0891b2"];
 
const [subjectCount, setSubjectCount] = useState(0);
const [subjects, setSubjects] = useState<
  {
    subject: string;
    marks: string;
  }[]
>([]);


const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {

  setForm({

    ...form,

    [e.target.name]: e.target.value,

  });

};

// ================= SUBJECT GENERATOR =================

const generateSubjects = (count: number) => {

  setSubjectCount(count);

    const list: { subject: string; marks: string }[] = [];

  for (let i = 0; i < count; i++) {

    list.push({

      subject: "",

      marks: "",

    });

  }

  setSubjects(list);

};

// ================= SUBJECT INPUT =================

const handleSubjectChange=(

index:number,

field:"subject"|"marks",

value:string

)=>{

const updated=[...subjects];

updated[index][field]=value;

setSubjects(updated);

}

// ================= PREDICT =================

const predictStudent = async (e: React.FormEvent) => {

  e.preventDefault();

  setLoading(true);

  try {
    const res = await API.post("/prediction/predict",{

    name:form.name,

    attendance:Number(form.attendance),

    study_hours:Number(form.study_hours),

    assignments:Number(form.assignments),

    subjects: subjects

});
    

    setPrediction(res.data);

  } catch (err) {

    console.log(err);

    alert("Prediction Failed");

  }

  setLoading(false);

};
return (

<Layout>

<div className="min-h-screen bg-gray-100">

<div className="max-w-7xl mx-auto py-10 px-6">

<h1>...</h1>

<form
  onSubmit={predictStudent}
  className="space-y-10 mt-10"
>
          {/* ================= STUDENT INFORMATION ================= */}

<div className="bg-white rounded-xl shadow-lg p-8">

  <h2 className="text-3xl font-bold text-blue-700 mb-8">
    👤 Student Information
  </h2>

  <div className="grid md:grid-cols-2 gap-5">

    <input
      type="text"
      name="name"
      placeholder="Student Name"
      value={form.name}
      onChange={handleChange}
      className="border rounded-lg p-3"
      required
    />

    <input
      type="text"
      name="roll_no"
      placeholder="Roll Number"
      value={form.roll_no}
      onChange={handleChange}
      className="border rounded-lg p-3"
    />

    <input
      type="number"
      name="age"
      placeholder="Age"
      value={form.age}
      onChange={handleChange}
      className="border rounded-lg p-3"
    />

    <select
      name="gender"
      value={form.gender}
      onChange={handleChange}
      className="border rounded-lg p-3"
    >
      <option value="">Select Gender</option>
      <option>Male</option>
      <option>Female</option>
      <option>Other</option>
    </select>

    <input
      type="text"
      name="course"
      placeholder="Course"
      value={form.course}
      onChange={handleChange}
      className="border rounded-lg p-3"
    />

    <input
      type="text"
      name="semester"
      placeholder="Semester"
      value={form.semester}
      onChange={handleChange}
      className="border rounded-lg p-3"
    />

  </div>

</div>

{/* ================= ACADEMIC DETAILS ================= */}

<div className="bg-white rounded-xl shadow-lg p-8">

  <h2 className="text-3xl font-bold text-green-700 mb-8">
    📚 Academic Details
  </h2>

  <div className="grid md:grid-cols-2 gap-5">

    <input
      type="number"
      name="attendance"
      placeholder="Attendance (%)"
      value={form.attendance}
      onChange={handleChange}
      className="border rounded-lg p-3"
      required
    />

    <input
      type="number"
      name="study_hours"
      placeholder="Study Hours / Day"
      value={form.study_hours}
      onChange={handleChange}
      className="border rounded-lg p-3"
      required
    />

    <input
      type="number"
      name="assignments"
      placeholder="Assignment Marks"
      value={form.assignments}
      onChange={handleChange}
      className="border rounded-lg p-3"
      required
    />

    

    <input
      type="number"
      name="sgpa"
      placeholder="Current SGPA"
      value={form.sgpa}
      onChange={handleChange}
      className="border rounded-lg p-3"
    />

    <input
      type="number"
      name="cgpa"
      placeholder="Current CGPA"
      value={form.cgpa}
      onChange={handleChange}
      className="border rounded-lg p-3"
    />

    <input
      type="number"
      name="internal_marks"
      placeholder="Internal Marks"
      value={form.internal_marks}
      onChange={handleChange}
      className="border rounded-lg p-3"
    />

    <input
      type="number"
      name="practical_marks"
      placeholder="Practical Marks"
      value={form.practical_marks}
      onChange={handleChange}
      className="border rounded-lg p-3"
    />

  </div>

</div>
{/* ================= SUBJECT MARKS ================= */}

<div className="bg-white rounded-xl shadow-lg p-8">

  <h2 className="text-3xl font-bold text-purple-700 mb-8">
    📖 Subject-wise Performance
  </h2>

  <div className="mb-6">

    <label className="font-semibold block mb-2">
      Number of Subjects
    </label>

    <input
type="number"
min="1"
max="15"
value={subjectCount}
onChange={(e)=>{

const count = Number(e.target.value);

generateSubjects(count);

}}
className="border rounded-lg p-3 w-full"
/>
  </div>

  <div className="space-y-5">

    {subjects.map((item,index)=>(

<div
key={index}
className="border rounded-lg p-5 bg-gray-50"
>

<h3 className="font-bold mb-4">

Subject {index+1}

</h3>

<input

type="text"

placeholder="Enter Subject Name"

value={item.subject}

className="border rounded-lg p-3 w-full mb-3"

onChange={(e)=>handleSubjectChange(

index,

"subject",

e.target.value

)}
/>

<input

type="number"

placeholder="Enter Marks"

value={item.marks}

className="border rounded-lg p-3 w-full"

onChange={(e)=>handleSubjectChange(

index,

"marks",

e.target.value

)}
/>

</div>

))}

</div>
</div> 
{/* ================= STUDY HABITS ================= */}

<div className="bg-white rounded-xl shadow-lg p-8">

  <h2 className="text-3xl font-bold text-orange-700 mb-8">
    📚 Study Habits
  </h2>

  <div className="grid md:grid-cols-2 gap-5">

    <input
      type="number"
      name="sleep_hours"
      placeholder="Sleep Hours"
      value={form.sleep_hours}
      onChange={handleChange}
      className="border rounded-lg p-3"
    />

    <input
      type="number"
      name="mobile_usage"
      placeholder="Mobile Usage (Hours)"
      value={form.mobile_usage}
      onChange={handleChange}
      className="border rounded-lg p-3"
    />

    <select
      name="study_time"
      value={form.study_time}
      onChange={handleChange}
      className="border rounded-lg p-3"
    >
      <option value="">Preferred Study Time</option>
      <option>Morning</option>
      <option>Afternoon</option>
      <option>Evening</option>
      <option>Night</option>
    </select>

    <select
      name="revision"
      value={form.revision}
      onChange={handleChange}
      className="border rounded-lg p-3"
    >
      <option value="">Revision Frequency</option>
      <option>Daily</option>
      <option>Weekly</option>
      <option>Rarely</option>
      <option>Never</option>
    </select>

  </div>

</div>

{/* ================= LIFESTYLE ================= */}

<div className="bg-white rounded-xl shadow-lg p-8">

  <h2 className="text-3xl font-bold text-red-700 mb-8">
    ❤️ Lifestyle & Environment
  </h2>

  <div className="grid md:grid-cols-2 gap-5">

    <select
      name="stress"
      value={form.stress}
      onChange={handleChange}
      className="border rounded-lg p-3"
    >
      <option value="">Stress Level</option>
      <option>Low</option>
      <option>Medium</option>
      <option>High</option>
    </select>

    <select
      name="exercise"
      value={form.exercise}
      onChange={handleChange}
      className="border rounded-lg p-3"
    >
      <option value="">Exercise</option>
      <option>Daily</option>
      <option>Sometimes</option>
      <option>Rarely</option>
      <option>Never</option>
    </select>

    <select
      name="parent_support"
      value={form.parent_support}
      onChange={handleChange}
      className="border rounded-lg p-3"
    >
      <option value="">Parents Support</option>
      <option>Excellent</option>
      <option>Average</option>
      <option>Poor</option>
    </select>

    <div className="bg-blue-100 rounded-lg flex items-center justify-center p-5">

      <p className="text-center text-gray-700">
        🤖 AI will analyze the student's academic profile
        and generate personalized recommendations.
      </p>

    </div>

  </div>

</div>

<div className="text-center">

  <button
    type="submit"
    className="bg-blue-700 hover:bg-blue-800 text-white text-xl font-bold px-12 py-4 rounded-xl shadow-lg"
  >

    {loading ? "Analyzing..." : "🚀 Generate AI Report"}

  </button>

</div>
{prediction && (

<div className="mt-12 space-y-8">

  {/* Score Cards */}

  <div className="grid md:grid-cols-4 gap-6">

    <div className="bg-blue-600 text-white rounded-xl p-6 shadow-lg">
      <h3 className="text-lg">Predicted Score</h3>
      <p className="text-4xl font-bold mt-3">
        {prediction.predicted_score}
      </p>
    </div>

    <div className="bg-green-600 text-white rounded-xl p-6 shadow-lg">
      <h3 className="text-lg">Grade</h3>
      <p className="text-4xl font-bold mt-3">
        {prediction.grade}
      </p>
    </div>

    <div className="bg-purple-600 text-white rounded-xl p-6 shadow-lg">
      <h3 className="text-lg">Performance</h3>
      <p className="text-2xl font-bold mt-3">
        {prediction.performance}
      </p>
    </div>

    <div className={`rounded-xl p-6 shadow-lg text-white ${
      prediction.risk === "Low"
        ? "bg-green-700"
        : prediction.risk === "Medium"
        ? "bg-yellow-500"
        : "bg-red-700"
    }`}>

      <h3 className="text-lg">Risk Level</h3>

      <p className="text-2xl font-bold mt-3">
        {prediction.risk}
      </p>

    </div>

  </div>

  {/* Final Result */}

  <div className={`rounded-xl p-8 shadow-lg ${
    prediction.result === "PASS"
      ? "bg-green-100"
      : "bg-red-100"
  }`}>

    <h2 className="text-3xl font-bold">

      {prediction.result === "PASS"
        ? "🎉 Student is likely to PASS"
        : "⚠ Student is at Risk"}

    </h2>

    <p className="mt-4 text-xl">

      Expected Score :
      <strong> {prediction.predicted_score}</strong>

    </p>

  </div>



  {/* Weaknesses */}

  <div className="bg-red-50 rounded-xl shadow-lg p-8">

    <h2 className="text-3xl font-bold text-red-700 mb-6">

      ⚠ Weak Areas

    </h2>

    <ul className=" space-y-3">

      {prediction.weaknesses.map((item:string,index:number)=>(

        <li key={index}>❌ {item}</li>

      ))}
    </ul>
  </div>

  {/* ================= RECOMMENDATIONS ================= */}

<div className="bg-blue-50 rounded-xl shadow-lg p-8">

  <h2 className="text-3xl font-bold text-blue-700 mb-6">
    💡 AI Recommendations
  </h2>

  <ul className="space-y-3">

    {prediction.recommendations.map((item: string, index: number) => (

      <li key={index}>👉 {item}</li>

    ))}

  </ul>

</div>

<div className="bg-purple-50 rounded-xl shadow-lg p-8">

  <h2 className="text-3xl font-bold text-purple-700 mb-6">
    📖 Subject-wise Performance
  </h2>

  <table className="w-full border border-gray-300">

    <thead>

      <tr className="bg-purple-200">

        <th className="border p-2">Subject</th>

        <th className="border p-2">Marks</th>

      </tr>

    </thead>

    <tbody>

      {subjects.map((item,index)=>(

        <tr key={index}>

          <td className="border p-2">{item.subject}</td>

          <td className="border p-2">{item.marks}</td>

        </tr>

      ))}

    </tbody>

  </table>

</div>
<div className="grid md:grid-cols-2 gap-8 mt-8">

<div className="bg-white rounded-xl shadow-lg p-6">

<h2 className="text-2xl font-bold mb-5">
📊 Subject Marks
</h2>

<ResponsiveContainer width="100%" height={300}>
<BarChart data={prediction.subjects}>
<CartesianGrid strokeDasharray="3 3"/>
<XAxis dataKey="subject"/>
<YAxis/>
<Tooltip/>
<Bar dataKey="marks" fill="#2563eb"/>
</BarChart>
</ResponsiveContainer>

</div>

<div className="bg-white rounded-xl shadow-lg p-6">

<h2 className="text-2xl font-bold mb-5">
🥧 Marks Distribution
</h2>

<ResponsiveContainer width="100%" height={300}>
<PieChart>

<Pie
data={pieData}
dataKey="value"
nameKey="name"
outerRadius={100}
label
>

{pieData.map((_:any,index:number)=>(
<Cell
key={index}
fill={COLORS[index%COLORS.length]}
/>
))}

</Pie>

<Tooltip/>

</PieChart>
</ResponsiveContainer>

</div>

</div>
{/* ================= STUDY PLAN ================= */}

<div className="bg-yellow-50 rounded-xl shadow-lg p-8">

  <h2 className="text-3xl font-bold text-yellow-700 mb-6">
    📅 Weekly Study Plan
  </h2>

  <table className="w-full border border-gray-300">

    <thead>

      <tr className="bg-yellow-200">

        <th className="border p-2">Day</th>

        <th className="border p-2">Task</th>

      </tr>

    </thead>

    <tbody>

      {Object.entries(prediction.study_plan).map(([day, task]) => (

        <tr key={day}>

          <td className="border p-2 font-semibold">{day}</td>

          <td className="border p-2">{String(task)}</td>

        </tr>

      ))}

    </tbody>

  </table>

</div>

</div>

)}

</form>

</div>

</div>

</Layout>

);

}

export default Predict;