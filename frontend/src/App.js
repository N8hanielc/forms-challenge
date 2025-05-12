
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [people, setPeople] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetch("http://localhost:3001/people")
      .then(res => res.json())
      .then(data => setPeople(data));
  }, []);

  const validateField = (name, value) => {
    if (name === "email" && !value.includes("@")) return "Invalid email address.";
    if (name === "phone" && value.length < 10) return "Phone number must be at least 10 digits.";
    if (name === "name" && value.trim() === "") return "Name is required.";
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    const errorMsg = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = Object.keys(form).reduce((acc, key) => {
      const err = validateField(key, form[key]);
      if (err) acc[key] = err;
      return acc;
    }, {});
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const res = await fetch("http://localhost:3001/people", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const saved = await res.json();
      setPeople([...people, saved]);
      setForm({ name: "", email: "", phone: "" });
    }
  };

  return (
    <div className="App">
      <h1>Form Validation</h1>
      <form onSubmit={handleSubmit} className="form">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        {errors.name && <p className="error">{errors.name}</p>}
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        {errors.email && <p className="error">{errors.email}</p>}
        <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} />
        {errors.phone && <p className="error">{errors.phone}</p>}
        <button type="submit">Add Person</button>
      </form>
      <ul>
        {people.map((p, i) => (
          <li key={i}>{p.name} - {p.email} - {p.phone}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
