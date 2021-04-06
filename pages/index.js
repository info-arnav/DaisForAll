import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Footer from "../components/footer";import Heads from "next/head"
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
      <main style={{marginBottom:"20px"}}>
<div id="columns" style={{breakInside: "avoid"}}>{data&& data.map((e) => (<div class="item-2">
    <a href={`/article/${e._id}`} class="card">
      <div class="thumb" style={{backgroundImage:`url(/api/image/${e._id})`}}></div>
      <article><Heads>
      <script
        key={e._id}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://www.arnavgupta.net/article/${e._id}`,
            },
            a: "",
            headline: e.title,
            image: `https://www.arnavgupta.net/api/image/${e._id}`,
            datePublished: e.dateCreated,
            dateModified: e.dateUpdated,
            author: {
              "@type": "Person",
              name: e.username,
            },
            publisher: {
              "@type": "Organization",
              name: "Infinity",
              logo: {
                "@type": "ImageObject",
                url: images,
              },
            },
          }),
        }}
      ></script>
    </Heads>
        <h1>{e.title}</h1>
        <span dangerouslySetInnerHTML={{__html:e.blog
      .split("newPage")[0]
      .toString()
      .replace(/<[^>]*>/g, "")
      .slice(
        0,
        160
      )}}></span>
      </article>
    </a>
  </div>
        ))}
  
	</div><br></br>{data.length > 20 && 
  <div style={{width:"95%", marginLeft:"calc(2.5%)"}}>
  <Button style={{border:'none'}}>Previous</Button>{" "}
  <Button style={{border:'none'}}>Next</Button></div>}
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
            tags: 1,dateUpdated:1,dateCreated:1,
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
