function getLogin(event){
    event.preventDefault();
    const email=document.getElementById('exampleInputEmail1').value;
    const password=document.getElementById('exampleInputPassword1').value;
    const URL='http://localhost:3000';
    axios.post(`${URL}/login`,{
        email:email,
        password:password
    }).then((res)=>{
        window.location.href="/home";
    }).catch((err)=>console.error(err));
}