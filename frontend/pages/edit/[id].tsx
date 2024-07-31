import * as React from "react";
import { NextPage } from "next";
import Layout from "../../modules/LayoutModule";
import SaveMovie from "../../containers/MovieContainer/SaveMovie";
import withAuth from "../../utils/withAuth";

const EditMovie: NextPage = () => (
  <Layout>
      <SaveMovie isEdit/>
  </Layout>
);

export default withAuth(EditMovie);
