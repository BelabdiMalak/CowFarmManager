import { useParams } from 'react-router-dom';
import CowsList from './CowsList';
import useFetch from './useFetch'

const ShowData = () => {
    
    const {url} = useParams();
    const {data, error} = useFetch('http://localhost:8000/'+url);
    let title = null;

    if(url === "birthData"){
        title = 'قائمة الولادات'
    }
    if(url === "medicalData"){
        title = "قائمة الفحوصات"
    }
    if(url === "registrationData"){
        title = "قائمة البقر"
    }
    if(url === "milkData"){
        title = "قائمة الانتاج"
    }

    return ( 
        <div className="ShowData">
            {error && <div> {error} </div> }
            {data && <CowsList data={data} title={title} /> }
        </div>
     );
}
 
export default ShowData;