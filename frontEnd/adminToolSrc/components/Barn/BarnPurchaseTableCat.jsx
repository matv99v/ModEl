import React from 'react';
import PropTypes from 'prop-types';
import { Label, Glyphicon } from 'react-bootstrap';


const BarnPurchaseTableCat = ({ name, items, rowClick}) => (
    <tbody className='BarnPurchaseTableCat__Cnt'>
        <tr>
            <td colSpan={12}>
                <span>{name}, {items.length}</span>
            </td>
        </tr>

        {
            items.map((item, i) => (
                <tr
                    key={i}
                    className={items[i-1] && items[i-1].productName === item.productName ? null : 'BarnPurchaseTableCat__catGrouped'}
                    onClick={(e) => rowClick(item, e)}
                >
                    <td></td>
                    <td>{items[i-1] && items[i-1].productName === item.productName ? '' : item.productName}</td>
                    <td><a href={item.zakLink} target='_blank' rel='noopener noreferrer'>{item.zakNumber}</a></td>
                    <td>{item.zakDate}</td>
                    <td>{item.zakDateShp}</td>
                    <td>{item.zakDateRcv}</td>
                    <td>{item.zakDateProtct}</td>
                    <td>{item.zakQnty}</td>
                    <td>{item.frozQnty}</td>
                    <td>{item.restQnty}</td>
                    <td>{item.zakSum}</td>
                    <td>{item.curRate}</td>
                </tr>
            ))
        }

    </tbody>

);

BarnPurchaseTableCat.propTypes = {
    items: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
};

export default BarnPurchaseTableCat;
