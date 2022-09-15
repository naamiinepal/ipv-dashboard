import MomentUtils from "moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import About from "./components/About";
import Admin from "./components/Admin";
import TweetCollectionAdminPanel from "./components/Admin/TweetCollectionAdminPanel";
import AuthProvider from "./components/AuthProvider";
import EndUser from "./components/EndUser";
import FilterProvider from "./components/FilterProvider";
import Login from "./components/Login";
import RequireAuth from "./components/RequireAuth";

const App = () => (
  <MuiPickersUtilsProvider utils={MomentUtils}>
    <AuthProvider>
      <FilterProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<EndUser />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
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
  </MuiPickersUtilsProvider>
);

export default App;
