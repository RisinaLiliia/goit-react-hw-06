import React from 'react';
import { FaUserAlt, FaPhoneAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';
import css from './Contact.module.css';

export default function Contact({ contact }) {
  const dispatch = useDispatch();

  return (
    <li className={css.item}>
      <div>
        <div className={css.info}>
          <div className={css.icon}>
            <FaUserAlt size={18} />
          </div>
          <p>{contact.name}</p>
        </div>
        <div className={css.info}>
          <div className={css.icon}>
            <FaPhoneAlt size={18} />
          </div>
          <p>{contact.number}</p>
        </div>
      </div>
      <button
        className={css.deleteButton}
        onClick={() => dispatch(deleteContact(contact.id))}
      >
        Delete
      </button>
    </li>
  );
}
