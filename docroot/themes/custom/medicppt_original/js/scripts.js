(function ($, Drupal, drupalSettings) {
  'use strict';

  Drupal.behaviors.custom_js = {
    attach: function (context, settings) {

      AOS.init({
        once: true,
        disable: 'mobile'
      });

      jQuery('#goTop').on('click', function (e) {
        jQuery("html, body").animate({
          scrollTop: jQuery("body").offset().top
        }, 500);
      });

      // Window Listeners.

      window.addEventListener('load', AOS.refresh);

      jQuery(window).scroll(function () {
        if (jQuery(window).scrollTop() > 200) {
          jQuery("#goTop").fadeIn();
        }
        else {
          jQuery("#goTop").fadeOut();
        }
      });

      // Mobile view class
      if (jQuery(window).width() < 769) {
        jQuery("body").addClass("mobileview");
      }
      else {
        jQuery("body").removeClass("mobileview");
      }

      // this is used whenever the window is resized
      jQuery(window).resize(function () {
        if (jQuery(window).width() < 769) {
          jQuery("body").addClass("mobileview");
        }
        else {
          jQuery("body").removeClass("mobileview");
        }
      });

      jQuery('.attach-nav-slider .paragraph .field__items').not('.slick-initialized').slick({
        dots: true,
        infinite: true,
        speed: 300,
        autoplay: true,
        autoplaySpeed: 2000,
        arrow: true
      })

    }
  }

  Drupal.behaviors.card_carousel = {
    attach: function (context, settings) {

      var sectionComponents = document.querySelectorAll('.paragraph--type--card-carousel-component');

      sectionComponents.forEach(section => {
        var carouselList = section.querySelector('.paragraph--type--card-carousel-component.paragraph--view-mode--default .field__items');
        var carouselItems = section.querySelectorAll('.paragraph--type--card-carousel-component.paragraph--view-mode--default .field__items > .field__item');

        var elems = Array.from(carouselItems);
        var mid = -(carouselItems.length % 2 == 0 ? carouselItems.length / 2 : (carouselItems.length - 1) / 2)
        var saveMidValue = mid;
        carouselItems.forEach(item => {
          item.dataset.pos = mid++;
        })

        if (carouselList) {
          carouselList.addEventListener('click', function (event) {
            event.stopImmediatePropagation();
            event.stopPropagation();
            var newActive = event.target;
            var isItem = $(newActive).parents('.field__item[data-pos]');

            if (!isItem || newActive.classList.contains('carousel__item_active')) {
              return;
            };

            var finalElement = $(newActive).is("[data-pos]") ? newActive : $(newActive).parents('.field__item[data-pos]')[0];
            update(finalElement, elems, saveMidValue);
          });
        }

      })

      var update = function (newActive, elems, saveMidValue) {
        var newActivePos = newActive.dataset.pos;
        elems.forEach(item => {
          var itemPos = item.dataset.pos;
          item.dataset.pos = getPos(itemPos, newActivePos, saveMidValue)
        });
      };

      var getPos = function (current, active, saveMidValue) {
        var diff = current - active;

        if (Math.abs(current - active) > Math.abs(saveMidValue)) {
          return -current
        }

        return diff;
      }
    }
  }
  $('.medicppt-why-choose-us .medicppt-service-card .paragraph').click(function(){
     $(this).toggleClass('show-data')
  })
}(jQuery, Drupal, drupalSettings));
