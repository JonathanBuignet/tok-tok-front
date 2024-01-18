import { useEffect, useRef } from 'react';
import { useAppSelector } from '../../../hooks/redux';
// import {
//   subscribeToNewMessage,
//   unsubscribeToNewMessage,
// } from '../../../socket/messagerie';
// import { fetchMessages } from '../../../store/reducers/messagerie';
import MessagesItem from './MessagesItem';

import './Messages.scss';

function Messages() {
  const messages = useAppSelector((state) => state.messagerie.messages);
  const messagesRef = useRef<HTMLElement>(null);

  // useEffect(() => {
  //   subscribeToNewMessage();
  //   return () => {
  //     unsubscribeToNewMessage();
  //   };
  // }, []);

  useEffect(() => {
    messagesRef.current?.scrollTo(0, messagesRef.current.scrollHeight);
  }, [messages]);

  return (
    <section
      className="messages"
      ref={messagesRef}
      style={{ overflowY: 'auto' }}
    >
      {messages.map((message) => (
        <MessagesItem key={message.id} {...message} />
      ))}
    </section>
  );
}

export default Messages;
