import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "Types/UserType";
import data from 'data.json';

interface UsersListState {
    entities: UserType[]
}

const initialState: UsersListState = {
    //TODO: localStorage
    entities: data.users
}

const UserListSlice = createSlice({
    name: 'UserList',
    initialState,
    reducers: {
        addUser: ({entities}, {payload}) => {

            const newId = Math.max.apply(Math, entities.map(function(user) { return user.id; }));
            entities.push({
                id: newId + 1,
                status: true,
                ...payload
            });
        },
        updateUser: ({entities}, {payload}) => {
            const userIndex = entities.findIndex(user => user.id === payload.id);
            entities[userIndex] = payload;
        },
        deleteUser: (state, {payload: {id}}) => {
            state.entities = state.entities.filter(user => user.id !== id)
        }
    }
})

export const { addUser, updateUser, deleteUser } = UserListSlice.actions;
export default UserListSlice.reducer;
