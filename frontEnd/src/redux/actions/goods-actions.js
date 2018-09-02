import { showSpinnerAction, hideSpinnerAction } from 'AliasReduxActions/spinner-actions';
import apiUrls from 'AliasSrc/apiUrls';
import { spawnNewError } from 'AliasReduxActions/error-actions';


export function fetchGoodsActionAsync() {
    return (dispatch) => {
        dispatch(showSpinnerAction());

        fetch(apiUrls.allGoods)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .then(data => {
                dispatch(saveGoodsAction(data));
            })
            .catch(err => {
              err.text().then(errorMessage => {
                  dispatch(spawnNewError(errorMessage));
              })
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

    fetch(apiUrls.goodDetails(id))
      .then(response => {
          if (response.ok) {
              return response.json();
          } else {
              throw response;
          }
      })
      .then(data => {
          dispatch(saveGoodDetailsAction(id, data));
      })
      .catch(err => {
        err.text().then(errorMessage => {
            dispatch(spawnNewError(errorMessage));
        })
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
