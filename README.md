# BASAHIN NIYO TALAGA TO.
Need iyo i-setup ng maayos yung BoilerPlate (API branch) na makukuha sa https://github.com/PUP-CCIS ! Papahirapan niyo lang sarili niyo kung d niyo yan gagamitin. Also angery theme ng app, wag bida bida.

http://imgur.com/bMef45q <- BUKSAN NIYO YAN. GANYAN GINAWA KO.

In my separate copy, the App Adds and Edits kaso yung toggle/switch hindi na pu-push sa database. Login/Authentication, Sharing ng Todos sa ibang users, at DELETE ang wala pa.

# Database Guide
Follow this STRICTLY so we can avoid compatibility issues. Use the '.env' guide posted by our professor for settings.
Kaso bahala na kayo kung talagang susundin niyo ito. Recommended ko lang para matino tignan.
When setting up the tables, use the name 'Todos', for the Todos, and the name 'Users' for User Authentication purposes.

'Todos' Table's fields:
t_ID : [Not sure if this should be visible] [int] - the ID of the todos.
t_Title : [Visible in App] [Varchar(50)] - the title of the todo.
t_Description : [Visible in App] [Varchar(255)] - the description of the todo.
t_LastUpdated : [Visible in App] [Date] - this is updated on every update/ when the todo is firstly posted.
t_CreatedBy : [Visible in App] [Varchar(50)] - this is where the username of the one who created the post is found.
t_User : [Not-visible in App] [Varchar(50)] - this is just a way to make a quick (but not fast & efficient in large data) search on whose Todos owns that shit.

'Users' Table's fields:
u_name : username of the user.
u_pass : password of the user.

# End of Readme.
