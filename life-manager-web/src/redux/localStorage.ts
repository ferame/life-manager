import { UserOptions } from "./reducers/userOptionsSlice";
import { User } from "./reducers/userSlice";

export const loadState = () => {
    console.log("State load called");
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            console.log("Failed to find local state");
            return undefined;
        } else {
            console.log("Loaded local state");
            console.log(serializedState);
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.log("Failed to parse local state");
        return undefined;
    }
};

export interface PersistedState {
    user: User;
    userOptions: UserOptions;
}

export const saveState = (user: User, userOptions: UserOptions) => {
    try {
        const serializedState = JSON.stringify({user, userOptions});
        localStorage.setItem('state', serializedState);
        console.log("Saved to local state");
    } catch (err) {
        console.log("Failed to save to local state");
        // Ignore write errors.
    }
};