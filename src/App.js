import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  getValues,
  postValues,
  deleteValues
} from "./store/actions/values.actions";

import PrivateRoute from "./utils/PrivateRoute";

import Header from "./components/header/Header.component";
import SignInAndUpPage from "./pages/sign-in-and-up/SignInAndUpPage";
import HomePage from "./pages/homepage/HomePage.page";
import AboutValues from "./components/about/about-values/AboutValues.component";
import AboutProjects from "./components/about/about-projects/AboutProjects.component";
import ChoiceExplanationForm from "./components/choice-explanation/ChoiceExplanationForm.component";
import ProjectForm from "./components/project-form/ProjectForm.component";
import EditProfile from "./components/edit-forms/EditProfile.component";
import EditValuesPage from "./pages/edit-values/EditValuesPage";

import { Globals } from "./globals/GlobalStyles";

import "./App.css";
import EditProjectsPage from "./pages/edit-projects/EditProjectsPage.component";
import ValuesList from "./components/values-components/values-list/ValuesList.component";
function App() {
  const welcome = useSelector(state => console.log(state));
  // console.log(welcome);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getValues());
  }, []);

  return (
    <Router>
      <Globals />
      {welcome || localStorage.getItem("token") ? (
        <Header />
      ) : (
        <SignInAndUpPage />
      )}
      <Switch>
        {/* <PrivateRoute path="/choice-expl" component={ChoiceExplanationForm} />
        <PrivateRoute path="/project-form" component={ProjectForm} />
        <PrivateRoute path="/values-selection" component={ValuesList} />
        <PrivateRoute path="/edit-profile" component={EditProfile} />
        <PrivateRoute path="/edit-values" component={EditValuesPage} />
        <PrivateRoute path="/edit-projects" component={EditProjectsPage} />
        <PrivateRoute path="/home" component={HomePage} />
        <PrivateRoute path="/about-values" component={AboutValues} />
        <PrivateRoute path="/about-projects" component={AboutProjects} /> */}
      </Switch>
    </Router>
  );
}

export default App;
