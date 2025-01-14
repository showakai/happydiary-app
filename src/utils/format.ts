import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Timestamp } from "firebase/firestore";
export const toJaFormat = (date: Timestamp | Date) => {
  if (date instanceof Timestamp) {
    return format(date.toDate(), "yyyy年MM月dd日", { locale: ja });
  } else {
    return format(date, "yyyy年MM月dd日", { locale: ja });
  }
};
export const toFormat = (date: Timestamp | Date) => {
  if (date instanceof Timestamp) {
    return format(date.toDate(), "yyyy-MM-dd", { locale: ja });
  } else {
    return format(date, "yyyy-MM-dd", { locale: ja });
  }
};
