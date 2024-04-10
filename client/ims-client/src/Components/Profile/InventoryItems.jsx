import React, { useEffect, useState } from 'react';
import axios from 'axios';

const rawMaterial = [
];

const InventoryItems = () => {
  const [materials, setMaterials] = useState({});
  
  useEffect(()=>{
    async function fetchItems(){
    const response = await axios.get('/api/items/fetch')
    console.log(response)
    }
  
    fetchItems(); //calling 
  },[])
  const [newMaterial, setNewMaterial] = useState({
    id: "",
    name: "",
    stockInKg: "",
  });

  const handleDelete = (index) => {
    const updatedMaterials = [...materials];
    updatedMaterials.splice(index, 1);
    setMaterials(updatedMaterials);
  };

  const handleAddMaterial = () => {
    setMaterials([...materials, newMaterial]);
    setNewMaterial({
      id: "",
      name: "",
      stockInKg: "",
    });
  };

  return (
    <div className="overflow-auto h-[29em] mt-3">
      <table className="table text-center text-lg bg-base-200 font-semibold">
        <thead className='sticky top-0 text-md'>
          <tr>
            <th className='bg-base-200 rounded-2xl'>Sr. No.</th>
            <th className='bg-base-200 rounded-2xl'>Material ID</th>
            <th className='bg-base-200 rounded-2xl'>Name</th>
            <th className='bg-base-200 rounded-2xl'>Available (in Kg)</th>
            <th className='bg-base-200 rounded-2xl'>Actions</th>
          </tr>
        </thead>
        <tbody>
          
          {materials.length > 0 ?(
          materials.map((material, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{material.id}</td>
              <td>{material.name}</td>
              <td>{material.stockInKg}</td>
              <td>
                <button className='btn btn-error btn-xs font-bold' onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))):(
            <h2> No Materials In Inventory </h2>
          )
        }
          <tr className='sticky bottom-0'>
            <td colSpan="5">
              <button className="btn btn-md w-full text-xl bg-base-100" onClick={() => document.getElementById('add_material_modal').showModal()}>Add Item</button>
            </td>
          </tr>
        </tbody>
      </table>
      <dialog id="add_material_modal" className="modal">
        <div className="modal-box flex flex-col">
          <h3 className="font-bold text-lg mb-3">Add Material</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleAddMaterial(); }}>
            <input
            required
              className="input input-bordered m-2"
              type="text"
              placeholder="Material ID"
              value={newMaterial.id}
              onChange={(e) => setNewMaterial({ ...newMaterial, id: e.target.value })}
            />
            <input
            required
              className="input input-bordered m-2"
              type="text"
              placeholder="Name"
              value={newMaterial.name}
              onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
            />
            <input
            required
              className="input input-bordered m-2"
              type="text"
              placeholder="Available (in Kg)"
              value={newMaterial.stockInKg}
              onChange={(e) => setNewMaterial({ ...newMaterial, stockInKg: e.target.value })}
            />
            <div className="modal-action">
              <button type="submit" className="btn btn-success mr-2 btn-sm">Add</button>
              <button type="button" className="btn btn-error btn-sm" onClick={() => document.getElementById('add_material_modal').close()}>Close</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default InventoryItems;
