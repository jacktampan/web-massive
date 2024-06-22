import NavBar from "../component/navbar";
import EditProfile from "../component/user/EditProfile";
import MyOrders from "../component/user/MyOrders";

const UserProfile = () => {
  return (
    <>
      <NavBar />
      <EditProfile />
      <div className="mt-4 mb-4">
        <MyOrders />
      </div>
    </>
  );
};

export default UserProfile;
