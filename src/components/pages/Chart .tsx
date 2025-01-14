import {
  Box,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

import { useAppContext } from "../../context/AppContext";
import Loading from "../Loading";
import { DailyContents } from "../../types/types";
import { toJaFormat } from "../../utils/format";
import UpdateDialog from "../UpdateDialog";

function Chart() {
  const { dailyContents, deleteContent, getContent, updateContent } =
    useAppContext();
  const [isLoad, setIsLoad] = useState(false);

  const [searchWord, setSearchWord] = useState("");
  const [searchList, setSearchList] = useState<DailyContents[]>([]);
  const [open, setOpen] = useState(false); //ダイアログで使用
  const [selectedSearchContent, setSelectedSearchContent] =
    useState<DailyContents>();

  //全てのコンテンツを取得する処理
  useEffect(() => {
    getContent();
  }, []);

  const onSearchContent = () => {
    try {
      setIsLoad(true);
      const searchResult = dailyContents.filter((c) =>
        c.content.includes(searchWord)
      );
      setSearchList(searchResult);
    } finally {
      setIsLoad(false);
    }
  };

  //ボタンで更新する処理
  const onUpdateContent = async (
    content: DailyContents,
    updateValue: string
  ) => {
    const newContents = await updateContent(content, updateValue);
    setOpen(false);

    const newSearchList = newContents.filter((c) =>
      c.content.includes(searchWord)
    );
    setSearchList(newSearchList);
  };

  return (
    <Box
      sx={{
        height: "100vh",
      }}
    >
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
      >
        <InputBase
          fullWidth
          sx={{ ml: 1, flex: 1 }}
          placeholder="検索したいワードを入れてください"
          inputProps={{ "aria-label": "検索したいワードを入れてください" }}
          onChange={(t) => setSearchWord(t.target.value)}
        />
        <IconButton
          onClick={onSearchContent}
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <Paper
        sx={{
          p: 2,
          mt: 2,
          height: "auto",
          minHeight: "400px",
          borderRadius: "20px",
        }}
      >
        検索結果
        <List
          sx={{
            width: "100%",
            height: "auto",
            bgcolor: "background.paper",
            overflow: "scroll",
          }}
        >
          {isLoad ? (
            <Loading />
          ) : searchList.length > 0 && Array.isArray(searchList) ? (
            searchList.map((content) => (
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
                    setSelectedSearchContent(content);
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
              sx={{ height: "400px" }}
            >
              データがありません
            </Typography>
          )}
        </List>
      </Paper>
      <UpdateDialog
        open={open}
        setOpen={setOpen}
        selectedContent={selectedSearchContent}
        onUpdateContent={onUpdateContent}
      />
    </Box>
  );
}

export default Chart;
