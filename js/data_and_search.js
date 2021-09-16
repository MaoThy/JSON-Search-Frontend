$("document").ready(function(){

/* This class outputs table rows per JSON object. Data is expected to come in as an ARRAY of JSON objects, each of which will become a table row. Also provides search functionality by finding partial or exact matches inside the values of JSON objects. */

class OutputAndSearch {
    constructor(){
        this.json_array = this.loadJSON();
        this.outputData(this.json_array);
        this.json_keys = this.getJSONKeys(this.json_array[0]);
        this.bindSearchBarListeners();
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
    bindSearchBarListeners(){
        $("#searchbar").keyup((e) => {
            if ($("#searchbar").val() === ""){
                $("#table_body").empty();
                this.outputData(this.json_array);
                $("#searchbar").submit();
            } else {
                $("#table_body").empty();
                this.outputData(this.json_array, $("#searchbar").val());
                $("#searchbar").submit();
            }
        });
    }
    getSearchType(search_term){
        if (search_term.indexOf(":") === -1){
            console.log("normal");
            return "normal";
        } else if (search_term.indexOf("exact:") != -1){
            console.log("exact");
            return "exact";
        } else {
            var search_key;
            this.json_keys.forEach((key) => {
                if (search_term.indexOf(key) != -1){
                    search_key = key;
                }
            });
            return search_key;
        }
    }
    objectToSearchableArray(json_object){
        var object_array = [];
        Object.keys(json_object).forEach((key) => {
            object_array.push(json_object[key].toLowerCase());
        });
        return object_array;
    }
    searchForWordInArray(object_values_array, search_term, search_type){
        var found = false;
        var search_term = search_term.toLowerCase();
        if (search_type === "normal"){
            object_values_array.forEach((current_item) => {
                if (current_item.indexOf(search_term) != -1){
                    found = true;
                }
            });
        } else if (search_type === "exact"){
            object_values_array.forEach((current_item) => {
                if (current_item === search_term.substring(6)){
                    found = true;
                }
            });
        } else if (this.json_keys.includes(search_type)){
            //Now, you need to add an exact match function for column search
            var colon_index = search_term.indexOf(":");
            var key = search_term.substring(0, colon_index);
            var value = search_term.substring((colon_index + 1), 
                                                search_term.length);
            var key_position = this.json_keys.indexOf(key);
            var object_value_to_search = object_values_array[key_position];
            if (object_value_to_search.indexOf(value) != -1){
                found = true;
            }
        }
        return found;
    }
    getProjectLink(project_name){
        return "<a href='project_view.html?project=" + 
            project_name + "'>" + project_name + "</a>";
    }
    outputData(json_array, search_term){
        json_array.forEach((json_object) => { //Runs PER json object; translates to one row.
            if (search_term === undefined){
                this.createRow(json_object);
            } else if (search_term != undefined){
                var search_type = this.getSearchType(search_term);
                var array_to_search = this.objectToSearchableArray(json_object);
                if (this.searchForWordInArray(array_to_search, search_term, search_type)){
                    this.createRow(json_object);
                }
            }
        });
    }
    createRow(json_object){
        var tr = document.createElement("tr");
        $("#table_body").append(tr);
        var td;
        Object.keys(json_object).forEach((key) => {
            td = document.createElement("td");
            if (key === "project"){
                var link = this.getProjectLink(json_object[key]);
                td.innerHTML = link;
            } else {
                td.innerHTML = json_object[key];
                if (json_object[key] === "High"){
                    td.style.color = "red";
                }
            }
            $("#table_body").append(td);
        });
    }
}

var output = new OutputAndSearch();

});