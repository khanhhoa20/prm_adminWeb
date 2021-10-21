class Auth {
	constructor() {
        document.querySelector("body").style.display = "none";
		const status = localStorage.getItem("status");
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