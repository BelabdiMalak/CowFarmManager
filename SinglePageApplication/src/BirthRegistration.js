import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "./useFetch";

const BirthRegistration = () => {

    const {data} = useFetch("http://localhost:8000/registrationData");
    const [motherNum, setMotherNum] = useState(0);
    const [birthDate, setBirthDate] = useState('');
    const [error, setError] = useState('')
    const navigate = useNavigate();
    

    const handleSubmit = (e)=>{
        e.preventDefault();
        
        const newBaby = {motherNum, birthDate};
        let exists = false;

        data.forEach(cow => {
            if(cow.cowNum == motherNum){
                exists = true;
                return;
            }
        });

        if(exists){
            fetch('http://localhost:8000/birthData', {
            method : 'POST',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(newBaby)
            })
            .then( ()=>{
                console.log('New baby added');
                navigate('/')
            })
        }
        else{
            setError('يرجى تسجيل البقرة الام اولا')
        }
    }

    return ( 
        <div className="birth-registration">
            <div className="home"><Link to='/'> الصفحة الرئيسية</Link></div>
            <h1> تسجيل الولادات</h1>
            <form className="wrapper" onSubmit={handleSubmit}>
                {error && <div>{error}</div> }
                <div>
                    <input 
                    type="number" 
                    name="mother_num" 
                    min="0" 
                    placeholder="... ادخل رقم البقرة الام"
                    value={motherNum}
                    onChange = {(e) => setMotherNum(e.target.value)}
                    required />
                    <label id="label6" >رقم الام</label>
                </div>

                <div>
                    <input 
                    type="date" 
                    name="birth_date" 
                    value={birthDate}
                    onChange = {(e)=> setBirthDate(e.target.value)}
                    required />
                    <label id="label7" >تاريخ الولادة</label>
                </div>
    
                <button className="btn1">تسجيل</button>
            </form>
            <Link to='/ShowData/birthData'>
            <button className="btn2">قائمة الولادات </button>
            </Link>
            
        </div>
     );
}
 
export default BirthRegistration;