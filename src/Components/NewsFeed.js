import { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroll-component';


const CATEGORIES=[
    "business", 
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
]

const NewsFeed = () =>{

    const [articles,setArticles] =useState([]);
    const [selectedCategory,setSelectedCategory] = useState('general');
    const [isLoading,setIsLoading] = useState(false);
    const [totalResults,setTotalResults] = useState(0);
    const [pageNo,setpageNo] = useState(0);


    const loadNews = (pageNo) =>{
        setIsLoading(true)
        axios({
            method: "GET",
            url: "https://newsapi.org/v2/top-headlines",
            params:{
                country: "in",
                apiKey:"25ea806cd8c64982b0cc2bc2acde07cf",
                category: selectedCategory,
                page:pageNo

            } 
        }).then((response) =>{
setArticles([...articles,...response.data.articles]);
setTotalResults(response.data.totalResults);
pageNo(pageNo);

        }).catch((error) => {
console.log(error);
        }).finally(() =>{
            setIsLoading(false)
        })
    }
    //did mount
    useEffect(() =>{
       loadNews(1)
    },[selectedCategory]);

//did update
    useEffect(() =>{
loadNews(1)
    },[selectedCategory])

     const handleCategorySelect= (category) =>{
        setpageNo(0)
        setArticles([])
        setSelectedCategory(category);

     }
    return(

<>

{
    CATEGORIES.map((category,index) =>{
       return (
       <button 
       className={selectedCategory == category ? "btn btn-danger": "btn btn-primary"}  
       key={index} 
       style={{margin: 5}}
       onClick={() =>{
        handleCategorySelect(category)
       }

       }
       >{category}</button>
       )
    })
}

{
    isLoading ? (
        
        <div>
        <div class="spinner-border text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
<div class="spinner-border text-secondary" role="status">
  <span class="visually-hidden">Loading...</span>
        </div>
        </div>
    ) :(
    
        <InfiniteScroll

        style={{display:'flex', alignItems: "center",flexWrap:'wrap'}}
        dataLength={articles.length} 
        next={()=>{
loadNews(pageNo+1)
        }}
        hasMore={totalResults>articles.length}
        >
      {
        articles.map((articles, index) => {
            return(
                <div key={index} className="card" style={{width: '18rem', margin:20}}>
      <img className="card-img-top" style={{minHeight:200, backgroundColor:'grey'}} src={articles.urlToImage} alt="Card image cap"/>
      <div className="card-body">
        <h5 className="card-title">{articles.title}</h5>
        <p className="card-text">{articles.discription}</p>
        <a href="#" className="btn btn-primary">Go somewhere</a>
      </div>
    </div>
            )
        })
    }
      </InfiniteScroll>
    )
}

        
        </>
    )
       
}

export default NewsFeed;