import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UseGetInventoryData } from '../hooks/useThirdParties';
import Nav from '../components/nav';
import { useState } from 'react';
import { Add, Settings } from '@mui/icons-material';
import { Avatar, useDisclosure } from '@chakra-ui/react';
import LoadingPage from '../components/partials/Loading';
import { format } from 'date-fns';
import { useSCrollToTop } from '../hooks/useSCroll';
import AddManagerModal from '../components/other/AddManagerModal';
import ManagerActionsModal from '../components/other/ManagerActionsModal';

function ManageManagers(props) {
    const { invId } = useParams()
    const { handleGetInventoryData, inventoryData, Loading } = UseGetInventoryData()
    const [filterText, setFilterText] = useState('')
    const [theManager, setTheManager] = useState({})
    const modal1 = useDisclosure();
    const modal2 = useDisclosure();
    useSCrollToTop()
    useEffect(() => {
        handleGetInventoryData(invId)
    }, [])

    if (Loading) return <LoadingPage />

    const filteredCustomers = inventoryData?.managers?.filter((customer) => {
        return (
            customer.name.toLowerCase().includes(filterText.toLowerCase()) ||
            customer.email.toLowerCase().includes(filterText.toLowerCase()) ||
            customer.phone.toLowerCase().includes(filterText.toLowerCase())
        );
    });

    return (
        <div>
            <div className='bg-light overflow-x-hidden' >
                <Nav />
                <br />

                <div className='bg-white py-3 px-2 box-shadow rounded mx-2'>
                    <input
                        type="text"
                        className='form-control'
                        placeholder='Search product...'
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                    />
                    <center>
                        <small className="tiny mt-1">Search by manager by name, email, phone number.</small>
                    </center>
                </div>
                <br />
                <div className='mx-3'>
                    <button className='btn btn-custom btn-sm mt-2 ms-1 flex mb-3' onClick={() => modal1.onOpen()}>
                        Add Manager &nbsp; <Add fontSize='small' />
                    </button>
                    <div className='overflow-x-auto'>
                        <small className='faint ms-1'> All categories</small>
                        <br />
                        <table className="table mt-2">
                            <thead>
                                <tr className="tiny">
                                    <th scope="col">S/N</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Date added</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredCustomers?.map((manager, index) => (
                                        <tr key={index} className="tiny" style={{ verticalAlign: "middle" }}>
                                            <th scope="row">{index + 1}</th>
                                            <th>{manager.name}</th>
                                            <td>{manager.email}</td>
                                            <td>{manager.phone}</td>
                                            <td>{manager.created_at && format(new Date(manager.created_at), 'yyyy-MM-dd')}</td>
                                            <td><button
                                                className='btn btn-custom btn-sm'
                                                onClick={() => { modal2.onOpen(); setTheManager(manager) }}
                                            ><Settings fontSize='string' /></button></td>
                                        </tr>
                                    )
                                    )}
                            </tbody>
                        </table>
                    </div>
                    {
                        !inventoryData?.managers || !inventoryData?.managers.length || inventoryData?.managers.length < 1  ? 
                        <center className='tiny faint'>You have not created any managers</center>: <span></span>
                    }
                </div>
                <AddManagerModal onOpen={modal1.onOpen} onClose={modal1.onClose} isOpen={modal1.isOpen} id={invId} inventoryData={inventoryData} />
                <ManagerActionsModal onOpen={modal2.onOpen} onClose={modal2.onClose} isOpen={modal2.isOpen} theManager={theManager} inventoryData={inventoryData} handleGetInventoryData={handleGetInventoryData} />

            </div>
        </div>
    );
}

export default ManageManagers;