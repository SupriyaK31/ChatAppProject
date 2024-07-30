function pushMessage(event){
    event.preventDefault();
    const msg=e.target.msgtext.value;
    const btn=document.getElementById('btnSend');
    const URL='http://localhost:3000';
    axios.post(`${URL}/chat`,{
        chat:msg
    }).then(()=>{
        loadChat();
    })
}

function loadChat(){
    const div=document.getElementById('Chat-container');
    const table=document.createElement('table');
    table.className="table table-striped table-success text-white";
    div.appendChild(table);
    axios.get(`${URL}/chat`).then(async(response)=>{
        const chats=response.data.chat;
        chats.forEach((chat)=>{
            div.innerHTML=`
        <table class="table table-striped table-success text-white">
        <tr>
        <td>${chat.chat}</td>
        </tr>
    </table>`
        })
    })
}