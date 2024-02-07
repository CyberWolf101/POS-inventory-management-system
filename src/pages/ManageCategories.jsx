import React, { useContext } from 'react';
import Nav from '../components/nav';
import { Add, DeleteForever, Tune } from '@mui/icons-material';
import { useDisclosure } from '@chakra-ui/react';
import CategoryModal from '../components/other/categoryModal';
import { useEffect } from 'react';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { useState } from 'react';
import LoadingPage from '../components/partials/Loading';
import { UseDeleteCategory, UseGetUserStore } from '../hooks/useStore';
import { useSCrollToTop } from '../hooks/useSCroll';
import { userContext } from '../contexts/userContext';
import SubCategoryModal from '../components/other/subCategoryModal';

function ManageCategories() {
    const [userDetails] = useContext(userContext)
    const { handleDeleteCategory, Loading } = UseDeleteCategory()
    const [selectedCategory, setSelectedCategory] = useState({})
    const modal = useDisclosure()
    useSCrollToTop()
    const { getAllStores, allStores, Loading: loadingStores } = UseGetUserStore()
    const sub = useDisclosure()

    useEffect(() => {
        getAllStores();
    }, [userDetails.id, Loading]); // Fetch stores whenever the user ID changes

    if (loadingStores || Loading) return <LoadingPage />;


    return (
        <div className='bg-light overflow-x-hidden' >
            <Nav />
            <br />
            <div className='mx-3'>
                <button className='btn btn-custom btn-sm mt-2 ms-1 flex mb-2' onClick={() => modal.onOpen()}>
                    Add Category &nbsp; <Add fontSize='small' />
                </button>
                <div className='overflow-x-auto'>
                    <small className='faint ms-1'> All categories</small>
                    <br />
                    <table className="table">
                        <thead>
                            <tr className="tiny">
                                <th scope="col">Category</th>
                                <th scope="col">Store</th>
                                <th scope="col">Branch</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {allStores.map((item) => (
                                item.categories.map((category, index) => (
                                    <tr key={index} className="tiny" style={{ verticalAlign: "middle" }}>
                                        <th scope="row">{category.category}</th>
                                        <td>{category.storeName}</td>
                                        <td>{category.branchName}</td>
                                        <td className="flex">
                                            <button
                                                className="btn btn-custom btn-sm tiny my-1 mx-1"
                                                onClick={() => { sub.onOpen(); setSelectedCategory(category) }}
                                                style={{ fontSize: '12px' }}
                                            >
                                                <Tune fontSize='inherit' />
                                                {/* Add subcategories */}
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm tiny my-1 mx-1"
                                                onClick={() => handleDeleteCategory(category, allStores)}
                                                style={{ fontSize: '12px' }}
                                            >
                                                {/* Delete */}
                                                <DeleteForever fontSize='inherit' />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <CategoryModal onOpen={modal.onOpen} onClose={modal.onClose} isOpen={modal.isOpen} stores={allStores} getAllStores={getAllStores} />
            <SubCategoryModal selectedCategory={selectedCategory} isOpen={sub.isOpen} onClose={sub.onClose} getAllStores={getAllStores}/>
        </div>
    );
}

export default ManageCategories;