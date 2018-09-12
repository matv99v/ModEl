import { showSpinnerAction, hideSpinnerAction } from 'AliasReduxActions/spinner-actions';
import apiUrls from 'AliasSrc/api/apiUrls';
import api from 'AliasSrc/api/api';

import { spawnNewError } from 'AliasReduxActions/error-actions';

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
}

function saveGoodsCategories(categories) {
    return {
        type: 'SAVE_CATEGORIES',
        payload: categories
    };
}

export function fetchGoodsByCategoryActionAsync(catId, excludeGoodId) {
    return (dispatch) => {
        dispatch(showSpinnerAction());

        api.get(apiUrls.goodsByCategory(catId, excludeGoodId))
            .then(data => {
                dispatch(saveGoodsPortionAction({data, catId}));
                return null;
            })
            .catch(err => {
                dispatch(spawnNewError(err));
            })
            .finally(() => {
                dispatch(hideSpinnerAction());
            });
    };
}

function saveGoodsPortionAction(payload) {
    return {
        type: 'SAVE_GOODS_BY_CATEGORY',
        payload: payload
    };
}

export function fetchGoodByIdActionAsync(goodId) {
    return (dispatch) => {
        dispatch(showSpinnerAction());

        api.get(apiUrls.goodById(goodId))
            .then(data => {
                dispatch(saveGoodAction(data));
                return null;
            })
            .catch(err => {
                dispatch(spawnNewError(err));
            })
            .finally(() => {
                dispatch(hideSpinnerAction());
            });
    };
}

function saveGoodAction(data) {
    return {
        type: 'SAVE_GOOD',
        payload: data
    };
}
