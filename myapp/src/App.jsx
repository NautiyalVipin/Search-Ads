import {useEffect,useState} from 'react'
import Ad from './Ad';


function App() {

const [searchValue,setSearchValue] = useState("");
const [searchData,setSearchData] = useState([]);
const fetchData = async(e)=>{
  e.preventDefault();
const response= await fetch(`http://localhost:1338/search/${searchValue}`);
const data = await response.json();
setSearchData(data);

}

const searchHandler = (e)=>{
   
    setSearchValue(e.target.value);
}

  return (
    <div className="App">
     <div className='search'>
      <form onSubmit={fetchData}>
        <input type="search" placeholder='Search' onChange={searchHandler} />
        <button>Search</button>
      </form>
     
     </div>
     <div className='cardholder'>
     {searchData.map(e=>{    
      return <Ad id={e.id} 
      CTA={e.CTA} 
      headline ={e.headline}
      primaryText={e.primaryText}
      imageUrl ={e.imageUrl}
      url={e.companyId.url}
       />

     })}
    </div>
    </div>
  );
}

export default App;
