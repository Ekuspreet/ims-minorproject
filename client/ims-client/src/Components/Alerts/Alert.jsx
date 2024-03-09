import React, { useState } from 'react'
const Alert = ({ message }) => {

    const [visible, setVisible] = useState("visible")

    return (



        <div>
            <div role="alert" className={`alert ${visible}`} >
                <span></span>
                <span>{message}</span>
                <div>
                    <button className="btn btn-sm"
                        onClick={()=>setVisible("hidden")}
                    >❌</button>

                </div>
            </div>

        </div>
    )
}

export default Alert