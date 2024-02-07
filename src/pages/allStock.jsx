import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Nav from '../components/nav';
import { UseChangeQuantity, UseDeleteStock, UseGetAllStocks } from '../hooks/useStocks';
import LoadingPage from '../components/partials/Loading';
import { Avatar, useDisclosure } from '@chakra-ui/react';
import { Add, DeleteForever, Edit, Image, Info } from '@mui/icons-material';
import IncreaseStockModal from '../components/other/increaseStockModal';
import EditStockModal from '../components/other/EditStockModal';
import useAuth from '../hooks/auth';
import { useSCrollToTop } from '../hooks/useSCroll';

function AllStock(props) {
    const { id } = useParams();
    const { getStocks, Loading, userStocks } = UseGetAllStocks();
    const [filterText, setFilterText] = useState('');
    const [filteredStocks, setFilteredStocks] = useState([]);
    const [sortCriteria, setSortCriteria] = useState('');
    const [sortedStocks, setSortedStocks] = useState([]);
    const [selectedOption, setSelectedOption] = useState('All');
    const { handleDeleteStock, Loading: loadingDelete } = UseDeleteStock()
    const [clickedItem, setClicked] = useState({})
    const { onOpen, isOpen, onClose } = useDisclosure()
    const modal2 = useDisclosure()
    const [newVariation, setNewVariation] = useState('');

    const { handleChangeQuantity, Loading: loadingChange } = UseChangeQuantity()
    const { user } = useAuth()
    useSCrollToTop()
    useEffect(() => {
        getStocks(id);
    }, [loadingDelete, loadingChange]);

    useEffect(() => {
        const filtered = userStocks.filter(stock => {
            return (
                stock.productName.toLowerCase().includes(filterText.toLowerCase()) ||
                stock.availableQuantity.toString().includes(filterText) ||
                stock.selectedStore.toLowerCase().includes(filterText.toLowerCase()) ||
                stock.selectedBranch.toLowerCase().includes(filterText.toLowerCase()) ||
                stock.categories.toLowerCase().includes(filterText.toLowerCase()) ||
                stock.selectedSupplier.toLowerCase().includes(filterText.toLowerCase())
            );
        });
        setFilteredStocks(filtered);
    }, [filterText, userStocks]);

    useEffect(() => {
        const sorted = [...filteredStocks];
        if (sortCriteria === 'lowest price') {
            sorted.sort((a, b) => a.price - b.price);
        } else if (sortCriteria === 'Highest price') {
            sorted.sort((a, b) => b.price - a.price);
        } else if (sortCriteria === 'Highest quantity') {
            sorted.sort((a, b) => b.availableQuantity - a.availableQuantity);
        } else if (sortCriteria === 'Lowest quantity') {
            sorted.sort((a, b) => a.availableQuantity - b.availableQuantity);
        } else if (sortCriteria === 'Latest') {
            sorted.sort((a, b) => b.created_at - a.created_at);
        } else if (sortCriteria === 'First-added ') {
            sorted.sort((a, b) => a.created_at - b.created_at);
        }
        setSortedStocks(sorted);
    }, [sortCriteria, filteredStocks]);

    if (Loading || loadingDelete || loadingChange) return <LoadingPage />;

    // Custom filter function to apply selected option filter
    const customFilter = (stock) => {
        if (selectedOption === 'Out of Stock' && stock.availableQuantity < 1) {
            return true;
        } else if (selectedOption === 'In Stock' && stock.availableQuantity >= 1) {
            return true;
        } else if (selectedOption === 'All') {
            return true;
        }
        return false;
    };
    function calculateTotalQuantity(product) {
        if (!product.variations || product.variations.length === 0) {
            return 0; // No variations, so the sum is 0
        }
    
        return product.variations.reduce((sum, variation) => {
            if (variation.availableQuantity === null) {
                return sum + variation.quantity;
            }
            return sum;
        }, 0);
    }
    // Apply the custom filter to the sorted stocks
    const filteredByOption = sortedStocks.filter(customFilter);

    return (
        <div>
            <Nav />
            <div className='light px-2'  >
                <br />
                <div className='bg-white py-3 px-2 box-shadow rounded'>
                    <input
                        type="text"
                        className='form-control'
                        placeholder='Search product...'
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                    />
                    <center>
                        <small className="tiny mt-1">Search by product name, quantity, store name, branch, category, supplier/supplier email.</small>
                    </center>
                </div>
                <br />
                <div className="bg-white px-2 box-shadow rounded">
                    <br />
                   <div className="flex_normal">
                   <small className='faint'>
                        All Stocks
                    </small>
                    <div className="text-end">
                        <Link className="btn-custom btn btn-sm" to={'/add-stock/' + user.inventoryID}>
                            Add Stock <Add />
                        </Link>
                    </div>
                   </div>
                    <br />
                    <div className="flex">
                        <div className=''>
                            <select
                                className='form-select'
                                value={sortCriteria}
                                onChange={(e) => setSortCriteria(e.target.value)}
                            >
                                <option value="" disabled>
                                    Sort by
                                </option>
                                <option value="Latest">Last Added</option>
                                <option value="First-added">First Added</option>
                                <option value="lowest price">Lowest price</option>
                                <option value="Highest price">Highest price</option>
                                <option value="Highest quantity">Highest quantity</option>
                                <option value="Lowest quantity">Lowest quantity</option>
                            </select>
                        </div>
                        <div className='ms-3'>
                            <select
                                className='form-select'
                                value={selectedOption}
                                onChange={(e) => setSelectedOption(e.target.value)}
                            >
                                <option value="All">Show All</option>
                                <option value="In Stock">In Stock</option>
                                <option value="Out of Stock">Out of Stock</option>
                            </select>
                        </div>
                    </div>
                    <br />
                    <div style={{ overflow: 'auto' }}>
                        <table className="table">
                            <thead>
                                <tr className="small">
                                    <th scope="col">Image</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Store</th>
                                    <th scope="col">Branch</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Supplier</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredByOption.map((stock, index) => (
                                    <tr key={index} className="small" style={{ verticalAlign: "middle" }}>
                                        <th scope="row"><Avatar src={stock.product_url} size='sm' icon={<Image />} /></th>
                                        <th>{stock.productName}</th>
                                        <td className={stock.availableQuantity > 2 ? 'text-success' : 'text-danger'}>{stock.availableQuantity}</td>
                                        <td>{stock.selectedStore}</td>
                                        <td>{stock.selectedBranch}</td>
                                        <td>₦ {stock?.price?.toLocaleString()}</td>
                                        <td>{stock.categories}</td>
                                        <td className={stock.availableQuantity > 1 ? 'text-success' : 'text-danger'}>
                                            {stock.availableQuantity < 1 ? 'Out of Stock' : 'In Stock'}
                                            
                                        </td>
                                        <td>
                                            {
                                                stock.selectedSupplier !== '' ? (
                                                    <span>
                                                        {stock.selectedSupplier.split(' ')[0]}
                                                        <br />
                                                        <small className="tiny faint">
                                                            {stock.selectedSupplier.split(' ')[1]}
                                                        </small>
                                                    </span>
                                                ) :
                                                    (
                                                        <small className='faint'>
                                                            unselected
                                                        </small>
                                                    )
                                            }
                                        </td>
                                        <td className='flex'>
                                            <button
                                                className="btn btn-custom btn-sm mx-1"
                                                onClick={() => { setClicked(stock); onOpen() }}
                                            >
                                                <Add fontSize='small' />
                                            </button>

                                            <button
                                                className="btn btn-blue btn-sm mx-1"
                                                onClick={() => { setClicked(stock); modal2.onOpen() }}
                                            >
                                                <Info fontSize='small' />
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm mx-1"
                                                onClick={() => handleDeleteStock(stock)}
                                            >
                                                <DeleteForever fontSize='small' />
                                            </button>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <br />
                    </div>

                    {filteredByOption.length < 1 && <div className='text-center py-5 faint small'>Not product was found</div>}
                </div>
                <IncreaseStockModal onClose={onClose} onOpen={onOpen} isOpen={isOpen} clickedItem={clickedItem} id={id} getStocks={getStocks} />
                <EditStockModal onClose={modal2.onClose} onOpen={modal2.onOpen} isOpen={modal2.isOpen} clickedItem={clickedItem} id={id} getStocks={getStocks} />
                <br />
                <br />
                <br />
                <br />
            </div>
        </div>
    );
}

export default AllStock;
