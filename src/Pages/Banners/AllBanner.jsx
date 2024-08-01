import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllBanner = () => {
    const [data, setData] = useState([]);

    const getApiData = async () => {
        try {
            let res = await axios.get("https://api.skylarkartist.com/api/video");
            console.log(res);
            if (res.status === 200) {
                const newData = res.data.data 
                setData(newData.reverse())
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleDelete = async(_id) => {
        try {
            let res = await axios.delete("https://api.skylarkartist.com/api/video/"+_id);
            console.log(res);
            if (res.status === 200) {
                toast.success("Vedio Deleted Successfully")
                getApiData()
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getApiData();
    }, [data.length]);
    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Videos</h4>
                </div>
                <div className="links">
                    <Link to="/add-banner" className="add-new">Add New <i className="fa-solid fa-plus"></i></Link>
                </div>
            </div>

            <div className="filteration">
                <div className="selects">
                </div>
                <div className="search">
                    <label htmlFor="search">Search </label> &nbsp;
                    <input type="text" name="search" id="search" />
                </div>
            </div>

            <section className="d-table ">
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">Video</th>
                            {/* <th scope="col">Edit</th> */}
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item._id}>
                                <th scope="row">{index + 1}</th>
                                <td>
                                <iframe width="500" height="200" src={item.video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                                </td>
                                {/* <td>
                                    <Link to={`/edit-banner/${item._id}`} className="bt edit">
                                        Edit <i className="fa-solid fa-pen-to-square"></i>
                                    </Link>
                                </td> */}
                                <td>
                                    <button onClick={() => handleDelete(item._id)} className="bt delete">
                                        Delete <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </>
    );
}

export default AllBanner;
