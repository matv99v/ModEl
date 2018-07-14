import { showSpinnerAction, hideSpinnerAction } from 'AliasReduxActions/spinner-actions';

export function fetchGoodsActionAsync() {
    return (dispatch) => {
        dispatch(showSpinnerAction());

        fetch('http://localhost:3000/goods')
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
