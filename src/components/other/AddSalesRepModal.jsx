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
} from '@chakra-ui/react'
import LoadingPage from '../../components/partials/Loading';
import swal from 'sweetalert';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config';
import { duration } from '@mui/material';
import { uuidv4 } from '@firebase/util';
import { useCheckPOSOwner } from '../../hooks/useProtectPage';

function AddSalesRepModal({ onOpen, onClose, isOpen, allStores, userID, id, handleGetInventoryData }) {

    const [selectedStore, setSelectedStore] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('');
    const [repName, setRepName] = useState('');
    const [repEmail, setRepEmail] = useState('');
    const [repPhone, setRepPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const toast = useToast()
    const [chosenStore, setChosenStore] = useState({})
    const { checkPOSowner } = useCheckPOSOwner();



    if (!allStores) return <LoadingPage />


    const filteredStore = allStores.filter((item) => {
        return item.ownerID === userID
    })

    const handleStoreSelect = (e) => {
        setSelectedStore(e.target.value)
        console.log(filteredStore)

        const theStore = filteredStore.find(item => item.storeName === selectedStore)
        console.log(theStore)
        setChosenStore(theStore)
    }


    // Function to generate branch options based on the selected store
    const getBranchOptions = (storeName) => {
        const selectedStoreData = filteredStore.find((store) => store.storeName === storeName);
        return selectedStoreData ? selectedStoreData.branches.map((branch) => (
            <option key={branch.branchID} value={branch.branchName}>
                {branch.branchName}
            </option>
        )) : null
    };

    const handleAddSalesRep = async () => {
        const isPOSAdmin = checkPOSowner();
        if(!isPOSAdmin){
            return
        }
        if (!selectedStore) {
            swal('Error', 'You must select a store!', 'error')
            return
        }
        if (!selectedBranch) {
            swal('Error', 'You must select a store branch', 'error')
            return
        }
        if (!repName) {
            swal('Error', 'Seems your sales rep does not have a name', 'error')
            return
        }
        setLoading(true)

        const docRef = doc(db, 'inventory_data', id)
        try {
            const d = await getDoc(docRef)
            const inventoryData = d.data()
            console.log(inventoryData)
            const repID = uuidv4()

            const newRepDetails = {
                name: repName,
                branch: selectedBranch,
                store: selectedStore,
                phone: repPhone,
                email: repEmail,
                created_at: Date.now(),
                id: repID
            }

            inventoryData.salesRep.push(newRepDetails)
            console.log(inventoryData.salesRep)
            await updateDoc(docRef, {
                salesRep: inventoryData.salesRep
            })
            handleGetInventoryData(id)
            toast({
                title: 'Success',
                description: 'A new sales rep. was added to ' + selectedBranch,
                position: 'top',
                status: 'success',
                duration: 3000,
                isClosable: true,
                variant: 'subtle'
            })
            setRepName('')
            setRepEmail('')
            setRepPhone('')
            onClose()
            setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(false)
            toast({
                title: 'Error',
                description: 'failded to add new sales rep. to ' + selectedBranch,
                position: 'top',
                status: 'error',
                duration: 3000,
                isClosable: true
            })
        }

    }

    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent >
                    <center className='modalHeader'>
                        <ModalHeader><h6>sales rep.</h6></ModalHeader>
                        <ModalCloseButton />
                    </center>
                    <ModalBody className='' >
                        <center>
                            <label>Select Store:</label>
                            <select
                                value={selectedStore}
                                onChange={handleStoreSelect}
                                className="form-select"
                            >
                                <option value="" disabled>Select a Store</option>
                                {filteredStore.map((store) => (
                                    <option key={store.storeName} value={store.storeName}>
                                        {store.storeName}
                                    </option>
                                ))}
                            </select>


                            <br />


                            <label>Select Branch Store:</label>
                            <select
                                value={selectedBranch}
                                onChange={(e) => setSelectedBranch(e.target.value)}
                                className="form-select"
                            >
                                <option value="" disabled>Select a Branch</option>
                                {selectedStore && getBranchOptions(selectedStore)}
                            </select>
                            <br />


                            <label>Sales rep. name:</label>
                            <input
                                type="text"
                                className='form-control'
                                placeholder='rep. name'

                                value={repName}
                                onChange={(e) => setRepName(e.target.value)}
                            />
                            <br />

                            <label>Sales rep. phone number:</label>
                            <input
                                type="number"
                                className='form-control'
                                placeholder='optional'
                                value={repPhone}
                                onChange={(e) => setRepPhone(e.target.value)}
                            />
                            <br />

                            <label>Sales rep. Email:</label>
                            <input
                                type="text"
                                className='form-control'
                                placeholder='optional'
                                value={repEmail}
                                onChange={(e) => setRepEmail(e.target.value)}
                            />
                            <br />
                            <br />
                            <Button
                                className='w-100'
                                colorScheme='green'
                                isLoading={loading}
                                onClick={handleAddSalesRep}
                            >
                                Add Sales Rep.
                            </Button>

                        </center>
                        <br />

                    </ModalBody>
                </ModalContent>

            </Modal >
        </div>
    );
}

export default AddSalesRepModal;