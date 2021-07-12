import { DiscussionEmbed } from "disqus-react";
import { useRouter } from "next/router";
const DisqusComments = ({ post }) => {
  const disqusShortname = "BANADO";

  const { asPath } = useRouter();

  const disqusConfig = {
    url: `https://banado.vercel.app/SingleProduct/${post._id}`,
    identifier: post._id, // Single post id
    title: post.productName, // Single post title
  };

  return (
    <div>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
};

export default DisqusComments;
