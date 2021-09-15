$(document).ready(function(){

class DataGetter {
    constructor(){
        this.currentData = this.loadJSON();
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
}

data_getter = new DataGetter();

class OutputTableData {
    //This outputs all table data, or only those that match the word typed in the search bar. It doesn't currently work with terms that contain two words. If you try to search 'John's' to get 'John's project', it won't match yet. It will only search whole words. Need to search words individually by splitting at space?
    constructor(){
        this.fakeData = data_getter.currentData;
    }
    createRow(element){
        var table_body = document.getElementById("table_body");
        var tr = document.createElement("tr");
        Object.values(element).forEach((val, index) => { // 'Value' is the value of the object inside the current array element – a single entry.
        var td = document.createElement("td");
        if (index === 0) { //First loop makes the first value ('Projects') a link.
            td.innerHTML = "<a href='project_view.html?project=" + val + "'>" + val + "</a>";
        } else if (index === 5 && val === "High") { //Index 5 = Urgency
            td.innerHTML = val.fontcolor("red");
        } else {
            td.innerHTML = val;
        }
        table_body.appendChild(td);
        });
        table_body.appendChild(tr);
    }
    outputTableData(search_word){
        if (search_word != undefined){ //If search word is present in search bar.
            var lowerCaseWord = search_word.toLowerCase();
        }
        this.fakeData.forEach((element) => { // 'Element' is current the object in the array.
            var lowerCaseArray = this.getLowercaseObjectArray(element);
            if (search_word != undefined && this.searchArrayForWord(lowerCaseArray, lowerCaseWord)) {
                this.createRow(element);
            } else if (search_word == undefined){
                this.createRow(element);
            }
        });
    }
    searchArrayForWord(array, word){
        var found = false;
        array.forEach((current_array_element) => {
            if (current_array_element.indexOf(word) != -1){
                found = true;
            }
        });
        return found;
    }
    getLowercaseObjectArray(element) {
        var lowerCaseArray = [];
        Object.values(element).forEach((val) => {
            lowerCaseArray.push(val.toLowerCase());
        });
        return lowerCaseArray;
    }
}

class Search {
    //Will need to create an advanced search function to just search specific fields.
    constructor(){
        this.searchMode = false;
        this.addSearchBarListeners();
    }
    addSearchBarListeners(){
        $("#searchbar").keyup(function(e){
            if ($("#searchbar").val() === ""){
                $("#table_body").empty();
                output.outputTableData();
                $("#searchbar").submit();
            } else {
                $("#table_body").empty();
                output.outputTableData($("#searchbar").val());
                $("#searchbar").submit();
            }
        });
    }
}

output = new OutputTableData();
output.outputTableData();

search = new Search();

/* Now this is a complicated one. JSON data is assumed to come in as an ARRAY of OBJECTS. A forEach iterates across each 'element' in the array. For each 'element' – which is an object – another forEach goes in and outputs the VALUES of the ELEMENT in the array. NOTE: Table headings are hardcoded in the HTML file. We could change this. */ 

});