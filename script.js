// ========================================
// DỮ LIỆU TÀI KHOẢN THỬ NGHIỆM
// ========================================

const accounts = [

    {
        username: "admin",
        password: "123456",
        name: "Quản trị viên",
        role: "ADMIN"
    },

    {
        username: "dang",
        password: "123456",
        name: "Nguyễn Minh Đăng",
        role: "ULTRA"
    },

    {
        username: "npc",
        password: "123456",
        name: "Thành viên",
        role: "NPC"
    },

    {
        username: "messi",
        password: "123456",
        name: "Messi",
        role: "MESSI"
    }

];


// ========================================
// LẤY TÀI KHOẢN ĐANG ĐĂNG NHẬP
// ========================================

const savedUser =
    localStorage.getItem("loggedInUser");

let currentUser = null;

if (savedUser) {

    try {

        currentUser = JSON.parse(savedUser);

    } catch (error) {

        localStorage.removeItem("loggedInUser");

    }

}


// ========================================
// ĐỔI NÚT ĐĂNG NHẬP TRÊN MENU
// ========================================

const loginButtons =
    document.querySelectorAll(".login-button");


loginButtons.forEach(function (button) {

    if (currentUser) {

        // Người dùng đã đăng nhập

        button.href = "taikhoan.html";


        // Biểu tượng theo role

        let icon = "👤";

        if (currentUser.role === "ADMIN") {
            icon = "👑";
        }

        else if (currentUser.role === "ULTRA") {
            icon = "⚡";
        }

        else if (currentUser.role === "MESSI") {
            icon = "🐐";
        }

        else if (currentUser.role === "NPC") {
            icon = "👤";
        }


        button.innerHTML =
            `${icon} ${currentUser.name}`;

    }

    else {

        // Chưa đăng nhập

        button.href = "dangnhap.html";

        button.innerHTML =
            "👤 Đăng nhập";

    }

});


// ========================================
// XỬ LÝ FORM ĐĂNG NHẬP
// ========================================

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const username =
                document
                    .getElementById("username")
                    .value
                    .trim();


            const password =
                document
                    .getElementById("password")
                    .value;


            const errorMessage =
                document.getElementById("loginError");


            // Tìm tài khoản

            const account =
                accounts.find(function (user) {

                    return (
                        user.username === username &&
                        user.password === password
                    );

                });


            if (account) {

                // Lưu tài khoản

                localStorage.setItem(
                    "loggedInUser",
                    JSON.stringify(account)
                );


                // Chuyển tới trang tài khoản

                window.location.href =
                    "taikhoan.html";

            }

            else {

                errorMessage.textContent =
                    "❌ Tài khoản hoặc mật khẩu không đúng.";

                errorMessage.style.display =
                    "block";

            }

        }
    );

}


// ========================================
// HIỂN THỊ THÔNG TIN TRANG TÀI KHOẢN
// ========================================

const accountName =
    document.getElementById("accountName");


const accountRole =
    document.getElementById("accountRole");


if (accountName && accountRole) {

    if (!currentUser) {

        window.location.href =
            "dangnhap.html";

    }

    else {

        accountName.textContent =
            currentUser.name;

        accountRole.textContent =
            currentUser.role;

    }

}


// ========================================
// NÚT ĐĂNG XUẤT
// ========================================

const logoutButton =
    document.getElementById("logoutButton");


if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                "loggedInUser"
            );


            window.location.href =
                "index.html";

        }
    );

}
