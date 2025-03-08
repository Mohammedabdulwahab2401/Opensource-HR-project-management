import { useState } from "react";
import supabase from "./supabaseclient"; // ✅ Corrected import path

const AddEmployee = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("employees").insert([{ name, role }]);

    if (error) {
      console.error("Error adding employee:", error);
    } else {
      alert("Employee added successfully!");
      setName("");
      setRole("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Employee</h2>
      <input 
        type="text" 
        placeholder="Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required 
      />
      <input 
        type="text" 
        placeholder="Role" 
        value={role} 
        onChange={(e) => setRole(e.target.value)} 
        required 
      />
      <button type="submit">Add Employee</button>
    </form>
  );
};

export default AddEmployee;
