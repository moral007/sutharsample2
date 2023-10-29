import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
// import { useEffect } from "react";

import { getPost, getSlugs } from "../../utils/wordpress";

export default function PostPage({ post }) {
  const router = useRouter();
  const currentURL = router.asPath;

    if (typeof window !== "undefined" && window?.document?.referrer?.includes("facebook.com")) {
      location = post?.yoast_head_json?.og_url;
    }
  
  

  const featuredMedias = post["_embedded"]["wp:featuredmedia"][0];

    // useEffect(() => {
    //   if (window?.document?.referrer?.includes("facebook.com")) {
    //     location = post?.yoast_head_json?.og_url;
    //   }
    // }, []);
  
  return (
    <div className="container">
      <Head>
        <title>{post?.yoast_head_json?.title}</title>
        <meta name="description" content={post?.yoast_head_json?.description} />
        <link rel="canonical" href={currentURL} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post?.yoast_head_json?.title} />
        <meta
          property="og:description"
          content={post?.yoast_head_json?.description}
        />
        <meta property="og:url" content={currentURL} />
        <meta
          property="og:site_name"
          content={post?.yoast_head_json?.og_site_name}
        />
        <meta
          property="article:published_time"
          content={post?.yoast_head_json?.published_time}
        />
        <meta
          property="article:modified_time"
          content={post?.yoast_head_json?.article_modified_time}
        />
        <meta
          property="og:image"
          content={post?.yoast_head_json?.og_image[0]?.url}
        />
        <meta
          property="og:image:width"
          content={post?.yoast_head_json?.og_image[0]?.width}
        />
        <meta
          property="og:image:height"
          content={post?.yoast_head_json?.og_image[0]?.height}
        />
        <meta
          property="og:image:type"
          content={post?.yoast_head_json?.og_image[0]?.type}
        />
      </Head>

      <div className="card">
        <Image
          style={{ display: 'none'}}
          src={post?.yoast_head_json?.og_image[0]?.url}
          width={1200}
          height={630}
        />

        <h1 className="pb-4 pt-4">{post.title.rendered}</h1>
        <div
          className="card-text pb-5"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        ></div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = await getSlugs("posts");
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const post = await getPost(params.slug);
  return {
    props: {
      post,
    },
    revalidate: 10, // In seconds
  };
}
