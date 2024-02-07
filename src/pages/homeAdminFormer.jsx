import React, { useEffect } from 'react';
import Nav from '../components/nav';
import { GroupOutlined, PointOfSaleOutlined, ProductionQuantityLimits, ReceiptLong, Sell, SellOutlined } from '@mui/icons-material';
import useAuth from '../hooks/auth';
import LoadingPage from '../components/partials/Loading';
import { UseGetData } from '../hooks/UsePosAdmin';
import { UseGetAllStocks } from '../hooks/useStocks';
import { useParams } from 'react-router-dom';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Cell } from 'recharts';
import { NodataPie, NodataPie3 } from '../components/other/nodataPie';

function HomeAdminFormer(props) {
    const { user, loadingUser } = useAuth()
    const { Loading, inventoryData } = UseGetData()
    const { getStocks, Loading: loadingStocks, userStocks } = UseGetAllStocks();
    const { id } = useParams()
    const data = [
        { name: 'Total Added Products', value: 150 },
        { name: 'Sold Products', value: 100 },
    ];
    const COLORS = ['#8884d8', '#82ca9d', '#A0AEC0']; // Define colors for the segments

    useEffect(() => {
        getStocks(id);
    }, []);

    const totalWorth = userStocks.reduce((total, stock) => {
        const price = stock.price;
        const availableQuantity = stock.availableQuantity;
        return total + (price * availableQuantity);
    }, 0);


    const totalAmount = userStocks.reduce((total, stock) => {
        const availableQuantity = stock.availableQuantity;
        return total + availableQuantity;
    }, 0);

    // Count the number of products with availableQuantity greater than 0
    const productsWithAvailableQuantity = userStocks.filter(stock => Number(stock.availableQuantity) > 0);
    const availableProducts = productsWithAvailableQuantity.length;


    // Count the number of products with availableQuantity less than 0
    const productsWithNegativeQuantity = userStocks.filter(stock => Number(stock.availableQuantity) < 1);
    const unAvailableProducts = productsWithNegativeQuantity.length;


    if (loadingUser || Loading || loadingStocks) return <LoadingPage />
    return (
        <div style={{ height: '100vh', overflowY: 'auto' }} className='make-grid-pos'>
            <div>
                <Nav />
            </div>
            <div className='cleanUP'>

                <div className='cards-containeer' >

                    <div className='mx-3 mt-3'>
                        <div className='data-cards rounded trans'>
                            <small className='flex-column' style={{ fontSize: '14px' }}>
                                <span>Available products({totalAmount})</span>
                                <span className='flex-start'>₦ {inventoryData?.totalPrice?.toLocaleString()}.00</span>
                            </small>
                            <div style={{ fontSize: '40px' }}>
                                <PointOfSaleOutlined fontSize='inherit' />
                            </div>
                        </div>
                    </div>
                    <div className='mx-3 mt-3'>
                        <div className='data-cards rounded total-stuff'>
                            <small className='flex-column' style={{ fontSize: '14px' }}>
                                <span>Total Sales({inventoryData?.sold ? inventoryData?.sold : '0'})</span>
                                <span className='flex-start'>₦ {inventoryData?.salesTotal ? inventoryData?.salesTotal?.toLocaleString() : '0'}.00</span>
                            </small>
                            <div style={{ fontSize: '40px' }}>
                                <SellOutlined fontSize='inherit' />
                            </div>
                        </div>
                    </div>

                    <div className='mx-3 mt-3'>
                        <div className='data-cards rounded sold'>
                            <small className='flex-column' style={{ fontSize: '14px' }}>
                                <span>Products in Stock({availableProducts})</span>
                                <span className='flex-start'>₦ {totalWorth?.toLocaleString()}.00</span>
                            </small>
                            <div style={{ fontSize: '40px' }}>
                                <ReceiptLong fontSize='inherit' />
                            </div>
                        </div>
                    </div>

                    {/* <div className='mx-3 mt-3'>
                        <div className='data-cards rounded' style={{ background: '#00A3C4' }}>
                            <small className='flex-column' style={{ fontSize: '14px' }}>
                                <span>Out of Stock({unAvailableProducts})</span>
                                <span className='flex-start'></span>
                            </small>
                            <div style={{ fontSize: '40px' }}>
                                <ProductionQuantityLimits fontSize='inherit' />
                            </div>
                        </div>
                    </div> */}
                </div>



                <div style={{ width: '100%', overflowX: 'hidden' }} className='charts-con light'>

                    {
                        availableProducts > 0 || unAvailableProducts > 0 ? (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='my-3'>
                                <PieChart width={400} height={200}>
                                    <Pie
                                        data={
                                            [
                                                { name: 'In stock', value: availableProducts },
                                                { name: 'Out of stock', value: unAvailableProducts },
                                            ]
                                        }
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        label
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </div>
                        ) :
                            (
                                <div>
                                    <NodataPie3 />
                                </div>
                            )
                    }

                    {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='my-3'>
    <BarChart width={300} height={250} data={[
        { name: user.name + ' ' + '(owner)', inStock: availableProducts, outOfStock: unAvailableProducts },
    ]}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="inStock" stackId="a" fill="#8884d8" name="in stock" />
        <Bar dataKey="outOfStock" stackId="a" fill="#82ca9d" name="out of stock" />
    </BarChart>
</div> */}

                    {
                        inventoryData?.totalAddedStock > 0 || inventoryData?.sold > 0 ? (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='my-3'>
                                <PieChart width={400} height={200}>
                                    <Pie
                                        data={
                                            [
                                                { name: 'Stocked Products', value: inventoryData?.totalAddedStock },
                                                { name: 'Sold Products', value: inventoryData?.sold },
                                            ]
                                        }
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        label
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </div>
                        ) : (
                            <div>

                            </div>
                        )
                    }





                    {
                        totalAmount > 0 || unAvailableProducts > 0 ? (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='my-3'>
                                <PieChart width={400} height={200}>
                                    <Pie
                                        data={
                                            [
                                                { name: 'Available stock', value: totalAmount },
                                                { name: 'Unavailable stock', value: unAvailableProducts },
                                            ]
                                        }
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        label
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </div>
                        ) : (
                            <NodataPie />
                        )
                    }



                    <div>

                    </div>

                    <br />
                </div>
                {/* <div className='inventory-info'>
<OtherAdminDetails />
</div> */}
            </div>




            <br />
            <br />
            <br />
        </div >
    );
}

export default HomeAdminFormer;