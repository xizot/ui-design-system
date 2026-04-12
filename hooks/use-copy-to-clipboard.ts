export const useCopyToClipboard = () => {
  const copyToClipboard = async (value: string): Promise<boolean> => {
    try {
      if (!value) {
        return false;
      }
      const el = document.createElement('textarea');
      el.value = value;
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.focus();
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      return true;
    } catch {
      return false;
    }
  };

  return { copyToClipboard };
};
