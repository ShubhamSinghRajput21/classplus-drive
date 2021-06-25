import React, {useEffect,useState} from "react";
import './App.css';
import Header from './components/Header';
import Image from './components/Image';
import { GetRecentPhotos, SearchQuery } from "./components/Api";
import InfiniteScroll from "react-infinite-scroll-component";

function App() {
  const [imagesArray,setimagesArray] = useState([]);
  const [currentPage,setcurrentPage] = useState(1);
  const [totalPages,settotalPages] = useState();
  const [hasMore,sethasMore] = useState(true);
  const [searchQuery,setsearchQuery] = useState('');

  useEffect(()=>{
    CallGetRecentPhotos(currentPage);
  },[currentPage,searchQuery]);

  async function CallGetRecentPhotos(page){
    let data;
    if(currentPage===totalPages){
      console.log("You have reached the end no more to show");
      sethasMore(false);
    }else if(searchQuery===''){
      data = await GetRecentPhotos(page);
      setcurrentPage(data.page);
      settotalPages(data.pages);
      setimagesArray([...imagesArray,...data.photo]);
    }else if(searchQuery!=='' && currentPage===1){
      data = await SearchQuery(searchQuery,page);
      setcurrentPage(data.page);
      settotalPages(data.pages);
      setimagesArray([...data.photo]);
    }else if(searchQuery!=='' && currentPage>1){
      data = await SearchQuery(searchQuery,page);
      setcurrentPage(data.page);
      settotalPages(data.pages);
      setimagesArray([...imagesArray,...data.photo]);
    }
  }

  const Search = async (input)=>{
    setsearchQuery(input);
  }

  return (
    
    <>
    <Header parentCallback={Search}/>
      <InfiniteScroll
            dataLength={imagesArray.length}
            next={()=>setcurrentPage(currentPage+1)}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
            scrollThreshold={0.9}
            className="infiniteScroll"
          >
          {imagesArray.length===0?<p>Nothing to display</p>:false}
          {imagesArray.map((item,key)=>
            {
              return (
                <Image server={item.server} id={item.id} secret={item.secret} key={key}/>
                );
            })
          }
          {console.log(imagesArray.length)}
      </InfiniteScroll>
    </>
  );
}

export default App;
