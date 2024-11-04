import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import bale from './bale.jpg'

const styles = {
  container: "relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gray-900 animate-[pageEnter_0.6s_ease-out]",
  backgroundImage: "absolute inset-0 w-full h-full object-cover blur-sm opacity-50 transition-opacity duration-700",
  overlay: "absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/90",
  titleContainer: "relative z-20 mb-12 text-center animate-[fadeIn_1s_ease-out]",
  title: "text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-300 to-blue-500",
  titleUnderline: "h-1 w-32 mx-auto bg-gradient-to-r from-green-400 via-teal-300 to-blue-500 rounded-full",
  formContainer: "relative z-10 bg-gray-800/90 p-8 rounded-lg shadow-2xl max-w-md w-full backdrop-blur-sm animate-[slideUp_1s_ease-out]",
  input: "w-full p-3 rounded bg-gray-700/50 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 hover:bg-gray-700/70",
  inputError: "ring-2 ring-red-500",
  button: "w-full py-3 rounded bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-500 transition-all duration-300",
  errorText: "text-red-400 text-sm mt-1",
  memberText: "text-gray-400 text-center mt-6",
  memberLink: "text-teal-400 hover:text-teal-300 transition-colors duration-300 font-semibold"
};

const Createaccount = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false
  });
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const getFieldError = (field) => {
    if (touched[field]) {
      if (field === 'name' && formData.name === '') {
        return 'Name is required';
      }
      if (field === 'email') {
        if (formData.email === '') {
          return 'Email is required';
        }
        if (!emailRegex.test(formData.email)) {
          return 'Invalid email format';
        }
      }
      if (field === 'password') {
        if (formData.password === '') {
          return 'Password is required';
        }
      }
      if (field === 'confirmPassword') {
        if (formData.confirmPassword === '') {
          return 'Please confirm your password';
        } 
        if (formData.password !== formData.confirmPassword) {
          return 'Passwords do not match';
        }
      }
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all fields as touched on submit
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true
    });

    const hasErrors = ['name', 'email', 'password', 'confirmPassword']
      .some(field => getFieldError(field) !== '');

    if (!hasErrors) {
      console.log("Form submitted:", formData);
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
      navigate('/flims');
    } else {
      console.log("Form has errors");
    }
  };

  return (
    <div className={styles.container}>
      <div className="absolute inset-0">
        <img
          src={bale}
          alt="Background"
          className={styles.backgroundImage}
        />
      </div>

      <div className={styles.overlay}></div>

      <div className={styles.titleContainer}>
        <h1 className={styles.title}>
          Join the Club
        </h1>
        <div className={styles.titleUnderline}></div>
      </div>

      <div className={styles.formContainer}>
        <h2 className="text-2xl font-bold text-center text-white mb-8">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur} // Add onBlur handler
              placeholder="Enter your name"
              className={`${styles.input} ${getFieldError('name') ? styles.inputError : ''}`}
            />
            {getFieldError('name') && (
              <p className={styles.errorText}>{getFieldError('name')}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-300 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur} // Add onBlur handler
              placeholder="Enter your email"
              className={`${styles.input} ${getFieldError('email') ? styles.inputError : ''}`}
            />
            {getFieldError('email') && (
              <p className={styles.errorText}>{getFieldError('email')}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-300 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur} // Add onBlur handler
              placeholder="Enter your password"
              className={`${styles.input} ${getFieldError('password') ? styles.inputError : ''}`}
            />
            {getFieldError('password') && (
              <p className={styles.errorText}>{getFieldError('password')}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-300 mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur} // Add onBlur handler
              placeholder="Confirm your password"
              className={`${styles.input} ${getFieldError('confirmPassword') ? styles.inputError : ''}`}
            />
            {getFieldError('confirmPassword') && (
              <p className={styles.errorText}>{getFieldError('confirmPassword')}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className={styles.button}
            >
              Create Account
            </button>
          </div>
        </form>

        <div>
          <p className={styles.memberText}>
            Already a member?{' '}
            <Link to="/signin" className={styles.memberLink}>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Createaccount;
