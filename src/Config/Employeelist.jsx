import { useState, useEffect } from "react";
import supabase from "./supabaseclient"; // ✅ Corrected import

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const { data, error } = await supabase.from("employees").select("*");
      if (error) {
        console.error("Error fetching employees:", error);
      } else {
        setEmployees(data);
      }
    };
    fetchEmployees();
  }, []);

  return (
    <div>
      <h2>Employee List</h2>
      <ul>
        {employees.length > 0 ? (
          employees.map((emp) => (
            <li key={emp.id}>
              {emp.name} - {emp.role}
            </li>
          ))
        ) : (
          <p>No employees found.</p>
        )}
      </ul>
    </div>
  );
};

export default EmployeeList;
