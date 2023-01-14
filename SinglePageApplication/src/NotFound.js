import { Link } from "react-router-dom";

const NotFound = () => {
    return ( 
        <div className="not-found">
            <h1>! الصفحة غير موجودة</h1>
            <Link to='/'> ... العودة للصفحة الرئيسية </Link>
        </div>
     );
}
 
export default NotFound;