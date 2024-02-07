import React, { useRef, useState } from 'react';
import { Add, CameraAltOutlined, Download, Upload } from '@mui/icons-material';
import { Button, Switch, useToast } from '@chakra-ui/react';
import { Fade } from 'react-reveal';
import { UseAddStock, UseGetUserStore } from '../hooks/useStore';
import useValidateDetails from '../hooks/UseValidation';
import LoadingPage from '../components/partials/Loading';
import { useEffect } from 'react';
import useAuth from '../hooks/auth';
import { useParams } from 'react-router-dom';
import { UseGetInventoryData } from '../hooks/useThirdParties';
import Nav from '../components/nav';
import { UseisAuthenticated } from '../hooks/useProtectPage';
import { useSCrollToTop } from '../hooks/useSCroll';
import SelectedFile from '../components/other/selectedFile';
import VariableProduct from '../components/other/variableProduct';

function AddStock(props) {
    const [productName, setProductName] = useState('');
    const [availableQuantity, setAvailableQuantity] = useState('');
    const [variations, setVariations] = useState([]);
    const [variationPrices, setVariationPrices] = useState([]);
    const [variationAvailableQuantity, setVariationAvailableQuantity] = useState([]);

    const [productDescription, setProductDescription] = useState('');
    const [selectedStore, setSelectedStore] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSupplier, setSelectedSupplier] = useState('');
    const [discountPrice, setDiscountPrice] = useState('');
    const [WholeSalePrice, setWholeSalePrice] = useState('');
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
    const [selectedSubCategory, setSelectedSubCategory] = useState('')
    const fileInputRef = useRef(null);
    const [file, setFile] = useState([])
    const [selectedImages, setSelectedImages] = useState([]);
    const [weight, setWeight] = useState('');
    const [showVariations, setshowVariations] = useState(false);
    const [convertedVariations, setConvertedVariations] = useState([]);


    UseisAuthenticated()

    useEffect(() => {
        getAllStores()
    }, [])
    useSCrollToTop()


    function removeSize(size) {
        setsizesArray(sizesArray.filter(item => item !== size))
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
            selectedCategory, price, file, selectedSupplier, weight, convertedVariations, discountPrice, WholeSalePrice, showVariations, selectedSubCategory)
        // console.log(isValid)

        if (detailsValid) {
            // console.log(productName, availableQuantity, productDescription, selectedStore, selectedBranch,
            //     selectedCategory, price, sizesArray, colorsArray, productImage)
            handleSubmitStock(productName, availableQuantity, productDescription, selectedStore, selectedBranch,
                selectedCategory, price, file, selectedSupplier, weight, convertedVariations, discountPrice, WholeSalePrice, showVariations, selectedSubCategory)
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

    const getCategoryOptions = (branchName) => {
        const selectedStoreData = allStores.find((store) => store.storeName === selectedStore);

        if (!selectedStoreData) return null;

        const selectedBranchData = selectedStoreData.categories.filter(category => category.branchName === branchName);
        // console.log('branchName', branchName)
        // console.log('selectedBranchData', selectedBranchData)

        return selectedBranchData ? (
            <>
                <option value="" disabled>Select a Category</option>
                {selectedBranchData.map((category) => (
                    <option key={category.id} value={category.category}>
                        {category.category}
                    </option>
                ))}
            </>
        ) : null;
    };
    const getSubCategoryOptions = (category) => {
        const selectedStoreData = allStores.find((store) => store.storeName === selectedStore);

        const selectedCategoryData = selectedStoreData.categories.find((cat) => cat.category === category && cat.branchName === selectedBranch);
        console.log('selectedCategoryData', selectedCategoryData)
        if (!selectedCategoryData) return null;

        // const subCategoryData = selectedCategoryData.subCategories.filter(category => category.branchName === branchName);
        // console.log('branchName', branchName)
        // console.log('selectedBranchData', selectedBranchData)

        return selectedCategoryData.subcategories ? (
            <>
                <option value="" disabled>Select a Category</option>
                {selectedCategoryData.subcategories.map((category, index) => (
                    <option key={index} value={category}>
                        {category}
                    </option>
                ))}
            </>
        ) :

            <option value="" disabled>No subcategory created</option>;
    };


    if (LoadingStores || loadingUser || loadingInventoryData) return <LoadingPage />


    const handletypeChange = () => {
        setshowVariations(!showVariations)
    }

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);

        const newSelectedFiles = files.map((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (file.type.startsWith('image/')) {
                    setSelectedImages((prevSelectedImages) => [...prevSelectedImages, reader.result]);
                } else if (file.type.startsWith('video/')) {
                    // setVideoModalOpen(true);
                    // setSelectedVideoSrc((prevSelectedVideoSrc) => [...prevSelectedVideoSrc, reader.result]);
                    console.log('the above were not defined')
                }
            };

            reader.readAsDataURL(file);
            return file;
        });

        setFile(newSelectedFiles);
        // Clear the file input value to allow selecting the same file again
        fileInputRef.current.value = '';
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };
    return (
        <div className='addStockPage ' style={{ fontSize: '14px', letterSpacing: '1px' }} >
            <Nav />

            <br />

            <center className='faint'>Add new stock</center>
            <br />

            <div className='straight'>

                <div className="form-div border" style={{ overflowY: 'auto', height: '100dvh', width: '90%' }}>
                    <SelectedFile
                        selectedImages={selectedImages}
                        setFile={setFile}
                        setSelectedImages={setSelectedImages}
                    />


                    <div 
                    onClick={handleButtonClick}
                    className="border border-success p-3  text-success straight small rounded" style={{ flexDirection: 'column' }}>
                        <div>
                            Add product Image
                        </div>
                        <button  className='txt-teal mx-1 mt-2'>
                            <CameraAltOutlined fontSize='small' />
                        </button>
                    </div>


                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleImageUpload}
                        multiple
                    />
                    <br />

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
                            {selectedBranch && getCategoryOptions(selectedBranch)}
                        </select>


                        <label>Select subcategory:</label>
                        <select
                            value={selectedSubCategory}
                            onChange={(e) => setSelectedSubCategory(e.target.value)}
                            className="form-select"
                        >
                            {selectedCategory && getSubCategoryOptions(selectedCategory)}
                        </select>

                        <br />

                        <label>Select Supplier:</label>
                        <select
                            value={selectedSupplier}
                            onChange={(e) => setSelectedSupplier(e.target.value)}
                            className="form-select"
                        >
                            <option value="" disabled>{inventoryData?.suppliers?.length > 0 ? 'Select a Supplier' : 'You have no suppliers'}</option>

                            {
                                inventoryData?.suppliers?.map((sup) => (
                                    <option value={sup.name + ' ' + sup.email}>
                                        {sup.name}
                                    </option>
                                ))
                            }

                        </select>
                        <br />

                        <label>Weight(kg):</label>
                        <input
                            type="number"
                            className='form-control'
                            placeholder='e.g 20'
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                        <br />


                        <div className=''>
                            <Switch size="md" isChecked={showVariations} onChange={handletypeChange} colorScheme='green' />
                            <div className='text-success mx-2' style={{ fontSize: '10px' }}>
                                {
                                    showVariations ? 'Variable product' : 'Simple product'
                                }
                            </div>
                        </div>
                        {
                            showVariations ?

                                <div>
                                    <VariableProduct
                                        variations={variations}
                                        setVariations={setVariations}
                                        variationPrices={variationPrices}
                                        setVariationPrices={setVariationPrices}
                                        variationAvailableQuantity={variationAvailableQuantity}
                                        setVariationAvailableQuantity={setVariationAvailableQuantity}
                                        convertedVariations={convertedVariations}
                                        setConvertedVariations={setConvertedVariations}
                                    />
                                </div>
                                :
                                <div>


                                    <Fade>

                                        <label>Price:</label>
                                        <input
                                            type="number"
                                            className='form-control'
                                            placeholder='E.g 10,000'
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                        <br />

                                        <label>Wholesale Price:</label>
                                        <input
                                            type="number"
                                            className='form-control'
                                            placeholder='E.g 10,000'
                                            value={WholeSalePrice}
                                            onChange={(e) => setWholeSalePrice(e.target.value)}
                                        />
                                        <br />

                                        <label>Discount price:</label>
                                        <input
                                            type="number"
                                            className='form-control'
                                            placeholder='E.g 10,000'
                                            value={discountPrice}
                                            onChange={(e) => setDiscountPrice(e.target.value)}
                                        />
                                        <br />
                                        <label>Available Quantity:</label>
                                        <input
                                            type="number"
                                            className='form-control'
                                            placeholder='E.g 15'
                                            value={availableQuantity}
                                            onChange={(e) => setAvailableQuantity(e.target.value)}
                                        />

                                    </Fade>

                                </div>
                        }

                        <br />
                        <br />
                        <Button
                            colorScheme='green'
                            onClick={() => handleClick()}
                            isLoading={Loading}
                        >
                            Add Stock <Download />
                        </Button>


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
