import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBanner = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [video, setVideo] = useState("");

    const handleInputChange = (e) => {
        setVideo(e.target.value);
    };

    const extractYouTubeSrc = (url) => {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? `https://www.youtube.com/embed/${match[1]}` : null;
    };

    const postData = async (e) => {
        e.preventDefault();
        const src = extractYouTubeSrc(video);
        if (!src) {
            toast.error("Invalid YouTube URL");
            return;
        }

        try {
            setIsLoading(true);
            const res = await axios.post("https://api.skylarkartist.com/api/video", { video: src });
            if (res.status === 200) {
                toast.success("New Video Added Successfully");
                navigate("/all-banners");
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            toast.error("Failed to add video");
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Video</h4>
                </div>
                <div className="links">
                    <Link to="/all-banners" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={postData}>
                    <div className="col-md-6">
                        <label htmlFor="video" className="form-label">Video URL</label>
                        <input
                            type="text"
                            name='video'
                            value={video}
                            onChange={handleInputChange}
                            className="form-control"
                            id="video"
                            placeholder="Enter YouTube video URL"
                        />
                    </div>
                    <div className="col-md-6 mt-5 text-center">
                        <button type="submit" disabled={isLoading} className={`${isLoading ? 'not-allowed' : 'allowed'}`}>
                            {isLoading ? "Please Wait..." : "Add Video"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddBanner;
