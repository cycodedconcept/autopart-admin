const getRelativeTimeString = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();

  // Fallback if an invalid date string format is accidentally supplied
  if (isNaN(date.getTime())) return dateString;
  
  const diffInMs = now.getTime() - date.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

  if (diffInHours < 24) {
    // Fallback cleanly to minimum threshold context if created just now
    const displayHours = diffInHours <= 0 ? 1 : diffInHours;
    return `${displayHours} hour${displayHours > 1 ? "s" : ""} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
};

export default getRelativeTimeString;
