
class Auth {
	constructor() {
		document.querySelector("body").style.display = "none";
		const role = sessionStorage.getItem("role");
		const token = sessionStorage.getItem("token");
		console.log()
		this.validateAuth(role, token);
	}

	validateAuth(role, token) {
		if (role != "ad" || token == null) {
			window.location.replace("/login.html");
			sessionStorage.removeItem("role");
			sessionStorage.removeItem("token");
		} else {
			document.querySelector("body").style.display = "block";
		}
	}

	logOut() {
		sessionStorage.removeItem("role");
		sessionStorage.removeItem("token");
		window.location.replace("/login.html");
	}
}
const auth = new Auth();
document.querySelector(".logout").addEventListener("click",
	(e) => {
		auth.logOut();
	});
