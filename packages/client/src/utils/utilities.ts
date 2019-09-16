import { toast } from 'react-toastify';

const showErrorToast = (message: string) => {
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

const showInfoToast = (message: string) => {
  toast.info(message, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export { showErrorToast, showInfoToast };
