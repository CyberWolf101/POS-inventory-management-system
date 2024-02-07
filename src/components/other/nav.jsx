import {
    CategoryOutlined,
    Group,
    GroupOutlined,
    Home,
    HomeOutlined,
    HourglassBottomOutlined,
    HourglassTopOutlined,
    Inventory2Outlined,
    LocalShipping,
    LocalShippingOutlined,
    LogoutOutlined,
    Menu,
    SafetyCheck,
    SellOutlined,
    Settings,
    SettingsOutlined,
    Store,
    StoreOutlined,
    SupervisedUserCircleOutlined
} from '@mui/icons-material';
import React from 'react';
import '../pos.css';
import { Avatar, useToast } from '@chakra-ui/react';
import useAuth from '../../hooks/auth';
import { useNavigate } from 'react-router-dom';

function Nav(props) {
    const { user } = useAuth();
    const navigate = useNavigate();
    const toast = useToast()

    function toastUser() {
        toast({
            title: 'Subscription due',
            description: 'To ensure that you continue to have access to all of our features, please renew your subscription.',
            position: 'top',
            duration: 10000,
            variant: 'subtle',
            status: 'error',
            isClosable: true
        })
    }
    const navigateToDashboard = () => {
        if (user.POSsubscriptionDue > Date.now()) {
            navigate('/profile/pos-admin/' + user.id);
        } else {
            toastUser()
            navigate('/profile/pos-plan/' + user.inventoryID);
        }
    };

    const navigateToPlan = () => {
        if (user.POSsubscriptionDue > Date.now()) {
            navigate('/profile/pos-plan/' + user.inventoryID);
        } else {
            toastUser()
            navigate('/profile/pos-plan/' + user.inventoryID);
        }
    };

    const navigateToManageStore = () => {
        if (user.POSsubscriptionDue > Date.now()) {
            navigate('/account/manage-pos-store');
        } else {
            toastUser()
            navigate('/profile/pos-plan/' + user.inventoryID);
        }
    };

    const navigateToManageCategories = () => {
        if (user.POSsubscriptionDue > Date.now()) {
            navigate('/pos-user/manage-categories');
        } else {
            toastUser()
            navigate('/profile/pos-plan/' + user.inventoryID);
        }
    };

    const navigateToManageSuppliers = () => {
        if (user.POSsubscriptionDue > Date.now()) {
            navigate('/pos/manage-supplier/' + user.inventoryID);
        } else {
            toastUser()
            navigate('/profile/pos-plan/' + user.inventoryID);
        }
    };

    const navigateToManageCustomers = () => {
        if (user.POSsubscriptionDue > Date.now()) {
            navigate('/post/manage-customer/' + user.inventoryID);
        } else {
            toastUser()
            navigate('/profile/pos-plan/' + user.inventoryID);
        }
    };

    const navigateToManageSalesRep = () => {
        if (user.POSsubscriptionDue > Date.now()) {
            navigate('/post/manage-sales-rep/' + user.inventoryID);
        } else {
            toastUser()
            navigate('/profile/pos-plan/' + user.inventoryID);
        }
    };

    const navigateToAddStock = () => {
        if (user.POSsubscriptionDue > Date.now()) {
            navigate('/add-stock/' + user.inventoryID);
        } else {
            toastUser()
            navigate('/profile/pos-plan/' + user.inventoryID);
        }

    };

    const navigateToAllStock = () => {
        if (user.POSsubscriptionDue > Date.now()) {
            navigate('/all-stock/' + user?.id);
        } else {
            toastUser()
            navigate('/profile/pos-plan/' + user.inventoryID);
        }
    };

    const navigateToAccount = () => {
        navigate('/account');
    };

    return (
        <div>
            <div className="flex_normal admin-nav">
                <button
                    className=" btn-dark"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasExample"
                    aria-controls="offcanvasExample"
                >
                    <Menu />
                </button>
                <div className="flex">
                    <Avatar size="xs" />
                    <small className="mx-2">{user.name}</small>
                </div>
            </div>

            <div
                className="offcanvas offcanvas-start"
                tabIndex="-1"
                id="offcanvasExample"
                aria-labelledby="offcanvasExampleLabel"
                style={{ width: '70%' }}
            >
                <div className="offcanvas-header off-content-nav">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">
                        Oshofree
                    </h5>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="offcanvas-body off-content-nav">
                    <br />
                    <div className="flex-column pos-links" style={{ alignItems: 'start' }}>
                        <button onClick={navigateToDashboard}>
                            <HomeOutlined fontSize="small" /> Dashboard
                        </button>
                        <button onClick={navigateToPlan}>
                            <SafetyCheck fontSize="small" /> Plan
                        </button>
                        <button onClick={navigateToManageStore}>
                            <StoreOutlined fontSize="small" /> Manage Store
                        </button>
                        <button onClick={navigateToManageCategories}>
                            <CategoryOutlined fontSize="small" /> Manage Categories
                        </button>
                        <button onClick={navigateToManageSuppliers}>
                            <LocalShippingOutlined fontSize="small" /> Manage Suppliers
                        </button>
                        <button onClick={navigateToManageCustomers}>
                            <GroupOutlined fontSize="small" /> Manage Customers
                        </button>
                        <button onClick={navigateToManageSalesRep}>
                            <SellOutlined fontSize="small" /> Manage Sales Rep.
                        </button>
                        <div className="dropdown mt-2 mb-2">
                            <button className="dropdown-toggle flex" type="button" data-bs-toggle="dropdown">
                                <Inventory2Outlined fontSize="small" /> Manage Stock
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <button onClick={navigateToAddStock}>Add stock</button>
                                </li>
                                <li>
                                    <button onClick={navigateToAllStock}>All stock</button>
                                </li>
                            </ul>
                        </div>
                        <button onClick={navigateToAccount}>
                            <LogoutOutlined fontSize="small" /> Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Nav;
