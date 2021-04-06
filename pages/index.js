import axios from "axios";
import { useState, useEffect } from "react";
import Footer from "../components/footer";
import Head from "../components/head";
import { connectToDatabase } from "../util/mongodb";
export default function Home(data) {
  data=data.data
  const description =
    "Infinity is both like a website and a diary. A place where all people across the globe get a chance to put their views and talent in front of everyone.";
  const title = "Infinity | Live thousand lives in one world";
  const url = "https://www.arnavgupta.net";
  const images = "https://www.arnavgupta.net/logo.png";
  const alts = "logo of the infinity website";
  const imagec = "https://www.arnavgupta.net/logo.png";
  const altc = "logo of the infinity website";
  const tags =
    "blog, infinity, passionate bloggers, blogs, passionate, write, read, post, live thousand lives in one world";
  const card = "summary_large_image";
  return (
    <div>
      <Head
        description={description}
        title={title}
        url={url}
        images={images}
        alts={alts}
        imagec={imagec}
        altc={altc}
        tags={tags}
        card={card}
      ></Head>
      <main>
        {data&& data.map((e) => (
          <a href={`/article/${e._id}`}>{e.title} {" "}</a>
        ))}
        <br></br>
      </main>
      <Footer></Footer>
    </div>
  );
}


export async function getServerSideProps({ params }) {
  const { db } = await connectToDatabase();
    let posts = await db
      .collection("posts")
      .aggregate([
        {
          $project: {
            blog: 1,
            title: 1,
            imageDescription: 1,
            tags: 1,
            username: 1,
            condition: 1,
            computerProgramme: 1,
          },
        },
      ])
      .limit(20)
      .toArray();
    posts = JSON.parse(JSON.stringify(posts));
    if (posts) {
      posts.images = [];
      return { props: { data: posts } };
    } else {
      return { props: { data: [{ error: true }] } };
    }
}
