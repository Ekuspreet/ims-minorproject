import React, { useState } from 'react';

const Recipes = () => {
  const [recipes, setRecipes] = useState([
    {
      recipeName: "Copper Wire",
      recipeId: "RW1",
      recipe: []
    },
    {
      recipeName: "Copper Coil",
      recipeId: "CC1",
      recipe: [
        { name: "Copper", itemId: "12", quantityRequired: 10 },
        { name: "Insulation", itemId: "25", quantityRequired: 5 },
      ]
    },
    // Add other recipes as needed
  ]);

  const [newRecipeName, setNewRecipeName] = useState('');
  const [newItem, setNewItem] = useState({
    name: '',
    itemId: '',
    quantityRequired: ''
  });

  const handleNewRecipeNameChange = (e) => {
    setNewRecipeName(e.target.value);
  };

  const handleNewItemChange = (e, field) => {
    setNewItem({ ...newItem, [field]: e.target.value });
  };

  const handleAddRecipe = () => {
    if (newRecipeName.trim() !== '') {
      const newRecipe = {
        recipeName: newRecipeName.trim(),
        recipeId: `R${recipes.length + 1}`,
        recipe: []
      };
      setRecipes([...recipes, newRecipe]);
      setNewRecipeName('');
    }
  };

  const handleDeleteRecipe = (recipeIndex) => {
    const updatedRecipes = recipes.filter((_, index) => index !== recipeIndex);
    setRecipes(updatedRecipes);
  };

  const handleAddItem = (recipeIndex) => {
    const updatedRecipes = [...recipes];
    updatedRecipes[recipeIndex].recipe.push(newItem);
    setRecipes(updatedRecipes);
    setNewItem({
      name: '',
      itemId: '',
      quantityRequired: ''
    });
  };

  const handleDeleteItem = (recipeIndex, itemIndex) => {
    const updatedRecipes = [...recipes];
    updatedRecipes[recipeIndex].recipe.splice(itemIndex, 1);
    setRecipes(updatedRecipes);
  };

  return (
    <>
      <div className="overflow-auto h-[29em] mt-3 ">
        <table className="table text-center text-lg bg-base-200 font-semibold rounded-xl ">
          { recipes.length > 0 ?
          recipes.map((recipe, recipeIndex) => (
            <div key={recipeIndex} className="collapse  collapse-arrow bg-base-200">
              <input type="checkbox" className='z-10' />
              <div className="collapse-title text-xl font-medium">
                <tr>
                  <td>ID: {recipe.recipeId}</td>
                  <td>{recipe.recipeName}</td>
                </tr>
              </div>
              <div className="collapse-content">
                <table className="table text-center text-lg bg-base-200 font-semibold ">
                  {/* Table Header */}
                  <thead className=' sticky top-0 text-md'>
                    <tr >
                      <th className='bg-base-200 rounded-2xl'>Sr. No.</th>
                      <th className='bg-base-200 rounded-2xl'>Material ID</th>
                      <th className='bg-base-200 rounded-2xl'>Name</th>
                      <th className='bg-base-200 rounded-2xl'>Required (in Kg)</th>
                      <th className='bg-base-200 rounded-2xl'>Actions</th>
                    </tr>
                  </thead>
                  {/* Table Body */}
                  <tbody>
                    {recipe.recipe.map((material, itemIndex) => (
                      <tr key={itemIndex}>
                        <td>{itemIndex + 1}</td>
                        <td>{material.itemId}</td>
                        <td>{material.name}</td>
                        <td>{material.quantityRequired}</td>
                        <td>
                          <button className='btn btn-error btn-xs font-bold' onClick={() => handleDeleteItem(recipeIndex, itemIndex)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                    {/* Row for adding a new item */}
                    <tr className='sticky bottom-0'>
                      <td colSpan="5">
                        <button className="btn my-1 btn-md w-full text-xl bg-base-100" onClick={() => document.getElementById(`add_item_modal_${recipeIndex}`).showModal()}>Add Item</button>
                        <button className="btn my-1 btn-md btn-error w-full  text-xl" onClick={() => handleDeleteRecipe(recipeIndex)}>Delete Recipe</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )):
          <h2 className='m-4'>No Recipes Exist In Your Business</h2>
          }
          {/* Button for adding a new recipe */}
          <tr className='sticky bottom-0 bg-base-200 rounded-xl'>
            <td className='flex justify-center gap-5'>
              <input
                className="input input-bordered"
                type="text"
                placeholder="Enter New Recipe Name"
                value={newRecipeName}
                onChange={handleNewRecipeNameChange}
              />
              <button className="btn btn-md w-auto text-xl bg-base-100" onClick={handleAddRecipe}>Add A New Recipe</button>
            </td>
          </tr>
        </table>
      </div>
      {/* Modals for adding items to each recipe */}
      {recipes.map((recipe, recipeIndex) => (
        <dialog key={recipeIndex} id={`add_item_modal_${recipeIndex}`} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add Item to {recipe.recipeName}</h3>
            <form onSubmit={(e) => { e.preventDefault();  }}>
              <input
                className="input input-bordered"
                type="text"
                placeholder="Name"
                value={newItem.name}
                onChange={(e) => handleNewItemChange(e, 'name')}
              />
              <input
                className="input input-bordered"
                type="text"
                placeholder="Material ID"
                value={newItem.itemId}
                onChange={(e) => handleNewItemChange(e, 'itemId')}
              />
              <input
                className="input input-bordered"
                type="text"
                placeholder="Required Quantity"
                value={newItem.quantityRequired}
                onChange={(e) => handleNewItemChange(e, 'quantityRequired')}
              />
              <div className="modal-action">
                <button type="submit" className='btn' onClick={() => handleAddItem(recipeIndex)}>Add</button>
                <button className="btn btn-error" onClick={() => document.getElementById(`add_item_modal_${recipeIndex}`).close()}>Close</button>
              </div>
            </form>
          </div>
        </dialog>
      ))}
    </>
  );
};

export default Recipes;
