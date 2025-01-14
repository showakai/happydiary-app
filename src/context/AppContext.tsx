import { createContext, ReactNode, useContext, useState } from "react";
import { DailyContents } from "../types/types";
import { useMediaQuery } from "@mui/material";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { theme } from "../theme/theme";
import { db } from "../firebase";

interface AppContextType {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  dailyContents: DailyContents[];
  setDailyContents: React.Dispatch<React.SetStateAction<DailyContents[]>>;
  isMobile: boolean;
  category: CategoryType;
  getContent: () => Promise<void>;
  deleteContent: (contentId: string) => void;
  updateContent: (
    targetContent: DailyContents,
    updatedValue: string
  ) => Promise<DailyContents[]>;

  setCategory: React.Dispatch<React.SetStateAction<CategoryType>>;
}
export type CategoryType = "ちょっと良い" | "良い" | "最高";

export const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [category, setCategory] = useState<CategoryType>("ちょっと良い");

  const [dailyContents, setDailyContents] = useState<DailyContents[]>([]);

  //全てのコンテンツを取得する処理
  const getContent = async (): Promise<void> => {
    try {
      const querySnapshot = await getDocs(collection(db, "Diary"));
      console.log(querySnapshot);

      const allContents = querySnapshot.docs
        .map((doc) => ({
          content: doc.data().content,
          date: doc.data().date,
          category: doc.data().category,
          id: doc.id,
        }))
        .sort((a, b) => b.date.toMillis() - a.date.toMillis());
      setDailyContents(allContents);
    } catch {
      throw new Error("データを取得できませんでした");
    }
  };

  //選択したコンテンツを削除する処理
  const deleteContent = (contentId: string) => {
    const deleteDocument = async (docId: string) => {
      await deleteDoc(doc(db, "Diary", docId));
    };

    deleteDocument(contentId);
    const newDaileyContents = dailyContents
      .filter((content) => !(contentId === content.id))
      .sort((a, b) => b.date.toMillis() - a.date.toMillis());

    setDailyContents(newDaileyContents);
  };

  //コンテンツ内容の更新
  const updateContent = async (
    targetContent: DailyContents,
    updatedValue: string
  ) => {
    const docRef = doc(db, "Diary", targetContent.id);
    await updateDoc(docRef, {
      content: updatedValue,
    });

    const updatedContents = dailyContents.map((c) => {
      if (c.id === targetContent.id) {
        return {
          ...c,
          content: updatedValue,
        };
      } else {
        return c;
      }
    });
    setDailyContents(updatedContents as DailyContents[]);
    return updatedContents;
  };

  return (
    <AppContext.Provider
      value={{
        isAuth,
        setIsAuth,
        dailyContents,
        setDailyContents,
        isMobile,
        category,
        getContent,
        deleteContent,
        updateContent,

        setCategory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    //undefinedの場合の処理
    throw new Error("グローバルなデータはプロバイダーの中で取得してください");
  }

  return context;
};
