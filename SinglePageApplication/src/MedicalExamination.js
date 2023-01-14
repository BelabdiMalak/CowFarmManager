import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MedicalExamination = () => {

    const [illness, setIllness] = useState('');
    const [examinationDate, setExaminationDate] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newExamination = {illness, examinationDate}

        fetch('http://localhost:8000/medicalData', {
            method : 'POST', 
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(newExamination)
        })
        .then( ()=> {
            console.log('medical examination well added');
            navigate('/')
        })
    }

    return (  
        <div className="medical-examination">
            <div className="home"><Link to='/'> الصفحة الرئيسية</Link></div>
            <h1 >تسجيل الفحص الطبي  للبقر</h1>
            <form className="wrapper" onSubmit={handleSubmit}>
                <div>
                    <input 
                    type="text" 
                    name="illness" 
                    placeholder="... ادخل اسم المرض" 
                    value={illness}
                    onChange = {(e)=> setIllness(e.target.value)}
                    required />
                    <label id="label8">المرض</label>
                </div>
                <div>
                    <input 
                    type="date" 
                    name="examination_date" 
                    value={examinationDate}
                    onChange = {(e)=> setExaminationDate(e.target.value)}
                    required />
                    <label id="label9">يوم الفحص</label>
                </div>
                <button  className="btn1">تسجيل </button>
            </form>
            <Link to= '/ShowData/medicalData'>
            <button className="btn2">قائمة الفحوصات </button>
            </Link>
        </div>
        
    );
}
 
export default MedicalExamination;