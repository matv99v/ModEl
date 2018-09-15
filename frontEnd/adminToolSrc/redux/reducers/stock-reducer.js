const stockReducer = (state=[], action) => {

    switch (action.type) {
    case 'SAVE_STOCK':

        state = [...action.payload];
        break;
    }

    return state;
};

export default stockReducer;
