import { z } from "zod";

export const diarySchema = z.object({
  content: z.string().min(1, { message: "内容を入力してください" }),
});

export type diarySchemaType = z.infer<typeof diarySchema>;
