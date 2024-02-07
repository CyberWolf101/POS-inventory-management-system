import React, { useEffect } from 'react';
import Nav from '../components/nav';
import Cards from '../components/home/cards';
import { useNavigate, useParams } from 'react-router-dom';
import { UseGetAllStocks } from '../hooks/useStocks';
import LoadingPage from '../components/partials/Loading';
import Title from '../components/home/title';
import Barchart from '../components/home/barchart';
import { useSCrollToTop } from '../hooks/useSCroll';
import OtherCards from '../components/home/otherCards';
import { useContext } from 'react';
import { userContext } from '../contexts/userContext';
import { useToast } from '@chakra-ui/react';
import { InventoryDataContext } from '../contexts/inventoryDataContext';

function HomeAdmin(props) {
    const { getStocks, Loading: loadingStocks, userStocks } = UseGetAllStocks();
    const { id } = useParams()
    const [userDetails] = useContext(userContext)
    const nav = useNavigate()
    const toast = useToast()
    const [inventoryData, setInventoryData] = useContext(InventoryDataContext)

    useSCrollToTop()
    useEffect(() => {
        if (!userDetails.id) {
            nav('/')
        }
        if (!userDetails.pos_admin) {
            toast({
                title: 'Null user',
                description: 'This account has not been registered for this service',
                position: 'top',
                variant: 'subtle',
                duration: 5000,
                isClosable: true,
                colorScheme:'green'
            })
            nav('/account/subscibe-POS')
        }
    }, [])


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

    const totalWorthOfavailableProducts = productsWithAvailableQuantity.reduce((acc, product) => {
        const amount = Number(product.availableQuantity) * Number(product.price);
        return acc + amount;
    }, 0);

    if (loadingStocks || loadingStocks) return <LoadingPage />
    return (
        <div className='light'>
            <div>
                <Nav />
            </div>
            <Title />

            <Cards inventoryData={inventoryData} totalAmount={totalAmount} availableProducts={availableProducts} unAvailableProducts={unAvailableProducts} totalWorth={totalWorth} totalWorthOfavailableProducts={totalWorthOfavailableProducts} />

            {/* stock worth, amount made */}
            <Barchart availableProducts={availableProducts} totalAmount={totalAmount} unAvailableProducts={unAvailableProducts} totalWorthOfavailableProducts={totalWorthOfavailableProducts} inventoryData={inventoryData} />
            <OtherCards availableProducts={availableProducts} totalAmount={totalAmount} unAvailableProducts={unAvailableProducts} totalWorthOfavailableProducts={totalWorthOfavailableProducts} inventoryData={inventoryData} />
            <br />
            <br />
            <br />
            <br />
        </div>
    );
}

export default HomeAdmin;