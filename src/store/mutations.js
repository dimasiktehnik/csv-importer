export default {
    updateState(state, data) {
        Object.assign(state, data);
    },
    addData(state, data) {
        state.data.push(data);
    },
}