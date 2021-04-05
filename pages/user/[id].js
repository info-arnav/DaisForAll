import axios from "axios";
import { useEffect, useState } from "react";
import Heads from "next/head";
import Head from "../../components/head";
import { connectToDatabase } from "../../util/mongodb";
import Jwt from "njwt";
import parse from "html-react-parser";
import { useRouter } from "next/router";
import Footer from "../../components/footer";
import DOMPurify from "dompurify";
import Link from "next/link";
export default function User({ data }) {
  const description = data.profile
    ? "infinity | " + data.description
    : `Infinity profile of ${data.username}. You can see a list of their posts, etc here.`;
  const title = data._id && `Infinity | ${data.username}`;
  const url = data._id && `https://www.arnavgupta.net/user/${data.username}`;
  const [condition, setCondition] = useState(data.conditions);
  const [computerProgramme, setComputerProgramme] = useState(
    data.computerProgramme
  );
  const images = data._id && "https://www.arnavgupta.net/logo.png";
  const alts = data._id && "logo of the infinity website";
  const imagec = data.image
    ? `https://www.arnavgupta.net/api/image/users/${data._id}`
    : images;
  const altc = `user avatar - ${data.username}`;
  const router = useRouter();
  const tag =
    data._id &&
    `blog, infinity, passionate bloggers, blogs, passionate, write, read, post, live thousand lives in one world, posts, followers, following,${data.username},`;
  const card = "summary_large_image";
  useEffect(() => {
    if (data.error) {
      router.push("/page_does_not_exist");
    }
    if (localStorage.getItem("userData")) {
      Jwt.verify(
        localStorage.getItem("userData"),
        "ArnavGod30080422020731017817087571441",
        "HS512",
        async function (err, verifiedJwt) {
          if (!err) {
            await axios.post("/api/profile/views", {
              id: data.username,
              user: verifiedJwt.body[0].username,
            });
          }
        }
      );
    }
  }, [condition, computerProgramme]);
  return (
    <div>
      <Heads>
        <script
          key={-2}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: data.name,
            }),
          }}
        ></script>
      </Heads>
      <Head
        description={description}
        title={title}
        url={url}
        images={images}
        alts={alts}
        imagec={imagec}
        altc={altc}
        tags={tag}
        card={card}
      ></Head>
      <main></main>
      <Footer></Footer>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const id = params.id;
  const { db } = await connectToDatabase();
  let users = await db
    .collection("userData")
    .findOne({ username: id })
    .catch((e) => {
      return {
        props: { data: { error: true } },
      };
    });
  users = JSON.parse(JSON.stringify(users));
  if (users) {
    users.images = [];
    users.profiles = [];
    users.usernames = [];
    users.password = "";
    users.email = "";
    users.name = "";
    users.passwords = [];
    return {
      props: { data: users },
    };
  } else {
    return {
      props: { data: { error: true } },
    };
  }
}
