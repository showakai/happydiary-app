import {
  Box,
  Grid2,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { DailyContents } from "../../types/types";
import { toJaFormat } from "../../utils/format";
import { useAppContext } from "../../context/AppContext";
import Calender from "../Calender";
import DeleteIcon from "@mui/icons-material/Delete";
import Loading from "../Loading";
import { BarChart } from "../Bar";
import UpdateDialog from "../UpdateDialog";

interface Allprops {
  setDailyContents: React.Dispatch<React.SetStateAction<DailyContents[]>>;
  dailyContents: DailyContents[];
  getContent: () => Promise<void>;
  deleteContent: (contentId: string) => void;
  updateContent: (
    targetContent: DailyContents,
    updatedValue: string
  ) => Promise<DailyContents[]>;
}

const All = () => {
  const today = new Date();
  const [open, setOpen] = useState(false); //ダイアログで使用
  const [selectedcontent, setSelectedContent] = useState<DailyContents>({
    content: "",
    date: Timestamp.fromDate(new Date(0)),
    id: "",
    category: "最高",
  });

  const [currentMonth, setCurrentMonth] = useState<number>(
    today.getMonth() + 1
  );
  const {
    dailyContents,

    getContent,
    deleteContent,
    updateContent,
  }: Allprops = useAppContext();
  const [isLoad, setIsLoad] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  console.log(selectedDate);

  const [monthlyDailyContents, setMonthlyDailyContens] = useState<
    DailyContents[]
  >([]);

  //全てのコンテンツを取得する処理
  useEffect(() => {
    const fetchContent = async () => {
      try {
        getContent();
      } finally {
        setIsLoad(false);
      }
    };
    fetchContent();
  }, []);

  //月ごとのコンテンツを取得する処理
  //   const getMonthlyDailyContents = (
  //     allContents: DailyContents[],
  //     currentMonth: number
  //   ) => {
  //     const monthlyContents = allContents.filter((content) => [
  //       content.date.toDate().getMonth() + 1 === currentMonth,
  //     ]);
  //     const sortedContent = monthlyContents.sort(
  //       (a, b) => b.date.toMillis() - a.date.toMillis()
  //     );

  //     setMonthlyDailyContens(sortedContent);
  //   };

  const onUpdateContent = async (
    content: DailyContents,
    updatedValue: string
  ) => {
    await updateContent(content, updatedValue);
    setOpen(false);
  };
  return (
    <Box sx={{ height: "auto", p: "0 0 80px" }}>
      <Box sx={{ p: "0 2" }}>
        <Paper
          sx={{
            borderRadius: { xs: "16px", sm: "20px" },
            boxShadow: { xs: 0, sm: "10px" },
            boxSizing: 12,
            mb: 2,
            p: 2.5,
          }}
        >
          <Stack direction="row" justifyContent="space-between">
            <Typography
              fontSize={{
                xs: "14px",
                sm: "16px",
              }}
              fontWeight={700}
            >
              私のいいこと
            </Typography>
            <Typography>
              <Box
                component="span"
                sx={{
                  color: "pink.main",
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                {monthlyDailyContents.length}
              </Box>
              こ
            </Typography>
          </Stack>
          <BarChart monthlyDailyContents={monthlyDailyContents} />
        </Paper>
      </Box>
      <Grid2
        container
        flexDirection={{ xs: "column-reverse", md: "row" }}
        spacing={2}
        sx={{ height: "auto" }}
      >
        <Grid2
          size={{ xs: 12, lg: 4 }}
          sx={{
            maxHeight: "70vh",
            p: {
              xs: 0,
              sm: "inherit",
            },
          }}
        >
          <Paper
            elevation={1}
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: "20px",
              height: "65vh",
              overflow: "hidden",
            }}
          >
            <Typography
              variant="h6"
              fontWeight={700}
              p={2}
              sx={{
                color: "purple",
                fontSize: {
                  xs: "16px",
                  sm: "20px",
                },
              }}
            >
              今月のいいこと
            </Typography>

            <List
              sx={{
                width: "100%",
                bgcolor: "background.paper",
                height: "80%",
                overflow: "scroll",
              }}
            >
              {isLoad ? (
                <Loading />
              ) : monthlyDailyContents.length > 0 ? (
                monthlyDailyContents.map((content) => (
                  <ListItem
                    key={content.id}
                    sx={{
                      padding: { xs: "4px 0", sm: "16px 0" },
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    <ListItemIcon sx={{ justifyContent: "center" }}>
                      <EmojiEmotionsIcon
                        sx={{
                          color: (theme) =>
                            content.category === "最高"
                              ? theme.palette.error.main
                              : content.category === "良い"
                                ? theme.palette.pink.main
                                : theme.palette.secondary.main,
                        }}
                      />
                    </ListItemIcon>
                    <ListItemButton
                      onClick={() => {
                        setOpen(true);
                        setSelectedContent(content);
                      }}
                    >
                      <ListItemText
                        primary={content.content}
                        secondary={toJaFormat(content.date)}
                      />
                    </ListItemButton>
                    <ListItemIcon>
                      <ListItemButton onClick={() => deleteContent(content.id)}>
                        <DeleteIcon />
                      </ListItemButton>
                    </ListItemIcon>
                  </ListItem>
                ))
              ) : (
                <Typography
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ height: "100%" }}
                >
                  データがありません
                </Typography>
              )}
            </List>
          </Paper>
        </Grid2>
        <Grid2 height="atto" size={{ xs: 12, lg: 8 }}>
          <Calender
            setSelectedDate={setSelectedDate}
            dailyContents={dailyContents}
            setMonthlyDailyContents={setMonthlyDailyContens}
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
          />
        </Grid2>
      </Grid2>
      <UpdateDialog
        open={open}
        setOpen={setOpen}
        selectedContent={selectedcontent}
        onUpdateContent={onUpdateContent}
      />
    </Box>
  );
};

export default All;
