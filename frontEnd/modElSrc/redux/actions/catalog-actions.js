import { showSpinnerAction, hideSpinnerAction } from 'AliasModelSrc/redux/actions/spinner-actions';
import api from 'AliasApi/api';

import { spawnNewError } from 'AliasModelSrc/redux/actions/error-actions';

export function fetchEnabledCategoriesAsync(options) {
    return (dispatch) => {
        dispatch(showSpinnerAction());

        api.getCategories(options)
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

export function fetchGoodsByCategoryActionAsync(options) {
    return (dispatch) => {
        dispatch(showSpinnerAction());

        api.getGoods(options)
            .then(data => {
                dispatch(saveGoodsPortionAction({data, catId: +options.catId}));
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

export function fetchGoodByIdActionAsync(options) {
    return (dispatch) => {
        dispatch(showSpinnerAction());

        api.getGoods(options)
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
