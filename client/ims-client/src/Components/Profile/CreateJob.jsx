import React, { useEffect, useState } from 'react';
import axios from 'axios';
const CreateJob = () => {
    const [step, setStep] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [recipes, setRecipes] = useState([])

    
            async function fetchProducts(){        
            const response = await axios.get('/api/product/fetch');
            console.log(response)
            if(response.status == '200'){
                setRecipes(response.data.product_list);
            }
        }
       

    const handleNextStep = async () => {
        if (step === 1) {
            // Validate step 1 data if needed
            // Proceed to step 2
            setStep(step + 1);
        } else if (step === 2) {
           
            console.log('Selected Product:', selectedProduct);
            console.log('Quantity:', quantity);
            const response = await axios.post('/api/job/create', {
                product_id : selectedProduct ,
                quantity : quantity
            })
            console.log(response)
            if(response.status == "200"){
                alert("Job Added Successfully");
                window.location.reload();
            }
            
        }
    };

    const handleBackStep = () => {
        // Go back to step 1
        setStep(step - 1);
    };

    return (
        <>
        <button className='btn btn-primary btn-outline text-md' 
            onClick={()=>{fetchProducts(); document.getElementById('create_job').showModal();}}
            > Create A New Job </button>

            <dialog id="create_job" className="modal">
                <div className="modal-box flex flex-col items-center justify-center">
                    <h3 className="font-bold text-lg mb-4">Let's Create A Job!</h3>
                    <div className="steps mb-4">
                        <ul className='flex'>
                            <li className={step >= 1 ? "step step-primary" : "step"}>Product</li>
                            <li className={step === 2 ? "step step-primary" : "step"}>Quantity</li>
                        </ul>
                    </div>
                    {step === 1 && (
                        <>
                            <h1 className="mb-2">Choose a product</h1>
                            <select
                                value={selectedProduct}
                                onChange={(e) => setSelectedProduct(e.target.value)}
                                className="mb-2 input input-bordered"
                                
                            >
                                <option value="" disabled>Select Product</option>
                                {
                                    recipes.map(recipe=>(
                                        <option value={recipe.product_id} >{recipe.name}</option>
                                    ))
                                }
                                
                            </select>
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <p className="mb-2">Step 2: Enter Quantity</p>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="mb-2 input input-bordered"
                            />
                            
                        </>
                    )}
                    <div className="modal-action">
                        {step === 1 && (
                            <button onClick={handleNextStep} className="btn btn-sm">Next</button>
                        )}
                        {step === 2 && (
                            <>
                            <button onClick={handleNextStep} className="btn btn-sm">Submit</button>
                            <button onClick={handleBackStep} className="btn btn-sm btn-secondary">Back</button>
                            </>
                        )}
                        <button className="btn btn-sm" onClick={() => document.getElementById('create_job').close()}>Close</button>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default CreateJob;
