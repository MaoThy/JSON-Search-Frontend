$("document").ready(function(){

class QueryStringHandler {
    constructor(){
        this.url = window.location.href;
        this.keyvaluesarray = this.url.split(/\?|\=|\&/g);
        this.present = function(){
            if (this.url.indexOf("?") == "-1"){
                return false;
            } else {
                return true;
            }
        }
        this.parts = function(part){
            if (this.present() == true){
                this.array = this.url.split("?");
                if (part == "url"){
                    return this.array[0];
                } else if (part == "query"){
                    return this.array[1];
                }
            }
        }
        this.append = function(key, value){
            this.existing = "?" + this.parts("query") + "&";
            this.combined = this.existing + key + "=" + value;
            if (this.present() == true){
                window.history.replaceState("", "", this.combined);
            } else {
                window.history.replaceState("", "", "?" + key + "=" + value);
            }
        }
        this.replace = function(key, value){
                window.history.replaceState("", "", "?" + key + "=" + value);
        }
        this.getvaluefromkey = function(key){
            if (this.keyvaluesarray.includes(key) == true){
                this.valuepos = this.keyvaluesarray.indexOf(key) + 1;
                return this.keyvaluesarray[this.valuepos];
            } else {
                return false;
            }
        }
        this.getkeyfromvalue = function(value){
            if (this.keyvaluesarray.includes(value) == true){
                this.valuepos = this.keyvaluesarray.indexOf(value) - 1;
                return this.keyvaluesarray[this.valuepos];
            } else {
                return false;
            } 
        }
    }
}
query = new QueryStringHandler();

class ProjectDataGetter {
    constructor(){
        this.project = query.getvaluefromkey("project");
        this.currentData = this.loadJSON();
        this.projectData = [];
        this.getProject(this.currentData);
        this.populatePage(this.projectData);
        console.log(this.projectData);
        this.createMap();
    }
    loadJSON(){
        var json_data = [];
        $.ajax({
            url: "js/data.json",
            async: false,
            dataType: "json",
            success: function(json) {
                json_data = json;
            }
        });
        return json_data;
    }
    getProject(object_array){
        object_array.forEach((current_object) => {
            if (current_object.project === this.project){
                this.projectData = current_object;
            }
        });
    }
    populatePage(json_object){
        $("#project_name").text("Project " + json_object.project);
        Object.keys(json_object).forEach(key => {
            var td = document.createElement("td");
            td.innerHTML = json_object[key];
            $("#project_info_row").append(td);
        });
    }
    createMap(){
        var location = this.projectData.location;
        var embed = '<div style="width: 100%"><iframe width="100%" height="200px" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=' + encodeURIComponent(location) + '&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>';
        $(".table-responsive").append(embed);
    }
}

var projectDataGetter = new ProjectDataGetter();

});