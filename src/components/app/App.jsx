import React, { lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import css from './App.module.css';

const ContactForm = lazy(() => import('../contactForm/ContactForm.jsx'));
const ContactList = lazy(() => import('../contactList/ContactList.jsx'));
const SearchBox = lazy(() => import('../searchBox/SearchBox.jsx'));

export default function App() {
  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <ContactForm />
        <SearchBox />
        <ContactList />
      </Suspense>
      <Toaster />
    </div>
  );
}
