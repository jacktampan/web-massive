import ProductForm from "./ProductForm";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 ml-64 p-6 overflow-y-auto">
        <ProductForm />
      </div>
    </div>
  );
};

export default Dashboard;
