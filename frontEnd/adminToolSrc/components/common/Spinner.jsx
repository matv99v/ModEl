import React from 'react';
import './Spinner.scss';

// Spinner should be placed as a first element in container,
// because its styles will hide all elements on the same level


const Spinner = (props) => (
    <div
        className={props.show ? 'Spinner__cnt__visible' : 'Spinner__cnt__hidden'}
        style={{
            width: `${props.size || 25}px`,
            height: `${props.size || 25}px`,
            borderWidth: `${1 + props.size / 7 || 4}px`,
        }}
    >
    </div>
);


export default Spinner;
