import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeDetails = ({role}) => {
  const [employees, setEmployees] = useState([]);
  const [fetch, triggerFetch] = useState(true);
  const [editedEmployee, setEditedEmployee] = useState(null); // New state variable to store edited employee

  useEffect(() => {
    async function fetchEmployees() {
      const response = await axios.get('/api/business/fetch_employees');
      console.log(response);
      setEmployees(response.data.employee_list);
    }
    if (fetch) {
      fetchEmployees();
      triggerFetch(false);
    }
  }, [fetch]);

  const handleEdit = (index) => {
    setEditedEmployee({ ...employees[index] }); // Set the editedEmployee when editing starts
    const updatedEmployees = [...employees];
    updatedEmployees[index].isEditing = true;
    setEmployees(updatedEmployees);
  };

  const handleDelete = async (index) => {
    const updatedEmployees = [...employees];
    updatedEmployees.splice(index, 1);
    const response = await axios.post('/api/user/remove', { employee_id: employees[index].employee_id });
    if (response.status === '200') {
      triggerFetch(true);
      setEmployees(updatedEmployees);
    }
  };

  const handleInputChange = (e, field) => {
    setEditedEmployee({ ...editedEmployee, [field]: e.target.value }); // Update editedEmployee state
  };

  const handleSave = async () => {
    const updatedEmployees = [...employees];
    const index = updatedEmployees.findIndex(emp => emp.employee_id === editedEmployee.employee_id);
    updatedEmployees[index] = { ...editedEmployee, isEditing: false }; // Update employee in the array
    const response = await axios.post('/api/user/edit_details', editedEmployee)
    if (response.status == "200") {
      triggerFetch(true)
      setEmployees(updatedEmployees);
      setEditedEmployee(null); // Reset editedEmployee after saving

    }
  };

  const handleAddEmployee = async () => {
    const response = await axios.post('/api/user/add_employee', newEmployee);
    console.log(response)
    if (response.status == '200') {
      triggerFetch(true);
      setEmployees([...employees, newEmployee])
    }
    setNewEmployee({
      id: '',
      name: '',
      email: '',
      role: '',
      password: '',
      isEditing: false,
    });
  };

  const [newEmployee, setNewEmployee] = useState({
    id: '',
    name: '',
    email: '',
    role: '',
    password: '',
    isEditing: false,
  });

  return (
    <div className="overflow-auto h-[29em] mt-3">
      <table className="table text-center text-lg bg-base-200 font-semibold">
        <thead className='sticky top-0 text-md'>
          <tr>
            <th className='bg-base-200 rounded-2xl'>ID</th>
            <th className='bg-base-200 rounded-2xl'>Name</th>
            <th className='bg-base-200 rounded-2xl'>Email</th>
            <th className='bg-base-200 rounded-2xl'>Role</th>
          {role == "admin" &&  <th className='bg-base-200 rounded-2xl'>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.employee_id}</td>
              <td>
                {employee.isEditing ? (
                  <input
                    className="input input-bordered"
                    type="text"
                    value={editedEmployee ? editedEmployee.name : ''}
                    onChange={(e) => handleInputChange(e, 'name')}
                  />
                ) : (
                  employee.name
                )}
              </td>
              <td>
                {employee.isEditing ? (
                  <input
                    className="input input-bordered"
                    type="email"
                    value={editedEmployee ? editedEmployee.email : ''}
                    onChange={(e) => handleInputChange(e, 'email')}
                  />
                ) : (
                  employee.email
                )}
              </td>
              <td>
                {employee.isEditing ? (
                  <select
                    className="select select-bordered"
                    value={editedEmployee ? editedEmployee.role : ''}
                    onChange={(e) => handleInputChange(e, 'role')}
                  >
                    <option disabled value="">Select Role</option>
                    <option value="admin">admin</option>
                    <option value="employee">employee</option>
                  </select>
                ) : (
                  employee.role
                )}
              </td>
              <td>
                {role == "admin" && employee.role !== "admin" && (
                  employee.isEditing ? (
                    <button className='btn btn-success btn-xs font-bold m-1' onClick={() => handleSave(index)}>Save</button>
                  ) : (
                    <button className='btn btn-primary btn-xs font-bold m-1' onClick={() => handleEdit(index)}>Edit</button>
                  )
                )}
                {role == "admin" && employee.role !== "admin" && (
                  <button className='btn btn-error btn-xs font-bold m-1' onClick={() => handleDelete(index)}>Fire</button>
                )}
              </td>
            </tr>
          ))}

          <tr className='sticky bottom-0'>
            <td colSpan="6">
             {role == "admin" && <button className="btn btn-md w-full text-xl bg-base-100" onClick={() => document.getElementById('add_employee_modal').showModal()}>Add Employee</button>}
            </td>
          </tr>
        </tbody>
      </table>
      <dialog id="add_employee_modal" className="modal">
        <div className="modal-box flex flex-col">
          <h3 className="font-bold text-lg mb-3">Add Employee</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleAddEmployee(); }}>
            <input
              required
              className="input input-bordered m-2"
              type="text"
              placeholder="Name"
              value={newEmployee.name}
              onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
            />
            <input
              required
              className="input input-bordered m-2"
              type="email"
              placeholder="Email"
              value={newEmployee.email}
              onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
            />
            <select
              required
              className="select select-bordered m-2"
              type="text"
              value={newEmployee.role}
              onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
            >
              <option disabled className='text-white' value="">Select Role</option>
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
            <input
              className="input input-bordered m-2"
              type="password"
              placeholder="Password"
              value={newEmployee.password}
              onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
            />
            <div className="modal-action">
              <button type="submit" className="btn btn-success btn-sm mr-2">Add</button>
              <button type="button" className="btn btn-error btn-sm" onClick={() => document.getElementById('add_employee_modal').close()}>Close</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default EmployeeDetails;
