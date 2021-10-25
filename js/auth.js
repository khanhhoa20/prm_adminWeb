
class Auth {
	constructor() {
        document.querySelector("body").style.display = "none";
		const role = sessionStorage.getItem("role");
		console.log()
		this.validateAuth(role);
	}

	validateAuth(role) {
		if (role != "ad") {
			window.location.replace("/login.html");
		} else {
            document.querySelector("body").style.display = "block";
		}
	}

	logOut() {
		sessionStorage.removeItem("role");
		sessionStorage.removeItem("user");
		window.location.replace("/login.html");
	}
}
const auth = new Auth();
document.querySelector(".logout").addEventListener("click",
    (e) => {
        auth.logOut();
    });
