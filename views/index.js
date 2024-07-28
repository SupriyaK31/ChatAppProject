const apiUrl="http://localhost:3000";

document.addEventListener("DOMContentLoaded",function(){
    const loginBtn = document.getElementById('loginButton');

    const signupBtn = document.getElementById('SignupButton');

    loginBtn.addEventListener('click',function(event){
        event.preventDefault();
        window.location.href=`${apiUrl}/login`;
    });
    signupBtn.addEventListener('click',function(event){
        event.preventDefault();
        window.location.href=`${apiUrl}/Signup`;
    });
});