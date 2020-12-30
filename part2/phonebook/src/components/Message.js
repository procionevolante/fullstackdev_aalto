import React from 'react';

const Message = ({ msg }) => (
  msg === null?
    null
      :
    <div className={msg.type}>
      {msg.text}
    </div>
)

export default Message;
