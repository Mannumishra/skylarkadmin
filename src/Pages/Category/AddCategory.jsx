import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCategory = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    const [data, setData] = useState({
        name: "",
        image: null
    });

    const getInputData = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const getFileData = (e) => {
        const { name, files } = e.target;
        setData({ ...data, [name]: files[0] });
    };

    const postData = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("image", data.image);

        try {
            setIsLoading(true);
            const res = await axios.post("https://api.skylarkartist.com/api/artist", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if(res.status===200){
                toast.success("Artist added successfully");
                navigate("/all-category")
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to add artist");
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Artist</h4>
                </div>
                <div className="links">
                    <Link to="/all-category" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={postData}>
                    <div className="col-md-6">
                        <label htmlFor="categoryName" className="form-label">Artist Name</label>
                        <input type="text" name='name' onChange={getInputData} className="form-control" id="categoryName" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="categoryImage" className="form-label">Artist Image</label>
                        <input type="file" name='image' onChange={getFileData} className="form-control" id="categoryImage" />
                    </div>
                    <div className="col-12 text-center">
                        <button type="submit" disabled={isLoading} className={`${isLoading ? 'not-allowed' : 'allowed'}`}>
                            {isLoading ? "Please Wait..." : "Add Artist"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddCategory;
