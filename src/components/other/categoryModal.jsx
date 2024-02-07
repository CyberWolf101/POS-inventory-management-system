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

function CategoryModal({ isOpen, onClose, onOpen, stores, getAllStores }) {
    const [selectedStore, setSelectedStore] = useState('')
    const [category, setCategory] = useState('')
    const [selectedBranch, setSelectedBranch] = useState('')
    const [currentStoreBranches, setCurrentStoreBranches] = useState([]);
    const [disabled, setDisabled] = useState(true)
    const [loading, setLoading] = useState(false)
    const toast = useToast()
    const nav = useNavigate()
    const [selectedBranches, setSelectedBranches] = useState([]);

    const handleSelectedStore = (e) => {
        setSelectedStore(e.target.value);
        setCurrentStoreBranches([]);
        const selectedStore = stores.find((store) => store.storeName === e.target.value);
        if (selectedStore) {
            setCurrentStoreBranches(selectedStore.branches || []);
            setDisabled(false)
        }
    };


    
    const handleSelectedBranchStore = (e, branchID, storeID, branchName) => {
        const isChecked = e.target.checked;
        setSelectedBranches((prevSelectedBranches) => {
            const branchIdentifier = `${branchID}_${storeID}_${branchName}`; // Use underscores instead of spaces
            if (isChecked) {
                return [...prevSelectedBranches, branchIdentifier];
            } else {
                return prevSelectedBranches.filter((id) => id !== branchIdentifier);
            }
        });
    };

    const handleClick = async () => {
        if (!category || selectedBranches.length === 0 || !selectedStore) {
            console.log('all fields are required');
            swal('Error', 'All fields are required', 'error');
            return;
        }
        setLoading(true);

        try {
            const StoreRef = doc(db, 'all_stores', selectedBranches[0].split('_')[1]);

            // get store
            const rawData = await getDoc(StoreRef);
            const mainData = rawData.data();
            console.log(mainData);
            const allBranches = mainData.branches;

            // Update categories for selected branches
            const updatedBranches = allBranches.map(branch => {
                if (selectedBranches.includes(branch.branchID)) {
                    // Update the categories for the selected branches
                    return {
                        ...branch,
                        categories: [...branch.categories, category],
                    };
                }
                return branch;
            });

            await updateDoc(StoreRef, {
                branches: updatedBranches
            });

            // Update general categories for each selected branch
            let count = 1
           
            const newBranchObjects = [];
            selectedBranches.forEach(selectedBranch => {
                const [branchID, storeID, branchName] = selectedBranch.split("_"); // Use underscores to split
                newBranchObjects.push({
                    category: category,
                    branchID: branchID,
                    storeID: storeID,
                    branchName: branchName,
                    storeName: selectedStore,
                    id: Date.now() + count
                });
            });


            mainData.categories.push(...newBranchObjects);
            await updateDoc(StoreRef, {
                categories: mainData.categories
            });
            console.log('categories', mainData.categories)
            toast({
                title: 'Branches Updated',
                description: 'The branches have been successfully updated.',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top',
                variant: 'subtle'
            });
            getAllStores();
            setLoading(false);
            onClose();
        } catch (error) {
            console.log(error);
            swal('Error', 'An error occurred, please check your internet connection', 'error');
        }
    };



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
                        <div>
                            <label>Select Store Branch:</label>
                            <div className='mt-2'>
                                
                                {currentStoreBranches.map((item, index) => (
                                    <div key={index}>
                                        <input
                                            type="checkbox"
                                            id={item.branchID}
                                            value={item.branchID}
                                            checked={selectedBranches.includes(`${item.branchID}_${item.storeID}_${item.branchName}`)}
                                            onChange={(e) => handleSelectedBranchStore(e, item.branchID, item.storeID, item.branchName)}
                                        />
                                        <label htmlFor={item.branchID} className='ls'>&nbsp;{item.branchName}</label>
                                    </div>
                                ))}


                                <div>
                                    {currentStoreBranches?.length < 1 &&
                                        <div className='tiny faint text-center'>
                                            No branch available for current selection
                                        </div>
                                    }
                                </div>
                            </div>
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