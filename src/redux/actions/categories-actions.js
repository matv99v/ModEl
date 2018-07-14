// import 'regenerator-runtime/runtime';
import { showSpinnerAction, hideSpinnerAction } from 'AliasReduxActions/spinner-actions';
import { setActiveCategoryId } from 'AliasReduxActions/active-category-id-actions';



export function fetchExistingCategoriesAsync() {
    return (dispatch) => {
        dispatch(showSpinnerAction());

        fetch('http://localhost:3000/categories/existing')
            .then(response => {
                return response.json();
            })
            .then(data => {
                dispatch(fetchGoodsCategories(data));
                if (data.length) {
                    dispatch(setActiveCategoryId(data[0].idCategory));
                }
            })
            .catch(err => console.error(err))
            .finally(() => {
                dispatch(hideSpinnerAction());
            });
    };
};

export function fetchGoodsCategories(categories) {
    return {
        type: 'FETCH_CATEGORIES',
        payload: categories
    };
};
