import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../config';
import { doc, getDoc } from 'firebase/firestore';
import { Avatar, useDisclosure } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import LoadingPage from '../components/partials/Loading';
import { AddBusiness, DeleteForever, Info, Store } from '@mui/icons-material';
import Nav from '../components/nav';
import AddBranchModal from '../components/other/addBranchModal';
import { format } from 'date-fns';
import { useDeleteBranch } from '../hooks/useStore';
import { useSCrollToTop } from '../hooks/useSCroll';
import { userContext } from '../contexts/userContext';
import PurchaseBranchModal from '../components/other/purchaseBranchModal';

function SingleStoreBranch(props) {
    const { id } = useParams()
    const [store, setStore] = useState({})
    const [loading, setLoading] = useState(false)
    const modal = useDisclosure();
    const branchModal = useDisclosure();
    const { deleteBranch, loadingDel } = useDeleteBranch()
    const [userDetails] = useContext(userContext)

    const nav = useNavigate()
    useSCrollToTop()
    useEffect(() => {
        async function getSingleShop() {
            setLoading(true)
            const docRef = doc(db, 'all_stores', id)
            const item = await getDoc(docRef)
            const theStore = item.data()
            setStore(theStore)
            console.log(theStore)

            setLoading(false)
        }
        getSingleShop()
    }, [loadingDel])

    if (loading) return <LoadingPage />
    return (
        <div className='light overflow-x-hidden'>
            <Nav />
            <br />
            <div className="flex_normal">

                <button className='btn btn-custom btn-sm my-2 ms-2 tiny flex ls' onClick={() => modal.onOpen()}>
                    Add Branch &nbsp; <div style={{ fontSize: '15px' }}>
                        <AddBusiness fontSize='inherit' />
                    </div>
                </button>

                <button className='btn btn-outline-success btn-sm my-2 ms-2 tiny flex ls' onClick={() => branchModal.onOpen()}>
                    <div style={{ fontSize: '13px', fontWeight: 'bold' }}>
                        {userDetails.availableBranch ? userDetails.availableBranch : '0'}
                    </div>
                    &nbsp; Available
                </button>

            </div>
            <div className="mx-2 overflow-x-auto">
                <table className='table' style={{ fontSize: '14px' }}>
                    <thead>
                        <tr className='small'>
                            <th scope="col">S/N</th>
                            <th scope="col" style={{ whiteSpace: 'nowrap' }}>Branch Name</th>
                            <th scope="col">Created on</th>
                            <th scope="col">Statistics</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            store?.branches?.map((branch, index) => (
                                <tr className='small' style={{ verticalAlign: 'middle' }} key={index}>
                                    <td >{index + 1}</td>
                                    <td >{branch.branchName}</td>
                                    <td className=''>
                                        {branch.created_at && format(new Date(branch.created_at), 'yyyy-MM-dd')}
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-blue btn-sm tiny my-1 mx-1"
                                            // onClick={() => deleteBranch(store, branch, id)}
                                            onClick={() => nav(`/branch-statistics/${branch.branchName}`)}
                                        >
                                            statistics
                                            {/* <Info fontSize='small' /> */}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
                <AddBranchModal onOpen={modal.onOpen} onClose={modal.onClose} isOpen={modal.isOpen} store={store} id={id} setStore={setStore} />
                <PurchaseBranchModal onOpen={branchModal.onOpen} onClose={branchModal.onClose} isOpen={branchModal.isOpen} store={store} id={id} setStore={setStore}/>

                {
                    store?.branches?.length < 1 && (
                        <div className='faint small text-center py-3'>
                            No branches has been added for this store!
                        </div>
                    )
                }
            </div>


        </div>
    );
}

export default SingleStoreBranch;