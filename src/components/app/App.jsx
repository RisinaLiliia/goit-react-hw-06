import React, { useEffect, useState, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact, deleteContact } from "../../redux/contactsSlice";
import { changeFilter } from "../../redux/filtersSlice";
import { Toaster } from "react-hot-toast";
import debounce from "lodash.debounce";
import { showSuccessToast, showErrorToast } from "../../utils/toasts";
import css from "./App.module.css";

const ContactForm = lazy(() => import("../contactForm/ContactForm.jsx"));
const ContactList = lazy(() => import("../contactList/ContactList.jsx"));
const SearchBox = lazy(() => import("../searchBox/SearchBox.jsx"));

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
    dispatch(changeFilter(value));
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
      <Suspense fallback={<p>Loading...</p>}>
        <ContactForm onAdd={addNewContact} />
        <SearchBox value={searchValue} onFilterChange={handleInputChange} />
        <ContactList
          contacts={filteredContacts}
          onDelete={(id) => dispatch(deleteContact(id))}
        />
      </Suspense>
      <Toaster />
    </div>
  );
}
