import { combineReducers } from 'redux';
import { SAVE_STRATEGY } from "../action/actions";

//key : bot id
//value : bot state
const initialBotState = {};
function bot(state = initialBotState, action) {
    return state;
}

//key : bot id
//value : bot strategy
const initialStrategyState = {};

function strategy(state = initialStrategyState, action) {
    return state;
}

const botApp = combineReducers({
    bot,
    strategy
});

export default botApp;