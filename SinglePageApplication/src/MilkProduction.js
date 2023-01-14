import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const MilkProduction = () => {

    const [milkLtr, setMilkLtr] = useState(0);
    const [productionDate, setProductionDate] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newMilkProduction = {milkLtr, productionDate}

        fetch('http://localhost:8000/milkData', {
            method: 'POST', 
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(newMilkProduction)
        })
        .then( ()=> {
            console.log('new milk production day has been added');
            navigate("/")
        })
    }
    
    return ( 
        <div className="milk-production">
            <div className="home"><Link to='/'> الصفحة الرئيسية</Link></div>
            <h1 >تسجيل انتاج الحليب اليومي الكلي</h1>
            <form className="wrapper" onSubmit={handleSubmit}>
                <div>
                    <input 
                    type="number" 
                    name="milk_ltr" 
                    min="0" 
                    placeholder="... ادخل كمية الحليب" 
                    value={milkLtr}
                    onChange={(e)=> setMilkLtr(e.target.value)}
                    required />
                    <label id="label1" >الكمية </label>
                </div>
                <div>
                    <input 
                    type="date" 
                    name="production_date" 
                    value={productionDate}
                    onChange={(e)=>setProductionDate(e.target.value)}
                    required />
                    <label id="label2" > اليوم</label>
                </div>
                <button  className="btn1">تسجيل</button>
            </form>
            <Link to='/ShowData/milkData'>
            <button className="btn2">قائمة الانتاج  </button>
            </Link>
            
        </div>
     );
}
 
export default MilkProduction;