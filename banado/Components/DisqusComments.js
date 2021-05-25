import { DiscussionEmbed } from "disqus-react";
import { useRouter } from "next/router";
const DisqusComments = ({ post }) => {
  const disqusShortname = "BANADO";
  const router = useRouter();
  const disqusConfig = {
    url: `http://localhost:3000/SingleProduct/${post._id}`,
    identifier: post._id, // Single post id
    title: post.productName, // Single post title
  };
  return (
    <div>
      {console.log(router.query)}
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
};

export default DisqusComments;
