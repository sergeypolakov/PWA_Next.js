import { useGetHighlight } from "@/apollo/actions";
import withApollo from "@/hoc/withApollo";
import { getDataFromTree } from "@apollo/react-ssr";

import PortfolioCard from "@/components/portfolios/PortfolioCard";
import BaseLayout from "@/layouts/BaseLayout";
import Link from "next/link";
import TopicLink from "@/components/forum/TopicLink";

const useGetInitialData = () => {
  const { data } = useGetHighlight({ variables: { limit: 3 } });
  const portfolios = (data && data.highlight.portfolios) || [];
  const topics = (data && data.highlight.topics) || [];
  return { portfolios, topics };
};

const Home = () => {
  const { topics, portfolios } = useGetInitialData();

  return (
    <BaseLayout page="Home">
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h2>Services</h2>
          </div>
        </div>
      </section>
      <section className="pb-5">
        <div className="row">
          {portfolios.map((portfolio) => (
            <div key={portfolio._id} className="col-md-4">
              <Link href="/portfolios/[id]" as={`/portfolios/${portfolio._id}`}>
                <a className="card-link">
                  <PortfolioCard portfolio={portfolio} />
                </a>
              </Link>
            </div>
          ))}
        </div>
      </section>
      <Link href="/portfolios">
        <a className="btn btn-main bg-blue ttu">See All Services</a>
      </Link>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h2>About PWAs</h2>
          </div>
        </div>
      </section>
      <section className="pb-5">
        <div className="list-group">
          {topics.map((topic) => (
            <TopicLink key={topic._id} topic={topic} />
          ))}
        </div>
      </section>
      <Link href="/forum/categories">
        <a className="btn btn-main bg-blue ttu">See More Posts</a>
      </Link>
    </BaseLayout>
  );
};

export default withApollo(Home, { getDataFromTree });
