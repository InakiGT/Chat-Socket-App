import React, { useContext } from 'react';

import { ChatContext } from '../context/chat/ChatContext';
import { fetchConToken } from '../helpers/fetch';
import { scrollToBottom } from '../helpers/scrollToBottom';


const SidebarChatItem = ({ usuario }) => {

    const { asignarChat, chatState, cargarMensajes } = useContext(ChatContext);
    const { chatActivo } = chatState;

    const { nombre, online, uid } = usuario;

    const onChatClick = async () => {

        asignarChat( usuario.uid );

        // Cargar los mensajes del chat
        const { mensajes } = await fetchConToken( `mensajes/${uid}` );

        cargarMensajes(mensajes);

        // Scroll al chat
        scrollToBottom('messages');

    }

    return (
        <div
                className={`chat_list ${ ( usuario.uid === chatActivo ) && 'active_chat' }`}
            onClick={ onChatClick }
        >
            <div className="chat_people">
                <div className="chat_img"> 
                    <img src="https://www.shareicon.net/data/512x512/2016/06/27/787350_people_512x512.png" alt="sunil" />
                </div>
                <div className="chat_ib">
                    <h5>{ nombre }</h5>
                    {
                        online ? (
                            <span className="text-success">Online</span>
                        ) : (
                            <span className="text-danger">Offline</span>
                        )
                    }
                </div>
            </div>
        </div>
    );
}
 
export default SidebarChatItem;