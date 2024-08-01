import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditTag = () => {
    const [isLoading, setIsloding] = useState(false)
    const navigate = useNavigate()
    const {_id} = useParams()
    const [data ,setData] = useState({
        gallery:""
    })

    const getApiData = async(_id)=>{
        try {
            let res = await axios.get("https://api.skylarkartist.com/api/gallery/"+_id)
            console.log(res)
            if (res.status === 200) {
                setData(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const grtFileData = (e)=>{
        const{name ,files} = e.target 
         setData({...data ,[name]:files[0]})
    }

    const formData = new FormData()
    formData.append("gallery" , data.gallery)

    const postData = async(e)=>{
        e.preventDefault()
        try {
            setIsloding(true)
            const res =await axios.put("https://api.skylarkartist.com/api/gallery/"+_id ,formData)
           if(res.status===200){
            toast.success("Gallery update successfully")
            navigate("/all-tags")
           }
            setIsloding(false)
        } catch (error) {
            console.log(error)
            setIsloding(false)

        }
    }

useEffect(()=>{
    getApiData()
},[_id])
    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Gallery</h4>
                </div>
                <div className="links">
                    <Link to="/all-tags" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                    <form className="row g-3" onSubmit={postData}>
                    <div className="col-md-6">
                        <label htmlFor="title" className="form-label">Gallery Image</label>
                        <input type="file"  name='gallery' onChange={grtFileData}  className="form-control" id="title" />
                    </div>  
                        <div className="col-md-6 mt-5 text-center">
                        <button type="submit" disabled={isLoading} className={`${isLoading ? 'not-allowed':'allowed'}`}>
                            {isLoading ? "Please Wait..." : "Update Gallery"}
                        </button>
                    </div>
                    </form>
            </div>
        </>
    );
};

export default EditTag;
