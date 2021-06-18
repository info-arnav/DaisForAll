import { Toast, ToastBody } from "react-bootstrap";
import { Offline } from "react-detect-offline";
import Footer from "../components/footer";
import Head from "../components/head";

export default function About() {
  const description =
    "DaisForAll is both like a website and a diary. A place where all people across the globe get a chance to put their views and talent in front of everyone.";
  const title = "DaisForAll | About";
  const url = "https://www.daisforall.com/about";
  const images = "https://www.daisforall.com/logo.png";
  const alts = "logo of the DaisForAll website";
  const imagec = "https://www.daisforall.com/logo.png";
  const altc = "logo of the DaisForAll website";
  const tags =
    "blog, infinity, passionate bloggers, blogs, passionate, write, read, post, live thousand lives in one world,about";
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
        <section class="about-section">
          <div class="container-fluid p-0">
            <div class="row no-gutters position-relative">
              <div class="left-header d-none d-lg-block col-lg-3 col-xl-4">
                <div class="v-center-box d-flex align-items-end text-uppercase">
                  <h2 class="mb-0">About Us</h2>
                </div>
              </div>
              <div class="col-lg-9 col-xl-8">
                <div class="main-content p-5">
                  <div class="main-header mb-4">
                    <h6 class="sub-heading text-uppercase d-block mb-2">
                      About Us
                    </h6>

                    <p>
                      Dais for all, as the name suggest is the digital platform
                      for all. All be it a student, professional, homemaker or
                      an entrepreneur can make use of this platform for various
                      purposes.
                    </p>
                    <br></br>
                    <br></br>
                    <h6 class="sub-heading text-uppercase d-block mb-2">
                      Vision
                    </h6>

                    <p>
                      Dais for all is made with a vision of encashing not only
                      one’s knowledge but also an urge for knowledge. I will
                      request users not to confuse this as just a blogging
                      website. Because here with every blog of yours and the
                      website visit you get the points which can be later be in
                      cashed in the form of coupons for the purchase from
                      Electric Plaza, which is a branded electrical online
                      seller.
                    </p>
                    <br></br>
                    <br></br>
                    <h6 class="sub-heading text-uppercase d-block mb-2">
                      Mission
                    </h6>

                    <p>
                      The mission of dais for all is to give user a single
                      platform for multiple usage. This is designed and
                      developed to ensure one stop solutions for all the
                      visitors. Knowledge is a horizon which has no end,
                      similarly dais for all is a platform of knowledge
                      spreaders and knowledge seekers with no limits. This is a
                      user-friendly platform; therefore, we request all the
                      registered users or guest to share their views or queries
                      if any so that we can meet our viewers expectations.
                    </p>
                    <br></br>
                    <br></br>
                    <h6 class="sub-heading text-uppercase d-block mb-2">
                      Why Us
                    </h6>

                    <p>
                      Dais for all is not just a blogger website. The users need
                      to browse various websites for the answer and must share
                      the social account details. Understanding the fear and
                      discomfort in doing so, we here have made the registration
                      process to the simplest. Even the points earned by you are
                      shared as a discount coupon. No personal details are
                      needed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <br></br>
      </main>
      <Footer></Footer>
    </div>
  );
}
