/* Persistent theme handler - NOT YET WORKING */

class ThemeHandler {
    constructor(){
        this.theme_affected_elements = 
            "#projects_table, td, th, nav, .form-control, .sidebar, a, body, button, #sign_out";
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
        if (this.current_theme === "light"){
            this.changeTheme("dark");
        } else if (this.current_theme === "dark"){
            this.changeTheme("light");
        } else {
            this.changeTheme("light");
        }
    }
    changeTheme(type){
        if (type === "light"){
            $(this.theme_affected_elements).removeClass("dark");
            this.changeThemeSetting("light");
        } else if (type === "dark"){
            $(this.theme_affected_elements).addClass("dark");
            this.changeThemeSetting("dark");
        }
    }
    changeThemeSetting(type){
        if (type === "light"){
            localStorage.setItem("theme", "light");
            this.currentTheme = "light";
        } else if (type === "dark"){
            localStorage.setItem("theme", "dark");
            this.currentTheme = "dark";
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
        if (this.current_setting === null){ //If no setting found, set light them as default
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