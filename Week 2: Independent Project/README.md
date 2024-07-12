# Akan Gender Reveal Name Generator

## Project Description
This web application takes a user's birthday and calculates the day of the week they were born. Based on this information and the user's gender, it then outputs their Akan Name. Akan names are derived from Ghanaian culture, where children are often given their first name as a 'day name' corresponding to the day of the week they were born.

## Author
Nathan Mbicho

## Setup Instructions
1. Clone this repository to your local machine.
```
git clone git@github.com:thespider911/thespider911.github.io.git
```
2. Navigate to the project directory.
```
Week 2: Independent Project
```
3. Open the `index.html` file in your web browser.

## Behavior Driven Development (BDD)
1. User sees a description of the application on the landing page.
2. User enters their birthday through a form.
3. User selects their gender.
4. User clicks the submit button.
5. Application validates the date and month input.
6. If input is valid, the application calculates the day of the week and outputs the corresponding Akan name.
7. If input is invalid, the user is alerted and asked to enter valid information.

## Technologies Used
- HTML
- CSS
- JavaScript

## Features
- Birthday input form
- Gender selection
- Akan name calculation based on birthday and gender
- Input validation for date, month and gender

## Live Site
[Live Site][https://thespider911.github.io/Week%202:%20Independent%20Project]

## Akan Names Reference
### Male
- Sunday: Kwasi
- Monday: Kwadwo
- Tuesday: Kwabena
- Wednesday: Kwaku
- Thursday: Yaw
- Friday: Kofi
- Saturday: Kwame

### Female
- Sunday: Akosua
- Monday: Adwoa
- Tuesday: Abenaa
- Wednesday: Akua
- Thursday: Yaa
- Friday: Afua
- Saturday: Ama

## Calculation Method
The day of the week is calculated using the following formula:

Day of the week (d) = ( ( (CC/4) -2*CC-1) + ((5*YY/4) ) + ((26*(MM+1)/10)) + DD ) mod 7

Where:
- CC - is the century digits. For example, 1989 has CC = 19
- YY - is the Year digits (1989 has YY = 89)
- MM - is the Month
- DD - is the Day of the month
- mod - is the modulus function ( % )

## Contributing
Pull requests are welcome. For major changes or review, please open an issue to discuss what you would like me to change.

## License
Theis project is open-sourced software licensed under the [MIT license](https://opensource.org/license/MIT).