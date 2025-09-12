// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../axiosInstance"; 
// import bgImage from "../images/loginbackground.jpg";
// import "./Login.css";

// const Login = ({ onLogin }) => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       // Send login request to backend
//       const res = await axiosInstance.post("/admin/login", {
//         username,
//         password,
//       });

//       // Save token in localStorage
//       localStorage.setItem("adminToken", res.data.token);

//       // Notify app + redirect
//       onLogin();
//       navigate("/admin/dashboard");
//     } catch (err) {
//       console.error("Login error:", err);
//       setError("Invalid username or password ⚠️⚠️");
//     }
//   };

//   return (
//     <div
//       className="login-container"
//       style={{
//         backgroundImage: `url(${bgImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div className="login-box">
//         <h2>Admin Login</h2>
//         <form onSubmit={handleLogin}>
//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="password"
//               className="form-control"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit" className="signin-btn">
//             Login
//           </button>
//         </form>
//         {error && <div className="error-text">{error}</div>}
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance"; 
import bgImage from "../images/loginbackground.jpg";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send login request to backend
      const res = await axiosInstance.post("/admin/login", {
        username,
        password,
      });

      // Save token in localStorage
      localStorage.setItem("adminToken", res.data.token);

      // Notify app + redirect
      onLogin();
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid username or password ⚠️⚠️");
    }
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="login-box">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signin-btn">
            Login
          </button>
        </form>
        {error && <div className="error-text">{error}</div>}
      </div>
    </div>
  );
};

export default Login;
