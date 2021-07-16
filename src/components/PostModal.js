import { useState } from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import firebase from "firebase";
import { postArticleAPI } from "../actions";

const PostModal=(props)=>{
    const[editorText,setEditorText]=useState("");
    const[shareImage,setShareImage]=useState("");
    const[videoLink,setVideoLink]=useState("");
    const[assetArea,setAssetArea]=useState("");

    const handleChange=(e)=>{
        const image=e.target.files[0];
        if(image===""||image==="undefined"){
            alert("not an image,the file is of ${typeOf image}");
            return;
        }
        setShareImage(image);
    }

    const switchAssetArea=(area)=>{
        setShareImage("");
        setVideoLink("");
        setAssetArea(area);
    }

    const postArticle=(e)=>{
       
        e.preventDefault();
        if(e.target!==e.currentTarget){
            return;
        }
        const payload={
            image:shareImage,
            video:videoLink,
            user:props.user,
            description:editorText,
            timestamp:firebase.firestore.Timestamp.now()
        }
        props.postArticle(payload);
        reset(e);
    }

    const reset=(e)=>{
        setEditorText("");
        setShareImage("");
        setVideoLink("");
        setAssetArea("");
        props.handleClick(e);
    }
    return(
        <>
        {props.showModal==="open"&&
        <Container>
            <Content>
               <Header>
                   <h2>Create a Post</h2>
                   <button onClick={(event)=>reset(event)}><img src="/images/close-icon.svg" alt="close"/></button>
               </Header>
               <SharedContent>
                   <UserInfo>
                   {props.user.photoURL?<img src={props.user.photoURL}/>:<img src="/images/user.svg" alt="user"/>}
                       <span>{props.user.displayName}</span>
                   </UserInfo>
                   <Editor>
                   <textarea value={editorText} onChange={(e)=>setEditorText(e.target.value)} placeholder="What do you want to talk about?" autoFocus={true}></textarea>
                   {assetArea === "image" ? (
                   <UploadImage>
                       <input type="file" accept="image/gif,image/jpeg,image/png" name="image" id="file" style={{display:"none"}} onChange={handleChange}/>
                       <p><label htmlFor="file" >Select an image to share</label></p>
                       {shareImage&&<img src={URL.createObjectURL(shareImage)}/>} 
                  </UploadImage>
                   ):
                       assetArea==="media" && (
                        <>
                       <input type="text" placeholder="Please input a video Link" value={videoLink} onChange={(e)=>setVideoLink(e.target.value)} />
                       {videoLink&& <ReactPlayer width={"100%"} url={videoLink}/>}
                       </>
                       )
                   }
                   </Editor>
                   
               </SharedContent>
               <ShareCreation>
                   <AttachAssets>
                       <AssetButton>
                           <img src="/images/photo-icon.svg" class="filter-blue" onClick={()=>setAssetArea("image")} alt="photo"/>
                       </AssetButton>
                       <AssetButton>
                           <img src="/images/video-icon.svg" class="filter-green" onClick={()=>setAssetArea("media")} alt="video"/>
                       </AssetButton>
                   </AttachAssets>
                   <ShareComments>
                       <AssetButton>
                           <img src="/images/share-comments.svg" alt="comments"/><span>Anyone</span>
                       </AssetButton>
                   </ShareComments>
                   <PostButton disabled={!editorText?true:false} onClick={(e)=>postArticle(e)}>Post</PostButton>
               </ShareCreation>
            </Content>
        </Container>
        }
        </>
    )
}

const Container=styled.div `
 position: fixed;
 top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: rgba(0,0,0,0.8);
  animation: fadeIn 0.3s;
`;

const Content =styled.div `
width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;

const Header=styled.div `
display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0,0,0,0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0,0,0,0.6);
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button{
    height: 40px;
  width: 40px;
  min-width: auto;
  color: rgba(0,0,0,0.15);
  background: none;
  border: none;
  svg,img{
    pointer-events: none;
    
  }

  }
`;

const SharedContent=styled.div `
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;

const UserInfo=styled.div `
display: flex;
  align-items: center;
  padding: 12px 24px;
  svg,img{
    width: 48px;
  height: 48px;
  background-clip: content-box;
  border: 2px solid transparent;
  border-radius: 50%;
  }
  span{
    font-weight: 600;
  font-size: 16px;
  line-height: 1.5;
  margin-left: 5px;
  }
`;
const ShareCreation=styled.div `
 display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 6px;
`;

const AssetButton=styled.button `
 display: flex;
  align-items: center;
  height: 40px;
  min-width: auto;
  color: rgba(0,0,0,0.5);
  border:none;
  outline:none;
  background:transparent;
  cursor: pointer;
  .filter-blue{
    filter: invert(68%) sepia(4%) saturate(7067%) hue-rotate(182deg) brightness(102%) contrast(95%);
    }
    .filter-green{
        filter: invert(68%) sepia(23%) saturate(828%) hue-rotate(56deg) brightness(97%) contrast(88%);
    }
    span{
        margin-left: 5px;
    }
  
`;

const AttachAssets=styled.div `
 align-items: center;
 display: flex;
 padding-right: 8px;
 ${AssetButton}{
     width:40px;
 }
`;

const ShareComments=styled.div `
padding-left:8px;
margin-right:auto;
border-left: 1px solid rgba(0,0,0,0.15);
${AssetButton}{
    svg{
        margin-right: 5px;
    }
}
`;

const PostButton=styled.button `
 min-width: 60px;
 border-radius: 20px;
 padding-left: 10px;
 padding-right: 10px;
 background:${(props)=>props.disabled?"rgba(0,0,0,0.08)":"#0a66c2"};
 color: ${(props)=>props.disabled?"rgba(0,0,0,0.8)":"white"};
 cursor:pointer;
 &:hover{
    background:${(props)=>props.disabled?"rgba(0,0,0,0.08)":"#004182"};
 }
`;

const Editor=styled.div `
  padding: 12px 24px;
  
  textarea{
      border: none;
      outline: none;
      background: none;
      width:100%;
      min-height:100px;
      resize:none;
  }

  input{
      width:100%;
      height:35px;
      font-size:16px;
      margin-bottom: 20px;
  }
`;

const UploadImage=styled.div `
  text-align:center;
  img{
      width:100%;
  }
`;

const mapStateToProps=(state)=>{
    return{
        user:state.userState.user,
    }
}

const mapDispatchToProps=(dispatch)=>({
    postArticle:(payload)=>dispatch(postArticleAPI(payload)),
});
 

export default connect(mapStateToProps,mapDispatchToProps)(PostModal);