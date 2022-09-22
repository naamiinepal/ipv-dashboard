import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Admin from "./components/Admin";
import TweetCollectionAdminPanel from "./components/Admin/TweetCollectionAdminPanel";
import EndUser from "./components/EndUser";
import Login from "./components/Login";
import RequireAuth from "./components/RequireAuth";
import AuthProvider from "./contexts/AuthProvider";
import FilterProvider from "./contexts/FilterProvider";

const App = () => (
  <AuthProvider>
    <FilterProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<EndUser />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route
            path="/ap"
            element={
              <RequireAuth>
                <Admin />
              </RequireAuth>
            }
          >
            <Route
              path="modify"
              element={<TweetCollectionAdminPanel action="modify" />}
            />
            <Route
              index
              element={<TweetCollectionAdminPanel action="verify" />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </FilterProvider>
  </AuthProvider>
);

export default App;
