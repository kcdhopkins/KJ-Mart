import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { getSearchInventory } from '../../api/AccountService/account';
import './shopPage.css'
import Modal from '../../components/modal/Modal';
import AddItemToCart from '../../components/addItemToCart/AddItemToCart';

const ShopPageList: React.FC = () => {

  const { searchTerm } = useParams()
  const [inventory, setInventory] = useState<any[]>([])
  const [showModal, setShowModal] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)

  const addItemToCart = (item: any) => {
    setCurrentItem(item)
    setShowModal(true)
  }

  const inventoryList = useMemo(() => {
    return inventory.map((item, index) => {
      return (
        <div key={index} className='inventory-item shadow inventory-margin inv-card-width'>
          <div>
            <img src={item.image} alt={item.name} className='bottom-margin top-margin' />
            <p className='bottom-margin top-margin'>{item.name}</p>
            <p className='bottom-margin top-margin'>Price: {item.priceInfo.price} per {item.priceInfo.costPer}</p>
            <p className='top-margin'>Description: {item.description}</p>
          </div>
          <div className='f-container center inv-bottom'>
            <button className='button' onClick={() => addItemToCart(item)}>Add</button>
          </div>
        </div>
      )
    })
  }, [inventory])

  const setInventoryList = async () => {
    const results = await getSearchInventory(searchTerm || '')
    const { data } = results
    setInventory(data)
  }

  useEffect(() => {
    setInventoryList()
  }, [searchTerm])

  return (
    <div className='f-container flex-wrap max-inv-list-width'>
      {inventoryList}
      <div>
        {showModal && <Modal title="Add This Item To Your Cart" setShowModal={setShowModal} hideButtons={true}>
          <AddItemToCart item={currentItem} setShowModal={setShowModal} />
        </Modal>}
      </div>
    </div>
  );
};

export default ShopPageList;