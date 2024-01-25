import React from "react";
import { Route } from "react-router-dom";
import { have_access } from "./roles";

function ProtectedRoute({ user, route }) {
  const { path, Component, role, perm_name } = route;

  return have_access(user, role, perm_name) ? (
    <Route path={path} element={<Component />} />
  ) : null;
}

export default ProtectedRoute;
