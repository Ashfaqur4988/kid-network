import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore"; // Assuming you are using Zustand for user state
import UserCard from "../components/UserCard"; // Import the UserCard component
import { useUserStore } from "../store/useUserStore";
import { User2Icon } from "lucide-react";
import Spinner from "../pages/Spinner";

const Home = () => {
  const { user, loading } = useAuthStore(); // Access the current logged-in user

  const { allUsers, getAllUsers, getAllUsersDetails, allUsersLoading } =
    useUserStore();

  useEffect(() => {
    if (user && user.role === "cooler kid") {
      getAllUsers();
    }
  }, [getAllUsers, user]);

  useEffect(() => {
    if (
      (user && user.role === "coolest kid") ||
      (user && user.role === "maintainer")
    ) {
      getAllUsersDetails();
    }
  }, [getAllUsersDetails, user]);
  if (loading) return <Spinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Welcome Message */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-8">
          {user
            ? "Welcome to Cool Kids Network"
            : "Welcome to Cool Kids Network. Log in to get started"}
        </h1>

        {/* If no user is logged in, show login button */}
        {!user ? (
          <div className="flex justify-center mt-6">
            <User2Icon size={120} />
            <User2Icon size={120} />
            <User2Icon size={120} />
          </div>
        ) : (
          <>
            {/* Current User Section */}
            <h2 className="text-3xl font-bold mb-4">Your Profile</h2>
            {user && (
              <UserCard
                id={user.id}
                firstName={user.firstName}
                lastName={user.lastName}
                role={user.role}
                country={user.country}
                email={user.email}
              />
            )}

            {/* Other Users Section */}
            {allUsers.length > 0 && (
              <h2 className="text-3xl font-bold mt-10 mb-6">All Users</h2>
            )}
            {allUsersLoading ? (
              <Spinner />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allUsers.map((u, index) => (
                  <UserCard
                    key={index}
                    id={u.id}
                    firstName={u.firstName}
                    lastName={u.lastName}
                    role={u.role}
                    country={u.country}
                    email={u.email}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
