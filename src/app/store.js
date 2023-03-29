import { configureStore } from "@reduxjs/toolkit";
import gameReducer from  "../feature/game.slice";

export default configureStore({
    reducer : {
        gameGrid : gameReducer,
    }
})