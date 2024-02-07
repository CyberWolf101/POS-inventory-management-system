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
import { useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { Switch } from '@chakra-ui/react';

function CategoryModal({ isOpen, onClose, onOpen, stores }) {
    const [selectedStore, setSelectedStore] = useState('')
    const [category, setCategory] = useState('')
    const [selectedBranch, setSelectedBranch] = useState('')
    const [currentStoreBranches, setCurrentStoreBranches] = useState([]);
    const [disabled, setDisabled] = useState(true)
    const [loading, setLoading] = useState(false)
    const toast = useToast()
    const nav = useNavigate()

    const handleSelectedStore = (e) => {
        setSelectedStore(e.target.value);
        setCurrentStoreBranches([]);
        const selectedStore = stores.find((store) => store.storeName === e.target.value);
        if (selectedStore) {
            setCurrentStoreBranches(selectedStore.branches || []);
            setDisabled(false)

        }

    };

    const handleSelectedBranchStore = (e) => {
        setSelectedBranch(e.target.value);
    };

    const handleClick = async () => {
        if (!category || !selectedBranch || !selectedStore) {
            console.log('all fields are required')
            swal('Error', 'All fields are required', 'error')
            return
        }
        setLoading(true)

        const idArray = selectedBranch.split(" ");
        const branchID = idArray[0];
        const storeID = idArray[1];
        const branchName = idArray[2];

        try {

            const StoreRef = doc(db, 'all_stores', storeID)

            // get store
            const rawData = await getDoc(StoreRef)
            const mainData = rawData.data()
            console.log(mainData)
            const allBranches = mainData.branches

            // Find the branch with the corresponding ID
            const updatedBranches = allBranches.map(branch => {
                if (branch.branchID === branchID) {
                    // Update the categories for the selected branch
                    return {
                        ...branch,
                        categories: [...branch.categories, category],
                    };
                }
                return branch;
            });


            console.log('updated', updatedBranches)
            // 

            await updateDoc(StoreRef, {
                branches: updatedBranches
            })

            // do for general
            const newBranchObject = {
                category: category,
                branchID: branchID,
                storeID: storeID,
                branchName: branchName,
                storeName: selectedStore
            }

            mainData.categories.push(newBranchObject)
            await updateDoc(StoreRef, {
                categories: mainData.categories
            })
            toast({
                title: 'Branches Updated',
                description: 'The branches have been successfully updated.',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top',
                variant: 'subtle'
            });
            nav(0)
            setLoading(false)
            onClose()
        } catch (error) {
            console.log(error)
            swal('Error', 'An errored, please check your internet connection', 'error')
        }
    }

    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent style={{ marginTop: '150px' }}>
                    <center className='modalHeader'>
                        <ModalHeader><h6>Add Category</h6></ModalHeader>
                        <ModalCloseButton />
                    </center>
                    <ModalBody className='' >
                        <input
                            type="text"
                            className='form-control'
                            placeholder='category name'
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        <br />


                        {
                            stores?.length > 0 ? (
                                <div>
                                    <label>Select Store:</label>
                                    <select
                                        value={selectedStore}
                                        onChange={handleSelectedStore}
                                        className="form-select"
                                    >
                                        <option value="select" selected ></option>
                                        {
                                            stores?.map((store, index) => (
                                                <option key={index} value={store?.storeName}>{store?.storeName}</option>
                                            ))
                                        }

                                        {/* Add more options as needed */}
                                    </select>
                                </div>
                            ) :
                                (
                                    <div className='faint small'>
                                        <center>
                                            You must create atleast 1 store in order to add category
                                        </center>
                                    </div>
                                )
                        }

                        <br />
                        <label >Select Store Branch:</label>

                        <div>
                            <select
                                value={selectedBranch}
                                onChange={handleSelectedBranchStore}
                                className="form-select"
                            >
                                <option value="select" selected >select store branch</option>

                                {currentStoreBranches.map((item, index) => (
                                    <option
                                        key={index}
                                        value={item.branchID + ' ' + item.storeID + ' ' + item.branchName}
                                    >
                                        {item.branchName}
                                    </option>
                                ))}
                            </select>

                        </div>


                        <br />
                        <br />
                        <Button
                            isLoading={loading}
                            onClick={() => handleClick()}
                            colorScheme='green'
                            isDisabled={stores?.length < 0 || disabled}

                        >
                            Add Category
                        </Button>
                        <br />
                        <br />

                    </ModalBody>
                </ModalContent>

            </Modal >
        </div>
    );
}

export default CategoryModal;