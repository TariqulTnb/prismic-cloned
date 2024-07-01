export const formatDate = (dateString, locale) => {
  try {
    // Parse the date string to a Date object
    const date = new Date(dateString);

    // Get the day, month, and year components
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Months are zero-indexed in JavaScript
    const year = date.getUTCFullYear();

    // Check for locale and format accordingly
    if (locale === "ja-jp") {
      // Define an array with the Japanese month names
      const monthNames = [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
      ];

      // Format the date string in Japanese format
      return `${monthNames[month - 1]} ${day}, ${year}`;
    } else if (locale === "en-au") {
      // Define an array with the English month names
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      // Format the date string in English format
      return `${day} ${monthNames[month - 1]} ${year}`;
    } else {
      throw new Error(`Unsupported locale: ${locale}`);
    }
  } catch (e) {
    // If the date string can't be parsed, return a default value or throw an error
    console.error("Invalid date string or unsupported locale", e);
    return "Invalid date string or unsupported locale";
  }
};

export default formatDate;
