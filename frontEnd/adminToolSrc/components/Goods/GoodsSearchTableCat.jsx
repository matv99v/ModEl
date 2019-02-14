import React from 'react';
import PropTypes from 'prop-types';
import { Label, Glyphicon } from 'react-bootstrap';


const GoodsSearchTableCat = ({ good, rowClick, showCatName }) => (
    <React.Fragment>
        {showCatName &&
            <tr className="GoodsItem__cantegory-tr">
                <td colSpan={6} className="GoodsItem__cantegory-name">
                    <span>{good.CategoryName}</span>
                </td>
            </tr>
        }

        <tr
            onClick={() => rowClick(good.idProduct)}
        >
            <td></td>
            <td>{good.productName}</td>
            <td>{good.idProduct}</td>
            <td>{good.idCategory}</td>
            <td>{good.declarePrice}</td>
            <td>{good.exist}</td>
        </tr>
    </React.Fragment>


);

// GoodsSearchTableCat.propTypes = {
//     items: PropTypes.array.isRequired,
//     name: PropTypes.string.isRequired,
// };

export default GoodsSearchTableCat;
