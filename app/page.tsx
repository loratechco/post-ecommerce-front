import getToken from "@/lib/auth/getSession";
import "@/components/landing/landing.module.css";

import HeaderAndSidBar from "@/components/layout/header/header-sidbar";
import BodyComponent from "@/components/layout/body/body-component";
import HeroSection from "@/components/layout/body/hero-section";
import Footer from "@/components/layout/footer/Footer";

const getCountryData = async () => {
  try {
    const data = await fetch("https://www.spedire.com/api/environment", {
      cache: "force-cache",
      next: { revalidate: false }, 
    });
    return { res: await data.json() };
  } catch (error) {
    console.error("country data has a problem",error);
    return { res: null };
  }
};

export default async function Page() {
  const { token } = JSON.parse(((await getToken()) || "{}") as string);
  const { res } = await getCountryData();

  return (
    <>
      <HeaderAndSidBar />

      <HeroSection data={res} token={token} />
      <BodyComponent />
      <Footer />
    </>
  );
}
