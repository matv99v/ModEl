import React from 'react';
import './BrandLogo.scss';




export default class BrandLogo extends React.Component {

    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 450 450" className="img-thumbnail">
                <path fill="#e2e2e2" d="M449 177l-43-56-3-3-176-49h-4L47 118l-3 3-43 56a7 7 0 0 0 4 11l37 13v101c0 3 2 5 5 7l175 72 3 1 3-1 175-72c3-2 5-4 5-7V201l37-13a7 7 0 0 0 4-11zm-430 1l33-44 14 3 75 21 71 20-41 51-152-51zm199 186L57 297v-91l114 39a7 7 0 0 0 8-3l39-48v170zm7-198L76 125l149-42 149 42-149 41zm168 131l-161 67V194l39 48a7 7 0 0 0 8 3l114-39v91zm-114-68l-41-51 160-44 33 44-152 51z"/>
            </svg>

        );
    }
}
