$(function(){
   $('.submit-once-form').submit(function () {
       // Bail out if the form contains validation errors
       if ($.validator && !$(this).valid()) return;

       var form = $(this);
       $(this).find('input[type="submit"], button[type="submit"]').each(function (index) {
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

    // Search by company IN button
    const searchIcoBtn = document.createElement("button");
    searchIcoBtn.innerText = "Vyhledat";
    searchIcoBtn.classList.add('btn', 'btn-primary');

    // Toggle Btn
    const toggleBtn = document.createElement("input")
    toggleBtn.type = 'checkbox'
    toggleBtn.classList.add('form-check-input')

    // Modal wrapper NODE
    let modalNode = document.getElementById('fm-modal').querySelector('.modal-wrapper');

    // Create an observer instance.
    var observer = new MutationObserver(function (mutations) {
        console.log(modalNode);
        let icoInputEl = modalNode.querySelector('#id_ico');
        let companyDivEl = modalNode.querySelector('#div_id_name');
        let buttonsEl = modalNode.querySelector('.btn-primary');
        // console.log('BUT', buttonsEl)

        // Hide company name field
        companyDivEl.style.display = 'none';
        // Hide original Django form submit button
        // buttonsEl.style.display = 'none'

        // Replace submit button with toggle button
        buttonsEl.parentNode.replaceChild(searchIcoBtn, buttonsEl)

        // Add toggle Btn
        modalNode.querySelector('.modal-body').appendChild(toggleBtn)


        icoInputEl.addEventListener('input', function (e) {
            console.log(e.target.value)
        })

    });

    // Pass in the target node, as well as the observer options.
    observer.observe(modalNode, {
        attributes: true,
        childList: true,
        characterData: true
    })

})
