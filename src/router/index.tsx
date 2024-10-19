import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/home/page";
import ExtendedError from "../components/extended-error";
import { RootLayout } from "../layout";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/inventory" element={<HomePage />} />
      </Route>
      <Route path="*" element={<ExtendedError statusCode={404} />} />
    </Routes>
  );
}
