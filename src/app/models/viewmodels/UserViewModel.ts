export class UserViewModel {
    private FirstName: string;
    private LastName: string;
    private Email: string;
    private Password: string;
    
    constructor(firstName: string, lastName: string, email: string, password: string) {
        this.FirstName = firstName;
        this.LastName = lastName;
        this.Email = email;
        this.Password = password;
      }
} 