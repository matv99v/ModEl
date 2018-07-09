// import 'regenerator-runtime/runtime';
import { showSpinnerAction, hideSpinnerAction } from 'AliasReduxActions/spinner-actions';


export function fetchGoodsCategoriesAsync() {
    return (dispatch) => {
        dispatch(showSpinnerAction());

        fetch('http://localhost:3000/goods-categories')
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                dispatch(fetchGoodsCategories(data));
            })
            .catch(err => console.error(err))
            .finally(() => {
                dispatch(hideSpinnerAction());
            });
    };
};

export function fetchGoodsCategories(categories) {
    console.log('fetchGoodsCategories', categories);
    return {
        type: 'FETCH_CATEGORIES',
        payload: categories
    };
};
