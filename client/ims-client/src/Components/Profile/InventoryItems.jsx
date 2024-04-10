import React, { useEffect, useState } from 'react';
import axios from 'axios';

const rawMaterial = [
];

const InventoryItems = () => {
  const [materials, setMaterials] = useState({});
  const [fetch, triggerFetch] = useState(true)

  useEffect(()=>{
    async function fetchItems(){
    const response = await axios.get('/api/item/fetch')
    console.log(response)
    setMaterials(response.data.items_list)
    }
    if(fetch){
    fetchItems(); //calling 
      triggerFetch(false)
  }
  },[materials])
  const [newMaterial, setNewMaterial] = useState({
    
    name: "",
    current_stock: "",
    threshold_stock: "",
  });

  const handleDelete = async (index) => {
    const updatedMaterials = [...materials];
    updatedMaterials.splice(index, 1);
    const response = await axios.post(`/api/item/delete`, {item_id : materials[index].item_id})
    console.log(response)
      if (response) {
    triggerFetch(true);
    setMaterials(updatedMaterials);
  }
  };

   const handleAddMaterial = async () => {
    const response = await axios.post('/api/item/add', newMaterial)
    console.log(response)
    if(response.status == "200") {
    setMaterials([...materials, newMaterial]);
      triggerFetch(true)
  }
    setNewMaterial({
      name: "",
      current_stock: "",
      threshold_stock: "",
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
              <td>{material.item_id}</td>
              <td>{material.name}</td>
              <td>{material.current_stock}</td>
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
          <form 
          onSubmit={(e) => { e.preventDefault(); handleAddMaterial(); }}
          className='flex flex-col'
          >
           
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
              type="number"
              placeholder="Available (in Kg)"
              value={newMaterial.current_stock}
              onChange={(e) => setNewMaterial({ ...newMaterial, current_stock: e.target.value })}
            />
            <input
            required
              className="input input-bordered m-2"
              type="number"
              placeholder="Threshold (in Kg)"
              value={newMaterial.threshold_stock}
              onChange={(e) => setNewMaterial({ ...newMaterial, threshold_stock: e.target.value })}
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
