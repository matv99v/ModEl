export function alertMessage(msg) {
    return {
        type: 'ALERT_MSG',
        payload: msg
    };
}

export function killMessage(ind) {
    return {
        type: 'KILL_MSG',
        payload: ind
    };
}
