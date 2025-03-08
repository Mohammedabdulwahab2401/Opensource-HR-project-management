import { useState } from "react";
import { auth, signInWithGoogle } from "../config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../App.css"; 

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created successfully!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/dashboard"); // Redirect to dashboard after login
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">{isSignup ? "Create an Account" : "Sign In"}</h2>

        <form onSubmit={handleAuth}>
          <input type="email" placeholder="Email" className="input-field" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" className="input-field" required value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="auth-btn">{isSignup ? "Sign Up" : "Login"}</button>
        </form>

        <p className="toggle-text">
          {isSignup ? "Already have an account?" : "Don't have an account?"}  
          <span className="toggle-link" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? " Login" : " Sign Up"}
          </span>
        </p>

        <button onClick={handleGoogleLogin} className="google-btn">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google Icon" className="google-icon"/>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
