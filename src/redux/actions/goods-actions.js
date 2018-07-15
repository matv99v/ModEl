import { showSpinnerAction, hideSpinnerAction } from 'AliasReduxActions/spinner-actions';
import apiUrls from 'AliasSrc/apiUrls';


export function fetchGoodsActionAsync() {
    return (dispatch) => {
        dispatch(showSpinnerAction());

        fetch(apiUrls.allGoods)
            .then(response => {
                return response.json();
            })
            .then(data => {
                dispatch(fetchGoodsAction(data));
            })
            .catch(err => console.error(err))
            .finally(() => {
                dispatch(hideSpinnerAction());
            });
    };
};

export function fetchGoodsAction(goods) {
    return {
        type: 'FETCH_GOODS',
        payload: goods
    };
};
