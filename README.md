# FixIT-MERN

<div align="center">
    <img src="https://github.com/maraneagu/FixIT-MERN/assets/93039914/9242e5d4-d2b0-4cbc-9400-487b64b6aeca" alt="image">
</div>

# Introduction


We are going to present  our fullstack application called "FixIt". This application makes the communication between clients and service providers a lot more fluently and efficiently. Through our platform,
users can create an account and search for specific services that they need. Our special feature is that our application is more like a social-media platform, meaning that our customers
can add friends. Why would we add that feature? Well, we've thought about it this way: first, when we want to hire someone that we do not know personally we ask a friend, if he/she knows somebody
trustworthy. Now, with our application, you can see the reviews of the workers that have done projects for your friends, and see how your close ones reviewed them.


# Contributors
- [David Bojneagu](https://github.com/DBojneagu)
- [Elena Georgescu](https://github.com/elenaag23)
- [Cosmina Gheorghe](https://github.com/cosminagheorghe47)
- [Mara Neagu](https://github.com/maraneagu)
- [Vlad Talpiga](https://github.com/vladtalpiga)


# Demo
- [Demo](https://youtu.be/qrWF7znqEJA)


# User Stories
- [User Stories](https://github.com/maraneagu/FixIT-MERN/wiki/User-Stories)



# TechStack 
1. React for the frontend
2. MongoDB for the NoSql database
3. Express & NodeJS for the backend
4. MUI for styling
5. React Redux for managing states
6. Bcrypt for the encryption of passwords
7. Dropzone for uploading images.

# Structure  
<div align="center">
    <img src="https://github.com/maraneagu/FixIT-MERN/assets/101595151/798ddca3-ec6f-4452-be9c-1399ff0420a8" alt="image" width="600px">
</div>


<div align="center">
    <i> UML Diagram </i>
</div>

<br>
<br>

<div align="center">
    <img src="https://github.com/maraneagu/FixIT-MERN/assets/101595151/f412fdb7-9139-4317-9e32-213a2c007791" alt="image" width="600px">
</div>


<div align="center">
    <i> Use Case Diagram </i>
</div>


<br>
<br>

<div align="center">
    <img src="https://github.com/maraneagu/FixIT-MERN/assets/93272424/a3f81a1c-1d0b-40a8-a17c-a0e87ea8a8a6" alt="image" width="600px">
</div>
<div align="center">
    <i> WorkFlow Diagram </i>
</div>


<br>

# Homepage 

<br>

The homepage contains widgets with the user's profile, the people they are following, the feed posts, the search bar, and the category selection bar for filtering.
<br>

<div align="center">
    <img src="https://github.com/maraneagu/FixIT-MERN/assets/101595151/13853e89-f7a0-4529-95f7-bf73750ae976" alt="image" width="1000px">
</div>

<br/>


# LoginPage & RegisterPage
<br>
On the login page, you can log in using an email and a password.

<br>
<br>

<div>
    <img src="https://github.com/maraneagu/FixIT-MERN/assets/101599503/93496a6f-c9df-416d-ad32-4c2eaddde6e4" alt="loginPage">
</div>



<br>
<br>

On the register page, you can create an account and set your name, location, profile picture, role (master or client), email, and a password.

<br>

<div>
    <img src="https://github.com/maraneagu/FixIT-MERN/assets/101599503/68d26d9d-5892-4a5b-b90d-26f7f171b666" alt="registerPage">
</div>

# ProfilePage

<br>

<b><i>Master Profile</i></b>
<br>


<div>
    <img src="https://github.com/maraneagu/FixIT-MERN/assets/101599503/35a4d72f-3312-44b2-be32-27e2025c2ab8" alt="masterProfilePage">
</div>

<br>

On the profile page, if you are a master, you can see the posts you added, the tips you recommended and the people you are following.


<br>


<b><i>Client Profile</i></b>
<br>

![image](https://github.com/maraneagu/FixIT-MERN/assets/101599503/e56739c1-16c2-4cbb-b4d6-030404721925)


If you are a client, you can only see the people you are currently following.


# CreatePost
<br>

When creating a post, you are sent to a specific form, in which you need to fill in the title, description, the category and the picture representing the post. Here is the form:

 <br>

![2023-06-15 (4)](https://github.com/maraneagu/FixIT-MERN/assets/93272424/590f66fd-e444-45a8-b9c3-b4e51148d67d)

<br>

After you have created the post, you are sent to the specific post page, where you are able to see the full description of the post and the reviews of the post. 


# ShowPost

<br>
A post contains information about the user who made it, with the option to follow or unfollow them, a title, a description, and an image. Users can like the post, add a review, or be redirected to a separate "Show Post" page. If the logged-in user is the one who made the post, he can delete or edit it.

<br>
<br>

<div>
    <img src="https://github.com/maraneagu/FixIT-MERN/assets/101595151/4cf778b5-db26-4062-b47f-72a68f705dab" alt="image" width="1000px">
</div>

# EditPost

<br>

On this page, you can edit a post by changing its attributes, including the image.

<br>

<div>
    <img src="https://github.com/maraneagu/FixIT-MERN/assets/101595151/0f01d000-36b4-495b-bbaa-be1eac8741b5" alt="image" width="1000px">
</div>


# TipsPage

<br>
Adding a tip is possible only if you have a master account. You can also add Youtube videos.
<br>
<br>



![WhatsApp Image 2023-06-15 at 1 02 41 PM](https://github.com/maraneagu/FixIT-MERN/assets/101599503/5902ed6f-c918-4b18-9df5-d2de9d4ec050)

<br>

The "Create a tip" form uses a title, description, category and a Youtube link to create a tip.

<br>

![WhatsApp Image 2023-06-15 at 1 02 43 PM](https://github.com/maraneagu/FixIT-MERN/assets/101599503/4e982c83-f55f-4caa-83e5-61adf4441ab4)

# Reviews

<br>

In the ShowPost, you can view the reviews of the specific post. These reviews have a star rating, a description, and a user associated to them. They can be created and deleted through pop-up windows.

<br>

<div>
    <img src="https://github.com/maraneagu/FixIT-MERN/assets/101595151/82075945-d267-4021-b7ec-0d308630a525" alt="image" width="1000px">
</div>

<br>
Create a review pop-up:
<br>

<br>

<div>
    <img src="https://github.com/maraneagu/FixIT-MERN/assets/101595151/baa6859a-63d5-436d-9101-bdd51b3aded6" alt="image" width="1000px">
</div>




# ChatGPT Use

<br>
We used this AI tool to add comments about what the code was specifically doing and also for generating some UI code.

<br>
<br>

![image](https://github.com/maraneagu/FixIT-MERN/assets/101599503/39a4bafe-6bc6-43d9-86bc-94e8f90e5dd0)



