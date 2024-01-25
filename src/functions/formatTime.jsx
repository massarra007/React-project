import { format, getTime } from "date-fns";
import { fr } from "date-fns/locale";

// ----------------------------------------------------------------------

export function fDate(date, newFormat) {
  const fm = newFormat || "dd MMM yyyy";

  return date ? format(new Date(date), fm, { locale: fr }) : "";
}
export function fDateTime(date, newFormat) {
  const fm = newFormat || "dd MMM yyyy p";

  return date ? format(new Date(date), fm) : "";
}
export function fDateInverse(date) {
  return new Date(date).toISOString().substr(0, 10);
}
