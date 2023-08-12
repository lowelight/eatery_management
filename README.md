# Eatery Management System
### Introduction  
This repository hosts the development work of the Eatery Management System, a project that is designed as part of our graduation requirements. The system is a comprehensive web application designed to streamline and digitize the operations of a typical eatery. This project covers a wide spectrum of technologies from the front end to the backend.

Functionalities
The Eatery Management System is designed to fulfill the following 8 functionalities:

1. Eateries must be able to register and maintain a profile for themselves that is visible to all system users and includes at least the eatery name, address, cuisines offered, and a menu.

2. A subscribed eatery must be able to offer any given number of discount vouchers for any time range of a given day. A discount voucher provides a customer with a percentage discount on their bill for a specified time range at the eatery that offered the voucher.

3. The system must also allow eateries to specify a repeated weekly schedule, specifically when, what % discount, and how many discount vouchers will appear for each time range the eatery wants to offer discount vouchers for

4. Customers must be able to find discounts that are available during a specified time range based on location (postcode), cuisine, and (optionally) some keywords that match eatery menu entries. Customers must be able to navigate to any eatery's profile from search results. Once a customer finds an available discount voucher: they must be able to book a voucher (which reduces the available voucher count for that eatery and time period by 1) and see the time range for which their booked voucher is available (each customer must not be able to book a discount voucher if there are none left and can only book 1 voucher per eatery per voucher time range) 

5. When a customer with a discount voucher orders their meal at the corresponding eatery within the voucher's time range, they must be able to use their voucher by showing the eatery a code that represents the discount voucher. The eatery must then be able to use this code to identify what the % discount should be, to verify that the customer had indeed booked a discount voucher and that this same discount voucher has not been previously used. 

6. Customers must be able to add reviews that include some text, and a rating out of 5, for each eatery that they have a discount voucher. Any customer must be able to read such reviews along with the average rating for any eatery they are thinking of booking a discount voucher for.

7. Google Map Interaction. Add map interaction where users can click on the geographical location of a business, and it automatically redirects them to Google Maps, displaying the location of the store.

8. Leaderboard System. To foster healthy competition among restaurants, besides the user feedback and rating feature, an additional approach would be to automatically calculate a comprehensive rating based on the number of customers and customer ratings. This overall rating can then be displayed on a leaderboard.

Flow diagram
![image](https://github.com/unsw-cse-comp3900-9900-23T2/9900F15APT5D/assets/88962364/166aaf33-b944-4fd4-95ca-08e7aec2fa18)


Project Structure
The repository is organized into the following main sections:

Frontend: Contains all frontend code, built using [JS, HTML/CSS, Webpack, React, MUI, Redux, Tailwindcss, Axios].

Backend: Contains all backend code, built using [Python 3.9, Flask, MySQL 8.0.33].

API layer: [Google Maps, RESTful]

Platform layer: [Docker container]

Documentation: All project-related documentation, including design specs and meeting minutes.

WorkDiaries: Weekly updates in the form of work diaries will be uploaded here.

Weekly Work Diary
Every week, we will be uploading a work diary detailing our progress, any challenges faced, and the solutions implemented. This will serve as a log of our journey through this project and will be found in the WorkDiaries folder.

Contributing
From all five team members.

Team
This project is brought to you by:

[Yue Niu]
[Zhourui Shi]
[Lichen Zhang]
[Yimin Liu]
[Haoxian Zhang]

Contact
For any questions or feedback, feel free to reach out to us. You can contact us at [z5327309@ad.unsw.edu.au].

License
This project is licensed under the [License Name].
