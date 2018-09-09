import { showSpinnerAction, hideSpinnerAction } from 'AliasReduxActions/spinner-actions';
import { spawnNewError } from 'AliasReduxActions/error-actions';

import apiUrls from 'AliasSrc/api/apiUrls';
import api from 'AliasSrc/api/api';


export function fetchExistingCategoriesAsync() {

    return (dispatch) => {
        dispatch(showSpinnerAction());

        api.get(apiUrls.existingCategories)
            .then(data => {
                dispatch(saveGoodsCategories(data));
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
