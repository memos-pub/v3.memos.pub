import { fetchGitHub } from "@/github/fetch";
import { NextResponse } from "next/server";

export const GET = async (): Promise<Response> => {
  const data = await fetchGitHub("rate_limit");
  return NextResponse.json(data);
};
