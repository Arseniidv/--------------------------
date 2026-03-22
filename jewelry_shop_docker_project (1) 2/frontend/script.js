
document.addEventListener("DOMContentLoaded", () => {

  // simple navigation: scroll to section if hash exists
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener("click", function(e) {
      const id = this.getAttribute("href");
      const el = document.querySelector(id);

      if(el){
        e.preventDefault();
        el.scrollIntoView({behavior:"smooth"});
      }
    });
  });

  // simple cart counter demo
  let cart = 0;
  const cartBadge = document.querySelector(".cart-count");

  document.querySelectorAll(".add-to-cart").forEach(btn=>{
    btn.addEventListener("click",()=>{
      cart++;
      if(cartBadge){
        cartBadge.textContent = cart;
      }
    });
  });

});
