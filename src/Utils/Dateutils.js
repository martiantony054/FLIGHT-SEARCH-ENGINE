export function formatDate(date) {
  return date.toISOString().split('T')[0];
}

export function formatDisplayDate(dateString) {
  const date = new Date(dateString);
  const options = { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('en-US', options);
}

export function isPastDate(dateString) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selectedDate = new Date(dateString);
  return selectedDate < today;
}

export function isValidDateRange(departure, returnDate) {
  if (!departure) return false;
  
  if (returnDate) {
    const dep = new Date(departure);
    const ret = new Date(returnDate);
    return ret >= dep;
  }
  
  return true;
}