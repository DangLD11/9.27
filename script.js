// ================================
// TÀI KHOẢN THỬ NGHIỆM
// ================================

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
    }
];


// ================================
// XỬ LÝ ĐĂNG NHẬP
// ================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const username =
            document.getElementById("username").value.trim();

        const password =
            document.getElementById("password").value;

        const errorMessage =
            document.getElementById("loginError");

        const account = accounts.find(function (user) {

            return (
                user.username === username &&
                user.password === password
            );

        });


        if (account) {

            // Lưu thông tin người đăng nhập
            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(account)
            );

            // Chuyển sang trang tài khoản
            window.location.href = "taikhoan.html";

        } else {

            errorMessage.textContent =
                "❌ Tài khoản hoặc mật khẩu không đúng.";

            errorMessage.style.display = "block";

        }

    });

}
