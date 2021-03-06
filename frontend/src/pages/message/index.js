import React, { useEffect, useState } from 'react';
import { loadMessages, postMessage } from '../../actions/message';
import { connect, useDispatch, useSelector } from 'react-redux';

import ConnectedNavi from '../../components/ConnectedNavi';


import './Message.css'

const Message = () => {
    const dispatch = useDispatch()

    const [ message, setMessage ] = useState('')

    const user = useSelector(state => state.session.user)
    const messages = useSelector(state => state.messages.message)
    const connected = useSelector(state => state.connection.connection)

    const sendMessage = (e) => {
        e.preventDefault()
        dispatch(postMessage({ connectionId: connected.id, senderId: user.id, content: message }))
        setMessage('')
    }


    useEffect(() => {
        dispatch(loadMessages())
        scrollToBot()
    }, [dispatch, message])


    function scrollToBot() {
        var lemn = document.querySelector('.messages-container')
        lemn.scrollTo(0, lemn.scrollHeight)
        // lemn.scrollIntoView({block:'start', behavior: 'smooth'})
    }

    document.addEventListener('DOMContentLoaded', {})



    return (
        <>
            <ConnectedNavi />
            <div className='message-container'>
                <div className='messages-container'>{
                messages?.map(mess => (
                    mess?.connectionId === connected?.id ?
                        mess?.senderId === user?.id ? <div className='user-message'>{mess.content}</div> : <div className='sender-message'>{mess.content}</div>
                    : null
                ))
                }</div>
                <div className='message-input-container'>
                    <form onSubmit={e => sendMessage(e)} className='message-form'>
                        <input
                            className='message-input'
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                        />
                        {message && <button className='submit-message'><img className='up-arrow'/></button>}
                    </form>
                </div>
            </div>
        </>
    )
}

export default Message
