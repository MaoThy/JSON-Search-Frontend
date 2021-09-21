# JSON-Search-Frontend
My latest JavaScript project – an interface for displaying information from an array of JSON objects. It includes a search function that will only display data rows that contain the letters typed in the search bar, along with exact match and column search functionality. You can also search by date using an attractive date-picker built with jQuery UI.

The search function is invoked every time a key is pressed while the search bar is in focus, resulting in a very responsive-feeling interface. The program will load JSON data from an external source (like an API) and then it will use JavaScript to create the table rows.

It uses a custom Bootstrap theme and is fully responsive. It also includes a dark theme that can be toggled with a button at the top.

I wrote this program as an alternative to using the DataTables framework, something I found so inscrutable it gave me a migraine.

A future version of the program will remove as much jQuery as possible, since most of the jQuery code is for rapid-prototyping purposes only.

# Features

- Partial search – search for entries in the JSON data by just typing a few letters into the search bar. Any entries that contain those letters will be immediately returned as rows inside the interface. All searches are case-insensitive, meaning that typing, for example, 'bankstown' will return entries that contain 'Bankstown'.
- Exact match search – type your search query in double quotes and the program will only return matching entries if it finds the *full* query inside the JSON data.
- Column search – search by column using the following syntax: column_name:value. If you wanted to search for a project named 'Ember', you'd type: project:ember.
- Exact match search inside column – search for an exact (case-insensitive) match to an entry inside a specific table column using the following syntax: column_name:"query".
- Search by date by either typing your query or using the datepicker dropdown.
- A detailed project view that pulls information from JSON data and uses it to populate a screen specific to that project. This view automatically generates a Google map based on the location entry in the JSON data.
- HTML export option - export the current search view as a nicely laid-out HTML document with just the click of a button. A future version will include a random value set as a localStorage item to ensure that only export requests that are coming from inside the application will be considered valid.
- Persistent theme – the application will remember your choice of theme across all pages and visits by storing your theme choice as a localStorage item.
- Responsive interface and smooth transitions – view JSON data on a massive desktop or a tiny phone, and enjoy smooth animations between transitions using the custom Bootstrap interface.

Note: This program will only search JSON objects that have one layer of depth, i.e. one array containing JSON objects, which contain key value pairs. It will not work with nested JSON objects.

# Screenshots

<img src="https://github.com/jm11116/JSON-Search-Frontend/blob/main/screenshots/unfiltered_view.png" style="max-width:650px"/>
<img src="https://github.com/jm11116/JSON-Search-Frontend/blob/main/screenshots/datepicker.png" style="max-width:650px"/>
<img src="https://github.com/jm11116/JSON-Search-Frontend/blob/main/screenshots/project_view_light.png" style="max-width:650px"/>
<img src="https://github.com/jm11116/JSON-Search-Frontend/blob/main/screenshots/project_view_dark.png" style="max-width:650px"/>
<img src="https://github.com/jm11116/JSON-Search-Frontend/blob/main/screenshots/mobile_view.png" style="max-width:100px"/>
