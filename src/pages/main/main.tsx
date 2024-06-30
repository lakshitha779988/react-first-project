import React, { useEffect, useState } from 'react'
import {getDocs, collection} from 'firebase/firestore'
import { db } from '../../config/firebase';
import { Post} from './post';

export interface Post {
  id: string;
  userId: string;
  title: string;
  username: string;
  description: string;
}

export function Main() {
  const [postsLists, setPostsList] = useState<Post[]| null>(null);
  const postRef = collection(db,"posts");

  const getPosts = async ()=>{
    try{
      const data = await getDocs(postRef);
      setPostsList(data.docs.map((doc)=>({...doc.data(), id: doc.id})) as Post[]);

    }catch{
      console.log("eroor geting data from data base")
    }
     
  }

  useEffect(()=>{
    getPosts();
  },[])
  return (
    <div>{postsLists?.map((post) => <Post post={post}/>)}</div>
  )
}

