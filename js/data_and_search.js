$("document").ready(function(){

class OutputAndSearch {
    constructor(){
        this.json_array = this.loadJSON();
        this.outputData(this.json_array);
        this.searchMode = false;
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
        if (search_term.indexOf("exact:") === -1){ //If first character typed is NOT a quote
            return "normal";
        } else if (search_term.indexOf("exact:") != -1){
            return "exact";
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
        }
        return found;
    }
    getProjectLink(project_name){
        return "<a href='project_view.html?project=" + project_name + "'>" + project_name + "</a>";
    }
    outputData(json_array, search_term){
        json_array.forEach((json_object) => {
            if (search_term === undefined){
                this.createRow(json_object);
            } else if (search_term != undefined){
                var array_to_search = this.objectToSearchableArray(json_object, search_term);
                var search_type = this.getSearchType(search_term);
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