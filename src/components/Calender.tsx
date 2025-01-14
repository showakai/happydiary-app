import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import jaLocale from "@fullcalendar/core/locales/ja";
import "../Calender.css";
import { Paper } from "@mui/material";
import { toFormat } from "../utils/format";
import {
  DatesSetArg,
  EventClickArg,
  EventContentArg,
} from "@fullcalendar/core/index.js";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { DailyContents } from "../types/types";
import { useEffect } from "react";

type CalenderProps = {
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  dailyContents: DailyContents[];
  setCurrentMonth: React.Dispatch<React.SetStateAction<number>>;
  currentMonth: number;
  setMonthlyDailyContents: React.Dispatch<
    React.SetStateAction<DailyContents[]>
  >;
};

function Calender({
  dailyContents,
  currentMonth,
  setCurrentMonth,
  setMonthlyDailyContents,
}: CalenderProps) {
  useEffect(() => {
    const currentContent = dailyContents.filter(
      (content) => content.date.toDate().getDate() + 1 === currentMonth
    );
    setMonthlyDailyContents(currentContent);
  }, []);

  const eventsList = dailyContents.map((dailyContent) => {
    const day = dailyContent.date;
    return {
      start: toFormat(day),
      content: dailyContent.content,
      category: dailyContent.category,
    };
  });

  //   //空の日付が押された時の処理
  //   const onDateClick = (e: DateClickArg) => {
  //     e.dayEl.style.backgroundColor = "lightBlue";
  //     alert("デートが押されmした");
  //   };

  //イベントが押された時の処理
  const onEventClick = (e: EventClickArg) => {
    const selectedDateContent = dailyContents.filter(
      (content) => toFormat(content.date) === toFormat(e.event.start as Date)
    );
    console.log(selectedDateContent);
  };

  //月の切り替えボタンが押された時の処理
  const handleDatesSet = (dateinfo: DatesSetArg) => {
    setCurrentMonth(dateinfo.view.currentStart.getMonth() + 1);
  };

  //月が切り替わるたびに、月間のコンテンツを取得する処理
  useEffect(() => {
    const monthlyDailyContentsList: DailyContents[] = dailyContents.filter(
      (content) => content.date.toDate().getMonth() + 1 === currentMonth
    );

    setMonthlyDailyContents(monthlyDailyContentsList);
  }, [dailyContents, currentMonth]);

  //イベントの表示形式
  const renderEventContent = (e: EventContentArg) => {
    return (
      <div className="smileIcon">
        <EmojiEmotionsIcon
          sx={{
            color:
              e.event.extendedProps.category === "最高"
                ? (theme) => theme.palette.error.main
                : e.event.extendedProps.category === "良い"
                  ? (theme) => theme.palette.pink.main
                  : (theme) => theme.palette.secondary.main,
            width: { xs: "10px", sm: "13px" },
            height: { xs: "10px", sm: "13px" },
          }}
        />
      </div>
    );
  };

  return (
    <Paper
      sx={{
        padding: { xs: "20px 0", sm: 3 },
        borderRadius: {
          xs: "16px",
          sm: "20px",
        },
        height: "auto",
      }}
    >
      <FullCalendar
        locale={jaLocale}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        fixedWeekCount={false}
        height="auto"
        events={eventsList}
        eventContent={renderEventContent}
        contentHeight={100}
        eventClick={onEventClick}
        dayCellContent={(e) => e.date.getDate()}
        // dateClick={onDateClick}
        eventBackgroundColor="transparent"
        eventBorderColor="transparent"
        datesSet={handleDatesSet}
      />
    </Paper>
  );
}

export default Calender;
