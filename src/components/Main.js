import { useState,useEffect } from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import styled from "styled-components";
import { getArticlesAPI } from "../actions";
import PostModal from "./PostModal";

const Main=(props)=>{

    const[showModal,setShowModal]=useState("close");
    
    useEffect(()=>{
      props.getArticles();
    },[])

    const handleClick=(e)=>{
        e.preventDefault();
        if(e.target!==e.currentTarget){
            return ;
        }
        switch(showModal){
            case "open":
                setShowModal("close");
                break;
            case "close":
                setShowModal("open");
                break;
            default:
                setShowModal("close");
                break;
        }
    }
    return(
        <>
        {props.articles.length===0?<p>There are no Articles</p>:(
        <Container>
            <ShareBox>
               <div>
                   {props.user&&props.user.photoURL?(<img src={props.user.photoURL} alt=""/>):(<img src="/images/user.svg" alt="user"/>)}
                   <button onClick={handleClick} disabled={props.loading?true:false}>Start a post</button>
               </div>
               <div>
                   <button>
                       <img src="/images/photo-icon.svg" class="filter-blue" alt="photo"/>
                       <span>Photo</span>
                   </button>
                   <button>
                       <img src="/images/video-icon.svg" class="filter-green" alt="photo"/>
                       <span>Video</span>
                   </button>
                   <button>
                       <img src="/images/event-icon.svg" class="filter-orange" alt="photo"/>
                       <span>Event</span>
                   </button>
                   <button>
                       <img src="/images/article-icon.svg" class="filter-rose" alt="photo"/>
                       <span>Write article</span>
                   </button>
               </div>
            </ShareBox>
            <Content>
            {props.loading&&<img src="/images/spin-loader.svg" alt=""/>}
            {props.articles.length>0&&props.articles.map((article,key)=>(
                <Article key={key}>
                    <SharedActor>
                        <a>
                            <img src={article.actor.image} alt="user"/>
                            <div>
                                <span>{article.actor.displayName}</span>
                                <span>{article.actor.description}</span>
                                <span>{article.actor.date.toDate().toLocaleDateString()}</span>
                            </div>
                        </a>
                        <button>
                            <img src="/images/ellipses.svg" alt="dot"/>
                        </button>
                    </SharedActor>
                    <Description>{article.description}</Description>
                    <SharedImg>
                        <a>
                           {
                               !article.sharedImg&&article.video?(<ReactPlayer width={"100%"} url={article.video} />):(
                                   article.sharedImg&&<img src={article.sharedImg} alt="post"/>
                               )
                           }
                        </a>
                    </SharedImg>
                    <SocialCounts>
                        <li>
                            <button>
                                <img src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb" alt="like"/>
                                <img src="https://static-exp1.licdn.com/sc/h/5thsbmikm6a8uov24ygwd914f" alt="clap"/>
                                <img src="https://static-exp1.licdn.com/sc/h/7fx9nkd7mx8avdpqm5hqcbi97" alt="heart"/>
                                <span>75</span>
                            </button>
                        </li>
                        <li>
                            <a>2 comments</a>
                        </li>
                    </SocialCounts>
                    <SocialActions>
                        <button>
                            <img src="/images/like.svg" class="filter-blue" alt="like"/>
                            <span>Like</span>
                        </button>
                        <button>
                            <img src="/images/comments.svg" class="filter-blue" alt="comments"/>
                            <span>Comments</span>
                        </button>
                        <button>
                            <img src="/images/share.svg" class="filter-blue" alt="share"/>
                            <span>Share</span>
                        </button>
                        <button>
                            <img src="/images/send.svg" class="filter-blue" alt="send"/>
                            <span>Send</span>
                        </button>
                    </SocialActions>
                </Article>
            ))}
                
                </Content>
            <PostModal showModal={showModal} handleClick={handleClick}/>
        </Container>)}
        
        </>
    )

}

const Container=styled.div `
  grid-area: "main";
`;

const Commoncard=styled.div `
 text-align:center;
 overflow: hidden;
 margin-bottom: 8px;
 background-color: #fff;
 border-radius:5px;
 position:relative;
 border: none;
 box-shadow:0 0 0 1px rgb(0 0 0/15%),0 0 0 rgb(0 0 0/20%);
`;

const ShareBox=styled(Commoncard) `
   display:flex;
   flex-direction:column;
   color:#958b7b;
   margin:0 0 8px;
   background: white;
   div{
       button{
           outline:none;
           color:rgba(0,0,0,0.6);
           font-size:14px;
           line-height:1.5;
           min-height:48px;
           background:transparent;
           border:none;
           display:flex;
           align-items:center;
           font-weight:600;
       }
       &:first-child{
           display:flex;
           align-items: center;
           padding:8px 16px 0 16px;
           img{
               width:48px;
               border-radius:50%;
               margin-right:8px;
           }
           button{
               margin: 4px 0;
               flex-grow:1;
               border-radius:35px;
               padding-left:16px;
               border:1px solid rgba(0,0,0,0.15);
               background-color: white;
               text-align: left;
           }
       }
       &:nth-child(2){
           display:flex;
           flex-wrap:wrap;
           justify-content:space-around;
           padding-bottom:4px;
           button{
               img{
                   margin:0 4px 0 -2px;
               }
               span{
                   color:#70b5f9;
               }
               
           }
       }
   }
   .filter-blue{
    filter: invert(68%) sepia(4%) saturate(7067%) hue-rotate(182deg) brightness(102%) contrast(95%);
    }
    .filter-green{
        filter: invert(68%) sepia(23%) saturate(828%) hue-rotate(56deg) brightness(97%) contrast(88%);
    }
    .filter-orange{
        filter: invert(77%) sepia(95%) saturate(1590%) hue-rotate(323deg) brightness(91%) contrast(99%);
    }
    .filter-rose{
        filter: invert(86%) sepia(18%) saturate(6308%) hue-rotate(301deg) brightness(105%) contrast(95%);
    }
`;

const Article=styled(Commoncard) `
  padding:0;
  margin:0 0 8px;
  overflow:visible;
`;

const SharedActor=styled.div `
  padding-right:40px;
  flex-wrap:nowrap;
  padding:12px 16px 0;
  margin-bottom:8px;
  align-items:center;
  display:flex;
  a{
      margin-right:12px;
      flex-grow:1;
      overflow: hidden;
      display: flex;
      text-decoration: none;
      img{
          width:48px;
          height:48px;
          border-radius:50%;
      }
      &>div{
          display:flex;
          flex-direction:column;
          flex-grow:1;
          flex-basis:0;
          margin-left:8px;
          overflow:hidden;
          span{
              text-align:left;
              &:first-child{
                  font-size:14px;
                  font-weight:700;
                  color:rgba(0,0,0,1);
              }
              &:nth-child(n+1){
                  font-size:12px;
                  color:rgba(0,0,0,0.6);
              }
          }
      }
  }
  button{
      position:absolute;
      right:12px;
      top:0;
      background:transparent;
      border:none;
      outline:none;
  }
`;

const Description=styled.div `
 padding:0 16px;
 overflow:hidden;
 color:rgba(0,0,0,0.9);
 font-size:14px;
 text-align: left;
`;

const SharedImg=styled.div `
 margin-top:8px;
 width:100%;
 display:block;
 position:relative;
 background-color: #f9fafb;
 img{
     object-fit: contain;
     width:100%;
     height:100%;
 }
`;

const SocialCounts=styled.ul `
  line-height:1.3;
  display:flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding:8px 0;
  border-bottom:1px solid #e9e5df;
  list-style:none;
  cursor:pointer;
  li{
      margin-right: 5px;
      font-size:12px;
      button{
          display: flex;
          border:none;
          outline:none;
          background: transparent;
      }
      img{
          margin-right:5px;
      }
      span{
          color:rgba(0,0,0,0.6);
          &:hover{
              color:#0a66c2;
          }
      }
      a{
          color:rgba(0,0,0,0.6);
          align-items: center;
          &:hover{
              color:#0a66c2;
          }
      }
  }
  
`;

const SocialActions=styled.div `
 align-items: center;
 display:flex;
 justify-content:flex-start;
 margin:0;
 min-height:40px;
 padding:4px 8px;
 
 button{
     display: inline-flex;
     align-items: center;
     padding:8px;
     color:rgba(0,0,0,0.6);
     border:none;
     outline: none;
     background:transparent;
     cursor:pointer;
     @media (min-width:768px){
         span{
            margin-left:8px;
         }
        
     }
 }
 .filter-blue{
    filter: invert(28%) sepia(84%) saturate(1510%) hue-rotate(192deg) brightness(91%) contrast(99%);
 }
`;

const Content=styled.div `
 text-align:center;
 & > img{
     width:30px;
 }
`;

const mapStateToProps=(state)=>{
    return{
        loading:state.articleState.loading,
        user:state.userState.user,
        articles:state.articleState.articles,
    }
}

const mapDispatchToProps=(dispatch)=>({
   getArticles:()=>dispatch(getArticlesAPI() )
});

export default connect(mapStateToProps,mapDispatchToProps)(Main);