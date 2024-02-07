import React from 'react';
import { Link } from 'react-router-dom';

function Nav(props) {
    return (
        <div className='mb-3'>
            <a href="/">Home</a>
            &nbsp;
            &nbsp;
            <a href="/auth">Login</a>
            &nbsp;
            &nbsp;
            <Link to="/subscribe">Subscribe</Link>

            &nbsp;
            &nbsp;
            <Link to="/products">Products</Link>

            &nbsp;
            &nbsp;
            <Link to="/shops">shops</Link>

            &nbsp;
            &nbsp;
            <Link to="/profile">profile</Link>

            &nbsp;
            &nbsp;
            <Link to="/shops">shops</Link>

            &nbsp;
            &nbsp;
            <Link to="/auctions">Auctions</Link>

            &nbsp;
            &nbsp;
            <Link to="/subs/subuser">Add_Item</Link>

            &nbsp;
            &nbsp;
            <Link to="/sub_Admin">sub_Admin</Link> {/*will show for sub admins */}
            &nbsp;
            &nbsp;
            <Link to="/Admin">Admin</Link> {/*will show for  ADMINS */}
        </div>
    );
}

export default Nav;