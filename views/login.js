function getLogin(event){
    event.preventDefault();
    const email=document.getElementById('exampleInputEmail1').value;
    const password=document.getElementById('exampleInputPassword1').value;
    const URL='http://localhost:3000';
    axios.post(`${URL}/login`,{
        email:email,
        password:password
    }).then((res)=>{
        console.log("resonse :",res);
        alert("login Successful");
        localStorage.setItem('token', res.data.token);
        window.location.href="/home";
    }).catch((err)=>{
        console.error("error is :",err);
                alert("Credentials Mismatched");
    });
}