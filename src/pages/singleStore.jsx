import { doc, getDoc } from 'firebase/firestore';
import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../config';
import { useState } from 'react';
import { Avatar, useDisclosure } from '@chakra-ui/react';
import { Store } from '@mui/icons-material';
import Nav from '../components/nav';
import EditStoreModal from '../components/other/editStoreModal';
import { Link } from 'react-router-dom';
import LoadingPage from '../components/partials/Loading';
import { useSCrollToTop } from '../hooks/useSCroll';

function SingleStore(props) {
    const { id } = useParams()
    const [store, setStore] = useState({})
    const [loading, setLoading] = useState(false)
    // const { isOpen, onOpen, onClose } = useDisclosure();
    const modal1 = useDisclosure();
    const modal2 = useDisclosure();
    useSCrollToTop()
    useEffect(() => {
        async function getSingleShop() {
            try {
                setLoading(true)
                const docRef = doc(db, 'all_stores', id)
                const item = await getDoc(docRef)
                const theStore = item.data()
                setStore(theStore)
                console.log(theStore)
                setLoading(false)

            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }
        getSingleShop()
    }, [])
    if (loading) return <LoadingPage />
    return (
        <div className='light'>
            <Nav />
            <br />
            {
                store && (
                    <div className='mx-3' >
                        <div className='small faint ms-2'>
                            Manage Store ({store.storeName})
                        </div>
                        <br />
                        <table className='table'>
                            <thead>
                                <tr className='small'>
                                    <th scope="col">Store logo</th>
                                    <th scope="col">Store name</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='small' style={{ verticalAlign: 'middle' }}>
                                    <td><Avatar src={store.storeLogo} size='sm' icon={<Store />} /></td>
                                    <td >{store.storeName}</td>
                                    <td className='flex'>
                                        <Link
                                            to={`/singleStore/branches/${id}`}
                                            className="btn btn-custom btn-sm tiny my-1 mx-1"
                                        >
                                            Branches
                                        </Link>
                                        <button
                                            className="btn btn-custom btn-sm tiny my-1 mx-1"
                                            onClick={() => modal1.onOpen()}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <br />
                    </div>
                )
            }
            <EditStoreModal onOpen={modal1.onOpen} onClose={modal1.onClose} isOpen={modal1.isOpen} store={store} id={id} />
        </div>
    );
}

export default SingleStore;