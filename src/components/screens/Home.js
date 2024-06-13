import React, { useContext, useEffect, useState } from "react";
import { MdFavorite, MdFavoriteBorder, MdDelete } from "react-icons/md";
import { userContext } from "../../App";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import summaryApi from "../../API";

const Home = () => {
  const [comment, setComment] = useState("");
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(userContext);
  const [loading, setLoading] = useState(false);

  const loadingData = new Array(5).fill(null)


  useEffect(() => {
    window.scrollTo(0,0)
    setLoading(true);
    fetch(summaryApi.allPost.url, {
      method: summaryApi.allPost.method,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setLoading(false)
        setData(result.posts)
      });
  }, []);

  const likePost = (id) => {
    fetch(summaryApi.like.url, {
      method: summaryApi.like.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unlikePost = (id) => {
    fetch(summaryApi.unLike.url, {
      method: summaryApi.unLike.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const makeComment = (text, postId) => {
    if (comment !== "") {
      setComment('');
      fetch(summaryApi.comment.url, {
        method: summaryApi.comment.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          postId,
          text,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          const newData = data.map((item) => {
            if (item._id === result._id) {
              return result;
            } else {
              return item;
            }
          });
          setData(newData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const deletePost = (postId) => {
    fetch(summaryApi.deletePost.url + `/${postId}`, {
      method: summaryApi.deletePost.method,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.Message) {
          const newData = data.filter((item) => {
            return item._id !== result.deletedPostDetails._id;
          });
          toast.success(result.Message)
          setData(newData);
        } else {
          toast.error(result.error);
        }

      })
  };

  return (
    <div className="flex flex-col items-center gap-6 w-[100%] mt-3  ">
      {loading ? (
        <>
          {loadingData.map((item, index) => (
            <div className="flex flex-col w-[90%] sm:w-[500px] shadow-[0px_0px_8px_1px_rgba(0,0,0,0.3)] p-2 mt-2" key={"loading" + index}>
              <div className="p-2 flex justify-between ">
                <div style={{ width: '30px', height: '30px', borderRadius: '50%' }} className="bg-slate-100 animate-pulse" ></div>
                <div className="w-[70px] h-[30px] bg-slate-100 animate-pulse"></div>
              </div>
              <div className="w-[100%] h-[550px] bg-slate-100 animate-pulse ">
              </div>
              <div className="p-4 flex flex-col gap-2 w-full h-[100px] bg-slate-100 animate-pulse">
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          {data.length > 0 ? (
            <>
              {data.map((item) => (
                <div className="flex flex-col w-[90%] sm:w-[500px] shadow-[0px_0px_8px_1px_rgba(0,0,0,0.3)] p-2 mt-2" key={"post" + item._id}>
                  <div className="p-2 flex justify-between ">

                    <Link className="flex items-center gap-2"
                      to={
                        item.postedBy._id === state._id
                          ? "/profile"
                          : `/profile/${item.postedBy._id}`
                      }
                    >
                      <img src={item.postedBy.dp} alt="" style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }} />
                      <h5 className="font-bold">{item.postedBy.name}</h5>
                    </Link>
                    {state
                      ? item.postedBy._id === state._id && (
                        <MdDelete
                          style={{
                            color: "red",
                            cursor: "pointer",
                            fontSize: "2rem",
                          }}
                          title="Delete Post"
                          onClick={() => deletePost(item._id)}
                        />
                      )
                      : "loading"}
                  </div>
                  <div className="w-[100%] h-[550px] ">
                    <img src={item.picture} alt="Post" className="w-full h-[100%] object-cover " />
                  </div>
                  <div className="p-4 flex flex-col gap-2">
                    {state
                      ? [
                        item.likes.includes(state._id) ? (
                          <MdFavorite
                            style={{
                              color: "red",
                              cursor: "pointer",
                              fontSize: "2rem",
                            }}
                            onClick={() => unlikePost(item._id)}
                          />
                        ) : (
                          <MdFavoriteBorder
                            style={{ cursor: "pointer", fontSize: "2rem" }}
                            onClick={() => likePost(item._id)}
                          />
                        ),
                      ]
                      : "loading"}

                    <h6 className="font-medium"><Link to={`/likeslist/${item._id}`}>{item.likes.length} likes </Link> </h6>
                    <h6 className="font-semibold">{item.title}</h6>
                    <p>{item.body}</p>
                    {item.comments.map((record) => (
                      <h6 key={"comments" + record._id} style={{ fontWeight: "400" }}>
                        <span style={{ fontWeight: "600" }}>
                          {record.postedBy.name}
                        </span>{" "}
                        - {record.text}
                      </h6>
                    ))}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        makeComment(e.target[0].value, item._id);
                      }}
                    >
                      <div className="w-full flex justify-between items-center gap-2">
                        <input
                          type="text"
                          placeholder="add a comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="border-b-2 w-[100%] p-2 outline-none"
                        />
                        <span onClick={() => { makeComment(comment, item._id) }} className="bg-neutral-200 cursor-pointer py-2 px-3 rounded-sm">Comment</span>
                      </div>
                    </form>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <div className="w-full h-[calc(100vh-70px)] flex justify-center items-center">
                <h2 className="text-center text-xl md:text-4xl">No post on Instagram, create your first post</h2>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
