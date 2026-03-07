
const signIn = () =>{
    const usernameInput = document.getElementById('username-input');
    const passwordInput = document.getElementById('password-input');

    if(usernameInput.value !== 'admin' && passwordInput.value !== 'admin123'){
        alert("Login Failed!!");
        return;
    }
    else{
        window.location.assign('./home.html');
    }
    
};
