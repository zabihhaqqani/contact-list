import { createSlice } from '@reduxjs/toolkit';
import { contactListData } from '@/data/contactListData';
import {
    addItemToLocalStorage,
    getDataFromLocalStorage,
    removeItemFromLocalStorage,
    updateInLocalStorage,
} from '@/utils/localStorage';

const localStorageData = getDataFromLocalStorage();

const initialState = {
    contactList:
        localStorageData && localStorageData.length > 0
            ? localStorageData
            : contactListData,
};

const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        addContact: (state, action) => {
            state.contactList.push(action.payload);
            addItemToLocalStorage(action.payload);
        },
        deleteContact: (state, action) => {
            state.contactList = state.contactList.filter(
                (contact) => contact.id !== action.payload
            );
            removeItemFromLocalStorage(action.payload);
        },
        updateContact: (state, action) => {
            state.contactList = state.contactList.map((contact) =>
                String(contact.id) === String(action.payload.id)
                    ? action.payload
                    : contact
            );
            updateInLocalStorage(action.payload);
        },
    },
});

export const { addContact, deleteContact, updateContact } =
    contactSlice.actions;
export default contactSlice.reducer;
