import React from 'react'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {addDoc, collection} from 'firebase/firestore'
import {auth, db} from '../../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import {useNavigate} from 'react-router-dom'
import '../../style/CreatePost.css'
 
interface CreateFormData {
    title: string;
    description: string;
}




export function CreateForm() {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    
    const shema = yup.object().shape({
        title : yup.string().required("you must enter title "),
        description : yup.string().required("you must enter description"),
    })

    const {register ,handleSubmit, formState : {errors}} = useForm <CreateFormData>({
        resolver:yupResolver(shema)
    })

    const postRef = collection(db,"posts");

    const onCreatePost = async(data:CreateFormData)=>{
        try{
            await addDoc(postRef,{
                ...data,
                username:user?.displayName,
                userId: user?.uid
            })
            navigate("/");
        }catch{
            console.log("error occur in creating post try again")
        }

        
    }
  return (
    <div className='container'>
        <h1 className='create-post-heading'>Create your amazing post here</h1>
         <form onSubmit={handleSubmit(onCreatePost)}>
            <input type="text" placeholder='enter your amazing  title for your post'{...register("title")} />
            <p className='erro-massage'>{errors.title?.message}</p>
            <textarea  className="description" placeholder='enter your amazing  description for your post' {...register("description")}/>
            <p className='erro-massage'>{errors.description?.message}</p>
            <input type="submit" />
        </form>

    </div>
  
  )
}

