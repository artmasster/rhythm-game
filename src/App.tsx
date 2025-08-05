import { useState } from "react";
import PlayPage from "./pages/PlayPage";
import StartPage from "./pages/StartPage";

export default function App() {
  const [page, setPage] = useState<"start" | "play">("start");

  if (page === "start") {
    return <StartPage setPage={setPage} />;
  }

  return <PlayPage />;
}
