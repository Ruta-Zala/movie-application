import * as React from "react";
import { NextPage } from "next";
import AuthSignin from "../../containers/HomepageContainer/AuthContainer/AuthSignin";
import AuthContainer from "../../containers/HomepageContainer/AuthContainer/AuthContainer";
import Layout from "../../modules/LayoutModule";

const AuthSignUpPage: NextPage = () => (
  <Layout>
    <AuthContainer>
      <AuthSignin />
    </AuthContainer>
  </Layout>
);
AuthSignUpPage.getInitialProps = () => ({
  isAuthPage: true,
});
export default AuthSignUpPage;
