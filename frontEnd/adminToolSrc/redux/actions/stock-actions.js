import { showSpinnerAction, hideSpinnerAction } from 'AliasModelSrc/redux/actions/spinner-actions';
import api from 'AliasApi/api';


export function fetchStockAsync(options) {
    return (dispatch) => {
        dispatch(showSpinnerAction());

        api.getStock(options)
            .then(data => {
                dispatch(saveStockAsync(data));
                return null;
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                dispatch(hideSpinnerAction());
            });

    };
}

function saveStockAsync(data) {
    return {
        type: 'SAVE_STOCK',
        payload: data
    };
}
