import React, { useContext } from 'react';

import { ChatContext } from '../context/chat/ChatContext';
import { AuthContext } from '../auth/AuthContext';
import SidebarChatItem from './SidebarChatItem';


const Sidebar = () => {

    // Context
    const { chatState } = useContext(ChatContext);
    const { auth } = useContext(AuthContext);
    
    const { uid } = auth;

    return (
        <div className="inbox_chat">
            
            {
                chatState.usuarios
                    .filter( usuario => usuario.uid !== uid )
                    .map( usuario => (

                    <SidebarChatItem
                        key={ usuario.uid }
                        usuario={ usuario }
                    />

                ))
            }

            {/* <!-- Espacio extra para scroll --> */}
            <div className="extra_space"></div>


        </div>
    );
}
 
export default Sidebar;