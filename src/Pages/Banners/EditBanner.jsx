import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditBanner = () => {
    const { _id } = useParams(); 
    const [btnLoading, setBtnLoading] = useState(false);
    const [video, setVideo] = useState("");

    const extractYouTubeSrc = (url) => {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? `https://www.youtube.com/embed/${match[1]}` : null;
    };

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const res = await axios.get(`https://api.skylarkartist.com/api/video/${_id}`);
                setVideo(res.data.data); 
            } catch (error) {
                toast.error("Failed to fetch video data");
            }
        };
        fetchBanner();
    }, [_id]);

    const handleInputChange = (e) => {
        setVideo(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setBtnLoading(true);
        const src = extractYouTubeSrc(video);
        if (!src) {
            toast.error("Invalid YouTube URL");
            return;
        }
        try {
            const res = await axios.put(`https://api.skylarkartist.com/api/video/${_id}`, { video: src });
            if (res.status === 200) {
                toast.success("Video updated successfully");
            }
        } catch (error) {
            toast.error("Failed to update video");
        } finally {
            setBtnLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Video</h4>
                </div>
                <div className="links">
                    <Link to="/all-banners" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
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
                    <div className="col-md-6 text-center">
                        <button type="submit" disabled={btnLoading} className={`${btnLoading ? 'not-allowed' : 'allowed'}`}>
                            {btnLoading ? "Please Wait.." : "Update Video"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditBanner;
