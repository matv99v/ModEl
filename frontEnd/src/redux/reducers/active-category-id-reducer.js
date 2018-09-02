const categoriesReducer = (state=null, action) => {
    switch (action.type) {
        case 'SET_ACTIVE_CATEGORY':
            state = action.payload;
            break;
    }

    switch (action.type) {
        case 'UNSET_ACTIVE_CATEGORY':
            state = null;
            break;
    }

    return state;
};

export default categoriesReducer;
