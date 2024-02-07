import React, { useState } from 'react';
import { Add, Download, Upload } from '@mui/icons-material';
import { Button, useToast } from '@chakra-ui/react';
import { Fade } from 'react-reveal';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../config';
import { UseAddStock, UseGetUserStore } from '../hooks/useStore';
import useValidateDetails from '../hooks/UseValidation';
import LoadingPage from '../../components/partials/Loading';
import { useEffect } from 'react';
import useAuth from '../../hooks/auth';
import { useParams } from 'react-router-dom';
import { UseGetInventoryData } from '../hooks/useThirdParties';
import Nav from '../../components/nav';
import { UseisAuthenticated } from '../../hooks/useProtectPage';
import { useSCrollToTop } from '../../hooks/useSCroll';

function AddStock(props) {
    const [productName, setProductName] = useState('');
    const [availableSizes, setAvailableSizes] = useState('');
    const [availableQuantity, setAvailableQuantity] = useState('');
    const [availableColors, setAvailableColors] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [selectedStore, setSelectedStore] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSupplier, setSelectedSupplier] = useState('');
    const [price, setPrice] = useState('');
    const [sizesArray, setsizesArray] = useState([]);
    const [colorsArray, setColorsArray] = useState([]);
    const [productImage, setProductImage] = useState(null); //product_url
    const toast = useToast()
    const { handleSubmitStock, Loading } = UseAddStock()
    const { isValid, errorMessages, validateDetails } = useValidateDetails();
    const [LoadingStores, setLoadingStores] = useState(false)
    // const [allStores, setAllStores] = useState([])
    const { user, loadingUser } = useAuth()
    const [chosenStore, setChosenStore] = useState({})
    const { id } = useParams()
    const { handleGetInventoryData, inventoryData, Loading: loadingInventoryData } = UseGetInventoryData()
    const { getAllStores, allStores, Loading: loadingStores } = UseGetUserStore()

    UseisAuthenticated()

    useEffect(()=>{
        getAllStores()
    },[])
    useSCrollToTop()
    // useEffect(() => {
    //     async function getAllStores() {
    //         setLoadingStores(true)
    //         const collectionRef = collection(db, 'all_stores')
    //         const rawData = await getDocs(collectionRef)
    //         const storesArray = (rawData.docs.map((data) => ({ ...data.data(), id: data.id })));
    //         setAllStores(storesArray)
    //         console.log(storesArray)
    //         setLoadingStores(false)
    //     }
    //     getAllStores()
    //     handleGetInventoryData(id)
    // }, [])

    const addSize = (size) => {
        if (sizesArray.includes(size)) {
            toast({
                title: 'size already added',
                position: 'top',
            })
            return
        }
        if (size == '') {
            return
        }
        setsizesArray([...sizesArray, size])
        console.log(sizesArray)
        setAvailableSizes('')
    }
    function removeSize(size) {
        setsizesArray(sizesArray.filter(item => item !== size))
    }


    const addColor = (color) => {
        if (colorsArray.includes(color)) {
            toast({
                title: 'color already added',
                position: 'top',
            })
            return
        }
        if (color == '') {
            return
        }
        setColorsArray([...colorsArray, color])
        console.log(colorsArray)
        setAvailableColors('')
    }
    function removeColor(color) {
        setColorsArray(colorsArray.filter(item => item !== color))
    }

    const handleStoreSelect = (e) => {
        setSelectedStore(e.target.value)
        console.log(allStores)

        const theStore = allStores.find(item => item.storeName === selectedStore)
        console.log(theStore)
        setChosenStore(theStore)
    }

    function handleClick() {
        const detailsValid = validateDetails(productName, availableQuantity, productDescription, selectedStore, selectedBranch,
            selectedCategory, price, sizesArray, colorsArray, productImage, selectedSupplier)
        console.log(isValid)

        if (detailsValid) {
            // console.log(productName, availableQuantity, productDescription, selectedStore, selectedBranch,
            //     selectedCategory, price, sizesArray, colorsArray, productImage)
            handleSubmitStock(productName, availableQuantity, productDescription, selectedStore, selectedBranch,
                selectedCategory, price, sizesArray, colorsArray, productImage, selectedSupplier)
        }
    }

    // Function to generate branch options based on the selected store
    const getBranchOptions = (storeName) => {
        const selectedStoreData = allStores.find((store) => store.storeName === storeName);
        return selectedStoreData ? selectedStoreData.branches.map((branch) => (
            <option key={branch.branchID} value={branch.branchName}>
                {branch.branchName}
            </option>
        )) : null;
    };

    // Function to generate category options based on the selected branch
    const getCategoryOptions = (branchName) => {
        const selectedStoreData = allStores.find((store) => store.storeName === selectedStore);
        const selectedBranchData = selectedStoreData ? selectedStoreData.branches.find((branch) => branch.branchName === branchName) : null;
        return selectedBranchData ? selectedBranchData.categories.map((category) => (
            <option key={category} value={category}>
                {category}
            </option>
        )) : null;
    };

    if (LoadingStores || loadingUser || loadingInventoryData) return <LoadingPage />
    const filteredStore = allStores.filter((item) => {
        return item.ownerID === user.id
    })

    return (
        <div className='addStockPage ' >
            <Nav />

            <br />

            <center className='faint'>Add new stock</center>
            <br />
            <div className='straight'>
            <div className="form-div border mx-3" style={{ overflowY: 'auto', height: '100vh' }}>
                <div>
                    <div className="product-info">
                        <label>Product Name:</label>
                        <input
                            type="text"
                            className='form-control'
                            placeholder='product name'
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                        <br />

                        <label>Available Sizes:</label>
                        <div className='flex'>
                            <input
                                type="text"
                                className='form-control add-input'
                                placeholder='available sizes'
                                value={availableSizes}
                                onChange={(e) => setAvailableSizes(e.target.value)}
                            />
                            <button
                                className='add-btn btn btn-custom'
                                onClick={() => addSize(availableSizes)}
                            >
                                <Add />
                            </button>
                        </div>
                        <div className='flex tiny' style={{ overflowX: 'auto' }}>
                            {
                                sizesArray.map((size, index) => (
                                    <Fade left key={index}>
                                        <div
                                            onClick={() => removeSize(size)}
                                            className='mx-1 mt-2 avialableSizes'
                                        >
                                            {size}
                                        </div>
                                    </Fade>
                                ))
                            }
                        </div>
                        {
                            sizesArray.length > 0 && (
                                <div className='tiny faint mt-1'>
                                    click on size to remove.
                                </div>
                            )
                        }
                        <br />

                        <label>Available Quantity:</label>
                        <input
                            type="number"
                            className='form-control'
                            placeholder='available quantity'
                            value={availableQuantity}
                            onChange={(e) => setAvailableQuantity(e.target.value)}
                        />
                        <br />

                        <label>Available Colors:</label>
                        <div className="flex">
                            <input
                                type="text"
                                className='form-control add-input'
                                placeholder='e.g red, blue'
                                value={availableColors}
                                onChange={(e) => setAvailableColors(e.target.value)}
                            />
                            <button className='add-btn btn btn-custom' onClick={() => addColor(availableColors)}>
                                <Add />
                            </button>
                        </div>
                        <div className='flex tiny' style={{ overflowX: 'auto' }}>
                            {
                                colorsArray.map((color, index) => (
                                    <Fade left key={index}>
                                        <div
                                            onClick={() => removeColor(color)}
                                            className='mx-1 mt-2 avialableSizes'
                                        >
                                            {color}
                                        </div>
                                    </Fade>
                                ))
                            }
                        </div>
                        {
                            colorsArray.length > 0 && (
                                <div className='tiny faint mt-1'>
                                    click on color to remove.
                                </div>
                            )
                        }
                        <br />

                        <label>Product Description:</label>
                        <textarea
                            className='form-control'
                            placeholder='product description'
                            rows='4'
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                        />
                        <br />

                    </div>




                    {/* Add more input fields for select store, select branch, select category, price, and product image */}
                    <label>Select Store:</label>
                    <select
                        value={selectedStore}
                        onChange={handleStoreSelect}
                        className="form-select"
                    >
                        <option value="" disabled>Select a Store</option>
                        {allStores.map((store) => (
                            <option key={store.storeName} value={store.storeName}>
                                {store.storeName}
                            </option>
                        ))}
                    </select>
                    <br />

                    <label>Select Branch Store:</label>
                    <select
                        value={selectedBranch}
                        onChange={(e) => setSelectedBranch(e.target.value)}
                        className="form-select"
                    >
                        <option value="" disabled>Select a Branch</option>
                        {selectedStore && getBranchOptions(selectedStore)}
                    </select>
                    <br />

                    <label>Select Category:</label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="form-select"
                    >
                        <option value="" disabled>Select a Category</option>
                        {selectedBranch && getCategoryOptions(selectedBranch)}
                    </select>
                    <br />

                    <label>Select Supplier:</label>
                    <select
                        value={selectedSupplier}
                        onChange={(e) => setSelectedSupplier(e.target.value)}
                        className="form-select"
                    >
                        <option value="" disabled>{inventoryData?.suppliers?.length > 0 ? 'Select a Supplier' : 'You no suppliers'}</option>

                        {
                            inventoryData?.suppliers?.map((sup) => (
                                <option value={sup.name + ' ' + sup.email}>
                                    {sup.name}
                                </option>
                            ))
                        }

                    </select>
                    <br />

                    <label>Price:</label>
                    <input
                        type="number"
                        className='form-control'
                        placeholder='price'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <br />

                    <label>Product Image:</label>
                    <input
                        type="file"
                        className='form-control border border-2'
                        placeholder='product image URL'
                        onChange={(e) => setProductImage(e.target.files[0])}
                    />

                    <br />
                    <Button
                        colorScheme='blue'
                        onClick={() => handleClick()}
                        isLoading={Loading}
                    >
                        Add Stock <Download />
                    </Button>


                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </div>

            </div>
            </div>
           
        </div>
    );
}

export default AddStock;
