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
} from '@chakra-ui/react'
import { useState } from 'react';
import { db } from '../../config';
import { doc, updateDoc } from 'firebase/firestore';
import { uuidv4 } from '@firebase/util';
import { useCheckPOSOwner } from '../../hooks/useProtectPage';

function AddSupplierModal({ isOpen, onClose, id, inventoryData }) {


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false)
    const toast = useToast()
    const { checkPOSowner } = useCheckPOSOwner();
    const handleSubmit = async () => {
        const isPOSAdmin = checkPOSowner();
        if(!isPOSAdmin){
            return
        }
        if (!name || !email || !phoneNumber) {
            toast({
                title: 'All fields are required!',
                status: 'error',
                variant: 'subtle',
                duration: 2000,
                position: 'top',
                colorScheme: 'red'
            })
            return
        }
        setLoading(true)
        const docRef = doc(db, 'inventory_data', id)
        console.log('the suppliers ', inventoryData.suppliers)
        const key = uuidv4()

        const newSupplierObject = {
            name: name,
            email: email,
            phone: phoneNumber,
            created_at: Date.now(),
            id: key
        }
        inventoryData.suppliers.push(newSupplierObject)
        // console.log(inventoryData.suppliers)
        await updateDoc(docRef, {
            suppliers: inventoryData.suppliers
        })
        setLoading(false)
        setName('')
        setEmail('')
        setPhoneNumber('')
        onClose()
        toast({
            title: 'A new supplier was added successfully',
            status: 'success',
            variant: 'subtle',
            duration: 2000,
            position: 'top',
        })

    };
    return (

        <div>
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent style={{ marginTop: '150px' }}>
                    <center className='modalHeader'>
                        <ModalHeader><h6> Add supplier</h6></ModalHeader>
                        <ModalCloseButton />
                    </center>
                    <ModalBody className='' >
                        <center>
                            <input
                                type="text"
                                className='form-control my-2'
                                placeholder='Supplier name...'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                type="text"
                                className='form-control my-2'
                                placeholder='Supplier email...'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="text"
                                className='form-control my-2'
                                placeholder='Supplier phone number...'
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            <br />
                            <Button
                                colorScheme='green'
                                isLoading={loading}
                                onClick={handleSubmit}
                            >
                                Add supplier
                            </Button>
                        </center>
                        <br />

                    </ModalBody>
                </ModalContent>

            </Modal >
        </div>
    );
}

export default AddSupplierModal;