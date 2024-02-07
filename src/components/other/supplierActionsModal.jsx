import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    useToast,
    Spinner,
} from '@chakra-ui/react'
import { CopyAll, DeleteForever, Phone } from '@mui/icons-material';
import { useEffect } from 'react';
import { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { connectAuthEmulator } from 'firebase/auth';
import swal from 'sweetalert';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config';
import { useNavigate } from 'react-router-dom';

function SupplierActionsModal({ isOpen, onClose, theSupplier, inventoryData, handleGetInventoryData }) {
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const toast = useToast()
    const [loadng, setLaoding] = useState(false)


    useEffect(() => {

        setEmail(theSupplier.email)
        setPhone(theSupplier.phone)


    }, [theSupplier])

    const handleCopy = () => {
        toast({
            title: 'Phone number copied',
            status: 'info',
            variant: 'subtle',
            duration: 2000,
            position: 'top',
        })
    };

    const handleCopy2 = () => {
        toast({
            title: 'Email copied',
            status: 'info',
            variant: 'subtle',
            duration: 2000,
            position: 'top',
        })
    };

    const handleDelete = () => {
        const idToRemove = theSupplier.id;
        const theArray = inventoryData.suppliers;
        const docRef = doc(db, 'inventory_data', inventoryData.id)
        swal({
            title: 'Are You sure?',
            text: "Delete this supplier?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                setLaoding(true)
                const filteredArray = theArray.filter((supplier) => supplier.id !== idToRemove);
                await updateDoc(docRef, {
                    suppliers: filteredArray
                })
                toast({
                    title: 'Supplier was deleted',
                    status: 'info',
                    variant: 'subtle',
                    duration: 2000,
                    position: 'top',
                })
                setLaoding(false)
                onClose()
                handleGetInventoryData(inventoryData.id)

            } else {
                setLaoding(false)
                console.log('cancel')
            }
        }).catch((error) => {
            console.log(error)
            toast({
                title: 'An error occured',
                description: 'please check your connection.',
                status: 'error',
                variant: 'subtle',
                duration: 2000,
                position: 'top',
            })
            setLaoding(false)
        })

    }

    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent style={{ marginTop: '200px' }}>
                    <center className='modalHeader'>
                        <ModalHeader><h6>{theSupplier.name}</h6></ModalHeader>
                        <ModalCloseButton />
                    </center>
                    <ModalBody className='' >
                        <center>
                            <div className='supplier-actions-btns'>

                                <a className='btn btn-custom '
                                    href={'tel:' + theSupplier.phone}
                                >Call<Phone fontSize='small' /></a>

                                <CopyToClipboard text={phone} onCopy={handleCopy}>
                                    <button className='btn btn-custom '>Copy number<CopyAll fontSize='small' /></button>
                                </CopyToClipboard>


                                <CopyToClipboard text={email} onCopy={handleCopy2}>
                                    <button className='btn btn-custom '>Copy email<CopyAll fontSize='small' /></button>
                                </CopyToClipboard>

                                {
                                    loadng ? (
                                        <div>
                                            <Spinner color='green.500' thickness='3px' emptyColor='gray.500' />
                                        </div>
                                    ) :
                                        (
                                            <button className='btn btn-danger '
                                                onClick={() => handleDelete()}
                                            >Delete<DeleteForever fontSize='small' /></button>
                                        )
                                }
                            </div>
                        </center>
                        <br />

                    </ModalBody>
                </ModalContent>

            </Modal >
        </div>
    );
}

export default SupplierActionsModal;