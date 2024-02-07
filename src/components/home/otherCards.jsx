import React from 'react';
import { useNavigate } from 'react-router-dom';

function OtherCards({ inventoryData }) {

    const nav = useNavigate()
    return (
        <div className='m4-2 mx-2 bg-white py-4 px-2 grid-other-cards'>
            <div className="card shadow2 bg-white rounded overflow-hidden my-3">
                <center>
                    <div className='tiny text-white bg-custom p-2 '>
                        Sales rep.
                    </div>
                    <div className="p-2">
                        <div className='my-2 fw-'>
                            {inventoryData?.salesRep?.length}

                        </div>
                        <button className={`small btn-sm tiny fw-bold btn btn-outline-success`}
                            style={{ width: '65px' }}
                            onClick={() => nav(`/post/manage-sales-rep/${inventoryData?.id}`)}
                        >
                            Manage
                        </button>
                    </div>
                </center>
            </div>

            <div className="card shadow2 bg-white rounded overflow-hidden my-3">
                <center>
                    <div className='tiny text-white bg-custom p-2 '>
                        Suppliers
                    </div>
                    <div className="p-2">
                        <div className='my-2 fw-'>
                            {inventoryData?.suppliers?.length}
                        </div>
                        <button className={`small btn-sm tiny fw-bold btn btn-outline-success`}
                            style={{ width: '65px' }}
                            onClick={() => nav(`/pos/manage-supplier/${inventoryData?.id}`)}
                        >
                            Manage
                        </button>
                    </div>
                </center>
            </div>

            <div className="card shadow2 bg-white rounded overflow-hidden my-3">
                <center>
                    <div className='tiny text-white bg-custom p-2 '>
                        <center>Customers</center>
                    </div>
                    <div className="p-2">
                        <div className='my-2 fw-'>
                            {inventoryData?.customers?.length}

                        </div>
                        <button className={`small btn-sm tiny fw-bold btn btn-outline-success`}
                            style={{ width: '65px' }}
                            onClick={() => nav(`/post/manage-customer/${inventoryData?.id}`)}
                        >
                            Manage
                        </button>
                    </div>
                </center>
            </div>



        </div>
    );
}

export default OtherCards;