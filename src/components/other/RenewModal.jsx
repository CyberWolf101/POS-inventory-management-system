import React, { useEffect } from 'react';
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
import useAuth from '../../hooks/auth';
import { closePaymentModal } from 'flutterwave-react-v3';
import { UseRenewPos } from '../../hooks/UsePosAdmin';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

export default function RenewModal({ isOpen, onClose, clickedItem, months, timeFrame, type }) {
    const { user } = useAuth()
    const [bidAmount, setBidAmount] = useState('')
    const { handleFlutterPayment } = UsePayPOS(clickedItem?.amountPerMonth * months)
    const { hasPaidPos, loading } = UseRenewPos()
   const nav = useNavigate()
    const handleSub = async () => {
        if (!user) {
            swal('Error', 'you must be logged in to peform this action', 'error')
            nav('/auth')
        }

        if (true) { //incase there might be free sub
            handleFlutterPayment({
                callback: (response) => {
                    console.log(response);
                    if (response.status == "completed") {
                        hasPaidPos(clickedItem, months, timeFrame, onClose, type)
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
                                You are about to {type} your {clickedItem?.plan} for {timeFrame}.
                            </div>
                            <br />
                            {
                                loading && (
                                    <button
                                        onClick={() => handleSub()}
                                        className='btn btn-custom w-100'>
                                        <Spinner thickness='3px' color='white' />
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

