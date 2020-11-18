import React from 'react';

/**
 * @param {Object} props
 * @param {'cancelled' | 'cancel-request' | 'confirm-cancelled' | 'confirmed' | 'delivered' | 'drop-off' | 'entry' | 'lost-broken' | 'on-hold' | 'on-progress' | 'others' | 'picked' | 'problem' | 'returned'} props.type
 */
const Status = (props) => {
  return <img src={`/img/status/status-${props.type}.png`}/>
};

export default Status;
