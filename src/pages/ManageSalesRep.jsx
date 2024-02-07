import React, { useEffect, useState } from 'react';
import Nav from '../components/nav';
import { Add, Settings } from '@mui/icons-material';
import { useDisclosure } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { UseGetInventoryData } from '../hooks/useThirdParties';
import AddSalesRepModal from '../components/other/AddSalesRepModal';
import useAuth from '../hooks/auth';
import LoadingPage from '../components/partials/Loading';
import { db } from '../config';
import { format } from 'date-fns';
import SalesRepActionsModal from '../components/other/salesRepActionsModal';
import { UseisAuthenticated } from '../hooks/useProtectPage';
import { useSCrollToTop } from '../hooks/useSCroll';

function ManageSalesRep(props) {
    const modal = useDisclosure()
    const modal2 = useDisclosure()
    const [allStores, setAllStores] = useState([])
    const { id } = useParams()
    const [LoadingStores, setLoadingStores] = useState(false)
    const { user, loadingUser } = useAuth()
    const { handleGetInventoryData, inventoryData, Loading } = UseGetInventoryData()
    const [filterText, setFilterText] = useState('')
    const [theRep, setTheRep] = useState({})
    UseisAuthenticated()
    useSCrollToTop()
    useEffect(() => {
        async function getAllStores() {
            setLoadingStores(true)
            const collectionRef = collection(db, 'all_stores')
            const rawData = await getDocs(collectionRef)
            const storesArray = (rawData.docs.map((data) => ({ ...data.data(), id: data.id })));
            setAllStores(storesArray)
            console.log(storesArray)
            setLoadingStores(false)
        }
        handleGetInventoryData(id)
        console.log('done')
        getAllStores()
    }, [])

    if (LoadingStores || loadingUser || Loading) return <LoadingPage />
    const filteredReps = inventoryData?.salesRep?.filter((rep) => {
        return (
            rep.name.toLowerCase().includes(filterText.toLowerCase()) ||
            rep.email.toLowerCase().includes(filterText.toLowerCase()) ||
            rep.phone.toLowerCase().includes(filterText.toLowerCase()) ||
            rep.branch.toLowerCase().includes(filterText.toLowerCase()) ||
            rep.store.toLowerCase().includes(filterText.toLowerCase()) 
        );
    });
    return (
        <div className='light overflow-x-hidden'>
            <Nav />
            <br />
            <div className='bg-white py-3 px-2 box-shadow rounded mx-2'>
                <input
                    type="text"
                    className='form-control'
                    placeholder='Search sales rep...'
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                />
                <center>
                    <small className="tiny mt-1">Search by customer by name, email, phone number.</small>
                </center>
            </div>
            <div className="mx-3">
                <button className='btn btn-custom btn-sm mt-2 ms-1 flex mb-2' onClick={() => modal.onOpen()}>
                    Create sales rep. &nbsp; <Add fontSize='small' />
                </button>
                <div className='overflow-x-auto'>
                    <small className='faint ms-1'> All categories</small>
                    <br />
                    <table className="table mt-2">
                        <thead>
                            <tr className="tiny">
                                <th scope="col">S/N</th>
                                <th scope="col">Name</th>
                                <th scope="col">Store</th>
                                <th scope="col">Brach</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">created</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredReps?.map((rep, index) => (
                                    <tr key={index} className="tiny" style={{ verticalAlign: "middle" }}>
                                        <th scope="row">{index + 1}</th>
                                        <th>{rep.name}</th>
                                        <th>{rep.store}</th>
                                        <th>{rep.branch}</th>
                                        <td>{rep.email === '' ? 'unset': rep.email }</td>
                                        <td>{rep.phone === '' ? 'unset': rep.phone }</td>
                                        <td>{rep.created_at && format(new Date(rep.created_at), 'yyyy-MM-dd')}</td>
                                        <td><button
                                         className='btn btn-custom btn-sm'
                                         onClick={() =>{ modal2.onOpen(); setTheRep(rep)}}
                                         ><Settings fontSize='string' /></button></td>
                                    </tr>
                                )
                                )}
                        </tbody>
                    </table>
                </div>
            </div>
            <AddSalesRepModal onOpen={modal.onOpen} onClose={modal.onClose} isOpen={modal.isOpen} allStores={allStores} userID={user.id} id={id} handleGetInventoryData={handleGetInventoryData} />
            <SalesRepActionsModal onOpen={modal2.onOpen} onClose={modal2.onClose} isOpen={modal2.isOpen} theRep={theRep} inventoryData={inventoryData} handleGetInventoryData={handleGetInventoryData} />
       
        </div>
    );
}

export default ManageSalesRep;