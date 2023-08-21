const currentFormattedData = (date, type) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours();
  const min = date.getMinutes();
  if (type === "date") {
    return day + "/" + month + "/" + year;
  } else {
    return hours + ":" + min;
  }
};

export default currentFormattedData;
