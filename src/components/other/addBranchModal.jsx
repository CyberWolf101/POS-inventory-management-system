import React, { useContext, useState } from 'react';
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
import { uuidv4 } from '@firebase/util';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config';
import swal from 'sweetalert';
import useAuth from '../../hooks/auth';
import { userContext } from '../../contexts/userContext';

function AddBranchModal({ isOpen, onClose, store, id, setStore }) {
    const [branchName, setBranchName] = useState('')
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()
    const [userDetails, setuserDetails] = useContext(userContext)

    const handleBranch = (e) => {
        setBranchName(e.target.value)
    }
    async function addBranch() {
        if (!branchName) {
            console.log('Please provide a branch name')
            swal('Please provide a branch name')
            return
        }
        if (!userDetails.availableBranch) {
            swal('You do not any available branch slots')
            return
        }
        if (userDetails.availableBranch < 1) {
            swal('You do not any available branch slots')
            return
        }
        setLoading(true)
        const inventoryRef = doc(db, 'inventory_data', user?.inventoryID)
        const branchID = uuidv4()
        const newBranch = {
            branchName: branchName,
            created_at: Date.now(),
            branchID: branchID,
            itemsID: [],
            categories: [],
            storeID: id
        }


        try {
            const docRef = doc(db, 'all_stores', id)
            const rawData = await getDoc(docRef)
            let mainData = rawData.data()
            mainData.branches.push(newBranch)

            console.log(mainData.branches)
            console.log('store', store)


            await updateDoc(docRef, {
                branches: mainData.branches
            })
            setStore({ ...store, branches: mainData.branches })

            const userRef = doc(db, 'users', userDetails.id)
            await updateDoc(userRef, {
                availableBranch: userDetails.availableBranch - 1
            })
            setuserDetails({ ...userDetails, availableBranch: userDetails.availableBranch - 1 })

            const d = await getDoc(inventoryRef)
            const currentData = d.data()
            const newTotal = currentData.totalBranches + 1
            await updateDoc(inventoryRef, {
                totalBranches: newTotal,
            })
            setBranchName('')
            setLoading(false)

            swal('success', 'shop branch was successfuly created', 'success')
            onClose()
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
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
                                placeholder='branch name'
                                value={branchName}
                                onChange={handleBranch}
                            />
                            <button
                                onClick={() => addBranch()}
                                className='btn btn-custom w-100 mt-2'
                                disabled={loading}
                            >
                                {
                                    loading ? <Spinner /> : ' Create Store Branch'
                                }

                            </button>
                            <br />
                            <br />
                        </center>
                        <br />

                    </ModalBody>
                </ModalContent>

            </Modal >
        </div>
    );
}

export default AddBranchModal;