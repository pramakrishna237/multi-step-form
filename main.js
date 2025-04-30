$(document).ready(function() {
    // Show the first step initially
    $('#step1').addClass('active');

    // Navigate to the next step
    $('.next-btn').click(function() {
        var currentStep = $(this).closest('.step');
        var nextStep = currentStep.next('.step');

        if (validateStep(currentStep)) {
            // currentStep.removeClass('active');
            $('.step').removeClass('active');
            nextStep.addClass('active');
        }
    });

    // Navigate to the previous step
    $('.prev-btn').click(function() {
        var currentStep = $(this).closest('.step');
        var prevStep = currentStep.prev('.step');
        // currentStep.removeClass('active');
        $('.step').removeClass('active');
        prevStep.addClass('active');
    });

    // Add new phone number input
    $('#addPhoneField').click(function() {
        var newPhoneField = `
            <div class="form-group">
                <label for="phone">Phone Number</label>
                <input type="text" class="form-control phone-input" placeholder="Enter phone number" required>
            </div>
        `;
        $('#phoneFields').append(newPhoneField);
    });

    // Validate each step before moving forward
    function validateStep(step) {
        var isValid = true;
        step.find('input').each(function() {
            if (!$(this).val()) {
                isValid = false;
                $(this).addClass('is-invalid');
            } else {
                $(this).removeClass('is-invalid');
            }
        });
        return isValid;
    }

    // On form submission
    $('#multiStepForm').submit(function(e) {
        e.preventDefault();
        
        // Collect the data from all the steps
        var formData = {
            name: $('#name').val(),
            email: $('#email').val(),
            address: $('#address').val(),
            phones: []
        };

        $('.phone-input').each(function() {
            formData.phones.push($(this).val());
        });

        // Show review step
        $('#review').html(`
            <h5>Review Your Information</h5>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Address:</strong> ${formData.address}</p>
            <p><strong>Phones:</strong> ${formData.phones.join(', ')}</p>
        `);
        $('#step4').addClass('active');
    });
});