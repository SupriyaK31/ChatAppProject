const URL='http://localhost:3000';

document.addEventListener('DOMContentLoaded',async()=>{
    await loadChat();
    const token=localStorage.getItem('token');
    const decodeToken=parseJwt(token);
    console.log("Decode Token:"+Object.values(decodeToken));
});

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
        await loadChat();
    })
}

async function  loadChat(){
    const div=document.getElementById('Chat-container');
    const token=localStorage.getItem('token');
    let AllChatMsg="";
    await axios.get(`${URL}/chat`,{ headers:{"Authorization": token}}).then(async(response)=>{
        // console.log("response",response);
         const chats=response.data.data;
         const grpchat=response.data.data;
         console.log("chat groups",grpchat);
        chats.forEach(async(chat)=>{
        AllChatMsg +=`
        <table class="table table-striped table-success text-white">
        <tr>
        <td>${chat.user.name}: ${chat.chatMsg}</td>
        </tr>
    </table>`
        })
        div.innerHTML =AllChatMsg;
    })
}