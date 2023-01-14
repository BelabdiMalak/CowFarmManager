import { Link } from "react-router-dom";

const CowsList = ({data, title}) => {

    return ( 
        <div className="cows-list">
            <div className="home"><Link to='/'> الصفحة الرئيسية</Link></div>
            
            <h2> {title} </h2>
            { title === "قائمة الولادات" && 
            <table>
                <thead>
                    <tr>
                        <th>تاريخ الولادة</th>
                        <th>رقم الام</th>
                    </tr>
                </thead>{data.map((item)=>(
                        <tbody key={item.id}>
                            <tr>
                                <td>{item.birthDate}</td>
                                <td>{item.motherNum}</td>
                            </tr>
                        </tbody>))}
                </table>}
            { title === "قائمة الفحوصات" && 
            <table>
                <thead>
                    <tr>
                    <th>يوم الفحص</th>
                    <th>المرض</th>
                    </tr>
                </thead>{data.map((item) => (
                        <tbody key={item.id}>
                            <tr>
                                <td>{item.examinationDate}</td>
                                <td>{item.illness}</td>
                            </tr>
                        </tbody>))}
                </table>}   

            { title === "قائمة البقر"&& 
            <table>
                <thead>
                    <tr>
                    <th>تاريخ الدخول</th>
                    <th>السلالة</th>
                    <th>الرقم</th>
                    </tr>
                </thead>{data.map((item) => (
                        <tbody key={item.id}>
                            <tr>
                                <td>{item.regDate}</td>
                                <td>{item.type}</td>
                                <td>{item.cowNum}</td>
                            </tr>
                        </tbody>))}
                </table>}  

            { title === "قائمة الانتاج" && 
            <table>
                <thead>
                    <tr>
                    <th>اليوم</th>
                    <th>كمية الحليب</th>
                    </tr>
                </thead>{data.map((item) => (
                        <tbody key={item.id}>
                            <tr>
                            <td>{item.productionDate}</td>
                            <td>{item.milkLtr}</td>
                            </tr>
                        </tbody>))}
                </table>} 
        </div>
     );
}
 
export default CowsList;