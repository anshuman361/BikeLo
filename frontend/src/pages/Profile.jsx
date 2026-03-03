import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <h2>Loading...</h2>;

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-6">My Profile</h2>

      <div className="bg-white p-6 rounded-xl shadow w-96">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
      </div>
    </div>
  );
};

export default Profile;
