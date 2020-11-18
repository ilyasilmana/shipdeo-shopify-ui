import React from 'react';
import conclass from '../../../utils/conclass';
import styles from './action-button.module.css';

const ButtonPrint = (props) => (
  <button className={conclass(styles.btn, styles.btnPrint, props.className)} onClick={props.onClick} title="Print Shipping Label">
    <img src="/img/print-1.png"/>
  </button>
);

const ButtonProcess = (props) => (
  <button className={conclass(styles.btn, styles.btnProcess, props.className)} onClick={props.onClick} title="Confirm Order">
    <img src="/img/package-process.png"/>
  </button>
);

const ButtonCancel = (props) => (
  <button className={conclass(styles.btn, styles.btnCancel, props.className)} onClick={props.onClick} title="Cancel Order">
    <img src="/img/package-cancel.png"/>
  </button>
);

export {
  ButtonPrint,
  ButtonProcess,
  ButtonCancel
}
