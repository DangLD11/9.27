// ========================================
// DỮ LIỆU TÀI KHOẢN
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
// THÔNG TIN ROLE
// ========================================

const roleInfo = {

    ADMIN: {
        icon: "👑",
        title: "ADMIN",
        description: "Quản trị viên",
        className: "role-admin"
    },

    ULTRA: {
        icon: "⚡",
        title: "ULTRA",
        description: "Thành viên Ultra",
        className: "role-ultra"
    },

    MESSI: {
        icon: "🐐",
        title: "MESSI",
        description: "Legendary Member",
        className: "role-messi"
    },

    NPC: {
        icon: "👤",
        title: "NPC",
        description: "Thành viên",
        className: "role-npc"
    }

};


// ========================================
// LẤY USER ĐANG ĐĂNG NHẬP
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
// HÀM LẤY THÔNG TIN ROLE
// ========================================

function getRoleInfo(role) {

    if (roleInfo[role]) {

        return roleInfo[role];

    }

    return {

        icon: "👤",
        title: role || "MEMBER",
        description: "Thành viên",
        className: "role-npc"

    };

}


// ========================================
// KIỂM TRA QUYỀN ADMIN
// ========================================

function isAdmin() {

    return (
        currentUser &&
        currentUser.role === "ADMIN"
    );

}


// ========================================
// MENU ĐĂNG NHẬP / TÀI KHOẢN
// ========================================

const loginButtons =
    document.querySelectorAll(".login-button");


loginButtons.forEach(function (button) {

    if (currentUser) {

        const role =
            getRoleInfo(currentUser.role);


        button.href =
            "taikhoan.html";


        button.innerHTML =
            `${role.icon} ${currentUser.name}`;

    }

    else {

        button.href =
            "dangnhap.html";


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


            const account =
                accounts.find(function (user) {

                    return (
                        user.username === username &&
                        user.password === password
                    );

                });


            if (account) {

                localStorage.setItem(
                    "loggedInUser",
                    JSON.stringify(account)
                );


                window.location.href =
                    "taikhoan.html";

            }

            else {

                if (errorMessage) {

                    errorMessage.textContent =
                        "❌ Tài khoản hoặc mật khẩu không đúng.";

                    errorMessage.style.display =
                        "block";

                }

            }

        }
    );

}


// ========================================
// TRANG TÀI KHOẢN
// ========================================

const accountName =
    document.getElementById("accountName");

const accountRole =
    document.getElementById("accountRole");

const accountUsername =
    document.getElementById("accountUsername");

const accountRoleDescription =
    document.getElementById("accountRoleDescription");

const accountRoleIcon =
    document.getElementById("accountRoleIcon");


if (accountName && accountRole) {

    if (!currentUser) {

        window.location.href =
            "dangnhap.html";

    }

    else {

        const role =
            getRoleInfo(currentUser.role);


        accountName.textContent =
            currentUser.name;


        accountRole.textContent =
            role.title;


        if (accountUsername) {

            accountUsername.textContent =
                "@" + currentUser.username;

        }


        if (accountRoleDescription) {

            accountRoleDescription.textContent =
                role.description;

        }


        if (accountRoleIcon) {

            accountRoleIcon.textContent =
                role.icon;

        }


        accountRole.className =
            "role-badge " + role.className;

    }

}


// ========================================
// THÔNG TIN CHI TIẾT TÀI KHOẢN
// ========================================

if (currentUser) {

    const accountName2 =
        document.getElementById("accountName2");

    const accountUsername2 =
        document.getElementById("accountUsername2");

    const accountRole2 =
        document.getElementById("accountRole2");


    if (accountName2) {

        accountName2.textContent =
            currentUser.name;

    }


    if (accountUsername2) {

        accountUsername2.textContent =
            "@" + currentUser.username;

    }


    if (accountRole2) {

        accountRole2.textContent =
            currentUser.role;

    }

}


// ========================================
// KHU VỰC QUẢN TRỊ
// ========================================

const adminPanel =
    document.getElementById("adminPanel");


if (adminPanel) {

    if (isAdmin()) {

        adminPanel.style.display =
            "block";

    }

    else {

        adminPanel.style.display =
            "none";

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
