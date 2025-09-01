// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const ManageUsers = () => {
//   const [students, setStudents] = useState([]);
//   const [editing, setEditing] = useState(null);
//   const [form, setForm] = useState({ name: "", email: "" });

//   const fetchStudents = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/students");
//       setStudents(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const handleEdit = (student) => {
//     setEditing(student.id);
//     setForm({ name: student.name, email: student.email });
//   };

//   const handleUpdate = async (id) => {
//     try {
//       await axios.put(`http://localhost:5000/api/students/${id}`, form);
//       setEditing(null);
//       fetchStudents();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       try {
//         await axios.delete(`http://localhost:5000/api/students/${id}`);
//         fetchStudents();
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   };

//   return (
//     <div>
//       <h2>Manage Users</h2>
//       <table border="1" width="100%">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Created At</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {students.map((s) => (
//             <tr key={s.id}>
//               <td>
//                 {editing === s.id ? (
//                   <input
//                     value={form.name}
//                     onChange={(e) => setForm({ ...form, name: e.target.value })}
//                   />
//                 ) : (
//                   s.name
//                 )}
//               </td>
//               <td>
//                 {editing === s.id ? (
//                   <input
//                     value={form.email}
//                     onChange={(e) => setForm({ ...form, email: e.target.value })}
//                   />
//                 ) : (
//                   s.email
//                 )}
//               </td>
//               <td>{new Date(s.created_at).toLocaleString()}</td>
//               <td>
//                 {editing === s.id ? (
//                   <>
//                     <button onClick={() => handleUpdate(s.id)}>Save</button>
//                     <button onClick={() => setEditing(null)}>Cancel</button>
//                   </>
//                 ) : (
//                   <>
//                     <button onClick={() => handleEdit(s)}>Edit</button>
//                     <button onClick={() => handleDelete(s.id)}>Delete</button>
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ManageUsers;



import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManageUsers.css"; // ✅ Import CSS

const ManageUsers = () => {
  const [students, setStudents] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", email: "" });

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students");
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleEdit = (student) => {
    setEditing(student.id);
    setForm({ name: student.name, email: student.email });
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/students/${id}`, form);
      setEditing(null);
      fetchStudents();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5000/api/students/${id}`);
        fetchStudents();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="manage-container">
      <h2>Manage Users</h2>
      <div className="table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td>
                  {editing === s.id ? (
                    <input
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                    />
                  ) : (
                    s.name
                  )}
                </td>
                <td>
                  {editing === s.id ? (
                    <input
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                    />
                  ) : (
                    s.email
                  )}
                </td>
                <td>{new Date(s.created_at).toLocaleString()}</td>
                <td>
                  {editing === s.id ? (
                    <>
                      <button className="btn save" onClick={() => handleUpdate(s.id)}>Save</button>
                      <button className="btn cancel" onClick={() => setEditing(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="btn edit" onClick={() => handleEdit(s)}>Edit</button>
                      <button className="btn delete" onClick={() => handleDelete(s.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
