$("document").ready(function(){

/* This class outputs table rows per JSON object. Data is expected to come in as an ARRAY of JSON objects, each of which will become a table row. Also provides search functionality by finding partial or exact matches inside the values of JSON objects. */

class OutputAndSearch {
    constructor(){
        this.data_source = "js/data.json/";
        this.ajax_tries = 1;
        this.json_array = [];
        this.loadJSON();
    }
    loadJSON(){
        $("#table_body").empty();
        $("#table_body").html("<p>Fetching data from " + this.data_source + "...</p>");
        $.ajax({
            url: this.data_source,
            async: false,
            dataType: "json",
            context: this,
            error: function(xhr){
                if (this.ajax_tries <= 3){
                    this.ajax_tries++;
                    $("#table_body").html("<p style='color:red'>Could not fetch data. Retrying in 3...</p>");
                    setTimeout(() => {
                        $("#table_body").html("<p style='color:red'>Could not fetch data. Retrying in 2...</p>");
                    }, 1000);
                    setTimeout(() => {
                        $("#table_body").html("<p style='color:red'>Could not fetch data. Retrying in 1...</p>");
                    }, 2000);
                    setTimeout(() => {
                        this.loadJSON();
                    }, 3000);
                } else {
                    $("#table_body").html("<p style='color:red'>Couldn't fetch data, error: " + xhr.status + ".</p>");
                }
            },
            success: function(json) {
                $("#table_body").empty();
                this.json_array = json;
                this.outputData(this.json_array);
                this.json_keys = this.getJSONKeys(this.json_array[0]);
                this.outputKeysAsTableHeadings(this.json_keys);
                this.bindSearchBarListeners();
                this.bindDatePickerListeners();
                this.bindExportButton();
                this.json_export_keys;
            }
        });
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
            $("#datepicker").val("");
        });
    }
    bindDatePickerListeners(){
        $("#datepicker").datepicker();
        $("#datepicker").change(() => { //Couldn't return value from datepicker onSelect, so I just make the search function run whenever the input value changes
            this.searchForDate(this.json_array, $("#datepicker").val());
            $("#searchbar").val($("#datepicker").val()); //So can be used as export filenames
            if ($("#datepicker").val() != ""){
                this.json_export_keys = [$("#datepicker").val()];
            }
        });
        $("#datepicker").keyup((e) => {
            var code = e.keyCode || e.which; //Get code of pressed keyboard key
            if ($("#datepicker").val() != ""){
                this.searchForDate(this.json_array, $("#datepicker").val());
                this.json_export_keys = [$("#datepicker").val()];
            } else if (code == 8){ //8 = backspace/delete
                $("#table_body").empty(); //Prevents bug in which last search entry appeared at top of cleared list as a duplicate
                $("#datepicker").empty();
                this.outputData(this.json_array);
            } else {
                $("#datepicker").empty();
                this.outputData(this.json_array);
                this.json_export_keys = [$("#datepicker").val()];
            }
        });
    }
    searchForDate(json_array, date){
        $("#table_body").empty();
        json_array.forEach((json_object) => {
            if (json_object["start date"].includes(date)){ //It's weird that includes() is returning partial dates. Don't look a gift horse in the mouth, but could that be?
                this.createRow(json_object);
                this.json_export_keys.push(date);
            }
        });
    }
    getSearchType(search_term){
        if (search_term.charAt(0) === '"'){ //First quote marks the start of exact match search
            return "exact";
        } else if (search_term.indexOf(":") === -1){ //Normal search
            return "normal";
        } else if (search_term.indexOf(':"') != -1){ //Column search, exact match
            return "column_exact";
        } else { //Column search
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
    getSearchQueryParts(search_term){ //Called when searching data by column/JSON key
        var colon_index = search_term.indexOf(":");
        var key = search_term.substring(0, colon_index);
        var value = search_term.substring((colon_index + 1), search_term.length);
        var key_position = this.json_keys.indexOf(key);
        var search_query_object = {
            column: key, 
            query: value,
            key_array_index: key_position
            };
        return search_query_object;
    }
    searchForWordInArray(object_values_array, search_term, search_type){
        var found = false; // Only if this function returns found = true will row get outputted
        var search_term = search_term.toLowerCase();
        if (search_type === "normal"){
            object_values_array.forEach((current_item) => {
                if (current_item.indexOf(search_term) != -1){
                    found = true;
                }
            });
        } else if (search_type === "exact") {
            if (search_term.charAt(0) === '"' && search_term.charAt(search_term.length - 1) === '"'){
                var search_parts = this.getSearchQueryParts(search_term); //Returns an object containing individual parts of the search query
                search_term = search_term.replaceAll('"', "");
                object_values_array.forEach((current_item) => {
                    if (current_item === search_term){
                        found = true;
                    }
                });
            }
        } else if (this.json_keys.includes(search_type)){ //If search is for a json object key
            var search_parts = this.getSearchQueryParts(search_term);  //Returns an object containing individual parts of the search query
            var object_value_to_search = object_values_array[search_parts.key_array_index]; //Gets the array entry that correponds to the searched-for json key
            if (object_value_to_search.indexOf(search_parts.query) != -1){
                found = true;
            }
        } else if (search_type === "column_exact"){ //Searches for exact match within a column
            var search_parts = this.getSearchQueryParts(search_term);
            var object_value_to_search = object_values_array[search_parts.key_array_index]; //Gets the array entry that correponds to the searched-for json key
            if (search_term.charAt(search_term.length - 1) === '"'){ //Already know it starts with a quote because that's how this function gets invoked
                search_parts.query = search_parts.query.replaceAll('"', "");
                if (object_value_to_search === search_parts.query){
                    found = true;
                }
            }
        }
        return found;
    }
    getProjectLink(project_name){
        return "<a href='project_view.html?project=" + project_name + "'>" + project_name + "</a>";
    }
    createRow(json_object){
        var table = document.getElementById("table_body");
        var tr = document.createElement("tr");
        Object.keys(json_object).forEach((key) => {
            var td = document.createElement("td");
            if (key === "project"){
                td.innerHTML = this.getProjectLink(json_object[key]);
            } else if (key === "urgency") {
                if (json_object[key] === "High"){
                    td.style.color = "red";
                }
                td.innerHTML = json_object[key];
            } else {
                td.innerHTML = json_object[key];
            }
            tr.appendChild(td);
        });
        table.appendChild(tr);
    }
    outputData(json_array, search_term){
        var json_export_keys = [];
        json_array.forEach((json_object) => { //Runs PER json object; translates to one row.
            if (search_term === undefined){
                this.createRow(json_object);
                json_export_keys.push(json_object["project"]); //Push keys of outputted projects to array for export
            } else if (search_term != undefined){
                var search_type = this.getSearchType(search_term);
                var array_to_search = this.objectToSearchableArray(json_object);
                if (this.searchForWordInArray(array_to_search, search_term, search_type)){
                    this.createRow(json_object);
                    json_export_keys.push(json_object["project"]); //Push keys of outputted projects to array for export
                }
            }
        });
        this.json_export_keys = json_export_keys;
    }
    exportKeysToQueryString(){
        var query_string;
        this.json_export_keys.forEach((key_in_array) => {
            query_string = query_string + key_in_array + "+";
        });
        return query_string.substring(0, (query_string.length - 1)).replaceAll("undefined", ""); //Removes undefined entries from returned query string and removes the + on the end that shouldn't be there
    }
    bindExportButton(){
        $("#export_view").click(() => {
            if (window.location.href.indexOf("#") != -1){ //Remove anchor from end of URL if present to not interfere with export URL
                var this_page = window.location.href.substring(0, window.location.href.length - 1);
            } else {
                var this_page = window.location.href;
            }
            if ($("#searchbar").val() === ""){
                window.open(this_page.replace("index.html", "") + "export.html?filename=" + "all_data" + "&projects=" + this.exportKeysToQueryString(), "_blank");
            } else {
                window.open(this_page.replace("index.html", "") + 
                    "export.html?filename=" + $("#searchbar").val().replaceAll('"', "").replaceAll(":", "_") + "&projects=" + this.exportKeysToQueryString(), "_blank");     
            }
        });
    }
}

var output = new OutputAndSearch();

});
