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
import { useBuyBranch } from '../../hooks/UseBuyBranch';
import { UsePayPOS } from '../../hooks/usePayment';
const PurchaseBranchModal = ({ isOpen, onClose }) => {
    const { loading, buyBranch } = useBuyBranch()
    const [amount, setAmount] = useState(1)
    const [price, setPrice] = useState(amount * 1000)
    const { handleFlutterPayment } = UsePayPOS(price)

    const handlePayment = () => {
        if (true) { //incase there might be free sub
            handleFlutterPayment({
                callback: (response) => {
                    console.log(response);
                    if (response.status == "completed") {
                        buyBranch(Number(amount), onClose)
                    } else {
                        alert('An error occured')
                    }
                },
                onClose: () => {
                    console.log('closed')
                },
            });
        }
    }

    useEffect(() => {
        setPrice(amount * 1000)

    }, [amount])

    const hangleChange = (e) => {
        setAmount(e.target.value)
        setPrice(amount * 1000)

    }


    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent style={{ marginTop: '100px' }}>
                    <center className='modalHeader'>
                        <ModalHeader>
                            <h6 style={{ fontSize: '14px' }}>Purchase branch slots</h6>
                        </ModalHeader>
                        <ModalCloseButton />
                    </center>
                    <ModalBody>
                        <b className='small'>Amount of slots:</b>
                        <input
                            type="number"
                            className="form-control"
                            placeholder='Amount of slots'
                            value={amount}
                            onChange={hangleChange}
                        />
                        <br />
                        <Button
                            size='sm'
                            colorScheme='green'
                            isLoading={loading}
                            isDisabled={amount < 1}
                            onClick={handlePayment}
                        >
                            PAY {price?.toLocaleString()}
                        </Button>
                        <br />
                        <br />

                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default PurchaseBranchModal;