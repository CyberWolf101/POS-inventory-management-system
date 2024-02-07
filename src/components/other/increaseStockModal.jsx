
import React, { useEffect, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
} from '@chakra-ui/react'
import { Add, Remove } from '@mui/icons-material';
import { UseChangeQuantity } from '../../hooks/useStocks';


function IncreaseStockModal({ isOpen, onClose, clickedItem, id, getStocks}) {
    const [count, setCount] = useState(0)
    const { handleChangeQuantity, Loading } = UseChangeQuantity()
    useEffect(() => {
        setCount(Number(clickedItem.availableQuantity))
    }, [clickedItem])

    function increase() {
        setCount(Number(count) + 1)
    }
    function decrease() {
        if (count < 1) return
        setCount(Number(count) - 1)
    }
    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent style={{ marginTop: '280px' }}>
                    <center className='modalHeader'>
                        <ModalCloseButton />
                    </center>
                    <ModalBody className='' >
                        <center>
                            {
                                clickedItem && (
                                    <div>

                                        <br />
                                        <div className="faint small faint">
                                            change available quantity of {clickedItem.productName}
                                        </div>
                                        <div className='mt-4 flex mx-5'>
                                            <button
                                                className='btn btn-danger'
                                                style={{ borderBottomRightRadius: 0, borderTopRightRadius: 0 }}
                                                onClick={decrease}
                                                disabled={count < 1}
                                            >
                                                <Remove />
                                            </button>

                                            <input
                                                type="number"
                                                className='form-control text-center'
                                                style={{ borderRadius: 0 }} value={count}
                                                onChange={(e) => setCount(e.target.value)}
                                            />

                                            <button
                                                className='btn btn-custom add-btn'
                                                onClick={increase}
                                            >
                                                <Add />
                                            </button>

                                        </div>
                                        <br />
                                        <Button
                                            colorScheme='green'
                                            isLoading={Loading}
                                            onClick={()=> handleChangeQuantity(clickedItem, count, id, getStocks, onClose)}
                                        >
                                            UPDATE
                                        </Button>
                                        <br />
                                    </div>
                                )
                            }
                        </center>
                        <br />

                    </ModalBody>
                </ModalContent>

            </Modal >
        </div>
    );
}

export default IncreaseStockModal;