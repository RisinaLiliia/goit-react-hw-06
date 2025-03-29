import React from "react";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsSlice";
import { showDeleteSuccessToast } from "../../utils/toasts";
import css from "./ContactList.module.css";

export default function ContactList({ contacts }) {
  const dispatch = useDispatch();

  const handleDelete = (id, name) => {
    dispatch(deleteContact(id));
    showDeleteSuccessToast(name);
  };

  return (
    <ul className={css.contactList}>
      {contacts.map((contact) => (
        <li key={contact.id} className={css.contact}>
          <div className={css.contactInfo}>
            <span style={{ fontWeight: "bold" }}>{contact.name}</span>
            <span>{contact.number}</span>
          </div>
          <button
            className={css.deleteButton}
            onClick={() => handleDelete(contact.id, contact.name)}
            aria-label={`Delete contact ${contact.name}`}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
