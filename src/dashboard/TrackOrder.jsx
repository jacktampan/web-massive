import Track from "./Track";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <>
      <div className="flex h-screen">
        <div className="w-64">
          <Sidebar />
        </div>
        <div className="flex-1">
          <Track />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
