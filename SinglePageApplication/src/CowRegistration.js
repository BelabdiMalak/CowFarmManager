import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "./useFetch";

const CowRegistration = () => {

    const [cowNum, setCowNum] = useState(0);
    const [type, setType] = useState('الهولتشاين');
    const [regDate, setRegDate] = useState('');
    const navigate = useNavigate();
    const {data} = useFetch("http://localhost:8000/registrationData");
    const [error, setError] = useState('');

    const handleSubmit = (e) => {

        e.preventDefault();

        const newCow = {cowNum, type, regDate};

        let exists = false;

        data.forEach(cow => {
            if(cow.cowNum == cowNum){
                exists = true;
                return;
            }
        });

        if(!exists){
            fetch('http://localhost:8000/registrationData', {
                method:'POST',
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(newCow)
            })
            .then( () => {
                console.log('new cow has been added');
                navigate('/')
            })
        }
        else {setError('هدا الرقم محجوز')}

    }
    return ( 
        <div className="cow-registration">
            <div className="home"><Link to='/'> الصفحة الرئيسية</Link></div>
            <h1 id="regTitle">تسجيل البقر</h1>
            
            <form className="wrapper" onSubmit={handleSubmit}>
                {error && <div> {error} </div> }
                <div>
                    <input 
                    type="number" 
                    name="cow_num" 
                    min="0" 
                    placeholder="... ادخل رقم البقرة" 
                    value={cowNum}
                    onChange= {(e) => setCowNum(e.target.value)}
                    required />
                    <label id="label3" >الرقم</label>
                </div>
                
                <div>
                    <select 
                    name="type" 
                    value={type}
                    onChange={(e)=> setType(e.target.value)}
                    required>
                        <option>الهولتشاين</option>
                        <option>المونتبليارد</option>
                    </select>
                    <label id="label5" >السلالة </label>
                </div>
                
                <div>
                    <input 
                    type="date" 
                    name="reg_date" 
                    value={regDate}
                    onChange = {(e)=> setRegDate(e.target.value)}
                    required />
                    <label id="label4">تاريخ الدخول </label>
                </div>
                
                <button  className="btn1">تسجيل </button>
        
            </form>
            <Link to='/ShowData/registrationData'>
            <button className="btn2">قائمة البقر </button>
            </Link>
            
        </div>
     );
}
 
export default CowRegistration;