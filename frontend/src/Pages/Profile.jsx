import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Profile = () => {
  const { backendUrl, token } = useContext(ShopContext);
  const [user, setUser] = useState(null);

  const getProfile = async () => {
    try {
      const response = await axios.get(
        backendUrl + "/api/user/profile",
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      getProfile();
    }
  }, [token]);

  if (!token) {
    return (
      <main className="border-t border-[#DDD6CE] pt-14 pb-20">
        <div className="text-center py-20">
          <p className="text-sm text-[#6B6B6B]">
            Please login to view your profile.
          </p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="border-t border-[#DDD6CE] pt-14 pb-20">
        <div className="text-center py-20">
          <p className="text-sm text-[#6B6B6B]">
            Loading profile...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="border-t border-[#DDD6CE] pt-10 sm:pt-14 pb-20">

      {/* Heading */}
      <div className="text-center mb-12">
        <p className="text-xs sm:text-sm tracking-[0.25em] text-[#A66A45] mb-3">
          ACCOUNT
        </p>

        <Title text1="MY" text2="PROFILE" />

        <p className="text-sm text-[#6B6B6B] mt-4">
          Manage and view your account information.
        </p>
      </div>

      {/* Profile Card */}
      <div className="max-w-2xl mx-auto">

        <div className="border border-[#DDD6CE] bg-white">

          {/* Header */}
          <div className="bg-[#EDE5DC] px-6 sm:px-8 py-6">
            <p className="text-xs tracking-[0.2em] text-[#A66A45]">
              PERSONAL INFORMATION
            </p>
          </div>

          {/* Details */}
          <div className="px-6 sm:px-8 py-8">

            <div className="border-b border-[#E5DED6] pb-6">
              <p className="text-xs tracking-wide text-[#6B6B6B] mb-2">
                NAME
              </p>

              <p className="text-base text-[#222]">
                {user.name}
              </p>
            </div>

            <div className="pt-6">
              <p className="text-xs tracking-wide text-[#6B6B6B] mb-2">
                EMAIL ADDRESS
              </p>

              <p className="text-base text-[#222]">
                {user.email}
              </p>
            </div>

          </div>
        </div>

        {/* Account Note */}
        <div className="mt-6 border border-[#DDD6CE] p-6 bg-[#FAF8F5]">
          <p className="text-sm text-[#6B6B6B] leading-6">
            Your account information is securely retrieved from
            your YatraKart account.
          </p>
        </div>

      </div>

    </main>
  );
};

export default Profile;