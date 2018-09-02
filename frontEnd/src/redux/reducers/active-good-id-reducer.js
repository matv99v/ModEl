const activeGoodIdReducer = (state=null, action) => {
    switch (action.type) {
        case 'SET_ACTIVE_GOOD':
            state = action.payload;
            break;
    }

    switch (action.type) {
        case 'UNSET_ACTIVE_GOOD':
            state = null;
            break;
    }

    return state;
};

export default activeGoodIdReducer;
