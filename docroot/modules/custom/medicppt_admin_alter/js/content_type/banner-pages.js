(function ($, Drupal) {

    Drupal.behaviors.bannerpages = {

        attach: function (context, settings) {

            jQuery('[data-drupal-selector$="subform-paragraph-view-mode-wrapper"] select').once().on('change', function (e) {
                jQuery(this).parents('.form-wrapper').siblings('[data-drupal-selector$="subform-field-section-image-wrapper"]').show()
                jQuery(this).parents('.form-wrapper').siblings('[data-drupal-selector$="subform-field-color-wrapper"]').show()
                if (jQuery(this).val() == 'colored_background') {
                    jQuery(this).parents('.form-wrapper').siblings('[data-drupal-selector$="subform-field-section-image-wrapper"]').hide()
                }
                else if (jQuery(this).val() == 'image_background') {
                    jQuery(this).parents('.form-wrapper').siblings('[data-drupal-selector$="subform-field-color-wrapper"]').hide()
                }
                else if (jQuery(this).val() == 'default') {
                    jQuery(this).parents('.form-wrapper').siblings('[data-drupal-selector$="subform-field-section-image-wrapper"]').hide()
                    jQuery(this).parents('.form-wrapper').siblings('[data-drupal-selector$="subform-field-color-wrapper"]').hide()
                }
            })
            jQuery('[data-drupal-selector$="subform-paragraph-view-mode-wrapper"] select').trigger('change')
        }
    };

})(jQuery, Drupal);