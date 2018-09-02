// import 'regenerator-runtime/runtime';
import { showSpinnerAction, hideSpinnerAction } from 'AliasReduxActions/spinner-actions';
import { setActiveCategoryId } from 'AliasReduxActions/active-category-id-actions';
import { spawnNewError } from 'AliasReduxActions/error-actions';

import apiUrls from 'AliasSrc/apiUrls';


export function fetchExistingCategoriesAsync() {
    return (dispatch) => {
        dispatch(showSpinnerAction());

        fetch(apiUrls.existingCategories)
            .then(response => {
              if (response.ok) {
                  return response.json();
              } else {
                  throw response;
              }
            })
            .then(data => {
                dispatch(saveGoodsCategories(data));
                // if (data.length) {
                //     dispatch(setActiveCategoryId(data[0].idCategory)); // set first category active
                // }
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

export function saveGoodsCategories(categories) {
    return {
        type: 'SAVE_CATEGORIES',
        payload: categories
    };
};
