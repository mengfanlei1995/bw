export class AppEventsConstants {
    // Event names
    // General purpose
    /** Log this event when an app is being activated. */
    static EVENT_NAME_ACTIVATED_APP:string = "fb_mobile_activate_app"
    static EVENT_NAME_DEACTIVATED_APP:string = "fb_mobile_deactivate_app"
    static EVENT_NAME_SESSION_INTERRUPTIONS:string = "fb_mobile_app_interruptions"
    static EVENT_NAME_TIME_BETWEEN_SESSIONS:string = "fb_mobile_time_between_sessions"
  
    /** Log this event when the user has completed registration with the app. */
    static EVENT_NAME_COMPLETED_REGISTRATION:string = "fb_mobile_complete_registration"
  
    /** Log this event when the user has viewed a form of content in the app. */
    static EVENT_NAME_VIEWED_CONTENT:string = "fb_mobile_content_view"
  
    /** Log this event when the user has performed a search within the app. */
    static EVENT_NAME_SEARCHED:string = "fb_mobile_search"
  
    /**
     * Log this event when the user has rated an item in the app. The valueToSum passed to logEvent
     * should be the numeric rating.
     */
    static EVENT_NAME_RATED:string = "fb_mobile_rate"
  
    /** Log this event when the user has completed a tutorial in the app. */
    static EVENT_NAME_COMPLETED_TUTORIAL:string = "fb_mobile_tutorial_completion"
  
    /** Log this event when the app obtained a push registration token from FCM. */
    static EVENT_NAME_PUSH_TOKEN_OBTAINED:string = "fb_mobile_obtain_push_token"
    // Ecommerce related
    /**
     * Log this event when the user has added an item to their cart. The valueToSum passed to logEvent
     * should be the item's price.
     */
    static EVENT_NAME_ADDED_TO_CART:string = "fb_mobile_add_to_cart"
  
    /**
     * Log this event when the user has added an item to their wishlist. The valueToSum passed to
     * logEvent should be the item's price.
     */
    static EVENT_NAME_ADDED_TO_WISHLIST:string = "fb_mobile_add_to_wishlist"
  
    /**
     * Log this event when the user has entered the checkout process. The valueToSum passed to
     * logEvent should be the total price in the cart.
     */
    static EVENT_NAME_INITIATED_CHECKOUT:string = "fb_mobile_initiated_checkout"
  
    /** Log this event when the user has entered their payment info. */
    static EVENT_NAME_ADDED_PAYMENT_INFO:string = "fb_mobile_add_payment_info"
  
    static EVENT_NAME_PURCHASED:string = "fb_mobile_purchase"
    // Gaming related
    /** Log this event when the user has achieved a level in the app. */
    static EVENT_NAME_ACHIEVED_LEVEL:string = "fb_mobile_level_achieved"
  
    /** Log this event when the user has unlocked an achievement in the app. */
    static EVENT_NAME_UNLOCKED_ACHIEVEMENT:string = "fb_mobile_achievement_unlocked"
  
    /**
     * Log this event when the user has spent app credits. The valueToSum passed to logEvent should be
     * the number of credits spent.
     */
    static EVENT_NAME_SPENT_CREDITS:string = "fb_mobile_spent_credits"
  
    /** A telephone/SMS, email, chat or other type of contact between a customer and your business. */
    static EVENT_NAME_CONTACT:string = "Contact"
  
    /**
     * The customization of products through a configuration tool or other application your business
     * owns.
     */
    static EVENT_NAME_CUSTOMIZE_PRODUCT:string = "CustomizeProduct"
  
    /** The donation of funds to your organization or cause. */
    static EVENT_NAME_DONATE:string = "Donate"
  
    /**
     * When a person finds one of your locations via web or application, with an intention to visit
     * (example: find product at a local store).
     */
    static EVENT_NAME_FIND_LOCATION:string = "FindLocation"
  
    /** The booking of an appointment to visit one of your locations. */
    static EVENT_NAME_SCHEDULE:string = "Schedule"
  
    /** The start of a free trial of a product or service you offer (example: trial subscription). */
    static EVENT_NAME_START_TRIAL:string = "StartTrial"
  
    /**
     * The submission of an application for a product, service or program you offer (example: credit
     * card, educational program or job).
     */
    static EVENT_NAME_SUBMIT_APPLICATION:string = "SubmitApplication"
  
    /** The start of a paid subscription for a product or service you offer. */
    static EVENT_NAME_SUBSCRIBE:string = "Subscribe"
  
    /** Log this event when the user views an ad. */
    static EVENT_NAME_AD_IMPRESSION:string = "AdImpression"
  
    /** Log this event when the user clicks an ad. */
    static EVENT_NAME_AD_CLICK:string = "AdClick"
  
    /** Log the live streaming events from sdk */
    static EVENT_NAME_LIVE_STREAMING_START:string = "fb_sdk_live_streaming_start"
    static EVENT_NAME_LIVE_STREAMING_STOP:string = "fb_sdk_live_streaming_stop"
    static EVENT_NAME_LIVE_STREAMING_PAUSE:string = "fb_sdk_live_streaming_pause"
    static EVENT_NAME_LIVE_STREAMING_RESUME:string = "fb_sdk_live_streaming_resume"
    static EVENT_NAME_LIVE_STREAMING_ERROR:string = "fb_sdk_live_streaming_error"
    static EVENT_NAME_LIVE_STREAMING_UPDATE_STATUS:string = "fb_sdk_live_streaming_update_status"
  
    /** Product Catalog related events */
    static EVENT_NAME_PRODUCT_CATALOG_UPDATE:string = "fb_mobile_catalog_update"
    // Event parameters
    /** Paramete keys for live streaming events */
    static EVENT_PARAM_LIVE_STREAMING_PREV_STATUS:string = "live_streaming_prev_status"
    static EVENT_PARAM_LIVE_STREAMING_STATUS:string = "live_streaming_status"
    static EVENT_PARAM_LIVE_STREAMING_ERROR:string = "live_streaming_error"
  
    /**
     * Parameter key used to specify currency used with logged event. E.g. "USD", "EUR", "GBP". See
     * [ISO-4217](http://en.wikipedia.org/wiki/ISO_4217) for specific values.
     */
    static EVENT_PARAM_CURRENCY:string = "fb_currency"
  
    /**
     * Parameter key used to specify the method the user has used to register for the app, e.g.,
     * "Facebook", "email", "Twitter", etc.
     */
    static EVENT_PARAM_REGISTRATION_METHOD:string = "fb_registration_method"
  
    /**
     * Parameter key used to specify a generic content type/family for the logged event, e.g. "music",
     * "photo", "video". Options to use will vary depending on the nature of the app.
     */
    static EVENT_PARAM_CONTENT_TYPE:string = "fb_content_type"
  
    /**
     * Parameter key used to specify data for the one or more pieces of content being logged about.
     * Data should be a JSON encoded string. Example: "[{\"id\": \"1234\", \"quantity\": 2,
     * \"item_price\": 5.99}, {\"id\": \"5678\", \"quantity\": 1, \"item_price\": 9.99}]"
     */
    static EVENT_PARAM_CONTENT:string = "fb_content"
  
    /**
     * Parameter key used to specify an ID for the specific piece of content being logged about. This
     * could be an EAN, article identifier, etc., depending on the nature of the app.
     */
    static EVENT_PARAM_CONTENT_ID:string = "fb_content_id"
  
    /** Parameter key used to specify the string provided by the user for a search operation. */
    static EVENT_PARAM_SEARCH_STRING:string = "fb_search_string"
  
    /**
     * Parameter key used to specify whether the activity being logged about was successful or not.
     * EVENT_PARAM_VALUE_YES and EVENT_PARAM_VALUE_NO are good canonical values to use for this
     * parameter.
     */
    static EVENT_PARAM_SUCCESS:string = "fb_success"
  
    /**
     * Parameter key used to specify the maximum rating available for the EVENT_NAME_RATE event. E.g.,
     * "5" or "10".
     */
    static EVENT_PARAM_MAX_RATING_VALUE:string = "fb_max_rating_value"
  
    /**
     * Parameter key used to specify whether payment info is available for the
     * EVENT_NAME_INITIATED_CHECKOUT event. EVENT_PARAM_VALUE_YES and EVENT_PARAM_VALUE_NO are good
     * canonical values to use for this parameter.
     */
    static EVENT_PARAM_PAYMENT_INFO_AVAILABLE:string = "fb_payment_info_available"
  
    /**
     * Parameter key used to specify how many items are being processed for an
     * EVENT_NAME_INITIATED_CHECKOUT or EVENT_NAME_PURCHASE event.
     */
    static EVENT_PARAM_NUM_ITEMS:string = "fb_num_items"
  
    /** Parameter key used to specify the level achieved in an EVENT_NAME_LEVEL_ACHIEVED event. */
    static EVENT_PARAM_LEVEL:string = "fb_level"
  
    /**
     * Parameter key used to specify a description appropriate to the event being logged. E.g., the
     * name of the achievement unlocked in the EVENT_NAME_ACHIEVEMENT_UNLOCKED event.
     */
    static EVENT_PARAM_DESCRIPTION:string = "fb_description"
  
    /** Parameter key used to specify source application package. */
    static EVENT_PARAM_SOURCE_APPLICATION:string = "fb_mobile_launch_source"
  
    /** Parameter key used to specify package fingerprint. */
    static EVENT_PARAM_PACKAGE_FP:string = "fb_mobile_pckg_fp"
  
    /** Parameter key used to specify hashed cert for signing the apk. */
    static EVENT_PARAM_APP_CERT_HASH:string = "fb_mobile_app_cert_hash"
    // Parameter values
    /** Yes-valued parameter value to be used with parameter keys that need a Yes/No value */
    static EVENT_PARAM_VALUE_YES:string = "1"
  
    /** No-valued parameter value to be used with parameter keys that need a Yes/No value */
    static EVENT_PARAM_VALUE_NO:string = "0"
  
    /**
     * Parameter key used to specify the type of ad in an EVENT_NAME_AD_IMPRESSION or
     * EVENT_NAME_AD_CLICK event. E.g. "banner", "interstitial", "rewarded_video", "native"
     */
    static EVENT_PARAM_AD_TYPE:string = "ad_type"
  
    /**
     * Parameter key used to specify the unique ID for all events within a subscription in an
     * EVENT_NAME_SUBSCRIBE or EVENT_NAME_START_TRIAL event.
     */
    static EVENT_PARAM_ORDER_ID:string = "fb_order_id"
    static EVENT_PARAM_VALUE_TO_SUM:string = "_valueToSum"
  
    /**
     * Parameter keys used to specify additional information about item for
     * EVENT_NAME_PRODUCT_CATALOG_UPDATE event.
     */
    static EVENT_PARAM_PRODUCT_CUSTOM_LABEL_0:string = "fb_product_custom_label_0"
    static EVENT_PARAM_PRODUCT_CUSTOM_LABEL_1:string = "fb_product_custom_label_1"
    static EVENT_PARAM_PRODUCT_CUSTOM_LABEL_2:string = "fb_product_custom_label_2"
    static EVENT_PARAM_PRODUCT_CUSTOM_LABEL_3:string = "fb_product_custom_label_3"
    static EVENT_PARAM_PRODUCT_CUSTOM_LABEL_4:string = "fb_product_custom_label_4"
  
    // Optional field "google_product_category"
    static EVENT_PARAM_PRODUCT_CATEGORY:string = "fb_product_category"
  
    /**
     * Parameter keys used to specify the product deep links for EVENT_NAME_PRODUCT_CATALOG_UPDATE
     * event.
     */
    static EVENT_PARAM_PRODUCT_APPLINK_IOS_URL:string = "fb_product_applink_ios_url"
    static EVENT_PARAM_PRODUCT_APPLINK_IOS_APP_STORE_ID:string = "fb_product_applink_ios_app_store_id"
    static EVENT_PARAM_PRODUCT_APPLINK_IOS_APP_NAME:string = "fb_product_applink_ios_app_name"
    static EVENT_PARAM_PRODUCT_APPLINK_IPHONE_URL:string = "fb_product_applink_iphone_url"
    static EVENT_PARAM_PRODUCT_APPLINK_IPHONE_APP_STORE_ID:string = "fb_product_applink_iphone_app_store_id"
    static EVENT_PARAM_PRODUCT_APPLINK_IPHONE_APP_NAME:string = "fb_product_applink_iphone_app_name"
    static EVENT_PARAM_PRODUCT_APPLINK_IPAD_URL:string = "fb_product_applink_ipad_url"
    static EVENT_PARAM_PRODUCT_APPLINK_IPAD_APP_STORE_ID:string = "fb_product_applink_ipad_app_store_id"
    static EVENT_PARAM_PRODUCT_APPLINK_IPAD_APP_NAME:string = "fb_product_applink_ipad_app_name"
    static EVENT_PARAM_PRODUCT_APPLINK_ANDROID_URL:string = "fb_product_applink_android_url"
    static EVENT_PARAM_PRODUCT_APPLINK_ANDROID_PACKAGE:string = "fb_product_applink_android_package"
    static EVENT_PARAM_PRODUCT_APPLINK_ANDROID_APP_NAME:string = "fb_product_applink_android_app_name"
    static EVENT_PARAM_PRODUCT_APPLINK_WINDOWS_PHONE_URL:string = "fb_product_applink_windows_phone_url"
    static EVENT_PARAM_PRODUCT_APPLINK_WINDOWS_PHONE_APP_ID:string = "fb_product_applink_windows_phone_app_id"
    static EVENT_PARAM_PRODUCT_APPLINK_WINDOWS_PHONE_APP_NAME:string = "fb_product_applink_windows_phone_app_name"
  }