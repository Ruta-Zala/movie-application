import * as React from "react";
import { NextPage } from "next";
import Layout from "../../modules/LayoutModule";
import MovieContainer from "../../containers/MovieContainer/MovieContainer";
import withAuth from "../../utils/withAuth";

const AuthSignUpPage: NextPage = () => (
  <Layout>
      <MovieContainer />
  </Layout>
);

export default withAuth(AuthSignUpPage);
