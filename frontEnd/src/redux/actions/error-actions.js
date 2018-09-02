export function spawnNewError(err) {
    return {
        type: 'SPAWN_NEW_ERROR',
        payload: err
    };
};
