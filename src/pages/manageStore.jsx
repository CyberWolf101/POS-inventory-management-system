import React, { useContext } from 'react';
import Nav from '../components/nav';
import { Add, AddBusiness, Store } from '@mui/icons-material';
import { Avatar, useDisclosure } from '@chakra-ui/react';
import CreateStoreModal from '../components/other/createStoreModal';
import { useEffect } from 'react';
import { useState } from 'react';
import LoadingPage from '../components/partials/Loading';
import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../config';
import { UseDeleteStore, UseStoreEnable } from '../hooks/useStore';
import { useNavigate } from 'react-router-dom';
import { useSCrollToTop } from '../hooks/useSCroll';
import StoreStatisticsModal from '../components/other/storeStatisticsModal';
import { format } from 'date-fns';
import { userContext } from '../contexts/userContext';

function ManageStore(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const stats = useDisclosure();
    const [loading, setLoading] = useState(false)
    // const { user } = useAuth()
    const [stores, setStores] = useState([])
    const { handleStoreDelete, loading: loadingStoreDelete } = UseDeleteStore()
    const { handleStoreEnable, loading: loadingStoreEnable } = UseStoreEnable()
    const nav = useNavigate()
    const [userDetails] = useContext(userContext)
    const [clickedStore, setClickedStore] = useState({})
    useSCrollToTop()
   

    useEffect(() => {
        const getAllStores = async () => {
            try {
                setLoading(true)

                // Query only stores that belong to a specific user
                const q = query(collection(db, 'all_stores'), where('ownerID', '==', userDetails.id));
                const rawData = await getDocs(q);

                const storesArray = rawData.docs.map((data) => ({ ...data.data(), id: data.id }));
                setStores(storesArray);
                console.log('storesArray', storesArray)
            } catch (error) {
                console.error('Error fetching stores:', error);
            } finally {
                setLoading(false);
            }
        };

        getAllStores();
    }, [userDetails.id, loadingStoreDelete, loadingStoreEnable]); // Fetch stores whenever the user ID changes


    if (loading || loadingStoreDelete || loadingStoreEnable) return <LoadingPage />
    return (
        <div className='light overflow-x-hidden'>
            <Nav />
            <div className="flex_normal px-2">
                <div></div>
                <button className='btn btn-custom btn-sm mt-3 ms-1 flex' onClick={() => onOpen()}>
                    Create store &nbsp; <AddBusiness fontSize='small' />
                </button>
            </div>
            <div className='box-shadow p-2 mt-3 mx-2 rounded'>
                <br />
                <small className="tiny faint">All stores</small>

                <br />
                <br />
                <div className='overflow-x-auto'>
                    <table className='table'>
                        <thead>
                            <tr className='small'>
                                <th scope="col">S/N</th>
                                <th scope="col">Store logo</th>
                                <th scope="col">Store name</th>
                                <th scope="col" style={{ whiteSpace: 'nowrap' }}>Date created</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                stores.map((store, index) => (
                                    <tr key={index} className='small' style={{ verticalAlign: 'middle' }}>
                                        <th scope="row">{index + 1}</th>
                                        <td ><Avatar src={store.storeLogo} size='sm' icon={<Store />} /></td>
                                        <td  >{store.storeName}</td>
                                        <td>{store.created_at && format(new Date(store.created_at), 'yyyy-MM-dd')}</td>

                                        <td className='flex' >
                                            <button className="btn btn-custom btn-sm tiny my-1 mx-1" style={{ whiteSpace: 'nowrap' }} onClick={() => nav('/singleStore/' + store.id)}>Manage</button>
                                            <button className="btn btn-blue btn-sm tiny my-1 mx-1" style={{ whiteSpace: 'nowrap' }} onClick={() => { stats.onOpen(); setClickedStore(store) }}>View statistics</button>

                                            {
                                                store.isDisabled ?
                                                    <button className="btn btn-secondary btn-sm tiny my-1 mx-1" style={{ whiteSpace: 'nowrap' }} onClick={() => handleStoreEnable(store)}>enable</button>

                                                    :
                                                    <button className="btn btn-danger btn-sm tiny my-1 mx-1" style={{ whiteSpace: 'nowrap' }} onClick={() => handleStoreDelete(store)}>Disable</button>

                                            }
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
            </div>
            {
                stores?.length < 1 && (
                    <div className='text-center faint mt-5'>
                        No stores to display yet.

                        <br />

                        <button
                            className='btn btn-outline-success mt-1'
                            onClick={() => onOpen()}
                        >
                            <Add />
                        </button>
                    </div>
                )
            }

            <CreateStoreModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} store={stores} userStores={stores} />
            <StoreStatisticsModal isOpen={stats.isOpen} onClose={stats.onClose} clickedStore={clickedStore} />
            <br />
        </div>
    );
}

export default ManageStore;