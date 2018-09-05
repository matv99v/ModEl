import { showSpinnerAction, hideSpinnerAction } from 'AliasReduxActions/spinner-actions';
import apiUrls from 'AliasSrc/api/apiUrls';
import api from 'AliasSrc/api/api';

import { spawnNewError } from 'AliasReduxActions/error-actions';


export function fetchGoodsActionAsync() {
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

export function saveGoodsAction(goods) {
    return {
        type: 'SAVE_GOODS',
        payload: goods
    };
};

export function fetchGoodDetailsActionAsync(id) {
  return (dispatch) => {
    dispatch(showSpinnerAction());

        api.get(apiUrls.allGoods)
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
