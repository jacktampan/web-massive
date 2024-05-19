import React from "react";
import NavBar from "./component/navbar";
import Header from "./component/header";
import Search from "./component/search";
import Cards from "./component/cards";
import Text from "./component/text";
import Footer from "./component/footer";
import Login from "./component/login";

const App = () => { 
  return (
    <>
      <NavBar />
      <Header />
      <Search />
      <Cards />
      <Text />
      <Footer />
    </>
  );
};
export default App;