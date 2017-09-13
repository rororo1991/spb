 $(document).ready(function () {
     var updateFeed = function () {
         var socialServices = ['twitter', 'facebook', 'google', 'youtube'];
         var postsToLoad = parseInt($('.mbr-social-feed').attr('data-posts')) || 3;

         function readSettings() {
             return socialServices.map(function (socName) {
                 return $('.mbr-social-feed').attr('data-' + socName).replace(" ", "").split(',').map(function (el) {

                     if (socName === 'google' && el.length > 0 && el.charAt(0) != '+') {
                         return '@+' + el;
                     }
                     if (socName === 'youtube')
                         return el;
                     if (socName === 'rss')
                         return el;
                     else
                         return '@' + el;
                 });
             })
         }
         var socSettings = {};
         var socialSearch = readSettings();
         socialSearch.map(function (el, i) {
             if (el.length === 1 && (el[0] === '@' || el[0] === ''))
                 return;
             var obj = {};
             var socialName = socialServices[i];
             switch (socialName) {
                 case 'twitter':
                     obj.accounts = el;
                     obj.consumer_key = 'zGH9N8l92xnx14TJF41A2zjqK'; //String: consumer key. make sure to have your app read-only
                     obj['consumer_secret'] = 'jmx0ZDJcNO2zK3FnCA47VOGbhr9tPD6JwfGI39vx5W4ymA3sD4'; //String: consumer secret key. make sure to have your app read-only
                     obj.limit = postsToLoad;
                     break;
                 case 'google':
                     obj.accounts = el;
                     obj.limit = postsToLoad;
                     obj.access_token = 'AIzaSyDXQV0H1ImqLxlviK_ScjOcEv5EMalzteQ'
                     break;
                 case 'youtube':
                     obj.accounts = el;
                     obj.limit = postsToLoad;
                     obj.access_token = 'AIzaSyDXQV0H1ImqLxlviK_ScjOcEv5EMalzteQ'
                     break;
                 case 'facebook':
                     obj.accounts = el;
                     obj.limit = postsToLoad;
                     obj.access_token = '299509753744860|60a3cdfc04eb95a93dd169c420f35bd0';
                     break;
                 case 'rss':
                     obj.urls = el;
                     obj.limit = postsToLoad;
                     break;

             }
             socSettings[socialServices[i]] = obj;

         })
         $('.social-feed-container').html('');
         socSettings.callback = function () {
             $('.mbr-social-feed').removeClass('loading');
         }
         socSettings.template_html = "\
                            <div class='social-feed-element {{? !it.moderation_passed}}hidden{{?}}' dt-create='{{=it.dt_create}}' social-feed-id = '{{=it.id}}'>\
                            <div class='content'>\
                            <a class='pull-left' href='{{=it.author_link}}' target='_blank'>\
                            <img class='media-object' src='{{=it.author_picture}}'>\
                            </a>\
                            <div class='media-body'>\
                            <p>\
                            <i class='fa fa-{{=it.social_network}}'></i>\
                            <span class='author-title'>{{=it.author_name}}</span>\
                            <span class='muted pull-right'> {{=it.time_ago}}</span></p>\
                            <div class='text-wrapper'><p class='social-feed-text'>{{=it.text}} \
                            <a href='{{=it.link}}' target='_blank' class='read-button'>read more</a></p>\
                            </div>\
                            </div>\
                            </div>\
                            {{=it.attachment}}\
                           </div>\
                            ";
         socSettings.show_media = true;
         socSettings.length = 200;
         $('.social-feed-container').socialfeed(socSettings);
     }

     $(document).on('add.cards change.cards', function (event) {
         if ($(event.target).hasClass('mbr-social-feed')) {
             updateFeed();
             setTimeout(function () {
                 $('.mbr-social-feed').removeClass('loading');
             }, 5000)
         }
     })
 });