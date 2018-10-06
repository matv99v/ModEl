import { showSpinnerAction, hideSpinnerAction } from 'AliasModelSrc/redux/actions/spinner-actions';
import api from 'AliasApi/api';


export function fetchBarnAsync(options) {
    return (dispatch) => {
        dispatch(showSpinnerAction());

        api.getBarn(options)
            .then(data => {
                dispatch(saveBarnAsync(data));
                return null;
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                dispatch(hideSpinnerAction());
            });

    };
}

function saveBarnAsync(data) {
    return {
        type: 'SAVE_BARN',
        payload: data
    };
}

// export function postToBarnAsync(barnItem) {
//     return (dispatch) => {
//         dispatch(showSpinnerAction());
//
//         api.postToBarn(barnItem)
//             .then(data => {
//                 // dispatch(addToBarnAsync(data));
//                 return null;
//             })
//             .catch(err => {
//                 console.error(err);
//             })
//             .finally(() => {
//                 dispatch(hideSpinnerAction());
//             });
//
//     };
// }

// export function putToBarnAsync(barnItem) {
//     debugger;
//     return (dispatch) => {
//         dispatch(showSpinnerAction());
//
//         api.updateBarn(barnItem)
//             .then(data => {
//                 // dispatch(addToBarnAsync(data));
//                 return null;
//             })
//             .catch(err => {
//                 console.error(err);
//             })
//             .finally(() => {
//                 dispatch(hideSpinnerAction());
//             });
//
//     };
// }



// function addToBarnAsync(data) {
//     return {
//         type: 'ADD_TO_BARN',
//         payload: data
//     };
// }
