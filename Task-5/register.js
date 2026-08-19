// Register
document
    .getElementById("personalDetails")
    .addEventListener("submit", function (e) {

        e.preventDefault();

        const getData =
            JSON.parse(localStorage.getItem("userdata")) || [];

        const firstname =
            document.getElementById("firstname").value.trim();

        const lastname =
            document.getElementById("lastname").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const existingUser = getData.find(function (user) {
            return user.email === email;
        });

        if (existingUser) {
            alert("Email already registered");
            return;
        }

        const data = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password
        };

        getData.push(data);

        localStorage.setItem(
            "userdata",
            JSON.stringify(getData)
        );

        console.clear();
        console.table(getData);

        document.getElementById("registerOutput").innerHTML =
            "Registration Successful!";

        document.getElementById("loginOutput").innerHTML = "";

        document.getElementById("personalDetails").reset();
    });


// Login
document
    .getElementById("loginForm")
    .addEventListener("submit", function (e) {

        e.preventDefault();

        const getData =
            JSON.parse(localStorage.getItem("userdata")) || [];

        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        const user = getData.find(function (user) {
            return (
                user.email === email &&
                user.password === password
            );
        });

        if (user) {

            document.getElementById("loginOutput").innerHTML =
                `<p>Login Successful!</p>
                 <p>Welcome ${user.firstname} ${user.lastname}</p>`;

            console.log("Login Successful");
            console.log(user);

        } else {

            document.getElementById("loginOutput").innerHTML =
                "<span style='color:red'>Invalid Email or Password</span>";
        }

        document.getElementById("loginForm").reset();
    });