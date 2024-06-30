import { addDoc,getDocs, collection , query, where, deleteDoc, doc} from "firebase/firestore";
import { Post as Ipost } from "./main"
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import '../../style/post.css'

interface Props {
    post: Ipost
}
interface Like {
    userId : string
}




export const Post = (props:Props)=>{
    const {post} = props;

    const [likes, setLikes] = useState<Like[]|null>(null);
    
    const likeRef = collection(db,"likes");
    //geting doc that match that condition
    const likesDoc = query(likeRef ,where("postId","==",post.id));
    const [user] = useAuthState(auth);
    

    //like function send data to the data base
    const likePost = async()=>{
        try{
        await addDoc(likeRef,{userId:user?.uid,postId:post.id})
        getLikes();
        }catch{
            console.log("error when sending data to data base");
        }
    }

    //removelike function delete document in data base that match potsid and userid
    const unlikePost = async()=>{
        try{
            const matchDoc = query(likesDoc ,  where('userId', '==', user?.uid));
            const data = await getDocs(matchDoc);
            const id:string = data.docs[0].id
    
            await deleteDoc(doc(db, "likes", id));
            getLikes();
            }
            catch{
                console.log("eroor deleting an data from data base")
            }  
    }

    const likeFuntion = ()=>{
        if(hasUserLike){
            unlikePost();
        }
        else{
            likePost();
        }
    }

    //get likes function get likes data from data base and call setlikes to update the state
    const getLikes = async()=>{
        try{
            const data = await getDocs(likesDoc);
            setLikes(data.docs.map((doc) => ({userId:doc.data().userId})))

        }catch{
            console.log("eroor geting data from data base")
        }
       
    }

    useEffect (()=>{
        getLikes();
    },[])

    //create boolean value to cheack user is likes this post already or not 
    const hasUserLike = likes?.find((like) => like.userId == user?.uid);
    
    
    return (
    <div className="post-container">
        <div className="title2">
            <h1>{post.title}</h1>
        </div>
        <div className="description2">
            <p>{post.description}</p>
        </div>
        <div className="fottor-container">
            <p className="username">@{post.username}</p>
            <button className="like-btn" onClick={ hasUserLike ? unlikePost : likePost}> {hasUserLike ? <>&#128078;</> : <>&#x1F44D;</> }</button>
            {likes?.length && <p className="like-name">Likes <span className="like-count">{likes.length}</span></p>}
            
        </div>

    </div>
    )
}