import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import MyPostsCard from "../Components/MyPostCard";

const UserProfile = () => {
  let { userId } = useParams();
  console.log("heyy----------", userId);
  const [userProfile, setUserProfile] = useState({});
  const [followers, setFollowers] = useState();
  const [reload, setReload] = useState(true);
  const [displayLike, setDisplayLike] = useState(true);
  const [displayUnlike, setDisplayUnlike] = useState(false);
  const { id, token } = JSON.parse(localStorage.getItem("instragram-jwt"));
  console.log("id", id);
  useEffect(() => {
    fetch(`/user/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("ssssssssssssss----", data);

        // if (data.user) {
        //   console.log("jjjjjjjjjjjjjj");
        // }
        setUserProfile(data);
        setFollowers(data.user.followers.length);
        if (data.user?.followers?.includes(id)) {
          setDisplayLike(!displayLike);
          setDisplayUnlike(!displayUnlike);
        }
      });
  }, [userId, token]);
  console.log(userProfile);

  const followUser = () => {
    // setReload(!reload);
    fetch("/follow", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        followID: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        //  const x = [...followers, data.followers];
        // setFollowers(data.followers.length);
        // window.location.reload();
        // setReload(!reload);
      });
  };

  //new code for unfollow users

  const unFollowUser = () => {
    // setReload(!reload);
    fetch("/unfollow", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        unFollowID: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("sagar------here is your data       ------>", data);
        // const x = [...followers, data.followers];
        // setFollowers(data.followers.length);
        // window.location.reload();
      });
  };
  //console.log(followers, followers.includes(id));
  return (
    <div>
      {!userProfile.user ? (
        <div className="m-auto mt-5 p-5" style={{ width: "fit-content" }}>
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="card mb-3 m-auto p-5 mt-3" style={{ maxWidth: "90%" }}>
          <div className="row g-0">
            <div className="col-md-4">
              <img
                className="rounded-circle w-50"
                src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt="..."
              />
            </div>
            <div className="col-md-8 ">
              <div className="card-body">
                <div className="d-flex">
                  <h5 className="card-title mx-4">{userProfile.user?.name}</h5>
                  {/*  */}
                  {displayUnlike && (
                    <div
                      className="d-flex justify-content-between align-items-center"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        unFollowUser();
                        setFollowers(followers - 1);
                        setDisplayLike(!displayLike);
                        setDisplayUnlike(!displayUnlike);
                      }}
                    >
                      <div
                        style={{
                          transform: "rotate(179deg)",
                        }}
                      >
                        <i class="bi bi-hand-index-thumb mx-1"></i>
                      </div>
                      Un-follow
                    </div>
                  )}

                  {displayLike && (
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        followUser();
                        setFollowers(followers + 1);
                        setDisplayLike(!displayLike);
                        setDisplayUnlike(!displayUnlike);
                      }}
                    >
                      <i class="bi bi-hand-index-thumb mx-1"></i> Follow
                    </div>
                  )}

                  {/*  */}
                  {/* <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      followUser();
                      setFollowers(followers + 1);
                      setDisplayLike(!displayLike);
                      setDisplayUnlike(!displayUnlike);
                    }}
                  >
                    <i class="bi bi-hand-index-thumb mx-1"></i> Follow
                  </div> */}
                  {/*  */}
                  {/* {userProfile?.user?.followers?.includes(id) && !reload ? (
                    <div
                      className="d-flex justify-content-between align-items-center"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        unFollowUser();
                        setFollowers(followers - 1);
                      }}
                    >
                      <div
                        style={{
                          transform: "rotate(179deg)",
                        }}
                      >
                        <i class="bi bi-hand-index-thumb mx-1"></i>
                      </div>
                      Un-follow
                    </div>
                  ) : (
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        followUser();
                        setFollowers(followers + 1);
                      }}
                    >
                      <i class="bi bi-hand-index-thumb mx-1"></i> Follow
                    </div>
                  )} */}
                </div>
                <div className="d-flex justify-content-between">
                  {/* <p>{userProfile?.user?.followers.length} followers</p>
                  <p>{userProfile?.user?.followings?.length} followings</p> */}
                  <p>{followers} followers</p>
                  <p>{userProfile?.user?.followings?.length} followings</p>
                  <p>{userProfile?.posts?.length} Post</p>
                </div>
              </div>
            </div>
            <hr className="mt-5" />
            <div className="row row-cols-1 row-cols-md-3 g-4 mt-5">
              {userProfile?.posts?.map((post) => (
                <MyPostsCard post={post} key={post._id} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
