import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../contexts/userContext';

const Cards = ({ inventoryData, totalAmount, availableProducts, unAvailableProducts, totalWorth, totalWorthOfavailableProducts }) => {
    const nav = useNavigate()
    const [userDetails, setuserDetails]= useContext(userContext)
    return (
        <div>
            <div className='admin_cards_div px-2'>
                <div className="card shadow2 bg-white">
                    <div className='tiny text-success'>
                        Available products
                    </div>
                    <div className='my-2 fw-'>
                        {totalAmount}
                    </div>
                    <div className='small text-success fw-bold'>
                        ₦ {totalWorth?.toLocaleString()}.00
                    </div>
                </div>


                <div className="card shadow2 bg-white">
                    <div className='tiny text-success'>
                        Total Sales
                    </div>
                    <div className='my-2 fw-'>
                        {inventoryData?.sold ? inventoryData?.sold : '0'}
                    </div>
                    <div className='small text-success fw-bold'>
                        ₦ {inventoryData?.salesTotal ? inventoryData?.salesTotal?.toLocaleString() : '0'}.00
                    </div>
                </div>



                <div className="card shadow2 bg-white">
                    <div className='tiny text-success'>
                        Products in Stock
                    </div>
                    <div className='my-2 fw-'>
                        {availableProducts}
                    </div>
                    <button className={ `small btn-sm tiny fw-bold btn btn-outline-success`}
                      style={{width:'60px'}}
                        onClick={()=> nav(`/add-stock/${userDetails.inventoryID}`)}
                    >
                        ADD
                    </button>
                </div>



                <div className="card shadow2 bg-white">
                    <div className='tiny text-success'>
                        Out of Stock
                    </div>
                    <div className='my-2 fw-'>
                        {unAvailableProducts}
                    </div>
                    <button className={unAvailableProducts < 1 ? `small text-secondary btn-sm tiny fw-bold btn btn-outline-secondary` : `small btn-sm tiny fw-bold btn btn-outline-success`}
                        disabled={unAvailableProducts < 1}
                      style={{width:'60px'}}
                        onClick={()=> nav(`/all-unavailable-stock/${userDetails.id}`)}
                    >
                        REFILL
                    </button>
                </div>





            </div>
        </div >
    );
};

export default Cards;