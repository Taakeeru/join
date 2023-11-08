function signUpFormTemplate() {
    return /* html */ `
    <form required id="form" onsubmit="initRegister(); return false;">
        <div class="form-div">
            <!-- Name input -->
            <input required type="text" id="user-name" class="form-control name" placeholder="Name" /> 

            <!-- Email input -->
            <input required type="email" id="email" class="form-control email" placeholder="Email" /> 

            <!-- Password input -->
            <input required type="password" id="password" class="form-control password" placeholder="Password"/>

            <!-- Confirm Password input -->
            <input required type="password" id="confirm-password" class="form-control password" placeholder="Confirm Password"/>
        </div>        
            <!-- 2 column grid layout for inline styling -->
        <div class="row mb-4 mg-40">
            <div class="col d-flex">
                <!-- Checkbox -->
                <div class="form-check">
                <input required class="form-check-input " type="checkbox" value="" id="form2Example31" unchecked />
                <label class="form-check-label" for="form2Example31"> <span id="label-text">I accept the <a href="privacy.html">Privacy Policy</a></span></label>
                </div>
            </div>
        </div>
        <div class="login-button-div">
            <!-- Submit button -->
            <button id="signup-button" type="submit" class="btn btn-primary btn-block mb-4">Sign Up</button>
        </div>
    </form>`;
}


function logInFormTemplate() {
    return /* html */ `
    <form required id="form" onsubmit="login(); return false;">
        <div class="form-div">
            <!-- Email input -->
            <input required type="email" id="email" class="form-control email" placeholder="Email" /> 

            <!-- Password input -->
            <input required type="password" id="password" class="form-control password" placeholder="Password"/>
        </div>        
            <!-- 2 column grid layout for inline styling -->
        <div class="row mb-4 mg-40">
            <div class="col d-flex">
                <!-- Checkbox -->
                <div class="form-check">
                    <input class="form-check-input " type="checkbox" value="" id="form2Example31" checked />
                    <label class="form-check-label" for="form2Example31"> <span id="label-text"> Remember me </span></label>
                </div>
            </div>
        </div>
        <div class="login-button-div">
            <!-- Submit button -->
            <button id="login-button" type="submit" class="btn btn-primary btn-block mb-4">Log in</button>
            <button id="guest-button" type="button" class="btn btn-outline-secondary btn-block mb-4 btn2">Guest log in</button>
        </div>
    </form>`;
}