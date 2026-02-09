import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [students, setStudents] = useState([]);

  // fetch data
  const getStudents = async () => {
    const res = await axios.get("http://localhost:5000/students");
    setStudents(res.data);
  };

  // add data
  const addStudent = async () => {
    await axios.post("http://localhost:5000/add", {
      name,
      course
    });
    getStudents();
    setName("");
    setCourse("");
  };

  // delete data
  const deleteStudent = async (id) => {
    await axios.delete(`http://localhost:5000/delete/${id}`);
    getStudents();
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <>
      <h2>Frontend ↔️ Backend Connectivity</h2>

      <input
        placeholder="Enter Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        placeholder=" enter Course"
        value={course}
        onChange={e => setCourse(e.target.value)}
      />

      <button onClick={addStudent}>Add</button>

      <hr />

      {students.map(s => (
        <div key={s._id}>
          {s.name} - {s.course}
          <button onClick={() => deleteStudent(s._id)}>Delete</button>
        </div>
      ))}
    </>
  );
}

export default App;