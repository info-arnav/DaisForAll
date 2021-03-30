import dynamic from "next/dynamic";
import Head from "next/head";
import React, { useState } from "react";

export default function Recapcha({ ref }) {
  function onChange(value) {
    console.log("Captcha value:", value);
  }

  return (
    <div>
      <Head>
        <script async src="https://www.google.com/recaptcha/api.js"></script>
        <script
          async
          dangerouslySetInnerHTML={{
            __html: `
   function onSubmit(token) {
     console.log(token)
   }
 `,
          }}
        ></script>
      </Head>
      <button
        class="g-recaptcha"
        data-sitekey="6Lc7aY8aAAAAAE5j_vvSQxbHOPEiImKIgpSNuCa1"
        data-callback="onSubmit"
        data-action="submit"
      ></button>
    </div>
  );
}
