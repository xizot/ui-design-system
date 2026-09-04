import { AlertCircle, AlertTriangle, CheckCircle2, X } from 'lucide-react';
// eslint-disable-next-line no-restricted-imports
import { toast } from 'sonner';

type ToastType = 'success' | 'error' | 'warning';

type ToastConfig = {
  wrapper: string;
  iconWrapper: string;
  iconColor: string;
  titleColor: string;
  descColor: string;
  closeColor: string;
  icon: React.ElementType;
};

const config: Record<ToastType, ToastConfig> = {
  success: {
    wrapper: 'bg-green-50 border border-green-200',
    iconWrapper: 'bg-green-200',
    iconColor: 'text-green-900',
    titleColor: 'text-green-700',
    descColor: 'text-green-600',
    closeColor: 'text-green-700',
    icon: CheckCircle2,
  },
  error: {
    wrapper: 'bg-red-50 border border-red-200',
    iconWrapper: 'bg-red-200',
    iconColor: 'text-red-800',
    titleColor: 'text-red-800',
    descColor: 'text-red-500',
    closeColor: 'text-red-800',
    icon: AlertCircle,
  },
  warning: {
    wrapper: 'bg-amber-50 border border-amber-200',
    iconWrapper: 'bg-amber-200',
    iconColor: 'text-amber-900',
    titleColor: 'text-amber-800',
    descColor: 'text-amber-600',
    closeColor: 'text-amber-800',
    icon: AlertTriangle,
  },
};

type CustomToastProps = {
  id: string | number;
  title: string;
  description?: string;
  type: ToastType;
};

export const CustomToast = ({ id, title, description, type }: CustomToastProps) => {
  const c = config[type];
  const Icon = c.icon;

  return (
    <div className={`flex w-[360px] items-start gap-3 rounded-xl px-4 py-3.5 ${c.wrapper}`}>
      <div
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${c.iconWrapper}`}
      >
        <Icon size={15} strokeWidth={2.2} className={c.iconColor} />
      </div>

      <div className="min-w-0 flex-1">
        <p className={`mb-0.5 text-sm leading-snug font-medium ${c.titleColor}`}>{title}</p>
        {description && <p className={`text-[13px] leading-snug ${c.descColor}`}>{description}</p>}
      </div>

      <button
        onClick={() => toast.dismiss(id)}
        className={`-mt-0.5 shrink-0 cursor-pointer rounded border-none bg-transparent p-0.5 ${c.closeColor}`}
      >
        <X size={12} strokeWidth={2} />
      </button>
    </div>
  );
};
