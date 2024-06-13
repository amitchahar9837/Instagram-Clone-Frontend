import React, { useEffect, useState, useContext, useRef } from "react";
import { userContext } from "../../App";
import { Link, json } from "react-router-dom";
import { toast } from "react-toastify";
import summaryApi from "../../API";
import { IoCameraOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import ShowDp from "../ShowDp";

const Profile = () => {
  const { state, dispatch } = useContext(userContext);
  const [profile, setProfile] = useState();
  const [image, setImage] = useState("");
  const [showDp, setShowDp] = useState(false);
  const [showDpUrl, setShowDpUrl] = useState('');
  const { _id: userId } = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchProfile();
  }, []);

  const fetchProfile = () => {
    fetch(summaryApi.user.url + `/${userId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setProfile(result)
      })
      .catch((error) => {
        toast.error('Error fetching user profile')
      });
  }
  useEffect(() => {
    if (image) {
      toast.info("Uploading dp please wait a moment! this may take time depend on your internet")

      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "Insta Clone");
      data.append("cloud_name", "ascoder");
      fetch(summaryApi.uploadPhoto.url, {
        method: summaryApi.uploadPhoto.method,
        body: data,
      })
        .then((res) => res.json())
        .then(async(data) => {
          await fetch(summaryApi.updateDp.url, {
            method: summaryApi.updateDp.method,
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              dp: data.url,
              dpPublicId:data.public_id
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              if (result.err) {
                toast.error(result.err)
              } else {
                localStorage.setItem('user', JSON.stringify({ ...state, dp: data.url }))
                setProfile(prev => ({
                  ...prev,
                  user: {
                    ...prev.user,
                    dp: data.url
                  }
                }));
                toast.success('Your dp uploaded successully')
              }
            });
        })
        .catch((err) => {
          toast.error(err)
        });
    }
  }, [image]);
  const updateDp = (file) => {
    setImage(file);
  };
  return (
    <div className="flex flex-col gap-6 px-4">
      <div className="flex flex-col gap-2 border-b-2 md:w-[85%] w-full my-0 mx-auto py-4">
        <div className="flex items-center sm:flex-row flex-col justify-center lg:gap-[100px] md:gap-10 gap-6 py-4">
          <div className="sm:w-[200px] sm:h-[200px] w-[150px] h-[150px] relative z-[1]">
            <img src={profile ? profile.user.dp : "loading"} alt="dp" className="w-full h-full rounded-full object-cover cursor-pointer" onClick={() => {
              setShowDp(true)
              setShowDpUrl(profile?.user?.dp)
            }} />
            <div className="absolute bottom-2 right-2">
              <label>
                <IoCameraOutline className="text-3xl font-bold bg-white rounded-full cursor-pointer p-1" />
                <input type="file" className="hidden"
                  onChange={(e) => updateDp(e.target.files[0])} />
              </label>
            </div>

          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl sm:text-4xl font-semibold">{profile ? profile?.user?.name : "loading"}</h3>
            <h5 className="text-xl font-normal">
              {profile ? profile?.user?.email : "loading"}
            </h5>
            <div className="flex gap-4 text-2xl font-normal text-center">
              <h5>{profile?.posts.length} Posts</h5>
              <Link to={`/followerlist/${profile?.user?._id}`}><h5>{profile ? profile?.user.followers.length : "0"} Followers</h5></Link>
              <h5>
                <Link to={`/followinglist/${profile?.user?._id}`}>
                  {profile ? profile?.user?.following.length : "0"} Following
                </Link>
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 place-items-center">
        {profile?.posts?.map((item) => (
          <img key={item._id} src={item.picture} alt={item.title} className="h-[22rem] w-[22rem] object-cover " />
        ))}
      </div>

      {/* show dp */}
      {showDp && (
        <ShowDp dpUrl={showDpUrl} onClose={() => setShowDp(false)} />
      )}
    </div>
  );
};

export default Profile;
