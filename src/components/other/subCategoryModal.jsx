import React, { useEffect, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    CloseButton,
    useToast,
} from '@chakra-ui/react';
import { Add, Cancel } from '@mui/icons-material';
import { Fade } from 'react-reveal';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config'; // Import your Firebase configuration here
import swal from 'sweetalert';

function SubCategoryModal({ isOpen, onClose, selectedCategory, getAllStores }) {
    const [subcategory, setSubcategory] = useState('');
    const [subcategories, setSubcategories] = useState([]);
    const [loadingSub, setLoadingSub] = useState(false)
    const toast = useToast()
    const handleAddSubcategory = () => {
        const trimmedSubcategories = subcategory.split(',').map((s) => s.trim());
        const validSubcategories = trimmedSubcategories.filter((s) => s !== '');

        if (validSubcategories.length > 0) {
            setSubcategories([...subcategories, ...validSubcategories]);
            setSubcategory('');
        }
    };

    const handleSaveSubcategories = async () => {
        try {
            setLoadingSub(true)
            const storeRef = doc(db, 'all_stores', selectedCategory.storeID);
            const storeData = (await getDoc(storeRef)).data();

            // Update the categories at the store level
            const updatedCategories = storeData.categories.map(category => {
                if (category.id === selectedCategory.id) {
                    // Update the subcategories for the selected category
                    return {
                        ...category,
                        subcategories: subcategories,
                    };
                }
                return category;
            });

            await updateDoc(storeRef, {
                categories: updatedCategories,
            });
            await getAllStores()
            setSubcategory('')
            onClose()
            setSubcategories([])
            setLoadingSub(false)
            toast({
                title: 'Subcategory Added for ' + selectedCategory?.branchName,
                position: 'top',
                isClosable: true,
                status: 'success',
                duration: 1700,
                variant:'subtle'
            })
        } catch (error) {
            console.error('Error updating subcategories:', error);
            swal('An error occured!')
        }
    };

    const handleRemoveSubcategory = (index) => {
        const updatedSubcategories = [...subcategories];
        updatedSubcategories.splice(index, 1);
        setSubcategories(updatedSubcategories);
    };
    useEffect(() => {
        if (selectedCategory?.subcategories) {
            setSubcategories(selectedCategory.subcategories)
        } else {
            setSubcategories([])
        }
    }, [selectedCategory])

    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent style={{ marginTop: '100px' }}>
                    <center className='modalHeader'>
                        <ModalHeader>
                            <div className='tiny faint'>{selectedCategory.category}</div>
                        </ModalHeader>
                        <ModalCloseButton />
                    </center>
                    <ModalBody>
                        <center className='small'>
                            Add subcategories for {selectedCategory.category}
                            <br />
                            <div className="flex">
                                <input
                                    type="text"
                                    value={subcategory}
                                    onChange={(e) => setSubcategory(e.target.value)}
                                    className='form-control add-input'
                                    placeholder='subcategory...'
                                    style={{ fontSize: '14px' }}
                                />
                                <button
                                    onClick={handleAddSubcategory}
                                    className='btn btn-custom add-btn'
                                >
                                    <Add />
                                </button>
                            </div>
                            <br />

                        </center>
                        <br />

                        {subcategories.length > 0 && (
                            <div>
                                <div className='tiny faint'>Added Subcategories:</div>
                                <div className='flex tiny' style={{ overflowX: 'auto' }}>
                                    {subcategories.map((subcat, index) => (
                                        <div key={index}
                                            onClick={() => handleRemoveSubcategory(index)}
                                            className='mx-1 mt-2 avialableSizes flex bg-custom rounded'
                                        >
                                            <Fade left>
                                                <div className='mx-1'>
                                                    {subcat}
                                                </div>

                                                <div
                                                    className='mx-1'
                                                // style={{fontSize:'1px'}}
                                                >
                                                    <Cancel fontSize='inherit' />
                                                </div>
                                            </Fade>

                                        </div>
                                    ))}
                                </div>
                                <br />
                                <Button
                                    onClick={handleSaveSubcategories}
                                    // className='btn btn-custom add-btn'
                                    size='sm'
                                    colorScheme='green'
                                    isLoading={loadingSub}
                                >
                                    Save Subcategories
                                </Button>
                            </div>
                        )}
                        <br />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default SubCategoryModal;
