/**
 * Copies text to clipboard
 * @param text - The text to copy
 * @returns Promise<boolean> - True if successful, false otherwise
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      // Use the modern clipboard API
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers or non-secure contexts
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    }
  } catch (err) {
    console.error('Failed to copy to clipboard:', err);
    return false;
  }
};

/**
 * Copies text to clipboard with a callback for success/failure
 * @param text - The text to copy
 * @param onSuccess - Callback function called on successful copy
 * @param onError - Callback function called on failed copy
 */
export const copyToClipboardWithCallback = async (
  text: string,
  onSuccess?: () => void,
  onError?: (error: Error) => void
): Promise<void> => {
  try {
    const success = await copyToClipboard(text);
    if (success && onSuccess) {
      onSuccess();
    } else if (!success && onError) {
      onError(new Error('Failed to copy to clipboard'));
    }
  } catch (err) {
    if (onError) {
      onError(err as Error);
    }
  }
}; 