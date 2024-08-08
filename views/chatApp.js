
const URL='http://localhost:3000';

const token=localStorage.getItem('token');


// alert('table added sucessfully');
// setInterval(() => {
//     loadChat();
// }, 1000);

document.addEventListener('DOMContentLoaded',async()=>{
    
    await loadChat();
    $('#createGroup').modal('hide');
    const token=localStorage.getItem('token');
    const decodeToken=parseJwt(token);
    console.log("Decode Token:"+Object.values(decodeToken));
    
});
function createGroup(event){

    console.log("create group clicked")
}
function logOut(event){
        event.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('chats');
        window.location.href="/login";
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}   

function pushMessage(e){
    e.preventDefault();
    const form=document.getElementById('ChatForm');
    const chatMsg=e.target.msgtext.value;
    console.log(chatMsg);
    const token=localStorage.getItem('token');
 
    axios.post(`${URL}/chat`,{chatMsg},{ headers:{"Authorization": token}}).then(async(res)=>{
        console.log(res);
        form.reset();
        await getNewItem();
        await loadChat();
    })
}


async function  loadChat(){
    const div=document.getElementById('Chat-container');
    
    const token=localStorage.getItem('token');
    let AllChatMsg="";
    let lastMsgid = -1;
    if(lastMsgid=-1){
        await getNewItem();
    }
    const chats=JSON.parse(localStorage.getItem('chats')) || [];

    chats.forEach(async(chat)=>{
        AllChatMsg +=`
        <table class="table table-striped table-success text-white">
        <tr>
        <td>${chat.user.name}: ${chat.chatMsg}</td>
        </tr>
    </table>`
    if (chat.id > lastMsgid) {
            lastMsgid = chat.id;
        }
        })
        div.innerHTML =AllChatMsg;
// try{
//     const response=await axios.get(`${URL}/chat?lastmsgid=${lastMsgid}`,{ headers:{"Authorization": token}});
//         const newMsg=response.data.data;
//         console.log("new msg:",newMsg);
//         mergedMsg=[...chats,...newMsg];
//         localStorage.setItem('chats',JSON.stringify(mergedMsg));
// }catch(error){
//     console.error(error);
// }
  
}


async function getNewItem() {

    try{
        const chats=JSON.parse(localStorage.getItem('chats')) || [];
        let lastMsgid = -1;
        chats.forEach(async(chat)=>{
        if (chat.id > lastMsgid) {
                lastMsgid = chat.id;
            }
            })
        const response=await axios.get(`${URL}/chat?lastmsgid=${lastMsgid}`,{ headers:{"Authorization": token}});
            const newMsg=response.data.data;
            // console.log("new msg:",newMsg);
            mergedMsg=[...chats,...newMsg];
            localStorage.setItem('chats',JSON.stringify(mergedMsg));
            
    }catch(error){
        console.error(error);
    }
    
}
function getChatGroup(){
    const divGroup=document.getElementById('GroupName-container');

}