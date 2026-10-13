export type FormSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

const smallerSize: Record<FormSize, FormSize> = {
  xxs: 'xxs',
  xs: 'xxs',
  sm: 'xs',
  md: 'sm',
  lg: 'md',
  xl: 'lg',
  xxl: 'xl',
};

export function getSearchInputSize(size: FormSize): FormSize {
  return smallerSize[size];
}
