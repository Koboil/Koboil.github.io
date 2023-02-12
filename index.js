
function validate()
{
    const user_name = document.getElementById('username');
    const password = document.getElementById('password');

    if(user_name.value == "admin" && password.value == "admin")
    {
        window.location.href = "Home/desktop.html";
    }
    else
    {
        document.getElementById('error').style.display = 'block'; 
    }
}


function hide_error()
{
    document.getElementById('error').style.display = 'none';
    stop_anim();
}


function stop_anim()
{
    const content = document.querySelector('.login_content');
    content.style.animation = 'none';
}