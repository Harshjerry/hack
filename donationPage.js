document.addEventListener('DOMContentLoaded', function () {
    const donationAmount = document.getElementById('donation-amount');
    const customAmountInput = document.getElementById('custom-amount');
    const donateButton = document.getElementById('donate-button');
    const confirmationMessage = document.getElementById('confirmation-message');

    // Event listener for custom amount input visibility
    donationAmount.addEventListener('change', function () {
        if (donationAmount.value === 'custom') {
            customAmountInput.style.display = 'block';
        } else {
            customAmountInput.style.display = 'none';
        }
    });

    // Event listener for donation button click
    donateButton.addEventListener('click', async function () {
        let amount=0;
        if (donationAmount.value === 'custom') {
            amount = customAmountInput.value;
        } else {
            amount = donationAmount.value;
        }
        // Simulate donation submission (replace with actual donation processing)
        const options={
            method:'post',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               amount
            })
    }
      const data= await fetch("http://localhost:4501/pay",options)
      console.log(data.status); // Log the HTTP status code
     const res= await data.json(); // Log the response body
     window.location=res.url;
        // Reset the form after 5 seconds (for demonstration purposes)
    });
});
