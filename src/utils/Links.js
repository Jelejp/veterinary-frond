const activePage = {
    Services: "/assets/services-active.png",
    Veterinary: "/assets/veterinary-active.png",
    Account: "/assets/user-active.png",
    Logout: "/assets/logout-active.png"
};

export const linksUser = [
    { text: "Account", to: "/auth/account", img: "/assets/user.png", activeIcon: activePage.Account },
    { text: "Services", to: "/auth/services", img: "/assets/services.png", activeIcon: activePage.Services },
    { text: "Vets", to: "/auth/veterinary", img: "/assets/veterinary.png", activeIcon: activePage.Veterinary },
    { text: "Logout", to: "/", img: "/assets/logout.png", activeIcon: activePage.Logout },
];

export const linksAdmin = [
    { text: "Admin Panel", to: "/auth/admin", img: "/assets/admin.png", activeIcon: activePage.Admin },
    { text: "Services", to: "/admin/services", img: "/assets/services.png", activeIcon: activePage.Services },
    { text: "Veterinary", to: "/admin/veterinary", img: "/assets/veterinary.png", activeIcon: activePage.Veterinary },
    { text: "Account", to: "/admin/account", img: "/assets/user.png", activeIcon: activePage.Account },
    { text: "Logout", to: "/", img: "/assets/logout.png", activeIcon: activePage.Logout },
];