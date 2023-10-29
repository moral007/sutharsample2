import Head from 'next/head'

import { getPosts } from '../utils/wordpress';

import Post from "../components/Post";

export default function Home({ posts }) {

  const jsxPosts = posts.map(post => {
    const featuredMedia = post['_embedded']['wp:featuredmedia'][0];
    return (
      <Post post={post} key={post.id}/>
    )
  });

  return (
    <>
      <Head>
        <title>True Guess</title>
        <meta name="description" content="Keep up to date with the latest trends in tech" />
      </Head>

      <div className="container pt-5">
        <h1 className="text-center pb-5">True Guess</h1>
          <div className="col-lg-8">
            {jsxPosts}
          </div>
      </div>
    </>
  )

}

export async function getStaticProps({ params }) {

  const posts = await getPosts();
  return {
    props: {
     posts,
    },
    revalidate: 10, // In seconds
  }

}
