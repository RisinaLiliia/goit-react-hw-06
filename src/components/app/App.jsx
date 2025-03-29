import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contactsSlice";
import { changeFilter } from "../../redux/filtersSlice";
import ContactForm from "../contactForm/ContactForm.jsx";
import ContactList from "../contactList/ContactList.jsx";
import SearchBox from "../searchBox/SearchBox.jsx";
import { Toaster } from "react-hot-toast";
import debounce from "lodash.debounce";
import { showSuccessToast, showErrorToast } from "../../utils/toasts";
import css from "./App.module.css";

export default function App() {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);
  const filter = useSelector((state) => state.filters.name);

  const [searchValue, setSearchValue] = useState(filter);

  const addNewContact = (newContact) => {
    const contactExists = contacts.some(
      (contact) =>
        contact.name.toLowerCase() === newContact.name.toLowerCase() ||
        contact.number === newContact.number
    );

    if (contactExists) {
      showErrorToast("Contact with this name or number already exists!");
    } else {
      dispatch(addContact(newContact));
      showSuccessToast(`${newContact.name} was added successfully!`);
    }
  };

  const handleChangeFilter = debounce((value) => {
    if (value.trim()) {
      dispatch(changeFilter(value));
    }
  }, 500);

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    handleChangeFilter(e.target.value);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    if (filter) {
      if (filteredContacts.length === 0) {
        showErrorToast("Sorry, no contacts found!");
      } else {
        showSuccessToast(`Found ${filteredContacts.length} contact(s)`);
      }
    }
  }, [filter, filteredContacts]);

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm onAdd={addNewContact} />
      <SearchBox value={searchValue} onFilterChange={handleInputChange} />
      <ContactList contacts={filteredContacts} />
      <Toaster />
    </div>
  );
}
