$(document).ready(function(){
    $('.carousel__inner').slick({
        speed:1200,
        // adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src ="../icon/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src ="../icon/right.svg"></button>',
        responsive: [
            {
                breakpoint: 1024,
      settings: {
        dots: true,
        arrows:false
            }}
        ]
    })  
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });  
      
    //   function toogleSlide(item){
    //       $(item).each(function(i){
    //           $(this).on('click', function(e){
    //               e.preventDefault();
    //               $('.catalog-item__content').eq(i).toggleCLass('catalog-item__content_active');
    //               $('.catalog-item__list').eq(i).toggleCLass('catalog-item__list_active');
    //           })
    //       });
         
    //   };
    //   toogleSlide('.catalog-item__link');
    //   toogleSlide('.catalog-item__back');

      function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //modal
    $('[data-modal="consultation"]').on('click', function(){
    $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
        
    });
    $('.button_mini').each( function(i){
        $(this).on('click', function(){
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });
   function toogleModal(item){
    $(item).validate({
        rules:{
            name: {required:true,
                    minlength:5},
            phone: "required",
            email: {required:true,
            email:true}
            
        },
        messages: {
            name: {
              required: "введите свое имя",
              minlength:jQuery.validator.format("Введите более {0} символов")
            }

          }
    });   }
     toogleModal('#consultation-form');
     toogleModal('#consultation form');
     toogleModal('#order form');
    
    $('input[name=phone]').mask('+996(999)99-99-99');

    $('form').submit(function(e){
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'mailer/smart.php',
            data: $(this).serialize()
        }).done(function(){
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');

        });
        return false
    })
    $(window).scroll(function(){
        if($(this).scrollTop()>1600){
            $('.pageup').fadeIn();}
            else{$('.pageup').fadeOut();}
        
    })
    //scroll
    $("a[href^='#']").click(function(){
        var _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
});
       new WOW().init();

    //    const test = document.querySelector("li");
    //    console.log(test);

  });