import { showSpinnerAction, hideSpinnerAction } from 'AliasReduxActions/spinner-actions';
import { setActiveCategoryId } from 'AliasReduxActions/active-category-id-actions';
import { spawnNewError } from 'AliasReduxActions/error-actions';

import apiUrls from 'AliasSrc/api/apiUrls';
import api from 'AliasSrc/api/api';


export function fetchExistingCategoriesAsync() {

    return (dispatch) => {
        dispatch(showSpinnerAction());

        api.get(apiUrls.existingCategories)
            .then(data => {
                dispatch(saveGoodsCategories(data));
                // if (data.length) {
                //     dispatch(setActiveCategoryId(data[0].idCategory)); // set first category active
                // }
                return null;
            })
            .catch(err => {
                dispatch(spawnNewError(err));
            })
            .finally(() => {
                dispatch(hideSpinnerAction());
            });

    };
};

export function saveGoodsCategories(categories) {
    return {
        type: 'SAVE_CATEGORIES',
        payload: categories
    };
};
