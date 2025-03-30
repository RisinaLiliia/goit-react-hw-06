import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import dataContacts from '../data/contacts.json';
import {
  showAddSuccessToast,
  showDeleteSuccessToast,
  showNameExistsToast,
  showNumberExistsToast,
} from '../utils/toasts.js';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: dataContacts,
  },
  reducers: {
    addContact: (state, action) => {
      const { name, number } = action.payload;

      const numberExists = state.items.some(
        (contact) => contact.number === number
      );

      const nameExists = state.items.some((contact) => contact.name === name);

      if (nameExists) {
        showNameExistsToast();
      } else if (numberExists) {
        showNumberExistsToast();
      } else {
        state.items.push({ id: uuidv4(), name, number });
        showAddSuccessToast(name);
      }
    },
    deleteContact: (state, action) => {
      const contactToDelete = state.items.find(
        (contact) => contact.id === action.payload
      );

      if (contactToDelete) {
        state.items = state.items.filter(
          (contact) => contact.id !== action.payload
        );
        showDeleteSuccessToast(contactToDelete.name);
      }
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;
