import { Avatar } from '@chakra-ui/react';
import { Image } from '@mui/icons-material';
import { format } from 'date-fns';
import React from 'react';

function StockDetailsOnly({ clickedItem, setAllowEdit }) {
    return (
        <div>
            <div className="flex_normal mb-3">
                <Avatar src={clickedItem?.product_url} icon={<Image />} size='sm' />

                <button className="btn btn-custom btn-sm" onClick={() => setAllowEdit(true)}>
                    Edit details
                </button>
            </div>
            <div className='flex my-2'>
                <div className='small' style={{ flex: 1 }}>product name: </div>
                <div className='form-control tiny' style={{ flex: 1 }}>{clickedItem?.productName}</div>
            </div>

            {/* price */}
            <div className='flex  my-2'>
                <div className='small' style={{ flex: 1 }}>product price: </div>
                <div className='form-control tiny' style={{ flex: 1 }}>₦ {clickedItem?.price?.toLocaleString()}</div>
            </div>

            {/* store */}
            <div className='flex  my-2'>
                <div className='small' style={{ flex: 1 }}>Store name: </div>
                <div className='form-control tiny' style={{ flex: 1 }}>{clickedItem?.selectedStore} </div>
            </div>

            {/* branch */}
            <div className='flex  my-2'>
                <div className='small' style={{ flex: 1 }}>Store branch: </div>
                <div className='form-control tiny' style={{ flex: 1 }}>{clickedItem?.selectedBranch} </div>
            </div>

            {/* category */}
            <div className='flex  my-2'>
                <div className='small' style={{ flex: 1 }}>Product category: </div>
                <div className='form-control tiny' style={{ flex: 1 }}>{clickedItem?.categories} </div>
            </div>

            {/* suppier */}
            <div className='flex  my-2'>
                <div className='small' style={{ flex: 1 }}>Selected Supplier: </div>
                <div className='form-control tiny' style={{ flex: 1 }}>{clickedItem.selectedSupplier ? clickedItem?.selectedSupplier?.split(' ')[0] : 'unselected'} </div>
            </div>

            {/* quantity */}
            <div className='flex  my-2'>
                <div className='small' style={{ flex: 1 }}>Available Quantity: </div>
                <div className='form-control tiny' style={{ flex: 1 }}>{clickedItem?.availableQuantity?.toLocaleString()} </div>
            </div>

            {/* date */}
            <div className='flex  my-2'>
                <div className='small' style={{ flex: 1 }}>Date added: </div>
                <div className='form-control tiny' style={{ flex: 1 }}>{clickedItem.created_at && format(new Date(clickedItem.created_at), 'yyyy-MM-dd')} </div>
            </div>


            {/* Description */}
            <div className='text-center  my-2'>
                <div className='small' style={{ flex: 1 }}>Description: </div>
                <div className='form-control tiny' style={{ flex: 1 }}>{clickedItem?.description?.slice(0, 200)}</div>
            </div>





            {/* Sizes */}
            <div>
                <div className="flex mt-3">
                    <small>Available sizes:</small>
                    {clickedItem?.sizes?.map((size, index) => (
                        <div
                            key={index}
                            className='btn-custom rounded p-1 tiny mx-1'
                        >
                            {size}
                        </div>
                    ))}
                    {clickedItem?.sizes?.length < 1 && (<small className='faint'>&nbsp; Unselected</small>)}
                </div>


                {/* Colors */}
                <div>
                    <div className="flex mt-3">
                        <small>Available colors:</small>
                        {clickedItem?.colorsArray?.map((color, index) => (
                            <div
                                key={index}
                                className='btn-custom rounded p-1 tiny mx-1'
                            >
                                {color}
                            </div>
                        ))}
                        {clickedItem?.colorsArray?.length < 1 && (<small className='faint'>&nbsp; Unselected</small>)}
                    </div>
                </div>



                {/* {clickedItem?.colorsArray?.map((color, index) => (
                    <div
                        key={index}
                        className='btn-custom rounded p-1 tiny mx-1'
                        onClick={() => removeColor(color)}
                    >
                        {color}
                    </div>
                ))} */}
            </div>
        </div>
    );
}

export default StockDetailsOnly;