import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditCategory = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    const { _id } = useParams()
    const [data, setData] = useState({
        name: "",
        image: null
    });

    const getApiData = async () => {
        try {
            let res = await axios.get("https://api.skylarkartist.com/api/artist/" + _id)
            console.log(res)
            if (res.status === 200) {
                setData(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getInputData = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const getFileData = (e) => {
        const { name, files } = e.target;
        setData({ ...data, [name]: files[0] });
    };

    const postData = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("image", data.image);
        try {
            setIsLoading(true);
            const res = await axios.put("https://api.skylarkartist.com/api/artist/" + _id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if(res.status===200){
                toast.success("Artist Update successfully");
                navigate("/all-category")
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error)
        }
    }

    useEffect(() => {
        getApiData()
    }, [data.length])

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Artists</h4>
                </div>
                <div className="links">
                    <Link to="/all-category" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={postData}>
                    <div className="col-md-6">
                        <label htmlFor="categoryName" className="form-label">Artists Name</label>
                        <input type="text" name='name' value={data.name} className="form-control" id="categoryName" onChange={getInputData} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="categoryImage" className="form-label">Artists Image</label>
                        <input type="file" name='image' className="form-control" id="categoryImage" onChange={getFileData} />
                    </div>
                    <div className="col-12 text-center">
                    <button type="submit" disabled={isLoading} className={`${isLoading ? 'not-allowed' : 'allowed'}`}>
                            {isLoading ? "Please Wait..." : "Update Artist"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditCategory;
