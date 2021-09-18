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
        this.json_keys = this.getJSONKeys(this.currentData[0]);
        console.log(this.json_keys);
        this.outputKeysAsTableHeadings(this.json_keys);
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
    getJSONKeys(json_object){ //Used to output headings
        var key_array = Object.keys(json_object);
        return key_array;
    }
    outputKeysAsTableHeadings(json_keys){
        json_keys.forEach((element) => {
            var th = document.createElement("th");
            var heading = element.charAt(0).toUpperCase() + element.substring(1);
            th.innerHTML = heading;
            $("#headings_row").append(th);
        });
    }
    getProject(object_array){ //Quality of code here is fantastic. Refactor old code in this way
        object_array.forEach((current_object) => { //Don't forget to terminate the loop so it doesn't waste time looping through entire giant json
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
