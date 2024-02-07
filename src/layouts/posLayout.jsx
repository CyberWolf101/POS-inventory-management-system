import { Outlet, NavLink, useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react";
import Nav from "../components/nav";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../config";
import LoadingPage from "../components/partials/Loading";
import { Fade } from "react-reveal";
import { AddCircleOutline, Apps, CardMembershipOutlined, GridView, GridViewOutlined, Group, Payments, PendingActions, SellOutlined, Settings, Store, TableRows, TableRowsOutlined } from "@mui/icons-material";
import logo from '../Assets/logo1.png'
import { viewContext } from "../contexts/themeContext";
import { userContext } from "../contexts/userContext";
import useAuth from "../hooks/auth";
import {
  CategoryOutlined,
  GroupOutlined,
  Home,
  HomeOutlined,
  HourglassBottomOutlined,
  HourglassTopOutlined,
  Inventory2Outlined,
  LocalShipping,
  LocalShippingOutlined,
  LogoutOutlined,
  SafetyCheck,
  SettingsOutlined,
  StoreOutlined,
  SupervisedUserCircleOutlined
} from '@mui/icons-material';
import { useLogout } from "../hooks/logout";
import { useToast } from "@chakra-ui/react";


export default function PosLayout() {
  const [authUser, isLoading, error] = useAuthState(auth)
  const navigate = useNavigate()
  const currentURL = window.location.href;
  const [gridView, setgridView] = useContext(viewContext)
  const view = JSON.parse(localStorage.getItem('view'))
  const [userDetails, setuserDetails] = useContext(userContext)
  const { user } = useAuth()
  const { logout } = useLogout();
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
  useEffect(() => {
    if (view) {
      setgridView(view)
    } else {
      setgridView(true)
    }
    console.log(view)
  }, [])



  const makeGrid = () => {
    setgridView(true)
    localStorage.setItem('view', true)
  }
  const makeTable = () => {
    setgridView(false)
    localStorage.setItem('view', false)
  }

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
  return (
    <div className="" style={{ height: '100dvh', overflowY: 'auto' }}>
      <div className="admin_layout">
        <div className='sidebar'>
          <div className="light straight" style={{ height: '45px', color: 'black', borderRadius: '4px' }} >
            <img src={logo} alt="" style={{ height: '24px' }} />
          </div>

          <NavLink to={'/profile/pos-admin/' + user.id} onClick={() => document.querySelector('#offcanvasExample').classList.remove('show')}>
            <div className="nav-link responsive-nav-link">
              <HomeOutlined /> Dashboard
            </div>
          </NavLink>
          <NavLink to={'/profile/pos-plan/' + user.inventoryID} onClick={() => document.querySelector('#offcanvasExample').classList.remove('show')}>
            <div className="nav-link responsive-nav-link">
              <SafetyCheck /> Plan
            </div>
          </NavLink>
          <NavLink to={'/account/manage-pos-store'} onClick={() => document.querySelector('#offcanvasExample').classList.remove('show')}>
            <div className="nav-link responsive-nav-link">
              <StoreOutlined /> Manage Store
            </div>
          </NavLink>
          <NavLink to={'/pos-user/manage-categories'} onClick={() => document.querySelector('#offcanvasExample').classList.remove('show')}>
            <div className="nav-link responsive-nav-link">
              <CategoryOutlined /> Manage Categories
            </div>
          </NavLink>
          <NavLink to={'/pos/manage-supplier/' + user.inventoryID} onClick={() => document.querySelector('#offcanvasExample').classList.remove('show')}>
            <div className="nav-link responsive-nav-link">
              <LocalShippingOutlined /> Manage Suppliers
            </div>
          </NavLink>
          <NavLink to={"/post/manage-customer/" + user.inventoryID} onClick={() => document.querySelector('#offcanvasExample').classList.remove('show')}>
            <div className="nav-link responsive-nav-link">
              <GroupOutlined /> Manage Customers
            </div>
          </NavLink>

          <NavLink to={"/post/manage-sales-rep/" + user.inventoryID} onClick={() => document.querySelector('#offcanvasExample').classList.remove('show')}>
            <div className="nav-link responsive-nav-link">
              <SellOutlined /> Manage Sales Rep.
            </div>
          </NavLink>
          <div className="dropdown mt-2 mb-3">
            <button className="dropdown-toggle flex nav-btn responsive-nav-link" type="button" data-bs-toggle="dropdown">
              <Inventory2Outlined fontSize="small" /> Manage Stock
            </button>
            <ul className="dropdown-menu p-2 text-success">
              <li>
                <button onClick={navigateToAddStock}
                  className="flex"
                ><AddCircleOutline fontSize="small" />&nbsp;Add stock</button>
              </li>
              <hr />
              <li>
                <button onClick={navigateToAllStock}
                  className="flex"
                ><Inventory2Outlined fontSize="small" />&nbsp; All stock</button>
              </li>
            </ul>
          </div>
          <button onClick={logout} className="flex mt-1 nav-btn responsive-nav-link">
            <LogoutOutlined fontSize="small" /> Logout
          </button>

          <br />
          <br />
        </div>
        <div></div>
        <div className='contents' >
          <div className="">
            <main>
              <Outlet />
            </main>
          </div>
        </div>

      </div>
    </div>
  )
}
