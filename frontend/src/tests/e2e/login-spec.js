describe('login functionality tests', () => {

    const testUserMail = 'andrzej86@gmail.com'
    const testPassword = 'andrzej86';

    beforeEach(() => {
        browser.waitForAngularEnabled(false);
        browser.get('http://localhost:4200');
        browser.sleep(500)
        
        element(by.linkText('Logowanie')).click();
        browser.sleep(500)
    });

    it('should login an existing user', () => {
        const userNameForm = element(by.css('#username'));
        const passwordForm = element(by.css('#password'));
        const loginButton = element(by.buttonText('Zaloguj'));

        expect(userNameForm.isPresent()).toBeTruthy();
        expect(passwordForm.isPresent()).toBeTruthy();
        expect(loginButton.isPresent()).toBeTruthy();

        userNameForm.sendKeys(testUserMail);
        passwordForm.sendKeys(testPassword);
        loginButton.click();
        browser.sleep(1000)

        expect(element(by.linkText('Wycieczki')).isPresent()).toBeTruthy();
        expect(element(by.css('.nav-item > .btn-primary')).isPresent()).toBeTruthy();
        element(by.css('.nav-item > .btn-primary')).click();
    });

    it('should return certain alert if provided password is wrong', () => {
        const userNameForm = element(by.css('#username'));
        const passwordForm = element(by.css('#password'));
        const loginButton = element(by.buttonText('Zaloguj'));

        expect(userNameForm.isPresent()).toBeTruthy();
        expect(passwordForm.isPresent()).toBeTruthy();
        expect(loginButton.isPresent()).toBeTruthy();
        
        userNameForm.sendKeys(testUserMail);
        passwordForm.sendKeys(testPassword);
        loginButton.click();
        expect(element.all(by.css('.text-danger')).getText()).toContain(
          'Błąd logowania: Wrong username or password.'
        );
    });
    
    it('should return certain alert if user submits uncompleted form', () => {
        const usernameTextBox = element(by.css('#username'));
        const passwordTextBox = element(by.css('#password'));
        const loginButton = element(by.buttonText('Zaloguj'));

        expect(usernameTextBox.isPresent()).toBeTruthy();
        expect(passwordTextBox.isPresent()).toBeTruthy();
        expect(loginButton.isPresent()).toBeTruthy();

        usernameTextBox.sendKeys(testUserMail);
        loginButton.click();
        expect(element.all(by.css('.text-danger')).getText()).toContain(
          'This field is required'
        );
    });

    it('should logout logged in user', () => {
        const usernameTextBox = element(by.css('#username'));
        const passwordTextBox = element(by.css('#password'));
        const loginButton = element(by.buttonText('Zaloguj'));

        expect(usernameTextBox.isPresent()).toBeTruthy();
        expect(passwordTextBox.isPresent()).toBeTruthy();
        expect(loginButton.isPresent()).toBeTruthy();
        
        usernameTextBox.sendKeys(testUserMail);
        loginButton.click();

        expect(element(by.linkText('Wycieczki')).isPresent()).toBeTruthy();
        expect(element(by.css('.nav-item > .btn-primary')).isPresent()).toBeTruthy();
        
        browser.sleep(500)
        element(by.css('.nav-item > .btn-primary')).click();
        
        expect(element(by.linkText('Wycieczki')).isPresent()).toBeTruthy();
        expect(element(by.linkText('Rejestracja')).isPresent()).toBeTruthy();
        expect(element(by.linkText('Logowanie')).isPresent()).toBeTruthy();
    });
});
