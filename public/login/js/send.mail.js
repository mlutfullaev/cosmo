// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const region = urlParams.get("region");
// const bgr = urlParams.get("bg");
// const sw = urlParams.get("r");

// try {
//     const bgholder = document.getElementById("bgHolder");
//     bgholder.classList.add(bgr);
// } catch {}

const uname = document.getElementById("txtName");
const inquiry = document.getElementById("txtInquiry");
const email = document.getElementById("txtEmail");

$("#mail_ok").hide();
$("#mail_error").hide();

document.getElementById("btnSend").addEventListener(
    "click",
    function () {

        if (email.validity.valid && uname.validity.valid && inquiry.validity.valid) {
            event.preventDefault();

            const url = "https://iamlux.ai:5004/api/Email/Send";
            const data = encodeURIComponent(
                JSON.stringify({
                    ToEmail: "info@iamlux.ai",
                    Subject: "COSMO.WIKI inquiry",
                    Inquiry: inquiry.value,
                    Name: uname.value,
                    Receiver: email.value,
                })
            );

            const xhr = new XMLHttpRequest();

            xhr.onload = function () {
                if (this.status == 200) {
                    $("#form").hide();
                    $("#mail_ok").show();
                    ResetValues();
                }
            };

            xhr.onerror = () => {
                $("#form").hide();
                $("#mail_error").show();
            };

            xhr.open("POST", url + "?request=" + data);

            try {
                xhr.send();
                $("#form").hide();
                $("#mail_ok").show();
                ResetValues();
            } catch (err) {
                console.log("Request failed");
                $("#form").hide();
                $("#mail_error").show();
            }
        }
    },
    false
);

function Reset() {
    uname.value = "";
    inquiry.value = "";
    email.value = "";

    $("#mail_ok").hide();
    $("#mail_error").hide();
    $("#form").show();
}

function ResetValues() {
    uname.value = "";
    inquiry.value = "";
    email.value = "";
}
