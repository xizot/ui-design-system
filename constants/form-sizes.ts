import { cva } from 'class-variance-authority';

export type FormSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

// Default sizes for form controls
export const DEFAULT_FORM_CONTROL_SIZE: FormSize = 'md';
export const DEFAULT_CHECKBOX_SIZE: FormSize = 'sm';
export const DEFAULT_SWITCH_SIZE: FormSize = 'md';
export const DEFAULT_INPUT_SIZE: FormSize = 'md';
export const DEFAULT_TEXTAREA_SIZE: FormSize = 'md';
export const DEFAULT_SELECT_SIZE: FormSize = 'md';
export const DEFAULT_BUTTON_SIZE: FormSize = 'md';
export const DEFAULT_DATE_PICKER_SIZE: FormSize = 'md';
export const DEFAULT_TIME_PICKER_SIZE: FormSize = 'md';

type FormSizeStyle = {
  height: string;
  text: string;
  paddingX: string;
  paddingY: string;
  padding: string;
  icon: string;
  iconButton: string;
  switchRoot: string;
  radioDot: string;
  svgIcon: string;
};

export const FORM_SIZE_STYLES: Record<FormSize, FormSizeStyle> = {
  xxs: {
    height: 'h-[var(--form-size-xxs-height)]',
    text: 'text-[length:var(--form-size-xxs-text)]',
    paddingX: 'px-[var(--form-size-xxs-padding-x)]',
    paddingY: 'py-[var(--form-size-xxs-padding-y)]',
    padding: 'px-[var(--form-size-xxs-padding-x)] py-[var(--form-size-xxs-padding-y)]',
    icon: 'size-[var(--form-size-xxs-icon)]',
    iconButton: 'size-[var(--form-size-xxs-icon-button)]',
    switchRoot:
      'h-[var(--form-size-xxs-icon-button)] w-[calc(var(--form-size-xxs-icon-button)*1.5)]',
    radioDot: 'size-[calc(var(--form-size-xxs-icon)*0.5)]',
    svgIcon: "[&_svg:not([class*='size-'])]:size-[var(--form-size-xxs-icon)]",
  },
  xs: {
    height: 'h-[var(--form-size-xs-height)]',
    text: 'text-[length:var(--form-size-xs-text)]',
    paddingX: 'px-[var(--form-size-xs-padding-x)]',
    paddingY: 'py-[var(--form-size-xs-padding-y)]',
    padding: 'px-[var(--form-size-xs-padding-x)] py-[var(--form-size-xs-padding-y)]',
    icon: 'size-[var(--form-size-xs-icon)]',
    iconButton: 'size-[var(--form-size-xs-icon-button)]',
    switchRoot: 'h-[var(--form-size-xs-icon-button)] w-[calc(var(--form-size-xs-icon-button)*1.5)]',
    radioDot: 'size-[calc(var(--form-size-xs-icon)*0.5)]',
    svgIcon: "[&_svg:not([class*='size-'])]:size-[var(--form-size-xs-icon)]",
  },
  sm: {
    height: 'h-[var(--form-size-sm-height)]',
    text: 'text-[length:var(--form-size-sm-text)]',
    paddingX: 'px-[var(--form-size-sm-padding-x)]',
    paddingY: 'py-[var(--form-size-sm-padding-y)]',
    padding: 'px-[var(--form-size-sm-padding-x)] py-[var(--form-size-sm-padding-y)]',
    icon: 'size-[var(--form-size-sm-icon)]',
    iconButton: 'size-[var(--form-size-sm-icon-button)]',
    switchRoot: 'h-[var(--form-size-sm-icon-button)] w-[calc(var(--form-size-sm-icon-button)*1.5)]',
    radioDot: 'size-[calc(var(--form-size-sm-icon)*0.5)]',
    svgIcon: "[&_svg:not([class*='size-'])]:size-[var(--form-size-sm-icon)]",
  },
  md: {
    height: 'h-[var(--form-size-md-height)]',
    text: 'text-[length:var(--form-size-md-text)]',
    paddingX: 'px-[var(--form-size-md-padding-x)]',
    paddingY: 'py-[var(--form-size-md-padding-y)]',
    padding: 'px-[var(--form-size-md-padding-x)] py-[var(--form-size-md-padding-y)]',
    icon: 'size-[var(--form-size-md-icon)]',
    iconButton: 'size-[var(--form-size-md-icon-button)]',
    switchRoot: 'h-[var(--form-size-md-icon-button)] w-[calc(var(--form-size-md-icon-button)*1.5)]',
    radioDot: 'size-[calc(var(--form-size-md-icon)*0.5)]',
    svgIcon: "[&_svg:not([class*='size-'])]:size-[var(--form-size-md-icon)]",
  },
  lg: {
    height: 'h-[var(--form-size-lg-height)]',
    text: 'text-[length:var(--form-size-lg-text)]',
    paddingX: 'px-[var(--form-size-lg-padding-x)]',
    paddingY: 'py-[var(--form-size-lg-padding-y)]',
    padding: 'px-[var(--form-size-lg-padding-x)] py-[var(--form-size-lg-padding-y)]',
    icon: 'size-[var(--form-size-lg-icon)]',
    iconButton: 'size-[var(--form-size-lg-icon-button)]',
    switchRoot: 'h-[var(--form-size-lg-icon-button)] w-[calc(var(--form-size-lg-icon-button)*1.5)]',
    radioDot: 'size-[calc(var(--form-size-lg-icon)*0.5)]',
    svgIcon: "[&_svg:not([class*='size-'])]:size-[var(--form-size-lg-icon)]",
  },
  xl: {
    height: 'h-[var(--form-size-xl-height)]',
    text: 'text-[length:var(--form-size-xl-text)]',
    paddingX: 'px-[var(--form-size-xl-padding-x)]',
    paddingY: 'py-[var(--form-size-xl-padding-y)]',
    padding: 'px-[var(--form-size-xl-padding-x)] py-[var(--form-size-xl-padding-y)]',
    icon: 'size-[var(--form-size-xl-icon)]',
    iconButton: 'size-[var(--form-size-xl-icon-button)]',
    switchRoot: 'h-[var(--form-size-xl-icon-button)] w-[calc(var(--form-size-xl-icon-button)*1.5)]',
    radioDot: 'size-[calc(var(--form-size-xl-icon)*0.5)]',
    svgIcon: "[&_svg:not([class*='size-'])]:size-[var(--form-size-xl-icon)]",
  },
  xxl: {
    height: 'h-[var(--form-size-xxl-height)]',
    text: 'text-[length:var(--form-size-xxl-text)]',
    paddingX: 'px-[var(--form-size-xxl-padding-x)]',
    paddingY: 'py-[var(--form-size-xxl-padding-y)]',
    padding: 'px-[var(--form-size-xxl-padding-x)] py-[var(--form-size-xxl-padding-y)]',
    icon: 'size-[var(--form-size-xxl-icon)]',
    iconButton: 'size-[var(--form-size-xxl-icon-button)]',
    switchRoot:
      'h-[var(--form-size-xxl-icon-button)] w-[calc(var(--form-size-xxl-icon-button)*1.5)]',
    radioDot: 'size-[calc(var(--form-size-xxl-icon)*0.5)]',
    svgIcon: "[&_svg:not([class*='size-'])]:size-[var(--form-size-xxl-icon)]",
  },
};

export const FORM_SIZE_TO_ICON_BUTTON_SIZE = {
  xxs: 'icon-xxs',
  xs: 'icon-xs',
  sm: 'icon-sm',
  md: 'icon-md',
  lg: 'icon-lg',
  xl: 'icon-xl',
  xxl: 'icon-xxl',
} as const satisfies Record<FormSize, string>;

export const formSizeVariants = cva('', {
  variants: {
    size: {
      xxs: `${FORM_SIZE_STYLES.xxs.height} ${FORM_SIZE_STYLES.xxs.text}`,
      xs: `${FORM_SIZE_STYLES.xs.height} ${FORM_SIZE_STYLES.xs.text}`,
      sm: `${FORM_SIZE_STYLES.sm.height} ${FORM_SIZE_STYLES.sm.text}`,
      md: `${FORM_SIZE_STYLES.md.height} ${FORM_SIZE_STYLES.md.text}`,
      lg: `${FORM_SIZE_STYLES.lg.height} ${FORM_SIZE_STYLES.lg.text}`,
      xl: `${FORM_SIZE_STYLES.xl.height} ${FORM_SIZE_STYLES.xl.text}`,
      xxl: `${FORM_SIZE_STYLES.xxl.height} ${FORM_SIZE_STYLES.xxl.text}`,
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
