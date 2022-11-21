import { lazy, Suspense, useState } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Admin from "./components/Admin";
import EndUser from "./components/EndUser";
import Login from "./components/Login";
import NoMatch from "./components/NoMatch";
import RequireAuth from "./components/RequireAuth";
import FilterContext, {
  defaultEndDate,
  defaultStartDate,
} from "./FilterContext";

// Do not load AdminPanel code at first
const TweetCollectionAdminPanel = lazy(
  () => import("./components/Admin/TweetCollectionAdminPanel")
);

const App = () => {
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);

  return (
    <FilterContext.Provider
      value={{ startDate, endDate, setStartDate, setEndDate }}
    >
      <BrowserRouter>
        <Routes>
          <Route index element={<EndUser />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/ap"
            element={
              <RequireAuth>
                <Admin />
              </RequireAuth>
            }
          >
            <Route
              index
              element={
                <Suspense fallback="Loading">
                  <TweetCollectionAdminPanel action="verify" />
                </Suspense>
              }
            />
            <Route
              path="modify"
              element={
                <Suspense fallback="Loading">
                  <TweetCollectionAdminPanel action="modify" />
                </Suspense>
              }
            />
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </FilterContext.Provider>
  );
};

export default App;
