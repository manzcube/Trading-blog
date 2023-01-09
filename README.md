# TRADING BLOG

This project was done using React for frontend, toghether with tailwindcss as CSS framework. And the backend using Firebase cloud services.

The user can sign in, sign out, create, view, save, edit, delete posts, crud opeerations for comments and a chat.
Images uploaded locally, and using native firebase functions to get the downloaded url.

The blog in not open for the public, is totally private. I set up firebase rules to do so.
Anyway, I have in mind set up the register function, and restructurate the DB so every user can have it's own blog.

## Description

I didn't see necessary the use of Redux because there is a short amout of pieces of State, and very few actions. On top of that just 1 active user.
Using tailwindcss for simplicity, and avoid writting too much CSS. Also it's easuer to make all the web responsive.
Using React hooks, toast for user notification, uuid and axios for the news API.
Aiming to create reusable components as much as possible.

About Firebase services, I used Email/Password authentication, Firestore instead of RealTime DB because I already have React listening for the changes.
Storage to upload all the files, and Hosting to deploy it.


## Desktop Images
![Trading Bros - Brave 1_9_2023 1_00_48 PM](https://user-images.githubusercontent.com/88792194/211307611-b04feea4-2f1b-4f89-9cb6-4be5c8101188.png)
![Trading Bros - Brave 1_9_2023 12_59_23 PM](https://user-images.githubusercontent.com/88792194/211307622-c143e32c-084d-4145-8982-c06fe799d760.png)
![Trading Bros - Brave 1_9_2023 12_58_59 PM](https://user-images.githubusercontent.com/88792194/211307627-beceaede-c424-4b01-be20-3e8038920114.png)
![Trading Bros - Brave 1_9_2023 12_58_52 PM](https://user-images.githubusercontent.com/88792194/211307636-b6c178c9-bec5-41f9-9443-acc72290e9d4.png)
![Trading Bros - Brave 1_9_2023 1_01_39 PM](https://user-images.githubusercontent.com/88792194/211307645-a272b86f-aaa4-4352-897f-300f60abb50a.png)
![Trading Bros - Brave 1_9_2023 1_01_46 PM](https://user-images.githubusercontent.com/88792194/211307650-ba623753-5ab8-4dc2-ad8b-b40a813394e6.png)
![Trading Bros - Brave 1_9_2023 1_00_20 PM](https://user-images.githubusercontent.com/88792194/211307657-da2bb5a8-2742-49eb-b08f-2b771a5ede66.png)
![Trading Bros - Brave 1_9_2023 1_00_40 PM](https://user-images.githubusercontent.com/88792194/211307665-8d03ebca-e225-4f75-8d01-294be99fe519.png)

## Mobile Images (from an iphone)
![IMG_6672](https://user-images.githubusercontent.com/88792194/211308007-4b4fda72-7744-4a21-a39d-080304859214.jpg | width=100)
![IMG_6673](https://user-images.githubusercontent.com/88792194/211308008-062b8d5f-437a-4648-8119-fcd865bb6dee.jpg | width=100)
![IMG_6674](https://user-images.githubusercontent.com/88792194/211308009-e9bc9508-e187-41ca-baf3-05715e95faa2.jpg | width=100)
![IMG_6675](https://user-images.githubusercontent.com/88792194/211308011-eb530afc-1bb1-4bff-998b-6360da7bc041.jpg | width=100)
![IMG_6676](https://user-images.githubusercontent.com/88792194/211308015-92a70ae5-28a7-4227-b68c-9b0d048d09ab.jpg | width=100)
