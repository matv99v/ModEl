import { showSpinnerAction, hideSpinnerAction } from 'AliasReduxActions/spinner-actions';
import apiUrls from 'AliasSrc/api/apiUrls';
import api from 'AliasSrc/api/api';

import { spawnNewError } from 'AliasReduxActions/error-actions';


export function fetchExistingCategoriesAsync_X() {

    return (dispatch) => {
        dispatch(showSpinnerAction());

        api.get(apiUrls.existingCategories)
            .then(data => {
                dispatch(saveGoodsCategories_X(data));
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

export function saveGoodsCategories_X(categories) {
    return {
        type: 'SAVE_CATEGORIES_X',
        payload: categories
    };
};


export function fetchGoodsByCategoryActionAsync_X(catId, excludeGoodId) {
    debugger;
    return (dispatch) => {
        dispatch(showSpinnerAction());

        api.get(apiUrls.goodsByCategory(catId, excludeGoodId))
            .then(data => {
                dispatch(saveGoodsPortionAction_X({data, catId}));
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

export function saveGoodsPortionAction_X(payload) {
    return {
        type: 'SAVE_GOODS_BY_CATEGORY_X',
        payload: payload
    };
};

export function fetchGoodByIdActionAsync_X(goodId) {
    return (dispatch) => {
        dispatch(showSpinnerAction());

        api.get(apiUrls.goodById(goodId))
            .then(data => {
                dispatch(saveGoodAction_X(data));
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


export function saveGoodAction_X(data) {
    return {
        type: 'SAVE_GOOD_X',
        payload: data
    };
};




// fetchGoodsByCategoryActionAsync_X
// fetchGoodByIdActionAsync_X
