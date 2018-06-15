import React from 'react';
import './ItemCategories.scss';

export default class ItemCategories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className='ItemCategories__container'>
                <div>Лампы</div>
                <div>Переключатели</div>
                <div>Розетки</div>
                <div>Адаптеры</div>
            </div>
        );
    }
}
