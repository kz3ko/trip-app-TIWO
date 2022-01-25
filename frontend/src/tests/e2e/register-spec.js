describe('register functionality tests', () => {

    const testUserMail = 'andrzej86@gmail.com'
    const testPassword = 'andrzej86';

    beforeEach(() => {
        browser.waitForAngularEnabled(false);
        browser.get('http://localhost:4200');
        browser.sleep(500)

        element(by.linkText('Rejestracja')).click();
        browser.sleep(500)
    });

    it('should register new user', () => {
        const userNameForm = element(by.css('#username'));
        const passwordForm = element(by.css('#password'));
        const registerButton = element(by.buttonText('Zarejestruj'));

        expect(userNameForm.isPresent()).toBeTruthy();
        expect(passwordForm.isPresent()).toBeTruthy();
        expect(registerButton.isPresent()).toBeTruthy();

        userNameForm.sendKeys(testUserMail);
        passwordForm.sendKeys(testPassword);
        registerButton.click();
        browser.sleep(2000)

        expect(element(by.linkText('Wycieczki')).isPresent()).toBeTruthy();
        expect(element(by.linkText('Rejestracja')).isPresent()).toBeTruthy();
        expect(element(by.linkText('Logowanie')).isPresent()).toBeTruthy();
    });

    it('should return certain alert if user with given email exists', () => {
        const userNameForm = element(by.css('#username'));
        const passwordForm = element(by.css('#password'));
        const registerButton = element(by.buttonText('Zarejestruj'));

        expect(userNameForm.isPresent()).toBeTruthy();
        expect(passwordForm.isPresent()).toBeTruthy();
        expect(registerButton.isPresent()).toBeTruthy();

        userNameForm.sendKeys(testUserMail);
        passwordForm.sendKeys(testPassword);
        registerButton.click();
        expect(element.all(by.css('.text-danger')).getText()).toContain('User with this name already exists');
    });

    it('should return certain alert if user submits uncompleted form', () => {
        const usernameTextBox = element(by.css('#username'));
        const passwordTextBox = element(by.css('#password'));
        const registerButton = element(by.buttonText('Zarejestruj'));

        expect(usernameTextBox.isPresent()).toBeTruthy();
        expect(passwordTextBox.isPresent()).toBeTruthy();
        expect(registerButton.isPresent()).toBeTruthy();

        usernameTextBox.sendKeys(testUserMail);
        registerButton.click();
        expect(element.all(by.css('.text-danger')).getText()).toContain('This field is required');
    });
});