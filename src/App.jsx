import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useNavigate
} from 'react-router-dom'


import PosLayout from './layouts/posLayout'
import { useContext, useEffect } from 'react'
import Home from './Home';
// import ErrorPage from './pages/ErrorPage'

import SubscribePOS from './pages/subscribePOS'
import HomeAdmin from './pages/homeAdmin'
import ManageStore from './pages/manageStore'
import SingleStore from './pages/singleStore'
import AddStock from './pages/AddStock'
import ManageCategories from './pages/ManageCategories'
import AllStock from './pages/allStock'
import ManageSupplier from './pages/manageSupplier'
import ManageCustomers from './pages/ManageCustomers'
import ManageSalesRep from './pages/ManageSalesRep'
import Plan from './pages/plan'
import Authpage from './pages/authpage';
import RootLayout from './layouts/RootLayout';
import HomeAdminFormer from './pages/homeAdminFormer';
import AllUnavailableStock from './pages/allUnavailableStock';
import ContinueWithAccount from './pages/continueWithAccount';
import Retrieve_password from './pages/retrieve_password';
import BranchStatistics from './pages/BranchStatistics';
import ManageManagers from './pages/ManageManagers';
import SingleStoreBranch from './pages/singleStoreBranch';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} >
      <Route path="/" element={<ContinueWithAccount />} />
      <Route path='/auth' element={<Authpage />} />
      <Route path='/retrieve_password' element={<Retrieve_password />} />
      <Route path='account/subscibe-POS' element={<SubscribePOS />} />
      <Route path='account/subscibe-POS/:type/:currentPlan' element={<SubscribePOS />} />
      <Route path="/" element={<PosLayout />} >
        {/* <Route path="/" element={<PosLayout />} errorElement={<ErrorPage />}> */}
        <Route path="/Home" element={<Home />} />
        <Route path='account/manage-pos-store' element={<ManageStore />} />
        <Route path='profile/pos-admin/:id' element={<HomeAdmin />} />
        <Route path='88' element={<HomeAdminFormer />} />
        <Route path='all-unavailable-stock/:id' element={<AllUnavailableStock />} />
        <Route path='profile/pos-plan/:id' element={<Plan />} />
        <Route path='branch-statistics/:branchName' element={<BranchStatistics />} />
        <Route path='/singleStore/:id' element={<SingleStore />} />
        <Route path='/manageManagers/:invId/:userId' element={<ManageManagers />} />
        <Route path='/pos/manage-supplier/:id' element={<ManageSupplier />} />
        <Route path='singleStore/branches/:id' element={<SingleStoreBranch />} />
        <Route path='/post/manage-customer/:id' element={<ManageCustomers />} />
        <Route path='/post/manage-sales-rep/:id' element={<ManageSalesRep />} />
        <Route path='add-stock/:id' element={<AddStock />} />
        <Route path='all-stock/:id' element={<AllStock />} />
        <Route path='/pos-user/manage-categories' element={<ManageCategories />} />
      </Route >
    </Route >
  )
)

function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App
// https://uigradients.com/#Twitch

