import { DiscussionEmbed } from "disqus-react";
import { useRouter } from "next/router";
const CompanyDisqus = ({ post }) => {
  const disqusShortname = "BANADO";

  const { asPath } = useRouter();

  const disqusConfig = {
    url: `http://localhost:3000/Builder/${post.builderId}`,
    identifier: post.builderId, // Single post id
    title: post.companyName, // Single post title
  };

  return (
    <div>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
};

export default CompanyDisqus;
