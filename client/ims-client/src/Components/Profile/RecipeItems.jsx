import axios from 'axios'
import React, { useEffect, useState } from 'react'

const RecipeItems = ({ recipe_id, recipeIndex, recipe_name }) => {
    const [recipeItems, setRecipeItems] = useState([])
    const [fetch, triggerFetch] = useState(true)
    const [remaining, setRemaining] = useState([])
    const [newItem, setNewItem] = useState({
        name: '',
        item_id: '',
        quantity_required: ''
    });
    async function fetchRemainingItems(product_id){
        console.log(product_id)
        const response = await axios.post('/api/product/fetch-remaining-items', {product_id : product_id})
        if(response.status == "200"){
            setRemaining(response.data.remaining_items)
        }
        console.log(response)
    
      }
    
    const handleNewItemChange = (e) => {
        setNewItem({ ...newItem, [e.target.name]: e.target.value });
    };

    async function handleAddItem (recipeIndex,product_id) {
        const response = await axios.post('/api/product/add_item', {
            product_id : product_id,
            ...newItem
        })
        console.log(response)
        if(response.status == "200"){
        triggerFetch(true)
        
        setRecipeItems([...recipeItems, newItem]);
          
        setNewItem({});}

    };
    async function handleDeleteItem(product_id, item_id){
        const response = await axios.post('/api/product/remove_item', {
            product_id : product_id,
            item_id : item_id
        })
        console.log(response)
        if(response.status == "200"){
            triggerFetch(true)
            fetchRemainingItems(product_id);
            setRecipeItems([...recipeItems]);
              
            setNewItem({});}
    
    }
    useEffect(() => {

        async function fetchRecipeItems() {
            console.log({ product_id: recipe_id })
            const response = await axios.post("/api/product/fetch-items", { product_id: recipe_id })

            console.log(response)

            if (response.status == "200") {
                    setRecipeItems(response.data.item_list)
            }
        }
        if(fetch){
        fetchRecipeItems()
            triggerFetch(false)
    }
    }, [fetch]);
    return (
        <>
            {
                recipeItems.map((material, itemIndex) => (

                    <tr key={itemIndex}>
                        <td>{itemIndex + 1}</td>
                        <td>{material.item_id}</td>
                        <td>{material.name}</td>
                        <td>{material.quantity}</td>
                        <td>
                            <button className='btn btn-error btn-xs font-bold' onClick={() => handleDeleteItem(recipe_id, material.item_id)}>Delete</button>
                        </td>

                    </tr>
                ))}
            <tr>

                <td colSpan="5">
                    <button className="btn my-1 btn-md w-full text-xl bg-base-100" onClick={() => {fetchRemainingItems(recipe_id); document.getElementById(`add_item_modal_${recipeIndex}`).showModal()}}>Add Item</button>

                </td>

            </tr >
            <dialog key={recipeIndex} id={`add_item_modal_${recipeIndex}`} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4">Add Item to {recipe_name}</h3>
                    <form onSubmit={(e) => { e.preventDefault(); }}
                        className='flex flex-col gap-2 z-20'
                    >
                        
                        <select
                            className="select select-bordered"
                            type="text"
                            placeholder="Material ID"
                            name="item_id"
                            value={newItem.item_id}
                            onChange={(e) => handleNewItemChange(e)}
                        >
                            <option value="" disabled> Choose Item </option>
                        {
                            remaining.map(item=>(
                                <option value= {item.item_id}>{item.name}</option>
                            ))
                        }
                        </select>
                        <input
                            className="input input-bordered"
                            type="number"
                            placeholder="Required Quantity"
                            value={newItem.quantity}
                            name="quantity"
                            onChange={(e) => handleNewItemChange(e)}
                        />
                        <div className="modal-action">
                            <button type="submit" className='btn' onClick={() => {handleAddItem(recipeIndex,recipe_id);
                            document.getElementById(`add_item_modal_${recipeIndex}`).close()
                            }}>Add</button>
                            <button className="btn btn-error" onClick={() => document.getElementById(`add_item_modal_${recipeIndex}`).close()}>Close</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    )



}

export default RecipeItems