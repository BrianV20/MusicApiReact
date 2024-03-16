import { Navigate, useNavigate } from "react-router-dom"

export default function GoBackNavbar() {
    const navigate = useNavigate();

    return (
        <div className="bg-blue-400 md:p-2 md:text-3xl border-2 border-b-black border-r-blue-400 border-t-blue-400 border-l-blue-400" onClick={() => navigate(-1)}>
            <i className="fa-solid fa-arrow-left text-2xl border-2 border-black py-1 px-2 mx-1 my-1 md:text-3xl md:px-3 rounded-lg"></i>
        </div>
    )
};