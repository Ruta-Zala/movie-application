import * as React from "react";
import { NextPage } from "next";
import Layout from "../../modules/LayoutModule";
import SaveMovie from "../../containers/MovieContainer/SaveMovie";
import withAuth from "../../utils/withAuth";

const AddMovie: NextPage = () => (
  <Layout>
      <SaveMovie />
  </Layout>
);

export default withAuth(AddMovie);
