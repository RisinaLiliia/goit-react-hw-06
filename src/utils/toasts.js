import { toast } from 'react-hot-toast';

export const showAddSuccessToast = (name) => {
  toast.success(`Contact ${name} was added successfully!`);
};

export const showDeleteSuccessToast = (name) => {
  toast.success(`Contact ${name} successfully deleted`);
};

export const showNameExistsToast = () => {
  toast.error('Contact with this name already exists! Consider renaming.');
};

export const showNumberExistsToast = () => {
  toast.error('Contact with this number already exists!');
};

export const showSearchSuccessToast = (count) => {
  toast.success(`Found ${count} contact(s)`);
};

export const showSearchErrorToast = () => {
  toast.error('Sorry, no contacts found!');
};

export const showFilterEmptyToast = () => {
  toast.error('Filter cannot be empty!');
};

export const showInvalidFilterToast = () => {
  toast.error('Invalid filter entered. Please try again.');
};
