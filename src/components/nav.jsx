import React, { useContext } from "react";
import { Fade } from "react-reveal";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/auth";
import { Avatar, Button, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AccountBox, Assessment, Menu, BarChart, CardMembershipOutlined, CloseOutlined, ClosedCaptionOutlined, Engineering, Group, Login, Logout, MenuBook, PendingActions, SellOutlined, Shop, Store, Verified, Close, Settings, Payments, NotificationAddRounded, Notifications, NotificationsOutlined, GridView, TableChart, TableRows, Diversity1Outlined, AddCircle, AddCircleOutline, Calculate, SupportAgent } from '@mui/icons-material';
import logo from '../Assets/logo1.png'
import { NavLink } from "react-router-dom";
import { auth } from "../config";
import { useLogout } from '../hooks/logout'
import { viewContext } from "../contexts/themeContext";
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
import { UseisAuthenticated, UseisPosOwner } from "../hooks/useProtectPage";
import { userContext } from "../contexts/userContext";
import CalculatorModal from "./other/CalculatorModal";
import { InventoryDataContext } from "../contexts/inventoryDataContext";

function Nav(props) {
  const { logout, isLoading } = useLogout();
  const [isAdmin, setAdmin] = useState(false);
  const nav = useNavigate();
  // const { user, isLoading: pending } = useAuth();
  // const [authUser, error] = useAuthState(auth);
  const currentURL = window.location.href;
  const [gridView, setgridView] = useContext(viewContext)
  const view = JSON.parse(localStorage.getItem('view'))
  const navigate = useNavigate();
  const toast = useToast()
  const [userDetails, setuserDetails] = useContext(userContext)
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [inventoryData, setInventoryData] = useContext(InventoryDataContext)
  UseisAuthenticated()
  // UseisPosOwner()
  const handleView = () => {
    setgridView(!gridView)
    localStorage.setItem('view', !gridView)
  }
  // useEffect(()=>{
  //   if(!user.pos_admin && !pending){
  //     nav('/account/subscibe-POS')
  //   }
  // },[user])
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

  const navigateToAddStock = () => {
    if (userDetails.POSsubscriptionDue > Date.now()) {
      navigate('/add-stock/' + userDetails.inventoryID);
    } else {
      toastUser()
      navigate('/profile/pos-plan/' + userDetails.inventoryID);
    }

  };

  const navigateToAllStock = () => {
    if (userDetails.POSsubscriptionDue > Date.now()) {
      navigate('/all-stock/' + userDetails?.id);
    } else {
      toastUser()
      navigate('/profile/pos-plan/' + userDetails.inventoryID);
    }
  };

  return (
    <div>

      <Fade top duration={1500}>
        <div className="main-nav bg-success flex_normal py-1">


          <div
            className="text-ptimary btn btn-sm btn-outline-light m-2 "
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
          >
            <Menu fontSize="small" />

          </div>

          <div className="bg-light px-2 py-1 rounded dont-show">
            <img src={logo} alt="" style={{ height: '19px' }} />
          </div>


          <div className="flex cusor-pointer">
            <div className="text-white me-2" onClick={() => onOpen()}>
              <Calculate fontSize="small" />

            </div>
            <div className="flex">
              <Avatar size="xs" />
              <small className="mx-1 text-white tiny">{userDetails.name}</small>
            </div>
          </div>
        </div>
      </Fade>

      <div
        className="offcanvas offcanvas-start offNav"
        tabindex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
        style={{ width: "70%", background: '#2F855A', color: 'white' }}
      >
        <div className="offcanvas-header" style={{ background: 'white' }}>
          <div className="offcanvas-title p-2 " id="offcanvasExampleLabel" >
            <img src={logo} alt="oshofree" style={{ height: '20px' }} />
          </div>
          <button
            type="button"
            className="btn"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            style={{ color: "teal" }}
          >
            <Close />
          </button>
        </div>
        <div className="offcanvas-body">
          <div className="nav-contents">
            <div className="nav-link">
              <NavLink to={'/profile/pos-admin/' + userDetails.id} onClick={() => document.querySelector('#offcanvasExample').classList.remove('show')}>
                <HomeOutlined /> Dashboard
              </NavLink>
            </div>
            <div className="nav-link">
              <NavLink to={'/profile/pos-plan/' + userDetails.inventoryID} onClick={() => document.querySelector('#offcanvasExample').classList.remove('show')}>
                <SafetyCheck /> Plan
              </NavLink>
            </div>
            <div className="nav-link">
              <NavLink to={'/account/manage-pos-store'} onClick={() => document.querySelector('#offcanvasExample').classList.remove('show')}>
                <StoreOutlined /> Manage Store
              </NavLink>
            </div>
            {inventoryData.totalStores > 0 &&
              <div className="nav-link">
                <NavLink to={'/pos-user/manage-categories'} onClick={() => document.querySelector('#offcanvasExample').classList.remove('show')}>
                  <CategoryOutlined /> Manage Categories
                </NavLink>
              </div>

            }


            {inventoryData.totalStores > 0 &&

              <div className="nav-link">
                <NavLink to={`/manageManagers/${userDetails.inventoryID}/${userDetails.id}`} onClick={() => document.querySelector('#offcanvasExample').classList.remove('show')}>
                  <SupportAgent /> Manage Managers
                </NavLink>
              </div>
            }
            {inventoryData.totalStores > 0 &&

              <div className="nav-link">
                <NavLink to={'/pos/manage-supplier/' + userDetails.inventoryID} onClick={() => document.querySelector('#offcanvasExample').classList.remove('show')}>
                  <LocalShippingOutlined /> Manage Suppliers
                </NavLink>
              </div>
            }

            {inventoryData.totalStores > 0 &&
              <div className="nav-link">
                <NavLink to={"/post/manage-customer/" + userDetails.inventoryID} onClick={() => document.querySelector('#offcanvasExample').classList.remove('show')}>
                  <GroupOutlined /> Manage Customers
                </NavLink>
              </div>
            }
            {inventoryData.totalStores > 0 &&

              <div className="nav-link">
                <NavLink to={"/post/manage-sales-rep/" + userDetails.inventoryID} onClick={() => document.querySelector('#offcanvasExample').classList.remove('show')}>
                  <SellOutlined /> Manage Sales Rep.
                </NavLink>
              </div>
            }


            {inventoryData.totalStores > 0 &&
              <div className="dropdown mt-0 mb-3">
                <button className="dropdown-toggle flex" type="button" data-bs-toggle="dropdown">
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
            }
            <button onClick={logout}>
              <LogoutOutlined fontSize="small" /> Logout
            </button>
          </div>
        </div>

      </div>


      <CalculatorModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
}

export default Nav;

