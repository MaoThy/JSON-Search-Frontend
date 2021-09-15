class ThemeHandler {
    constructor(){
        this.bindDarkModeButton();
        this.currentTheme = "light";
    }
    saveThemeInLocalStorage(){

    }
    toggleDarkMode(){
        if (this.currentTheme === "light"){
            this.currentTheme = "dark";
            $("#projects_table, td, th, nav, .form-control, .sidebar, a, body, button, #sign_out").addClass("dark");
        } else if (this.currentTheme === "dark"){
            this.currentTheme = "light";
            $("#projects_table, td, th, nav, .form-control, .sidebar, a, body, button, #sign_out").removeClass("dark");
        }
    }
    bindDarkModeButton(){
        document.getElementById("theme_toggle").addEventListener("click", (e) => {
            this.toggleDarkMode();
            this.currentState = "dark";
        });
    }
}

theme_handler = new ThemeHandler();