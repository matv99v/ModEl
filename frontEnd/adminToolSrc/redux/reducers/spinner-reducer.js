const spinnerReducer = (state=false, action) => {
    switch (action.type) {
        case 'SHOW_SPINNER_ACTION':
            state = true;
            break;
        case 'HIDE_SPINNER_ACTION':
            state = false;
            break;
    }

    return state;
};

export default spinnerReducer;
