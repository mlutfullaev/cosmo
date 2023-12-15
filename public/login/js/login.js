const form = document.querySelector('#loginform')

function setCookie(cName, cValue, expDays) {
    let date = new Date();
    let exp = 0;
    switch (expDays.slice(-1)) {
        case 's':
            exp = +expDays.slice(0, -1) * 1000
            break;
        case 'm':
            exp = +expDays.slice(0, -1) * 60 * 1000
            break;
        case 'h':
            exp = +expDays.slice(0, -1) * 60 * 60 * 1000
            break;
        case 'd':
            exp = +expDays.slice(0, -1) * 24 * 60 * 60 * 1000
            break;
        default:
            exp = +expDays.slice(0, -1)
            break;
    }
    date.setTime(date.getTime() + exp);
    const expires = "expires=" + date.toUTCString();
    console.log(expires);
    document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.querySelector('input#login')
    const password = document.querySelector('input#password')

    if (!username.value || !password.value) {
        return;
    }

    fetch('https://api-www.beautyid.app/auth/login', {
        method: 'POST',
        body: JSON.stringify({username: username.value, password: password.value}),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(res => {
        if (res.statusCode === 401) {
            document.querySelector('.user-not-found-alert').style.display = 'block'
        } else if (res.accessToken) {
            setCookie('auth', JSON.stringify(res), res.expiresIn);
            window.location.pathname = '/'
        }
        console.log(res);
    })
})