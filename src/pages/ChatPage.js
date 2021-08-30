import React, { useContext } from 'react';

import InboxPeople from '../components/InboxPeople';
import ChatSelect from '../components/ChatSelect';
import Messages from '../components/Messages';

import '../css/chat.css';

import { ChatContext } from '../context/chat/ChatContext';


const ChatPage = () => {

    const { chatState } = useContext(ChatContext);

    return ( 
        <div className="messaging">
            <div className="inbox_msg">

                <InboxPeople />

                {
                    ( chatState.chatActivo ) ? 
                        <Messages />
                    : 
                        <ChatSelect />
                }

            </div>

        </div>
    );
}
 
export default ChatPage;