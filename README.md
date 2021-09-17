# JSON-Search-Frontend
This is an interface for displaying information from an array of JSON objects. It includes a search function that will only display data rows that contain the letters typed in the search bar.

The search function is invoked every time a key is pressed while the search bar is in focus, resulting in a very responsive-feeling interface. The program will load JSON data from an external source (like an API) and then it will use JavaScript to create the table rows. It uses a custom Bootstrap theme and is fully responsive. It also includes a dark theme that can be toggled with a button at the top.

# Features

- Partial search – search for entries in the JSON data by just typing a few letters into the search bar. Any entries that contain those letters will be immediately returned as rows inside the interface. All searches are case-insensitive, meaning that typing, for example, 'bankstown' will return entries that contain 'Bankstown'.
- Exact match search – type your search query in double quotes and the program will only return matching entries if it finds the *full* query inside the JSON data.
- Column search – search by column using the following syntax: column_name:value. If you wanted to search for a project named 'Ember', you'd type: project:ember.
- Exact match search inside column – search for an exact (case-insensitive) match to an entry inside a specific table column using the following syntax: column_name:"query".
- A detailed project view that pulls information from JSON data and uses it to populate a screen specific to that project. This view automatically generates a Google map based on the location entry in the JSON data.
- Persistent theme – the application will remember your choice of theme across all pages and visits by storing your theme choice as a localStorage item.
- Responsive interface and smooth transitions – view JSON data on a massive desktop or a tiny phone, and enjoy smooth animations between transitions using the custom Bootstrap interface.

# Screenshots

<img src="https://github.com/jm11116/JSON-Search-Frontend/blob/main/screenshots/light_mode.png" style="max-width:650px"/>
<img src="https://github.com/jm11116/JSON-Search-Frontend/blob/main/screenshots/project_view_light.png" style="max-width:650px"/>
<img src="https://github.com/jm11116/JSON-Search-Frontend/blob/main/screenshots/project_view_dark.png" style="max-width:650px"/>
<img src="https://github.com/jm11116/JSON-Search-Frontend/blob/main/screenshots/mobile_view.png" style="max-width:100px"/>
