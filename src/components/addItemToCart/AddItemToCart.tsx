import React, { useEffect, useMemo, useRef, useState } from "react";
import './addItemToCart.css'
type AddItemToCartTypes = {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    item: any
}

const AddItemToCart: React.FC<AddItemToCartTypes> = ({ setShowModal, item }) => {

    const quantity = useMemo(() => [...Array(item.stock).keys()], [item.stock]);
    const [itemQuantity, setItemQuantity] = useState(1)
    const [itemPrice, setItemPrice] = useState("0.00")

    const setPrice = () => {
        if(item.priceInfo.costPer === "item"){
            const price = (item.priceInfo.price * itemQuantity).toFixed(2)
            setItemPrice(price)
            return
        }
        const [weight] = item.weight.split(" ")
        const price = (item.priceInfo.price * (weight * itemQuantity)).toFixed(2)
        setItemPrice(price)
    }

    useEffect( ()=>{
        setPrice()
    }, [itemQuantity])

    return (
        <>
            <div>
                <div className="f-container space-between">
                    <div>
                        <img src={item.image} alt={item.name} className='bottom-margin top-margin' />
                    </div>
                    <div>
                        <label className="f-container space-between">
                            <p className='bottom-margin top-margin'><b>Name:</b></p>
                            <p className='bottom-margin top-margin'>{item.name}</p>
                        </label>
                        <label className="f-container space-between">
                            <p className='bottom-margin top-margin'><b>Price:</b></p>
                            <p className='bottom-margin top-margin'>{item.priceInfo.price} per {item.priceInfo.costPer}</p>
                        </label>
                        <label className="f-container space-between">
                            <p className='bottom-margin top-margin'><b>Description:</b> </p>
                            <p className='bottom-margin top-margin'>{item.description}</p>
                        </label><label className="f-container space-between">
                            <p className='bottom-margin top-margin'><b>Total:</b> </p>
                            <p className='bottom-margin top-margin'>{`$${itemPrice}`}</p>
                        </label>
                        <div className="f-container space-between top-margin">
                            <p><b>Quantity:</b></p>
                            <select value={itemQuantity} className="select" onChange={(el)=> setItemQuantity(parseInt(el.target.value))}>
                                {quantity.map((item, index) => {
                                    return (
                                        <option key={"quantity-"+index} value={item + 1}>{item + 1}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                </div>
                <div>
                    <hr />
                    <div className="f-container center ">
                        <button className="button">Add to Cart</button>
                        <button className="button" onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddItemToCart;