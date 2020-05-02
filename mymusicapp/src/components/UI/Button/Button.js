import React from 'react';
import Styles from './Button.module.css';

const button = (props) => {
    return(
        <button onClick={props.clicked} className={Styles.myButton} disabled={props.voteStatus}>
            {props.children}
        </button>
    );
}

export default button;