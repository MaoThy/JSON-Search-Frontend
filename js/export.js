$("document").ready(function(){

/* This class outputs table rows per JSON object. Data is expected to come in as an ARRAY of JSON objects, each of which will become a table row. Also provides search functionality by finding partial or exact matches inside the values of JSON objects. */

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
var query = new QueryStringHandler();

class Exporter {
    constructor(){
        this.json_array = this.loadJSON();
        this.json_keys = this.getJSONKeys(this.json_array[0]);
        this.outputKeysAsTableHeadings(this.json_keys);
        this.projects_to_export = this.getProjectsFromQueryString();
        this.file_name = query.getvaluefromkey("filename");
        this.outputExportedProjects(this.json_array, this.projects_to_export);
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
    getJSONKeys(json_object){
        var key_array = Object.keys(json_object);
        return key_array;
    }
    outputKeysAsTableHeadings(json_keys){
        json_keys.forEach((key) => {
            var th = document.createElement("th");
            var heading = key.charAt(0).toUpperCase() + key.substring(1);
            th.innerHTML = heading;
            $("#headings_row").append(th);
        });
    }
    getProjectsFromQueryString(){
        var projects = query.getvaluefromkey("projects");
        return projects.split("+");
    }
    outputExportedProjects(json_array, projects_to_export){
        json_array.forEach((json_object) => {
            if (projects_to_export.includes(json_object["project"])){
                this.createRow(json_object);
            } else if (projects_to_export.includes(json_object["start date"])){
                this.createRow(json_object);
            }
        });
        this.downloadHTML();
    }
    downloadHTML(){
        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:attachment/text,' + encodeURI(document.documentElement.outerHTML);
        hiddenElement.target = '_blank';
        hiddenElement.download = this.file_name + ".html";
        hiddenElement.click();
    }
    createRow(json_object){
        var tr = document.createElement("tr");
        $("#table_body").append(tr);
        var td;
        Object.keys(json_object).forEach((key) => {
            td = document.createElement("td");
            td.innerHTML = json_object[key];
            if (json_object[key] === "High"){
                td.style.color = "red";
            }
            $("#table_body").append(td);
        });
    }
}

var exporter = new Exporter();

});
