import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    Avatar,
} from '@chakra-ui/react'
import { Add, Edit, EditAttributes, Image, Update } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import StockDetailsOnly from './StockDetailsOnly';
import { Fade } from 'react-reveal';
import { UseEditPrimaryStock, UseEditSecondaryStock } from '../../hooks/useStocks';


function EditStockModal({ onClose, onOpen, isOpen, clickedItem, id, getStocks }) {
    const [sizes, setSizes] = useState([])
    const [inputSize, setInputSize] = useState('')
    const [pic, setPic] = useState(null)
    const [colorsArray, setColorsArray] = useState([])
    const [inputColor, setInputColor] = useState('')
    const [AllowEdit, setAllowEdit] = useState(false)
    // Individual state variables for new fields
    const [newProductName, setNewProductName] = useState('');
    const [newProductPrice, setNewProductPrice] = useState('');
    const [newProductDescription, setNewProductDescription] = useState('');
    const { handleEditPrimaryDetails, Loading: loadingPrimary } = UseEditPrimaryStock()
    const { handleEditSecondaryDetails, Loading: loadingSecondary } = UseEditSecondaryStock()

    useEffect(() => {
        setSizes(clickedItem.sizes || [])
        setColorsArray(clickedItem.colorsArray || [])
    }, [clickedItem])

    function removeSize(size) {
        setSizes(sizes.filter(currentSize => currentSize !== size))
    }
    function removeColor(color) {
        setColorsArray(colorsArray.filter(currentColor => currentColor !== color))
    }

    function handleColorAdd(item) {
        if (colorsArray.includes(item) || item === '') { return }
        setColorsArray([...colorsArray, item])
        setInputColor('')
    }

    function handleSizeAdd(item) {
        if (sizes.includes(item) || item === '') { return }
        setSizes([...sizes, item])
        setInputSize('')
    }




    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent style={{ marginTop: '1px' }}>
                    <center className='modalHeader'>
                        <ModalHeader><h6>Stock Details ({clickedItem?.productName})</h6></ModalHeader>
                        <ModalCloseButton />
                    </center>
                    <ModalBody className='' >
                        <center>
                            {/* the link points the sigle product. so we can get doc */}

                            {
                                !AllowEdit && (
                                    <Fade>
                                        <StockDetailsOnly clickedItem={clickedItem} setAllowEdit={setAllowEdit} />
                                    </Fade>
                                )
                            }


                            {
                                AllowEdit && (
                                    <Fade>
                                        <div>
                                            <div className="flex">
                                                <button className="btn btn-custom btn-sm" onClick={() => setAllowEdit(false)}>
                                                    View details
                                                </button>
                                            </div>
                                            <br />
                                            <div className="small faint text-center mb-2">
                                                Primary details
                                            </div>
                                            {/* name */}
                                            <div className="" style={{ height: '100%', overflow: 'scroll' }}>
                                                <div className='custom-table'>
                                                    <div>product name: </div>
                                                    <div className='form-control tiny'>{clickedItem?.productName}</div>
                                                    <div>
                                                        <input
                                                            type="text"
                                                            className='form-control tiny'
                                                            placeholder='new value...'
                                                            value={newProductName}
                                                            onChange={(e) => setNewProductName(e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                {/* price */}
                                                <div className='custom-table'>
                                                    <div>product price: </div>
                                                    <div className='form-control tiny'>{clickedItem?.price}</div>
                                                    <div>
                                                        <input
                                                            type="number"
                                                            className='form-control tiny'
                                                            placeholder='new value...'
                                                            value={newProductPrice}
                                                            onChange={(e) => setNewProductPrice(e.target.value)}
                                                        />
                                                    </div>
                                                </div>


                                                {/* Description */}
                                                <div className='custom-table'>
                                                    <div>Description: </div>
                                                    <div className='form-control tiny'>{clickedItem?.description?.slice(0, 17) + '...'}</div>

                                                    <div>
                                                        <input
                                                            type="text"
                                                            className='form-control tiny'
                                                            placeholder='new value...'
                                                            value={newProductDescription}
                                                            onChange={(e) => setNewProductDescription(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <Button
                                                    colorScheme='green'
                                                    isLoading={loadingPrimary}
                                                    onClick={() => handleEditPrimaryDetails(newProductName, newProductPrice, newProductDescription, clickedItem, id, getStocks, onClose)}
                                                    size='sm'
                                                    loadingText='updating'

                                                >
                                                    update primary details
                                                </Button>

                                                <br />
                                                <br />

                                                <div className="small faint text-center mb-2">
                                                    Secondary details
                                                </div>
                                                <div className='flex'>
                                                    <input
                                                        type="text"
                                                        className='form-control add-input'
                                                        placeholder='Add size...'
                                                        value={inputSize}
                                                        onChange={(e) => setInputSize(e.target.value)}
                                                    />
                                                    <button
                                                        className="add-btn btn btn-custom"
                                                        onClick={() => handleSizeAdd(inputSize)}
                                                    >
                                                        <Add fontSize='small' />
                                                    </button>
                                                </div>

                                                <div className="flex mt-2">
                                                    <small> sizes:</small>
                                                    {sizes?.map((size, index) => (
                                                        <div
                                                            key={index}
                                                            className='btn-custom rounded p-1 tiny mx-1 cusor-pointer'
                                                            onClick={() => removeSize(size)}
                                                        >
                                                            {size}
                                                        </div>
                                                    ))}
                                                </div>
                                                {sizes?.length < 1 && (<span className='small faint tiny'>No size was added</span>)}
                                                {sizes?.length > 0 && (<small className="faint tiny">Click on size to remove</small>)}
                                                <hr />


                                                {/* color */}
                                                <div className='flex'>
                                                    <input
                                                        type="text"
                                                        className='form-control add-input'
                                                        placeholder='Add color...'
                                                        value={inputColor}
                                                        onChange={(e) => setInputColor(e.target.value)}
                                                    />
                                                    <button
                                                        className="add-btn btn btn-custom"
                                                        onClick={() => handleColorAdd(inputColor)}
                                                    >
                                                        <Add fontSize='small' />
                                                    </button>
                                                </div>
                                                <div className="flex mt-2">
                                                    <small> Colors:</small>
                                                    {colorsArray?.map((color, index) => (
                                                        <div
                                                            key={index}
                                                            className='btn-custom rounded p-1 tiny mx-1 cusor-pointer'
                                                            onClick={() => removeColor(color)}
                                                        >
                                                            {color}
                                                        </div>
                                                    ))}
                                                </div>
                                                {colorsArray?.length < 1 && (<span className='small faint tiny'>No color was added</span>)}
                                                {colorsArray?.length > 0 && (<small className="faint tiny">Click on color to remove</small>)}



                                                <hr />
                                                {/* img */}
                                                <div className='tiny'>product image: </div>
                                                <div className='flex'>
                                                    <div className=''>
                                                        <Avatar src={clickedItem?.product_url} icon={<Image />} size='xs' />
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="file"
                                                            className=' form-control'
                                                            onChange={(e) => setPic(e.target.files[0])}
                                                        />
                                                    </div>
                                                </div>
                                                <hr />
                                                <Button
                                                    colorScheme='green'
                                                    isLoading={loadingSecondary}
                                                    onClick={() => handleEditSecondaryDetails(sizes, pic, colorsArray, clickedItem, id, getStocks, onClose)}
                                                    size='sm'
                                                >
                                                    update Secondary details
                                                </Button>
                                                <br />
                                            </div>
                                        </div>
                                    </Fade>
                                )
                            }
                        </center>
                        <br />
                    </ModalBody>
                </ModalContent>

            </Modal >
        </div >
    );
}

export default EditStockModal;