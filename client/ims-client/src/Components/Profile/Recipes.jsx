import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeItems from './RecipeItems';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [fetch, triggerFetch] = useState(true)
  const [newRecipe, setNewRecipe] = useState({});
 


  useEffect(() => {
    async function fetchItems() {
      const response = await axios.get('/api/product/fetch')
      console.log(response.data)
      setRecipes(response.data.product_list)
    }
    if (fetch) {
      fetchItems();
      triggerFetch(false)
    }
  }, [recipes])

  const handleNewRecipeChange = (e) => {
    setNewRecipe({ ...newRecipe, [e.target.name]: e.target.value });
  };


  const handleAddRecipe = async () => {
    console.log(newRecipe)

    const response = await axios.post("/api/product/add", newRecipe)
    console.log(response)
    if (response.status == "200") {

      triggerFetch(true)
      setRecipes([...recipes, newRecipe]);
      setNewRecipe('');

    }
  };

  const handleDeleteRecipe = async (recipeIndex,recipe_id) => {
    const response = await axios.post('/api/product/remove', {product_id : recipe_id})
    if(response.status == "200"){
    triggerFetch(true)
    const updatedRecipes = recipes.filter((_, index) => index !== recipeIndex);
    setRecipes(updatedRecipes);}
  };


  const handleDeleteItem = (recipeIndex, itemIndex) => {
    const updatedRecipes = [...recipes];
    updatedRecipes[recipeIndex].recipe.splice(itemIndex, 1);
    setRecipes(updatedRecipes);
  };

  return (
    <>
      <div className="overflow-auto h-[29em] mt-3 ">
        <table className=" table text-center text-lg bg-base-200 font-semibold rounded-xl ">
          {recipes.length > 0 ?
            recipes.map((recipe, recipeIndex) => (
              <div className='flex '>
                <div className='flex-grow'>
                  <div key={recipeIndex} className="collapse  collapse-arrow bg-base-200">
                    <input type="checkbox" className='z-10' />

                    <div className="collapse-title text-xl font-medium">
                      <tr className='flex items-center justify-between'>
                        <div>ID: {recipe.product_id} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span>{recipe.name}  &nbsp; <span className='border z-20 p-1 px-3 rounded-lg border-neutral-content'> {recipe.batch_size} Kg</span>
                        </span>
                        </div>



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
                          <RecipeItems recipe_id={recipe.product_id} recipeIndex={recipeIndex} recipe_name={recipe.name} />
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <button className="btn btn-sm  btn-error text-xl mt-4 mr-2" onClick={() => handleDeleteRecipe(recipeIndex,recipe.product_id)}>Delete</button>
              </div>


            )) :
            <h2 className='m-4'>No Recipes Exist In Your Business</h2>
          }
          {/* Button for adding a new recipe */}

          <tr className='sticky bottom-0 bg-base-200 rounded-xl'>
            <td >
              <form
              className='flex flex-wrap justify-center gap-5 z-20'
              onSubmit={(e)=>{e.preventDefault(); handleAddRecipe();}}>
              <input
                className="input input-bordered"
                type="text"
                name="name"
                required
                placeholder="Enter New Recipe Name"
                value={newRecipe.name}
                onChange={handleNewRecipeChange}
              />
              <input
                className="input input-bordered"
                type="number"
                name="batch_size"
                min={1}
                required
                placeholder="Enter The Batch Size"
                value={newRecipe.batch_size}
                onChange={handleNewRecipeChange}
              />
              <input type='submit' className="btn btn-md w-auto text-xl bg-base-100" value = "Add A New Recipe"/>
              </form>
            </td>
          </tr>
        </table>
      </div>
      {/* Modals for adding items to each recipe */}

    </>
  );
};

export default Recipes;
