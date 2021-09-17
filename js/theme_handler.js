/* Persistent theme handler */

/* No document ready function here on purpose. Theme should take effect as soon as possible! */

class ThemeHandler {
    constructor(){
        this.theme_affected_elements = 
            "#projects_table, td, th, nav, .form-control, .sidebar, .navbar-brand, body, button, #sign_out, .nav-link, .px-3, .navbar-dark";
        this.bindDarkModeButton();
        this.current_setting = localStorage.getItem("theme");
        this.current_theme = this.getCurrentThemeSetting();
        this.obeyCurrentThemeSetting();
    }
    bindDarkModeButton(){
        $("#theme_toggle").click(() => {
            this.toggleTheme();
        });
    }
    toggleTheme(){
        var current_theme = localStorage.getItem("theme");
        if (current_theme === "light"){
            this.changeTheme("dark");
        } else if (current_theme === "dark"){
            this.changeTheme("light");
        } else {
            this.changeTheme("light");
        }
    }
    changeTheme(type){
        if (type === "light"){
            $(this.theme_affected_elements).removeClass("dark");
            $("#searchbar").removeClass("searchbar-dark");
            localStorage.setItem("theme", "light");
        } else if (type === "dark"){
            $(this.theme_affected_elements).addClass("dark");
            $("#searchbar").addClass("searchbar-dark"); //Need to add disabled mode in dark mode somehow
            localStorage.setItem("theme", "dark");
        }
    }
    getCurrentThemeSetting(){
        if (this.current_setting != null){
            if (this.current_setting === "light"){
                return "light";
            } else if (this.current_setting === "dark"){
                this.changeTheme("dark");
                return "dark";
            }
        } else {
            return false;
        }
    }
    obeyCurrentThemeSetting(){
        if (this.current_setting === null){ //If no setting found, set light theme as default
            var theme_setting = localStorage.setItem("theme", "light");
            return theme_setting;
        } else if (this.current_setting != null){
            if (this.current_setting === "light"){
                this.changeTheme("light");
            } else if (this.current_setting === "dark"){
                this.changeTheme("dark");
            }
        }
    }
}

theme_handler = new ThemeHandler();