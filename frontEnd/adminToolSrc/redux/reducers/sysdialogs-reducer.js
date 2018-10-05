const sysdialogsReducer = (state=[], action) => {
    const newState = state.map(el => ({...el}));

    switch (action.type) {
        case 'ALERT_MSG':
            state = [
                ...newState,
                {...action.payload, id: Date.now()}
            ];
            break;
        case 'KILL_MSG':
            state = state.filter(msg => msg.id !== action.payload);
            break;
    }

    return state;
};

export default sysdialogsReducer;
