import { Link } from "react-router-dom";

const Home = () => {
    return ( 
        <nav>
            <h1 id="homeTitle">شركة انتاج الحليب</h1>
            <ul className="links">
                <li><Link to="/milkProduction">تسجيل انتاج الحليب اليومي</Link></li>
                <li><Link to="/birthRegistration">تسجيل الولادات</Link></li>
                <li><Link to="/medicalExamination">تسجيل الفحص الطبي </Link></li>
                <li  id="regcow"><Link to="/cowRegistration">تسجيل البقر</Link></li>
            </ul>
        </nav>
     );
}
 
export default Home;