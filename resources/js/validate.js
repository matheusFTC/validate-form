var successAlert;
var dangerAlert;

var inputName;
var inputEmail;
var inputDateOfBirth;
var inputIndividualRegistration;

function loadForm() {
	successAlert = document.getElementById("successAlert");
	dangerAlert = document.getElementById("dangerAlert");
	inputName = document.getElementById("inputName");
	inputEmail = document.getElementById("inputEmail");
	inputDateOfBirth = document.getElementById("inputDateOfBirth");
	inputIndividualRegistration = document.getElementById("inputIndividualRegistration");
	
	successAlert.style.display = "none";
	dangerAlert.style.display = "none";
}

function validateForm() {
	var isValid = true;

	if (isEmpyt(inputName)) {
		isValid = false;
		hasError(inputName);
	} else {
		hasSuccess(inputName);
	}

	if (isEmpyt(inputEmail) || !validateEmail(inputEmail.value)) {
		isValid = false;
		hasError(inputEmail);
	} else {
		hasSuccess(inputEmail);
	}

	if (isEmpyt(inputDateOfBirth)) {
		isValid = false;
		hasError(inputDateOfBirth);
	} else {
		hasSuccess(inputDateOfBirth);
	}

	if (isEmpyt(inputIndividualRegistration) || !validateIndividualRegistration(inputIndividualRegistration.value)) {
		isValid = false;
		hasError(inputIndividualRegistration);
	} else {
		hasSuccess(inputIndividualRegistration);
	}

	if (isValid) {
		dangerAlert.style.display = "none";
		successAlert.style.display = "block";
	} else {
		dangerAlert.style.display = "block";
		successAlert.style.display = "none";
	}
}

function isEmpyt(input) {
	if (input.value.trim().length == 0) {
		input.parentNode.className = "form-group has-error";
		return true;
	} else {
		input.parentNode.className = "form-group has-success";
		return false;
	}
}

function hasError(input) {
	input.parentNode.className = "form-group has-error";
}

function hasSuccess(input) {
	input.parentNode.className = "form-group has-success";
}

function dateMask(input) {
	var value = input.value;

	if (value.length >= 2 && value.length < 5) {
		value = nonLiteral(value);
		value = value.substring(0, 2) + "/" + value.substring(2);
	} else if (value.length >= 5) {
		value = nonLiteral(value);
		value = value.substring(0, 2) + "/" + value.substring(2, 4) + "/" + value.substring(4);
	} else {
		value = nonLiteral(value);
	}

	input.value = value;
}

function individualRegistrationMask(input) {
	var value = input.value;

	if (value.length >= 3 && value.length < 6) {
		value = nonLiteral(value);
		value = value.substring(0, 3) + "." + value.substring(3);
	} else if (value.length >= 6 && value.length < 9) {
		value = nonLiteral(value);
		value = value.substring(0, 3) + "." + value.substring(3, 6) + "." + value.substring(6);
	} else if (value.length >= 9) {
		value = nonLiteral(value);
		value = value.substring(0, 3) + "." + value.substring(3, 6) + "." + value.substring(6, 9) + "-" + value.substring(9);
	} else {
		value = nonLiteral(value);
	}

	input.value = value;
}

function nonLiteral(value) {
	return value.replace(/\D+/g, "");
}

function validateEmail(email) {
	var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regex.test(email);
}

function validateIndividualRegistration(individualRegistration) {
    var nums, digs, sum, i, result, digsEquals;

    digsEquals = 1;
    
    individualRegistration = nonLiteral(individualRegistration);

    if (individualRegistration.length < 11) {
    	return false;
    } else {
    	for (i = 0; i < individualRegistration.length - 1; i++) {
	        if (individualRegistration.charAt(i) != individualRegistration.charAt(i + 1)) {
	        	digsEquals = 0;
	            break;
	    	}
	    }
	    if (!digsEquals) {
	          nums = individualRegistration.substring(0,9);
	          digs = individualRegistration.substring(9);
	          sum = 0;
	          for (i = 10; i > 1; i--)
	                sum += nums.charAt(10 - i) * i;
	          result = sum % 11 < 2 ? 0 : 11 - sum % 11;
	          if (result != digs.charAt(0))
	                return false;
	          nums = individualRegistration.substring(0,10);
	          sum = 0;
	          for (i = 11; i > 1; i--)
	                sum += nums.charAt(11 - i) * i;
	          result = sum % 11 < 2 ? 0 : 11 - sum % 11;
	          if (result != digs.charAt(1))
	                return false;
	          return true;
	    } else {
	        return false;
	    }
	}
}