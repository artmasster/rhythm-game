import type { Dispatch, SetStateAction } from "react";
import Start from "../components/Start";

export default function StartPage({
  setPage,
}: {
  setPage: Dispatch<SetStateAction<"start" | "play">>;
}) {
  return <Start setPage={setPage} />;
}
