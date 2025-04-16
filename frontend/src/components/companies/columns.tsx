// import { Company } from "@/types/company";
import { ColumnDef } from "@tanstack/react-table";

export interface Company {
  id: string;
  name: string;
  posts: number;
  overall_sentiment_label: string;
  overall_sentiment_value: number;
}

export const columns: ColumnDef<Company>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "posts",
    header: "Posts",
  },
  {
    accessorKey: "overall_sentiment_label",
    header: "Overall Sentiment",
  },
  {
    accessorKey: "overall_sentiment_value",
    header: "Overall Sentiment Value",
  },
];
