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
    Avatar,
} from '@chakra-ui/react'
import { Store } from '@mui/icons-material';
import { useEffect } from 'react';
import { db, storage } from '../../config';
import { doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

function EditStoreModal({ isOpen, onClose, store, id }) {
    const [shopName, setShopName] = useState('')
    const [disable1, setDisable1] = useState(true)
    const [disable2, setDisable2] = useState(true)
    const [Logo, setLogo] = useState(null)
    const nav = useNavigate()

    const handleChangeName = (e) => {
        setShopName(e.target.value)
        setDisable1(false)
    }
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setLogo(selectedFile);
        if (selectedFile) {
            setDisable2(false)
        }
    }

    async function saveName() {
        const docRef = doc(db, 'all_stores', id)
        console.log(id)
        try {
            setDisable1(true)
            await updateDoc(docRef, {
                storeName: shopName
            })
            nav(0)
            swal('success', 'store name was updated')

        } catch (error) {
            console.log(error)
            setDisable1(false)
            alert('an error occured')
        }

    }

    async function saveLogo() {
        const docRef = doc(db, 'all_stores', id)
        console.log(id)
        try {
            const imageRef = ref(storage, store.deletePath) 
            await uploadBytes(imageRef, Logo)
            const url = await getDownloadURL(imageRef)   
            setDisable2(true)
            await updateDoc(docRef, {
                storeLogo: url
            })
            swal('success', 'store logo was updated')
            nav(0)
        } catch (error) {
            console.log(error)
            setDisable2(false)
            alert('an error occured')
        }

    }

    useEffect(() => {
        if (store) {
            setShopName(store.storeName || '')
        }
    }, [store])
    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent style={{ marginTop: '150px' }}>
                    <center className='modalHeader'>
                        <ModalHeader><h6>{store?.storeName}</h6></ModalHeader>
                        <ModalCloseButton />
                    </center>
                    <ModalBody className='' >
                        <center>
                            <input type="text"
                                className='form-control'
                                placeholder='store name'
                                value={shopName}
                                onChange={handleChangeName}
                            />
                            <button
                                onClick={() => saveName()}
                                className='btn btn-custom w-100 mt-2 text-white'
                                disabled={disable1}
                            >
                                Save store name
                            </button>
                            <br />
                            <br />
                            <div className='flex'>
                                <Avatar src={store?.storeLogo} icon={<Store />} />
                                <input type="file"
                                    className='form-control'
                                    onChange={handleFileChange}

                                />
                            </div>
                            <button
                                onClick={() => saveLogo()}
                                className='btn btn-custom w-100 mt-2 text-white'
                                disabled={disable2}
                            >
                                Save store Logo

                            </button>
                            <br />

                        </center>
                        <br />

                    </ModalBody>
                </ModalContent>

            </Modal >
        </div>
    );
}

export default EditStoreModal;