import ProductList from "./ProductList";
import Sidebar from "./Sidebar";

const ListProduct = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 ml-64 p-6 overflow-y-auto">
        <ProductList />
      </div>
    </div>
  );
};

export default ListProduct;
