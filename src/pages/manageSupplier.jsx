import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UseGetInventoryData } from '../hooks/useThirdParties';
import Nav from '../components/nav';
import { useState } from 'react';
import { Add, Settings } from '@mui/icons-material';
import { Avatar, useDisclosure } from '@chakra-ui/react';
import LoadingPage from '../components/partials/Loading';
import AddSupplierModal from '../components/other/AddSupplierModal';
import { format } from 'date-fns';
import SupplierActionsModal from '../components/other/supplierActionsModal';
import { useSCrollToTop } from '../hooks/useSCroll';

function ManageSupplier(props) {
    const { id } = useParams()
    const { handleGetInventoryData, inventoryData, Loading } = UseGetInventoryData()
    const [filterText, setFilterText] = useState('')
    const [theSupplier, setTheSupplier] = useState({})
    const modal1 = useDisclosure();
    const modal2 = useDisclosure();
    useSCrollToTop()
    useEffect(() => {
        handleGetInventoryData(id)
    }, [])

    if (Loading) return <LoadingPage />

    const filteredSuppliers = inventoryData?.suppliers?.filter((supplier) => {
        // You can adjust the conditions for filtering based on your requirements.
        return (
            supplier.name.toLowerCase().includes(filterText.toLowerCase()) ||
            supplier.email.toLowerCase().includes(filterText.toLowerCase()) ||
            supplier.phone.toLowerCase().includes(filterText.toLowerCase())
        );
    });
    return (
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
                    <small className="tiny mt-1">Search by supplier by name, email, phone number.</small>
                </center>
            </div>
            <br />
            <div className='mx-3'>
                <button className='btn btn-custom btn-sm mt-2 ms-1 flex mb-3' onClick={() => modal1.onOpen()}>
                    Add Supplier &nbsp; <Add fontSize='small' />
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
                                filteredSuppliers?.map((supplier, index) => (
                                    <tr key={index} className="tiny" style={{ verticalAlign: "middle" }}>
                                        <th scope="row">{index + 1}</th>
                                        <th>{supplier.name}</th>
                                        <td>{supplier.email}</td>
                                        <td>{supplier.phone}</td>
                                        <td>{supplier.created_at && format(new Date(supplier.created_at), 'yyyy-MM-dd')}</td>
                                        <td><button
                                            className='btn btn-custom btn-sm'
                                            onClick={() => { modal2.onOpen(); setTheSupplier(supplier) }}
                                        ><Settings fontSize='string' /></button></td>
                                    </tr>
                                )
                                )}
                        </tbody>
                    </table>
                    {filteredSuppliers?.length < 1 && <center><small>You have not added any suppliers</small></center>}
                </div>

            </div>
            <AddSupplierModal onOpen={modal1.onOpen} onClose={modal1.onClose} isOpen={modal1.isOpen} id={id} inventoryData={inventoryData} />
            <SupplierActionsModal onOpen={modal2.onOpen} onClose={modal2.onClose} isOpen={modal2.isOpen} theSupplier={theSupplier} inventoryData={inventoryData} handleGetInventoryData={handleGetInventoryData} />

        </div>
    );
}

export default ManageSupplier;