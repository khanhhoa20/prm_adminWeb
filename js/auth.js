
class Auth {
	constructor() {
        document.querySelector("body").style.display = "none";
		const status = sessionStorage.getItem("status");
		this.validateAuth(status);
	}

	validateAuth(status) {
		if (status != 1) {
			window.location.replace("/login.html");
		} else {
            document.querySelector("body").style.display = "block";
		}
	}

	logOut() {
		sessionStorage.removeItem("status");
		window.location.replace("/login.html");
	}
}
const auth = new Auth();
document.querySelector(".logout").addEventListener("click",
    (e) => {
        auth.logOut();
    });
