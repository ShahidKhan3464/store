import FadeLoader from "react-spinners/FadeLoader";
import './loader.css'

const Loader = () => {
    return (
        <div className="loader">
            <FadeLoader loading="true" />
        </div>
    )
}

export default Loader