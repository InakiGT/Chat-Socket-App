import React from 'react';

import { horaMes } from '../helpers/horaMes';

const OutgoingMessage = ({ msg }) => {

    const { mensaje , createdAt} = msg;

    return (
        <div className="outgoing_msg">
            <div className="sent_msg">
                <p>{ mensaje }</p>
                <span className="time_date">{ horaMes(createdAt) }</span>
            </div>
        </div>
    );
}
 
export default OutgoingMessage;