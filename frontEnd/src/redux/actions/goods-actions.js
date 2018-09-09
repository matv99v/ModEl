import { showSpinnerAction, hideSpinnerAction } from 'AliasReduxActions/spinner-actions';
import apiUrls from 'AliasSrc/api/apiUrls';
import api from 'AliasSrc/api/api';

import { spawnNewError } from 'AliasReduxActions/error-actions';


export function fetchGoodsActionAsync() { // delete after fetchByCategoryId implementation
    return (dispatch) => {
        dispatch(showSpinnerAction());

        api.get(apiUrls.allGoods)
            .then(data => {
                dispatch(saveGoodsAction(data));
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

export function fetchGoodsByCategoryActionAsync(catId, excludeGoodId) {
    return (dispatch) => {
        dispatch(showSpinnerAction());

        api.get(apiUrls.goodsByCategory(catId, excludeGoodId))
            .then(data => {
                dispatch(saveGoodsPortionAction(data));
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

export function saveGoodsAction(goods) {
    return {
        type: 'SAVE_GOODS',
        payload: goods
    };
};

export function saveGoodsPortionAction(goods) {
    return {
        type: 'SAVE_GOODS_PORTION',
        payload: goods
    };
};

export function fetchGoodDetailsActionAsync(id) {
  return (dispatch) => {
    dispatch(showSpinnerAction());

        api.get(apiUrls.goodDetails(id))
            .then(data => {
                dispatch(saveGoodDetailsAction(id, data));
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


export function saveGoodDetailsAction(id, details) {
    const data = {
      ...details[0],
      idProduct: id
    };
    return {
        type: 'SAVE_GOOD_DETAILS',
        payload: data
    };
};

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
};


export function saveGoodAction(data) {
    return {
        type: 'SAVE_GOOD',
        payload: data
    };
};
