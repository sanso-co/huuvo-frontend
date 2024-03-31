import moment from "moment";

interface FormattedDate {
  month: string;
  day: number;
  year: number;
}

export const formatDate = (dateString?: string): string => {
  const formattedDate: FormattedDate = {
    month: "",
    day: 0,
    year: 0,
  };

  const date = moment(dateString);

  formattedDate.month = date.format("MMMM");
  formattedDate.day = parseInt(date.format("D"));
  formattedDate.year = parseInt(date.format("YYYY"));

  return `${formattedDate.month} ${formattedDate.day}, ${formattedDate.year}`;
};
