import React from 'react';

import Searchbox from './Searchbox';
import Sidebar from './Sidebar';


const InboxPeople = () => {
    return ( 
        <div className="inbox_people">

            <Searchbox />

            <Sidebar />

        </div>
    );
}
 
export default InboxPeople;