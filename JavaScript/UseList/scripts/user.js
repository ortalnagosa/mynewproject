import { drawTableRows } from "./domService.js";

export class User {
    static usersList = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    static count = 0;

    id;
    firstName;  
    lastName;
    email;
    password;
    isLogedIn = false;

    constructor(firstName, lastName, email, password) {

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            alert("כתובת המייל אינה תקינה.");
            return;
        }
    
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            alert("הסיסמה חייבת להכיל לפחות 8 תווים, אות גדולה, אות קטנה ומספר.");
            return;
        }

        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.id = ++User.count;

        User.usersList.push(this);
        localStorage.setItem('users', JSON.stringify(User.usersList));
        drawTableRows(User.usersList);
    }

    static removeUser(id) {
        User.usersList = User.usersList.filter(user => user.id !== id);
        localStorage.setItem('users', JSON.stringify(User.usersList));
        drawTableRows(User.usersList);
    }

    static login(id) {
        const user = User.usersList.find((user) => user.id === id);
        if (!user) return;
        if (user.isLogedIn) return;
        user.isLogedIn = true;
        localStorage.setItem('users', JSON.stringify(User.usersList));
        drawTableRows(User.usersList);
    }

    static logout(id) {
        const user = User.usersList.find((user) => user.id === id);
        if (!user) return;
        user.isLogedIn = false;
        localStorage.setItem('users', JSON.stringify(User.usersList));
        drawTableRows(User.usersList);
    }

    static updateUser(updatedUser) {
        const index = User.usersList.findIndex(user => user.id === updatedUser.id);
        if (index !== -1) {
            User.usersList[index] = updatedUser;
            localStorage.setItem('users', JSON.stringify(User.usersList));
        }
        }
    
}