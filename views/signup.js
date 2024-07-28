function createUser(event){
  event.preventDefault();
    const myform=document.getElementById('SignupForm');
    const name=document.getElementById('exampleInputName1').value;
    const email=document.getElementById('exampleInputEmail1').value;
    const mobile=document.getElementById('exampleInputMobile1').value;
    const password=document.getElementById('exampleInputPassword1').value;
    const URL='http://localhost:3000';
    axios.post(`${URL}/Signup`,{ 
      name:name,
      email:email,
      mobile:mobile,
      password:password,
     },).then(res=>{
      alert('Successfuly signed up');
      window.location.href="/login";
    })
    .catch(err=>{
      if(err.message="User already Exist"){
        alert('User already exists, Please Login');
      }else{
        console.log(err);
      }
    }
    );
  }
