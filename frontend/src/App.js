
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [formErrors, setFormErrors] = useState({});
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/people")
      .then(res => res.json())
      .then(data => setPeople(data))
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  const validate = (field, value) => {
    let error = "";
    if (field === "name" && !value.trim()) error = "Name is required";
    if (field === "email" && !/\S+@\S+\.\S+/.test(value)) error = "Invalid email";
    if (field === "phone" && !/^\d{10}$/.test(value)) error = "Phone must be 10 digits";
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: validate(name, value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {
      name: validate("name", formData.name),
      email: validate("email", formData.email),
      phone: validate("phone", formData.phone),
    };
    setFormErrors(errors);
    if (!Object.values(errors).some(Boolean)) {
      fetch("http://localhost:5000/api/people", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          setPeople([...people, data]);
          setFormData({ name: "", email: "", phone: "" });
        })
        .catch((err) => console.error("Error posting data:", err));
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit} className="form-container">
        <label>Name</label>
        <input name="name" value={formData.name} onChange={handleChange} />
        {formErrors.name && <span className="error">{formErrors.name}</span>}

        <label>Email</label>
        <input name="email" value={formData.email} onChange={handleChange} />
        {formErrors.email && <span className="error">{formErrors.email}</span>}

        <label>Phone</label>
        <input name="phone" value={formData.phone} onChange={handleChange} />
        {formErrors.phone && <span className="error">{formErrors.phone}</span>}

        <button type="submit">Add</button>
      </form>

      <ul>
        {people.map((person, index) => (
          <li key={index}>{person.name} ({person.email}, {person.phone})</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
