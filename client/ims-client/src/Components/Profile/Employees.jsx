import React, { useState } from 'react';

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState([
    {
      id: "1",
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Manager',
      password: '********',
      isEditing: false,
    },
    {
      id: "2",
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Assistant Manager',
      password: '********',
      isEditing: false,
    },
    // Add more employees as needed
  ]);

  const [newEmployee, setNewEmployee] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
    password: "",
    isEditing: false,
  });

  const handleEdit = (index) => {
    const updatedEmployees = [...employees];
    updatedEmployees[index].isEditing = true;
    setEmployees(updatedEmployees);
  };

  const handleDelete = (index) => {
    const updatedEmployees = [...employees];
    updatedEmployees.splice(index, 1);
    setEmployees(updatedEmployees);
  };

  const handleInputChange = (e, index, field) => {
    const updatedEmployees = [...employees];
    updatedEmployees[index][field] = e.target.value;
    setEmployees(updatedEmployees);
  };

  const handleSave = (index) => {
    const updatedEmployees = [...employees];
    updatedEmployees[index].isEditing = false;
    setEmployees(updatedEmployees);
  };

  const handleAddEmployee = () => {
    setEmployees([...employees, newEmployee]);
    setNewEmployee({
      id: "",
      name: "",
      email: "",
      role: "",
      password: "",
      isEditing: false,
    });
  };

  return (
    <div className="overflow-auto h-[29em] mt-3">
      <table className="table text-center text-lg bg-base-200 font-semibold">
        <thead className='sticky top-0 text-md'>
          <tr>
            <th className='bg-base-200 rounded-2xl'>ID</th>
            <th className='bg-base-200 rounded-2xl'>Name</th>
            <th className='bg-base-200 rounded-2xl'>Email</th>
            <th className='bg-base-200 rounded-2xl'>Role</th>
            <th className='bg-base-200 rounded-2xl'>Password</th>
            <th className='bg-base-200 rounded-2xl'>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.id}</td>
              <td>
                {employee.isEditing ? (
                  <input
                    className="input input-bordered"
                    type="text"
                    value={employee.name}
                    onChange={(e) => handleInputChange(e, index, 'name')}
                  />
                ) : (
                  employee.name
                )}
              </td>
              <td>
                {employee.isEditing ? (
                  <input
                    className="input input-bordered"
                    type="text"
                    value={employee.email}
                    onChange={(e) => handleInputChange(e, index, 'email')}
                  />
                ) : (
                  employee.email
                )}
              </td>
              <td>
                {employee.isEditing ? (
                  <input
                    className="input input-bordered"
                    type="text"
                    value={employee.role}
                    onChange={(e) => handleInputChange(e, index, 'role')}
                  />
                ) : (
                  employee.role
                )}
              </td>
              <td>
                {employee.isEditing ? (
                  <input
                    className="input input-bordered"
                    type="password"
                    value={employee.password}
                    onChange={(e) => handleInputChange(e, index, 'password')}
                  />
                ) : (
                  employee.password
                )}
              </td>
              <td>
                {employee.isEditing ? (
                  <button className='btn btn-success btn-xs font-bold m-1' onClick={() => handleSave(index)}>Save</button>
                ) : (
                  <button className='btn btn-primary btn-xs font-bold m-1' onClick={() => handleEdit(index)}>Edit</button>
                )}
                <button className='btn btn-error btn-xs font-bold m-1' onClick={() => handleDelete(index)}>Fire</button>
              </td>
            </tr>
          ))}

          <tr className='sticky bottom-0'>
            <td colSpan="6">
              <button className="btn btn-md w-full text-xl bg-base-100" onClick={() => document.getElementById('add_employee_modal').showModal()}>Add Employee</button>
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
        type="text"
        placeholder="Email"
        value={newEmployee.email}
        onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
      />
      <input
      required
        className="input input-bordered m-2"
        type="text"
        placeholder="Role"
        value={newEmployee.role}
        onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
      />
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
