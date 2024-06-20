$(function(){
   $('.submit-once-form').submit(function () {
       // Bail out if the form contains validation errors
       if ($.validator && !$(this).valid()) return;

       var form = $(this);
       $(this).find('input[type="submit"], button[type="submit"]').each(function () {
           // Create a disabled clone of the submit button
           $(this).clone(false).removeAttr('id').prop('disabled', true).insertBefore($(this));

           // Hide the actual submit button and move it to the beginning of the form
           $(this).hide();
           form.prepend($(this));
       });
   });

   $('#personal-data-form').submit(function (){
      if($('#id_id_userprofile-mailing_opt_in_0_2').prop('checked') == true){
         return window.confirm("Skutečně nechcete dostávat žádné soutěžní emaily? Můžete tak například přijít o některé akce v průběhu soutěže.");
      } else {
         return true;
      }
   });

   $('form.dirty-check').areYouSure({'message':"Ve formuláři jsou neuložené změny."});
});


$(function () {

    // Show company name element button
    const showCompanyNameBtn = document.createElement("button");
    showCompanyNameBtn.innerText = "Společnost nemá IČO";
    showCompanyNameBtn.classList.add('btn', 'btn-default');
    showCompanyNameBtn.style.marginTop = "2px";
    showCompanyNameBtn.style.display = "block";

    // Modal wrapper NODE
    let modalNode = document.getElementById('fm-modal').querySelector('.modal-wrapper');

    // Create an observer instance.
    var observer = new MutationObserver(function () {

        // Set btn visible on modal load
        showCompanyNameBtn.style.display = "block";

        // Hide company name input
        let companyDivEl = modalNode.querySelector('#div_id_name');
        companyDivEl.style.display = 'none';

        // Inject "Show company name" Btn
        modalNode.querySelector('.modal-buttons').appendChild(showCompanyNameBtn);

        // Show company name input + hide the Btn
        showCompanyNameBtn.addEventListener('click', function () {
            companyDivEl.style.display = 'block';
            showCompanyNameBtn.style.display = "none";
        })
    });

    // Pass in the target node, as well as the observer options.
    observer.observe(modalNode, {
        attributes: true,
        childList: true,
        characterData: true
    })

})
