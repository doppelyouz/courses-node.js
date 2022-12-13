document.querySelectorAll('.price').forEach(el=>{
    el.textContent = new Intl.NumberFormat('ru-RU',{
        currency:'rub',
        style:'currency'
    }).format(el.textContent);
})