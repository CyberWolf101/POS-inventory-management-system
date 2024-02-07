import React, { useContext } from 'react';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Cell } from 'recharts';
import { userContext } from '../../contexts/userContext';

function Barchart({ availableProducts, unAvailableProducts, totalWorthOfavailableProducts, inventoryData, totalAmount }) {
    const [userDetails] = useContext(userContext)
    return (
        <div className='bars'>
            <div className='my-4 bg-white'>
                <BarChart width={300} height={250} data={[
                    { name: userDetails.name + ' ' + '(owner)', inStock: availableProducts, outOfStock: unAvailableProducts },
                ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="inStock" stackId="a" fill="#82ca9d" name="in stock" />
                    <Bar dataKey="outOfStock" stackId="a" fill="#8884d8" name="out of stock" />
                </BarChart>
            </div>

            <div className='my-4 '>
                <BarChart width={300} height={250} data={[
                    { name: userDetails.name + ' ' + '(owner)', allProducts: totalAmount, sold: inventoryData?.sold },
                ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="allProducts" stackId="a" fill="#82ca9d" name="All products" />
                    <Bar dataKey="sold" stackId="a" fill="#8884d8" name="sold " />
                </BarChart>
            </div>
        </div>
    );
}

export default Barchart;