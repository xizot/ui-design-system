import { toast } from 'sonner';
import { CustomToast } from '../components/ui/custom-toast';

type ToastParams = {
  title: string;
  description?: string | undefined;
};

export const ToastUtils = {
  success: ({ title, description }: ToastParams) =>
    toast.custom((id) => (
      <CustomToast id={id} title={title} description={description} type="success" />
    )),

  error: ({ title, description }: ToastParams) =>
    toast.custom((id) => (
      <CustomToast id={id} title={title} description={description} type="error" />
    )),

  warning: ({ title, description }: ToastParams) =>
    toast.custom((id) => (
      <CustomToast id={id} title={title} description={description} type="warning" />
    )),
};
