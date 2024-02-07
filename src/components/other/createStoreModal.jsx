import React, { useState } from 'react';
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
import { Avatar, useDisclosure } from '@chakra-ui/react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../config';
import { uuidv4 } from '@firebase/util';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { modelContext } from '../../contexts/modeContext';
import { useContext } from 'react';
import useAuth from '../../hooks/auth';
import { userContext } from '../../contexts/userContext';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { useCheckPOSOwner } from '../../hooks/useProtectPage';
import { InventoryDataContext } from '../../contexts/inventoryDataContext';

function CreateStoreModal({ isOpen, onClose, userStores }) {
    const toast = useToast()
    const { user } = useAuth()
    const [storeName, setStoreName] = useState('');
    const [storeLogo, setStoreLogo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userDetails] = useContext(userContext)
    const nav = useNavigate()
    const { checkPOSowner } = useCheckPOSOwner();
    const [inventoryData, setInventoryData] = useContext(InventoryDataContext)

    async function handleStore(storeName) {
        const isPOSAdmin = checkPOSowner();
        if (!isPOSAdmin) {
            return
        }
        console.log(userDetails.allowedStores, userStores.length)
        // return
        if (userStores.length >= userDetails.allowedStores) {
            swal('error', `Oops, seems your current plan (${userDetails.pos_plan}) only permits you to create ${userDetails.allowedStores} stores, consider upgrading it.`, 'error')
            onClose()
            nav(`/profile/pos-plan/${userDetails.inventoryID}`)
            return
        }

        if (!storeName || !storeLogo) {
            toast({
                title: "Error",
                description: "Please provide a store name and a store logo.",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'top',
                variant: 'subtle'
            });
            return;
        }
        try {
            setLoading(true)
            const id = uuidv4()
            const inventoryRef = doc(db, 'inventory_data', user?.inventoryID)
            const imageRef = ref(storage, `store_logos/${id}`) //1
            await uploadBytes(imageRef, storeLogo)
            const url = await getDownloadURL(imageRef)   //this is where we can get the url from imageRef we just get the download url and we don't want to list anything


            const docRef = doc(db, 'all_stores', id)
            setDoc(docRef, {
                storeName: storeName,
                storeLogo: url,
                storeID: id,
                deletePath: `store_logos/${id}`,
                ownerID: user.id,
                ownerName: user.name,
                created_at: Date.now(),
                branches: [],
                categories: [] //would hold objects so one will be category name, the other will be sub category(array)
            })

            const d = await getDoc(inventoryRef)
            const currentData = d.data()
            const newTotal = currentData.totalStores + 1
            await updateDoc(inventoryRef, {
                totalStores: newTotal,
            })
            setInventoryData({ ...inventoryData, totalStores: newTotal })
            setLoading(false)
            toast({
                title: "Success",
                description: "An new store was successfully created.",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: 'top',
                variant: 'subtle'
            });
            onClose()

        } catch (error) {
            setLoading(false)
            console.log(error)
        }

    }

    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent style={{ marginTop: '150px' }}>
                    <center className='modalHeader'>
                        <ModalHeader><h6>Create Store</h6></ModalHeader>
                        <ModalCloseButton />
                    </center>
                    <ModalBody className='' >
                        <center>
                            <div className='px-1'>
                                <label>Store name:</label>
                                <input
                                    type="text"
                                    className='form-control'
                                    placeholder='store name...'
                                    value={storeName}
                                    onChange={(e) => setStoreName(e.target.value)}
                                />

                                <br />

                                <label>Store logo:</label>
                                <input
                                    type="file"
                                    className='form-control'
                                    onChange={(e) => setStoreLogo(e.target.files[0])}
                                />
                            </div>
                            <br />
                            <button
                                onClick={() => handleStore(storeName)}
                                className='btn btn-custom w-100'
                                disabled={loading}
                            >
                                {loading ? <Spinner /> : 'Create store'}
                            </button>
                        </center>
                        <br />

                    </ModalBody>
                </ModalContent>

            </Modal >
        </div>
    );
}

export default CreateStoreModal;
