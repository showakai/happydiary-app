import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import Login from "../components/pages/Login";
import Top from "../components/pages/Top";
import All from "../components/pages/All";
import Chart from "../components/pages/Chart ";

const routesLink = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route>
        <Route path="/login" element={<Login />} index />
        <Route path="/" element={<AppLayout />}>
          <Route path="/" element={<Top />} index />
          <Route path="/all" element={<All />} index />
          <Route path="/chart" element={<Chart />} index />
        </Route>
        <Route path="*" />
      </Route>
    </>
  )
);

export default routesLink;
