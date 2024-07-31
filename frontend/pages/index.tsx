import type { NextPage } from 'next';
import HomepageContainer from '../containers/HomepageContainer';

export const getStaticProps = ({ locale, resolvedUrl }: any) => ({
  props: {},
});

const HomePage: NextPage = () => <HomepageContainer />;

export default HomePage;
