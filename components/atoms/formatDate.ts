export const formatDateLabel = (isoString: string) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString
    ('en-NG', { day: 'numeric', month: 'short' })
  };

  export const formatDateLabelYear = (isoString: string) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString
    ('en-NG', {  year: "numeric" , month: 'numeric',day: 'numeric'})
  };

  export const formatDateLabelYearTime = (isoString: string) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString
    ('en-NG', {  year: "numeric" , month: 'numeric',day: 'numeric', hour: '2-digit', minute: '2-digit' })
  };

  