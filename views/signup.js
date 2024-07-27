function createUser(event){
  event.preventDefault();
    const name=document.getElementById('exampleInputName1').value;
    const email=document.getElementById('exampleInputEmail1').value;
    const mobile=document.getElementById('exampleInputMobile1').value;
    const password=document.getElementById('exampleInputPassword1').value;
    axios.post('http://localhost:3000/',{ 
      name:name,
      email:email,
      mobile:mobile,
      password:password,
     },).then(res=>{
      
      console.log(res);
    })
    .catch(err=>console.error(err));
  }
