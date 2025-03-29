import { toast } from "react-hot-toast";

export const showSuccessToast = (message) => {
  toast.success(message);
};

export const showErrorToast = (message) => {
  toast.error(message);
};

export const showInfoToast = (message) => {
  toast.info(message);
};

export const showDeleteSuccessToast = (name) => {
  toast.success(`Contact ${name} successfully deleted'`);
};
