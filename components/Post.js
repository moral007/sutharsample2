import Link from "next/link";
import Image from "next/image";
//to use Image with an external url, add some config on next.config.js
//for more info, check out these docs https://nextjs.org/docs/basic-features/image-optimization

// import {getDate} from "../utils/utils";

function getDate(date) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function Post({ post }) {
  return (
    <div className="card">
      <p className="date-text">On {getDate(post.modified)}</p>
      <Link href={`/posts/${post.slug}`}>
        <h2 className="title">{post.title.rendered}</h2>
      </Link>
      {/* <div className="card-text" dangerouslySetInnerHTML={{__html: post.excerpt.rendered}}></div> */}
    </div>
  );
}
