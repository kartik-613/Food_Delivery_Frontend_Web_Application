import { configureStore} from '@reduxjs/toolkit';
import userslice from './features/user.slice.js';

const store = configureStore({
    reducer: {
        user: userslice,
    },
});

export default store;