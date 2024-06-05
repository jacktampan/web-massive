import NavBar from "../component/navbar";
import Page from "../component/page";
import Footer from "../component/footer";
import Review from "../component/review";

export default function PagePage() {
  return (
    <>
      <NavBar />
      <Page />
      <div className="container mx-auto p-14">
        <Review />
      </div>
      <Footer />
    </>
  );
}
