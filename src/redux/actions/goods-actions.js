import { showSpinnerAction, hideSpinnerAction } from 'AliasReduxActions/spinner-actions';
import apiUrls from 'AliasSrc/apiUrls';


export function saveGoodsActionAsync() {
    return (dispatch) => {
        dispatch(showSpinnerAction());

        fetch(apiUrls.allGoods)
            .then(response => {
                return response.json();
            })
            .then(data => {
                dispatch(saveGoodsAction(data));
            })
            .catch(err => console.error(err))
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

    fetch(apiUrls.goodDetails(id))
      .then(response => {
          return response.json();
      })
      .then(data => {
          dispatch(saveGoodDetailsAction(id, data));
      })
      .catch(err => console.error(err))
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
