import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    Spinner,
} from '@chakra-ui/react'
import { Fade } from 'react-reveal';
import { format, formatDistance, formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import { UsePayPOS } from '../../hooks/usePayment'
import { closePaymentModal } from 'flutterwave-react-v3';
import { UseMakePosAdmin } from '../../hooks/UsePosAdmin';
import { useContext } from 'react';
import { userContext } from '../../contexts/userContext';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

export default function PaymentModal({ isOpen, onClose, clickedItem, months, timeFrame }) {
    const [bidAmount, setBidAmount] = useState('')
    const { handleFlutterPayment } = UsePayPOS(clickedItem?.amountPerMonth * months)
    const { hasPaidPos, loading } = UseMakePosAdmin()
    const [referalCode, setReferalCode] = useState('')
    const [userDetails] = useContext(userContext)
    const nav = useNavigate()
    const handleSub = async () => {
        if (!userDetails.id) {
            swal('Error', 'you must be logged in to peform this action', 'error')
            nav('/auth')
        }

        if (true) { //incase there might be free sub
            handleFlutterPayment({
                callback: (response) => {
                    console.log(response);
                    if (response.status == "completed") {
                        hasPaidPos(clickedItem, months, timeFrame, onClose, referalCode)
                    } else {
                        alert('An error occured')
                    }
                    closePaymentModal() // this will close the modal programmatically
                },
                onClose: () => {
                    console.log('closed')
                },
            });
        }
    }

    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent style={{ marginTop: '150px' }}>
                    <center className='modalHeader'>
                        <ModalHeader><h6>{clickedItem?.plan}</h6></ModalHeader>
                        <ModalCloseButton />
                    </center>
                    <ModalBody className='' >
                        <center>

                            <div className="faint small">
                                You are about to purchase our {clickedItem?.plan} for {timeFrame}.
                            </div>
                            {
                                userDetails.pos_admin ?
                                    <span></span>
                                    :
                                    <input type="text"
                                        value={referalCode}
                                        onChange={(e) => setReferalCode(e.target.value)}
                                        className='form-control mt-3'
                                        placeholder='enter referal code (optional)'
                                        style={{ fontSize: '13px' }}
                                    />

                            }

                            <br />
                            {
                                loading && (
                                    <button
                                        // onClick={() => handleSub()}
                                        className='btn btn-custom w-100'>
                                        <Spinner thickness='3px' color='white' emptyColor='gray.300' />
                                    </button>
                                )
                            }

                            {
                                !loading && (
                                    <button
                                        onClick={() => handleSub()}
                                        className='btn btn-custom w-100'>
                                        Proceed to pay  ₦ {(clickedItem?.amountPerMonth * months)?.toLocaleString()}
                                    </button>
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

