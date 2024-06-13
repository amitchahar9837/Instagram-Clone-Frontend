const domain = process.env.REACT_APP_API_URL;

const summaryApi = {
      signup:{
            url:`${domain}/signup`,
            method:'post',
      },
      signin:{
            url:`${domain}/signin`,
            method:'post',
      },
      allPost:{
            url:`${domain}/allpost`,
            method:'get',
      },
      followingPost:{
            url:`${domain}/followingpost`,
            method:'get',
      },
      createPost:{
            url: `${domain}/createpost`,
            method:'post'
      },
      searchUser:{
            url: `${domain}/searchuser`,
            method:'post'
      },
      user:{
            url:`${domain}/user`,
            method:'get',
      },
      myPost:{
            url:`${domain}/mypost`,
            method:'get',
      },
      like:{
            url:`${domain}/like`,
            method:'put',
      },
      unLike:{
            url:`${domain}/unlike`,
            method:'put',
      },
      comment:{
            url:`${domain}/comment`,
            method:'put',
      },
      follow:{
            url:`${domain}/follow`,
            method:'put',
      },
      unfollow:{
            url:`${domain}/unfollow`,
            method:'put',
      },
      likesList:{
            url:`${domain}/likeslist`,
            method:'get',
      },
      followerList:{
            url:`${domain}/followerlist`,
            method:'get',
      },
      followingList:{
            url:`${domain}/followinglist`,
            method:'get',
      },
      removeFollower:{
            url:`${domain}/removeFollower`,
            method:'put',
      },
      forgotPassword : {
            url : `${domain}/forgot-password`,
            method:'post',
      },
      resetPassword : {
            url : `${domain}/reset-password`,
            method:'post',
      },
      deletePost:{
            url:`${domain}/deletepost`,
            method:'delete',
            },
            updateDp:{
                  url:`${domain}/updatedp`,
            method:'put',
      },
      uploadPhoto:{
            url:`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
            method:'post'
      }
            }
export default summaryApi;