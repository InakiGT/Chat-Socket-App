import React from 'react';

import { horaMes } from '../helpers/horaMes';


const IncomingMessage = ({ msg }) => {

    const { mensaje, createdAt } = msg;

    return (    
        <div className="incoming_msg">
            <div className="incoming_msg_img">
                <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
            </div>
            <div className="received_msg">
                <div className="received_withd_msg">
                    <p>{ mensaje }</p>
                    <span className="time_date"> { horaMes(createdAt) } </span>
                </div>
            </div>
        </div>
    );
}
 
export default IncomingMessage;