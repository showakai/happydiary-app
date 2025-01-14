import { Timestamp } from "firebase/firestore";
import { CategoryType } from "../context/AppContext";

export interface DailyContents {
  content: string;
  date: Timestamp;
  id: string;
  category: CategoryType;
}
