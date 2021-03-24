import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
// import User from "./components/User";
import OrderForm from "./components/OrderForm";
import ApplicationForm from "./components/ApplicationForm";
import ReviewForm from "./components/ReviewForm";
import ProjectForm from "./components/ProjectForm";
import PurchaseForm from "./components/PurchaseForm";
import PoliticForm from "./components/PoliticForm";
import Feed from "./components/Feed";
import ApplicationProfile from "./components/ApplicationProfile";
import OrderProfile from "./components/OrderProfile";
import ReviewProfile from "./components/ReviewProfile";
import OrderAppsProfile from "./components/OrderAppsProfile";
import UserProfile from "./components/UserProfile";
import ProjectProfile from "./components/ProjectProfile";
import PurchaseProfile from "./components/PurchaseProfile";
import PoliticProfile from "./components/PoliticProfile";
import Notifications from "./components/Notifications";
import { getOrders } from "./store/orders";
import { getApplications } from "./store/applications";
import { getReviews } from "./store/reviews";
import { addUser } from "./store/session";

import { authenticate } from "./services/auth";
import { useDispatch } from "react-redux";
import { getProjects } from "./store/projects";
import { getPurchases } from "./store/purchases";
import { getPolitics } from "./store/politics";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
        dispatch(addUser(user));
        // dispatch(getOrders());
        // dispatch(getApplications());
        // dispatch(getReviews());
        // dispatch(getProjects());
        // dispatch(getPurchases());
        // dispatch(getPolitics());
      }
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
        </Route>
        <ProtectedRoute
          path="/notifications"
          exact={true}
          authenticated={authenticated}
        >
          <NavBar setAuthenticated={setAuthenticated} />
          <Notifications />
        </ProtectedRoute>
        <ProtectedRoute
          path="/orders/new"
          exact={true}
          authenticated={authenticated}
        >
          <NavBar setAuthenticated={setAuthenticated} />
          <OrderForm />
        </ProtectedRoute>
        <ProtectedRoute
          path="/users/:id"
          exact={true}
          authenticated={authenticated}
        >
          <NavBar setAuthenticated={setAuthenticated} />
          <UserProfile />
        </ProtectedRoute>
        <ProtectedRoute
          path="/order/:id"
          exact={true}
          authenticated={authenticated}
        >
          <NavBar setAuthenticated={setAuthenticated} />
          <OrderProfile />
        </ProtectedRoute>
        <ProtectedRoute
          path="/order/:id/apps"
          exact={true}
          authenticated={authenticated}
        >
          <NavBar setAuthenticated={setAuthenticated} />
          <OrderAppsProfile />
        </ProtectedRoute>
        <ProtectedRoute
          path="/applications/new/:orderId"
          exact={true}
          authenticated={authenticated}
        >
          <NavBar setAuthenticated={setAuthenticated} />
          <ApplicationForm />
        </ProtectedRoute>
        <ProtectedRoute
          path="/application/:id"
          exact={true}
          authenticated={authenticated}
        >
          <NavBar setAuthenticated={setAuthenticated} />
          <ApplicationProfile />
        </ProtectedRoute>
        <ProtectedRoute
          path="/reviews/new/:appId"
          exact={true}
          authenticated={authenticated}
        >
          <NavBar setAuthenticated={setAuthenticated} />
          <ReviewForm />
        </ProtectedRoute>
        <ProtectedRoute
          path="/review/:id"
          exact={true}
          authenticated={authenticated}
        >
          <NavBar setAuthenticated={setAuthenticated} />
          <ReviewProfile />
        </ProtectedRoute>
        <ProtectedRoute
          path="/projects/new"
          exact={true}
          authenticated={authenticated}
        >
          <NavBar setAuthenticated={setAuthenticated} />
          <ProjectForm />
        </ProtectedRoute>
        <ProtectedRoute
          path="/project/:id"
          exact={true}
          authenticated={authenticated}
        >
          <NavBar setAuthenticated={setAuthenticated} />
          <ProjectProfile />
        </ProtectedRoute>
        <ProtectedRoute
          path="/purchases/new/:projectId"
          exact={true}
          authenticated={authenticated}
        >
          <NavBar setAuthenticated={setAuthenticated} />
          <PurchaseForm />
        </ProtectedRoute>
        <ProtectedRoute
          path="/purchase/:id"
          exact={true}
          authenticated={authenticated}
        >
          <NavBar setAuthenticated={setAuthenticated} />
          <PurchaseProfile />
        </ProtectedRoute>
        <ProtectedRoute
          path="/politics/new"
          exact={true}
          authenticated={authenticated}
        >
          <NavBar setAuthenticated={setAuthenticated} />
          <PoliticForm />
        </ProtectedRoute>
        <ProtectedRoute
          path="/politic/:id"
          exact={true}
          authenticated={authenticated}
        >
          <NavBar setAuthenticated={setAuthenticated} />
          <PoliticProfile />
        </ProtectedRoute>
        <ProtectedRoute path="/users" exact={true} authenticated={authenticated}>
          <NavBar setAuthenticated={setAuthenticated} />
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
          <NavBar setAuthenticated={setAuthenticated} />
          <Feed />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
