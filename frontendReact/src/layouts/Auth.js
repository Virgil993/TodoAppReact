import React from "react";
import { Route, Switch, Redirect, useNavigate } from "react-router-dom";
import { StyledContainer } from "../components/styles/Container.styled";

import routes from "../routes";

function Auth(props) {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (localStorage.getItem("apiToken") != null) {
      navigate("/admin/allTodos");
    }
  });

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  return (
    <StyledContainer>
      <Switch>
        {getRoutes(routes)}
        <Redirect from="*" to="/auth/login" />
      </Switch>
    </StyledContainer>
  );
}

export default Auth;
